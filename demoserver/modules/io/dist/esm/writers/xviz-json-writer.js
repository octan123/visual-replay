import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { XVIZBaseWriter } from './xviz-base-writer';
import { xvizConvertJson } from './xviz-json-encoder';
import { TextEncoder } from '../common/text-encoding';
import { XVIZEnvelope } from '@xviz/io';

var messageName = function messageName(index) {
  return "".concat(index + 2, "-frame");
};

export var XVIZJSONWriter = function (_XVIZBaseWriter) {
  _inherits(XVIZJSONWriter, _XVIZBaseWriter);

  var _super = _createSuper(XVIZJSONWriter);

  function XVIZJSONWriter(sink) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, XVIZJSONWriter);

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

  _createClass(XVIZJSONWriter, [{
    key: "writeMetadata",
    value: function writeMetadata(xvizMetadata) {
      this._checkValid();

      this._saveTimestamp(xvizMetadata);

      if (this.options.envelope) {
        xvizMetadata = XVIZEnvelope.Metadata(xvizMetadata);
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
        xvizMessage = XVIZEnvelope.StateUpdate(xvizMessage);
      }

      var numberRounder = function numberRounder(k, value) {
        if (typeof value === 'number') {
          return Number(value.toFixed(_this2.options.precision));
        }

        return value;
      };

      var jsonXVIZMessage = xvizConvertJson(xvizMessage);
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

        _get(_getPrototypeOf(XVIZJSONWriter.prototype), "close", this).call(this);
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
        var encoder = new TextEncoder();
        msg = encoder.encode(msg);
      }

      this.sink.writeSync(name, msg);
    }
  }]);

  return XVIZJSONWriter;
}(XVIZBaseWriter);
//# sourceMappingURL=xviz-json-writer.js.map