"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _baseSynchronizer = _interopRequireDefault(require("./base-synchronizer"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var StreamSynchronizer = function (_BaseSynchronizer) {
  (0, _inherits2["default"])(StreamSynchronizer, _BaseSynchronizer);

  var _super = _createSuper(StreamSynchronizer);

  function StreamSynchronizer(streamBuffer, opts) {
    var _this;

    (0, _classCallCheck2["default"])(this, StreamSynchronizer);
    _this = _super.call(this, opts);
    _this.streamBuffer = streamBuffer;
    return _this;
  }

  (0, _createClass2["default"])(StreamSynchronizer, [{
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
}(_baseSynchronizer["default"]);

exports["default"] = StreamSynchronizer;
//# sourceMappingURL=stream-synchronizer.js.map