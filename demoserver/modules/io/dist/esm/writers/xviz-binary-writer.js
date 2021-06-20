import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { XVIZBaseWriter } from './xviz-base-writer';
import { GLTFBuilder } from '../gltf/gltf-builder';
import { packBinaryJson } from './xviz-pack-binary';
import { XVIZEnvelope, XVIZ_GLTF_EXTENSION } from '@xviz/io';

function toBuffer(binaryData) {
  if (ArrayBuffer.isView(binaryData)) {
    binaryData = binaryData.buffer;
  }

  if (typeof Buffer !== 'undefined' && binaryData instanceof ArrayBuffer) {
    var buffer = new Buffer(binaryData.byteLength);
    var view = new Uint8Array(binaryData);

    for (var i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
    }

    return buffer;
  }

  throw new Error('Failed to convert to buffer');
}

var messageName = function messageName(index) {
  return "".concat(index + 2, "-frame");
};

export function encodeBinaryXVIZ(xvizJson, options) {
  var gltfBuilder = new GLTFBuilder(options);
  var packedData = packBinaryJson(xvizJson, gltfBuilder, null, options);
  var useAVSXVIZExtension = options.useAVSXVIZExtension;

  if (useAVSXVIZExtension === true) {
    gltfBuilder.addExtension(XVIZ_GLTF_EXTENSION, packedData, {
      nopack: true
    });
  } else {
    gltfBuilder.addApplicationData('xviz', packedData, {
      nopack: true
    });
  }

  return gltfBuilder.encodeAsGLB(options);
}
export var XVIZBinaryWriter = function (_XVIZBaseWriter) {
  _inherits(XVIZBinaryWriter, _XVIZBaseWriter);

  var _super = _createSuper(XVIZBinaryWriter);

  function XVIZBinaryWriter(sink) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, XVIZBinaryWriter);

    _this = _super.call(this, sink);
    var _options$envelope = options.envelope,
        envelope = _options$envelope === void 0 ? true : _options$envelope,
        _options$flattenArray = options.flattenArrays,
        flattenArrays = _options$flattenArray === void 0 ? true : _options$flattenArray,
        DracoWriter = options.DracoWriter,
        DracoLoader = options.DracoLoader;
    _this.messageTimings = {
      messages: new Map()
    };
    _this.wroteMessageIndex = null;
    _this.options = {
      envelope: envelope,
      flattenArrays: flattenArrays,
      DracoWriter: DracoWriter,
      DracoLoader: DracoLoader
    };
    _this.encodingOptions = {
      flattenArrays: _this.options.flattenArrays
    };

    if (_this.options.DracoWriter) {
      _this.encodingOptions.DracoWriter = DracoWriter;
    }

    if (_this.options.DracoLoader) {
      _this.encodingOptions.DracoLoader = DracoLoader;
    }

    return _this;
  }

  _createClass(XVIZBinaryWriter, [{
    key: "writeMetadata",
    value: function writeMetadata(xvizMetadata) {
      this._checkValid();

      this._saveTimestamp(xvizMetadata);

      if (this.options.envelope) {
        xvizMetadata = XVIZEnvelope.Metadata(xvizMetadata);
      }

      var glbFileBuffer = encodeBinaryXVIZ(xvizMetadata, this.encodingOptions);
      this.sink.writeSync("1-frame.glb", toBuffer(glbFileBuffer), {
        flag: 'w'
      });
    }
  }, {
    key: "writeMessage",
    value: function writeMessage(messageIndex, xvizMessage) {
      this._checkValid();

      this._saveTimestamp(xvizMessage, messageIndex);

      if (this.options.envelope) {
        xvizMessage = XVIZEnvelope.StateUpdate(xvizMessage);
      }

      var glbFileBuffer = encodeBinaryXVIZ(xvizMessage, this.encodingOptions);
      this.sink.writeSync("".concat(messageName(messageIndex), ".glb"), toBuffer(glbFileBuffer), {
        flag: 'w'
      });
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
      this.sink.writeSync('0-frame.json', JSON.stringify(messageTimings));
      this.wroteMessageIndex = timing.length;
    }
  }, {
    key: "close",
    value: function close() {
      if (this.sink) {
        if (!this.wroteMessageIndex) {
          this._writeMessageIndex();
        }

        _get(_getPrototypeOf(XVIZBinaryWriter.prototype), "close", this).call(this);
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
  }]);

  return XVIZBinaryWriter;
}(XVIZBaseWriter);
//# sourceMappingURL=xviz-binary-writer.js.map