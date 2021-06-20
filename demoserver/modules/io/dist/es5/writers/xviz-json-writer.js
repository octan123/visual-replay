"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZJSONWriter = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _xvizBaseWriter = require("./xviz-base-writer");

var _xvizJsonEncoder = require("./xviz-json-encoder");

var _textEncoding = require("../common/text-encoding");

var _io = require("@xviz/io");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var messageName = function messageName(index) {
  return "".concat(index + 2, "-frame");
};

var XVIZJSONWriter = function (_XVIZBaseWriter) {
  (0, _inherits2["default"])(XVIZJSONWriter, _XVIZBaseWriter);

  var _super = _createSuper(XVIZJSONWriter);

  function XVIZJSONWriter(sink) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, XVIZJSONWriter);
    _this = _super.call(this, sink);
    var _options$envelope = options.envelope,
        envelope = _options$envelope === void 0 ? true : _options$envelope,
        _options$precision = options.precision,
        precision = _options$precision === void 0 ? 10 : _options$precision,
        _options$asArrayBuffe = options.asArrayBuffer,
        asArrayBuffer = _options$asArrayBuffe === void 0 ? false : _options$asArrayBuffe;
    _this.messageTimings = {
      messages: new Map()
    };
    _this.wroteMessageIndex = null;
    _this.options = {
      envelope: envelope,
      precision: precision,
      asArrayBuffer: asArrayBuffer
    };
    return _this;
  }

  (0, _createClass2["default"])(XVIZJSONWriter, [{
    key: "writeMetadata",
    value: function writeMetadata(xvizMetadata) {
      this._checkValid();

      this._saveTimestamp(xvizMetadata);

      if (this.options.envelope) {
        xvizMetadata = _io.XVIZEnvelope.Metadata(xvizMetadata);
      }

      var msg = JSON.stringify(xvizMetadata);
      this.writeToSink('1-frame.json', msg);
    }
  }, {
    key: "writeMessage",
    value: function writeMessage(messageIndex, xvizMessage) {
      var _this2 = this;

      this._checkValid();

      this._saveTimestamp(xvizMessage, messageIndex);

      if (this.options.envelope) {
        xvizMessage = _io.XVIZEnvelope.StateUpdate(xvizMessage);
      }

      var numberRounder = function numberRounder(k, value) {
        if (typeof value === 'number') {
          return Number(value.toFixed(_this2.options.precision));
        }

        return value;
      };

      var jsonXVIZMessage = (0, _xvizJsonEncoder.xvizConvertJson)(xvizMessage);
      var msg = JSON.stringify(jsonXVIZMessage, numberRounder);
      this.writeToSink("".concat(messageName(messageIndex), ".json"), msg);
    }
  }, {
    key: "_writeMessageIndex",
    value: function _writeMessageIndex() {
      this._checkValid();

      var _this$messageTimings = this.messageTimings,
          startTime = _this$messageTimings.startTime,
          endTime = _this$messageTimings.endTime,
          messages = _this$messageTimings.messages;
      var messageTimings = {};

      if (startTime) {
        messageTimings.startTime = startTime;
      }

      if (endTime) {
        messageTimings.endTime = endTime;
      }

      var messageTimes = Array.from(messages.keys()).sort(function (a, b) {
        return a - b;
      });
      var timing = [];
      messageTimes.forEach(function (value, index) {
        var limit = timing.length;

        if (value > limit) {
          throw new Error("Error writing time index file. Messages are missing between ".concat(limit + 2, " and ").concat(value + 2));
        }

        timing.push(messages.get(value));
      });
      messageTimings.timing = timing;
      var msg = JSON.stringify(messageTimings);
      this.writeToSink('0-frame.json', msg);
      this.wroteMessageIndex = timing.length;
    }
  }, {
    key: "close",
    value: function close() {
      if (this.sink) {
        if (!this.wroteMessageIndex) {
          this._writeMessageIndex();
        }

        (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZJSONWriter.prototype), "close", this).call(this);
      }
    }
  }, {
    key: "_saveTimestamp",
    value: function _saveTimestamp(xviz_data, index) {
      var log_info = xviz_data.log_info,
          updates = xviz_data.updates;

      if (index === undefined) {
        if (log_info) {
          var _ref = log_info || {},
              start_time = _ref.start_time,
              end_time = _ref.end_time;

          if (start_time) {
            this.messageTimings.startTime = start_time;
          }

          if (end_time) {
            this.messageTimings.endTime = end_time;
          }
        }
      } else if (updates) {
        if (updates.length === 0 || !updates.every(function (update) {
          return typeof update.timestamp === 'number';
        })) {
          throw new Error('XVIZ updates did not contain a valid timestamp');
        }

        var min = Math.min(updates.map(function (update) {
          return update.timestamp;
        }));
        var max = Math.max(updates.map(function (update) {
          return update.timestamp;
        }));
        this.messageTimings.messages.set(index, [min, max, index, messageName(index)]);
      } else {
        throw new Error('Cannot find timestamp');
      }
    }
  }, {
    key: "writeToSink",
    value: function writeToSink(name, msg) {
      if (this.options.asArrayBuffer) {
        var encoder = new _textEncoding.TextEncoder();
        msg = encoder.encode(msg);
      }

      this.sink.writeSync(name, msg);
    }
  }]);
  return XVIZJSONWriter;
}(_xvizBaseWriter.XVIZBaseWriter);

exports.XVIZJSONWriter = XVIZJSONWriter;
//# sourceMappingURL=xviz-json-writer.js.map