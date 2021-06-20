import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import BaseSynchronizer from './base-synchronizer';

var StreamSynchronizer = function (_BaseSynchronizer) {
  _inherits(StreamSynchronizer, _BaseSynchronizer);

  var _super = _createSuper(StreamSynchronizer);

  function StreamSynchronizer(streamBuffer, opts) {
    var _this;

    _classCallCheck(this, StreamSynchronizer);

    _this = _super.call(this, opts);
    _this.streamBuffer = streamBuffer;
    return _this;
  }

  _createClass(StreamSynchronizer, [{
    key: "_empty",
    value: function _empty() {
      return !this.streamBuffer || !this.streamBuffer.size;
    }
  }, {
    key: "_getTimeRangeInReverse",
    value: function _getTimeRangeInReverse(startTime, endTime) {
      var slices = this.streamBuffer.getTimeslices({
        start: startTime,
        end: endTime
      }).reverse();
      return {
        streams: slices.map(function (timeslice) {
          return timeslice.streams;
        }).filter(Boolean),
        links: slices.map(function (timeslice) {
          return timeslice.links;
        }).filter(Boolean)
      };
    }
  }]);

  return StreamSynchronizer;
}(BaseSynchronizer);

export { StreamSynchronizer as default };
//# sourceMappingURL=stream-synchronizer.js.map