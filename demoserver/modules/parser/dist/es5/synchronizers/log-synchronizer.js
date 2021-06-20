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

var _assert = _interopRequireDefault(require("../utils/assert"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var LogSynchronizer = function (_BaseSynchronizer) {
  (0, _inherits2["default"])(LogSynchronizer, _BaseSynchronizer);

  var _super = _createSuper(LogSynchronizer);

  function LogSynchronizer() {
    var _this;

    var logs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var opts = arguments.length > 1 ? arguments[1] : undefined;
    (0, _classCallCheck2["default"])(this, LogSynchronizer);
    _this = _super.call(this, opts);
    _this.logs = {};

    for (var logName in logs) {
      var data = logs[logName];
      (0, _assert["default"])(Array.isArray(data) && data.length > 0, 'Invalid log data');

      var logStartTime = _this._getTimeFromObject(data[0]);

      _this.logs[logName] = {
        data: data,
        index: null,
        time: logStartTime
      };
    }

    return _this;
  }

  (0, _createClass2["default"])(LogSynchronizer, [{
    key: "_empty",
    value: function _empty() {
      return !this.logs || Object.keys(this.logs).length === 0;
    }
  }, {
    key: "_getTimeRangeInReverse",
    value: function _getTimeRangeInReverse(startTime, endTime) {
      var streams = {};

      for (var logName in this.logs) {
        var datum = this._lookupStreamDatum(logName, startTime, endTime);

        if (datum) {
          streams[logName] = datum;
        }
      }

      return {
        streams: [streams],
        links: []
      };
    }
  }, {
    key: "_lookupStreamDatum",
    value: function _lookupStreamDatum(logName, startTime, endTime) {
      var log = this.logs[logName];
      (0, _assert["default"])(log, 'Invalid log');

      if (endTime < log.time) {
        log.time = 0;
        log.index = null;
      }

      var startIndex = log.index || 0;
      var endIndex = null;
      var endTimestamp;
      log.index = null;

      for (var i = startIndex; i < log.data.length; ++i) {
        var timestamp = this._getTimeFromObject(log.data[i]);

        if (timestamp > startTime && timestamp <= endTime) {
          endIndex = i;
          endTimestamp = timestamp;
        } else if (timestamp > endTime) {
          break;
        }
      }

      if (endIndex === null) {
        return null;
      }

      log.index = endIndex;
      log.time = endTimestamp;
      return log.data[endIndex];
    }
  }, {
    key: "_getTimeFromObject",
    value: function _getTimeFromObject(object) {
      return object.time || object.attributes && object.attributes.transmission_time;
    }
  }]);
  return LogSynchronizer;
}(_baseSynchronizer["default"]);

exports["default"] = LogSynchronizer;
//# sourceMappingURL=log-synchronizer.js.map