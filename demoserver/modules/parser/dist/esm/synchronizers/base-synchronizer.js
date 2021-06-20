import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { getXVIZConfig } from '../config/xviz-config';
import xvizStats from '../utils/stats';
import LogSlice from './log-slice';
import memoize from '../utils/memoize';
import assert from '../utils/assert';
var getCurrentLogSliceMemoized = memoize(function (streamFilter, lookAheadMs, linksByReverseTime) {
  xvizStats.get('getCurrentLogSliceMemoized').incrementCount();

  for (var _len = arguments.length, streamsByReverseTime = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    streamsByReverseTime[_key - 3] = arguments[_key];
  }

  return new LogSlice(streamFilter, lookAheadMs, linksByReverseTime, streamsByReverseTime);
});
var getCurrentFrameMemoized = memoize(function (logSlice, vehiclePose, trackedObjectId, postProcessFrame) {
  return logSlice.getCurrentFrame({
    vehiclePose: vehiclePose,
    trackedObjectId: trackedObjectId
  }, postProcessFrame);
});
var EMPTY_VEHICLE_POSE = {
  longitude: 0,
  latitude: 0,
  x: 0,
  y: 0,
  z: 0
};

var BaseSynchronizer = function () {
  function BaseSynchronizer() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BaseSynchronizer);

    this.opts = opts;
    this.time = 0;
    this.lookAheadMs = 0;
  }

  _createClass(BaseSynchronizer, [{
    key: "getCurrentFrame",
    value: function getCurrentFrame(streamFilter, trackedObjectId) {
      xvizStats.get('getCurrentFrame').incrementCount();
      var logSlice = this.getLogSlice(streamFilter);

      if (!logSlice) {
        return null;
      }

      var _getXVIZConfig = getXVIZConfig(),
          PRIMARY_POSE_STREAM = _getXVIZConfig.PRIMARY_POSE_STREAM,
          ALLOW_MISSING_PRIMARY_POSE = _getXVIZConfig.ALLOW_MISSING_PRIMARY_POSE;

      var defaultPose = ALLOW_MISSING_PRIMARY_POSE ? EMPTY_VEHICLE_POSE : null;
      var vehiclePose = logSlice.getStream(PRIMARY_POSE_STREAM, defaultPose);

      if (vehiclePose !== this._lastVehiclePose) {
        xvizStats.get('vehiclePose').incrementCount();
        this._lastVehiclePose = vehiclePose;
      }

      return getCurrentFrameMemoized(logSlice, vehiclePose, trackedObjectId, this.opts.postProcessFrame);
    }
  }, {
    key: "getTime",
    value: function getTime() {
      return this.time;
    }
  }, {
    key: "setTime",
    value: function setTime(time) {
      this.time = time;
      assert(Number.isFinite(this.time), 'Invalid time');
      return this;
    }
  }, {
    key: "setLookAheadTimeOffset",
    value: function setLookAheadTimeOffset(offset) {
      this.lookAheadMs = offset;
      return this;
    }
  }, {
    key: "getLogSlice",
    value: function getLogSlice(streamFilter) {
      if (this._empty()) {
        return null;
      }

      var _getXVIZConfig2 = getXVIZConfig(),
          TIME_WINDOW = _getXVIZConfig2.TIME_WINDOW;

      var _this$_getTimeRangeIn = this._getTimeRangeInReverse(this.time - TIME_WINDOW, this.time),
          streams = _this$_getTimeRangeIn.streams,
          links = _this$_getTimeRangeIn.links;

      this._streamsByReverseTime = streams;
      this._linksByReverseTime = links;
      xvizStats.get('geometry-refresh').incrementCount();
      return getCurrentLogSliceMemoized.apply(void 0, [streamFilter, this.lookAheadMs, this._linksByReverseTime].concat(_toConsumableArray(this._streamsByReverseTime)));
    }
  }, {
    key: "empty",
    value: function empty() {
      assert(false);
    }
  }, {
    key: "_getTimeRangeInReverse",
    value: function _getTimeRangeInReverse(startTime, endTime) {
      assert(false);
    }
  }]);

  return BaseSynchronizer;
}();

export { BaseSynchronizer as default };
//# sourceMappingURL=base-synchronizer.js.map