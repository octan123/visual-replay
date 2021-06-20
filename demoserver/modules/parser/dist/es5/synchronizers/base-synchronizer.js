"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _xvizConfig = require("../config/xviz-config");

var _stats = _interopRequireDefault(require("../utils/stats"));

var _logSlice = _interopRequireDefault(require("./log-slice"));

var _memoize = _interopRequireDefault(require("../utils/memoize"));

var _assert = _interopRequireDefault(require("../utils/assert"));

var getCurrentLogSliceMemoized = (0, _memoize["default"])(function (streamFilter, lookAheadMs, linksByReverseTime) {
  _stats["default"].get('getCurrentLogSliceMemoized').incrementCount();

  for (var _len = arguments.length, streamsByReverseTime = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    streamsByReverseTime[_key - 3] = arguments[_key];
  }

  return new _logSlice["default"](streamFilter, lookAheadMs, linksByReverseTime, streamsByReverseTime);
});
var getCurrentFrameMemoized = (0, _memoize["default"])(function (logSlice, vehiclePose, trackedObjectId, postProcessFrame) {
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
    (0, _classCallCheck2["default"])(this, BaseSynchronizer);
    this.opts = opts;
    this.time = 0;
    this.lookAheadMs = 0;
  }

  (0, _createClass2["default"])(BaseSynchronizer, [{
    key: "getCurrentFrame",
    value: function getCurrentFrame(streamFilter, trackedObjectId) {
      _stats["default"].get('getCurrentFrame').incrementCount();

      var logSlice = this.getLogSlice(streamFilter);

      if (!logSlice) {
        return null;
      }

      var _getXVIZConfig = (0, _xvizConfig.getXVIZConfig)(),
          PRIMARY_POSE_STREAM = _getXVIZConfig.PRIMARY_POSE_STREAM,
          ALLOW_MISSING_PRIMARY_POSE = _getXVIZConfig.ALLOW_MISSING_PRIMARY_POSE;

      var defaultPose = ALLOW_MISSING_PRIMARY_POSE ? EMPTY_VEHICLE_POSE : null;
      var vehiclePose = logSlice.getStream(PRIMARY_POSE_STREAM, defaultPose);

      if (vehiclePose !== this._lastVehiclePose) {
        _stats["default"].get('vehiclePose').incrementCount();

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
      (0, _assert["default"])(Number.isFinite(this.time), 'Invalid time');
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

      var _getXVIZConfig2 = (0, _xvizConfig.getXVIZConfig)(),
          TIME_WINDOW = _getXVIZConfig2.TIME_WINDOW;

      var _this$_getTimeRangeIn = this._getTimeRangeInReverse(this.time - TIME_WINDOW, this.time),
          streams = _this$_getTimeRangeIn.streams,
          links = _this$_getTimeRangeIn.links;

      this._streamsByReverseTime = streams;
      this._linksByReverseTime = links;

      _stats["default"].get('geometry-refresh').incrementCount();

      return getCurrentLogSliceMemoized.apply(void 0, [streamFilter, this.lookAheadMs, this._linksByReverseTime].concat((0, _toConsumableArray2["default"])(this._streamsByReverseTime)));
    }
  }, {
    key: "empty",
    value: function empty() {
      (0, _assert["default"])(false);
    }
  }, {
    key: "_getTimeRangeInReverse",
    value: function _getTimeRangeInReverse(startTime, endTime) {
      (0, _assert["default"])(false);
    }
  }]);
  return BaseSynchronizer;
}();

exports["default"] = BaseSynchronizer;
//# sourceMappingURL=base-synchronizer.js.map