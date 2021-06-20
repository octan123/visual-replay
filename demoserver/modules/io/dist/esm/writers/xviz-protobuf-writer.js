import _typeof from "@babel/runtime/helpers/esm/typeof";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { XVIZBaseWriter } from './xviz-base-writer';
import { XVIZ_PROTOBUF_MAGIC, XVIZ_PROTOBUF_MESSAGE } from '../common/protobuf-support';

var messageName = function messageName(index) {
  return "".concat(index + 2, "-frame");
};

export var XVIZProtobufWriter = function (_XVIZBaseWriter) {
  _inherits(XVIZProtobufWriter, _XVIZBaseWriter);

  var _super = _createSuper(XVIZProtobufWriter);

  function XVIZProtobufWriter(sink) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, XVIZProtobufWriter);

    _this = _super.call(this, sink);
    var _options$envelope = options.envelope,
        envelope = _options$envelope === void 0 ? true : _options$envelope;
    _this.messageTimings = {
      messages: new Map()
    };
    _this.wroteMessageIndex = null;
    _this.options = {
      envelope: envelope
    };
    return _this;
  }

  _createClass(XVIZProtobufWriter, [{
    key: "writeMetadata",
    value: function writeMetadata(xvizMetadata) {
      this._checkValid();

      this._saveTimestamp(xvizMetadata);

      var pbJSON = xvizConvertProtobuf(xvizMetadata);
      var pbInfo = {
        type: XVIZ_PROTOBUF_MESSAGE.Metadata,
        msg: XVIZ_PROTOBUF_MESSAGE.Metadata.fromObject(pbJSON)
      };

      if (this.options.envelope) {
        this._applyEnvelope(pbInfo);
      }

      var pbBuffer = pbInfo.type.encode(pbInfo.msg).finish();
      var buffer = new Uint8Array(pbBuffer.byteLength + 4);
      buffer.set(XVIZ_PROTOBUF_MAGIC, 0);
      buffer.set(pbBuffer, 4);
      this.writeToSink('1-frame.pbe', buffer);
    }
  }, {
    key: "writeMessage",
    value: function writeMessage(messageIndex, xvizMessage) {
      this._checkValid();

      this._saveTimestamp(xvizMessage, messageIndex);

      var pbJSON = xvizConvertProtobuf(xvizMessage);
      var pbInfo = {
        type: XVIZ_PROTOBUF_MESSAGE.StateUpdate,
        msg: XVIZ_PROTOBUF_MESSAGE.StateUpdate.fromObject(pbJSON)
      };

      if (this.options.envelope) {
        this._applyEnvelope(pbInfo);
      }

      var pbBuffer = pbInfo.type.encode(pbInfo.msg).finish();
      var buffer = new Uint8Array(pbBuffer.byteLength + 4);
      buffer.set(XVIZ_PROTOBUF_MAGIC, 0);
      buffer.set(pbBuffer, 4);
      this.writeToSink("".concat(messageName(messageIndex), ".pbe"), buffer);
    }
  }, {
    key: "_applyEnvelope",
    value: function _applyEnvelope(info) {
      if (info.type === XVIZ_PROTOBUF_MESSAGE.Metadata) {
        var value = info.type.encode(info.msg).finish();
        info.type = XVIZ_PROTOBUF_MESSAGE.Envelope;
        info.msg = info.type.fromObject({
          type: 'xviz/metadata',
          data: {
            type_url: 'xviz.v2.Metadata',
            value: value
          }
        });
      } else if (info.type === XVIZ_PROTOBUF_MESSAGE.StateUpdate) {
        var _value = info.type.encode(info.msg).finish();

        info.type = XVIZ_PROTOBUF_MESSAGE.Envelope;
        info.msg = info.type.fromObject({
          type: 'xviz/state_update',
          data: {
            type_url: 'xviz.v2.StateUpdate',
            value: _value
          }
        });
      }
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

        _get(_getPrototypeOf(XVIZProtobufWriter.prototype), "close", this).call(this);
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
      this.sink.writeSync(name, msg);
    }
  }]);

  return XVIZProtobufWriter;
}(XVIZBaseWriter);
var COLOR_KEYS = ['stroke_color', 'fill_color'];

function toColorArray(object) {
  var clrs = object.substring(1);
  var len = clrs.length;

  if (!(len === 3 || len === 4 || len === 6 || len === 8)) {
    return null;
  }

  var color = [];
  var step = clrs.length === 3 || clrs.length === 4 ? 1 : 2;

  for (var i = 0; i < clrs.length; i += step) {
    color.push(parseInt(clrs.substr(i, step), 16));
  }

  return color;
}

export function xvizConvertProtobuf(object, keyName) {
  if (Array.isArray(object)) {
    if (!(keyName === 'vertices' || keyName === 'points' || keyName === 'colors')) {
      return object.map(function (element) {
        return xvizConvertProtobuf(element, keyName);
      });
    }

    if (Array.isArray(object[0])) {
      var flat = [];
      object.forEach(function (el) {
        return flat.push.apply(flat, _toConsumableArray(el));
      });
      return flat;
    } else if (ArrayBuffer.isView(object[0])) {
      var _flat = [];
      object.forEach(function (el) {
        return _flat.push.apply(_flat, _toConsumableArray(Array.from(el)));
      });
      return _flat;
    } else if (Number.isFinite(object[0])) {
      return object;
    } else if (_typeof(object[0]) === 'object') {
      return object.map(function (element) {
        return xvizConvertProtobuf(element, keyName);
      });
    }
  }

  if (ArrayBuffer.isView(object)) {
    return Array.from(object);
  }

  if (COLOR_KEYS.includes(keyName)) {
    if (typeof object === 'string' && object.match(/^#([0-9a-f]{3,4})|([0-9a-f]{6,8})$/i)) {
      return toColorArray(object);
    }
  }

  if (object !== null && _typeof(object) === 'object') {
    var properties = Object.keys(object);

    if (properties.includes('data') && keyName === 'images') {
      return object;
    }

    var newObject = {};
    var objectKeys = Object.keys(object);

    for (var _i = 0, _objectKeys = objectKeys; _i < _objectKeys.length; _i++) {
      var key = _objectKeys[_i];
      newObject[key] = xvizConvertProtobuf(object[key], key);
    }

    return newObject;
  }

  return object;
}
//# sourceMappingURL=xviz-protobuf-writer.js.map