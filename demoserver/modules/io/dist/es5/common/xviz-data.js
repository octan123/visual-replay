"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZData = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _loaders = require("./loaders");

var _xvizMessage = require("./xviz-message");

var _textEncoding = require("./text-encoding");

var _constants = require("./constants");

var XVIZData = function () {
  function XVIZData(data) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, XVIZData);
    this._data = data;
    this._opts = opts;
    this._dataFormat = undefined;
    this._xvizType = undefined;
    this._message = undefined;

    this._determineFormat();

    if (!this._dataFormat) {
      throw new Error('Unknown XVIZ data format');
    }
  }

  (0, _createClass2["default"])(XVIZData, [{
    key: "hasMessage",
    value: function hasMessage() {
      return this._message !== undefined;
    }
  }, {
    key: "message",
    value: function message() {
      var msg = null;

      if (this._message) {
        return this._message;
      }

      var data = this._data;

      switch (this._dataFormat) {
        case _constants.XVIZ_FORMAT.BINARY_GLB:
          if (data instanceof Buffer) {
            data = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
          }

          msg = (0, _loaders.parseBinaryXVIZ)(data);
          break;

        case _constants.XVIZ_FORMAT.BINARY_PBE:
          if (data instanceof Buffer) {
            data = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
          }

          msg = (0, _loaders.parseBinaryXVIZ)(data, this._opts);
          break;

        case _constants.XVIZ_FORMAT.JSON_BUFFER:
          var jsonString = null;

          if (data instanceof Buffer) {
            jsonString = data.toString();
          } else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
            data = new Uint8Array(data);
            jsonString = new _textEncoding.TextDecoder('utf8').decode(data);
          }

          msg = JSON.parse(jsonString);
          break;

        case _constants.XVIZ_FORMAT.JSON_STRING:
          msg = JSON.parse(data);
          break;

        case _constants.XVIZ_FORMAT.OBJECT:
          msg = data;
          break;

        default:
          throw new Error("Unsupported format ".concat(this._dataFormat));
      }

      var xvizMsg = new _xvizMessage.XVIZMessage(msg);

      if (xvizMsg.data) {
        this._message = xvizMsg;
        return this._message;
      }

      return null;
    }
  }, {
    key: "_determineFormat",
    value: function _determineFormat() {
      var messageFormat = this._opts.messageFormat;

      if (messageFormat) {
        this._dataFormat = messageFormat;
        return;
      }

      var data = this._data;

      switch ((0, _loaders.getDataContainer)(data)) {
        case 'binary':
          if (data instanceof Buffer) {
            data = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
          }

          if ((0, _loaders.isPBEXVIZ)(data)) {
            this._dataFormat = _constants.XVIZ_FORMAT.BINARY_PBE;
          } else if ((0, _loaders.isGLBXVIZ)(data)) {
            this._dataFormat = _constants.XVIZ_FORMAT.BINARY_GLB;
          } else {
            if (data instanceof ArrayBuffer) {
              data = new Uint8Array(data);
            }

            if ((0, _loaders.isJSONString)(data)) {
              this._dataFormat = _constants.XVIZ_FORMAT.JSON_BUFFER;
            }
          }

          break;

        case 'string':
          if ((0, _loaders.isJSONString)(data)) {
            this._dataFormat = _constants.XVIZ_FORMAT.JSON_STRING;
          }

          break;

        case 'object':
          this._dataFormat = _constants.XVIZ_FORMAT.OBJECT;
          break;

        default:
      }
    }
  }, {
    key: "buffer",
    get: function get() {
      return this._data;
    }
  }, {
    key: "format",
    get: function get() {
      return this._dataFormat;
    }
  }, {
    key: "type",
    get: function get() {
      if (this._message) {
        return this._message.type;
      } else if (!this._xvizType) {
        var rawType = this._opts.messageType || (0, _loaders.getXVIZMessageType)(this._data);

        if (rawType) {
          var parts = rawType.split('/');
          this._xvizType = {
            namespace: parts[0],
            type: parts[1]
          };
        }
      }

      return this._xvizType.type;
    }
  }]);
  return XVIZData;
}();

exports.XVIZData = XVIZData;
//# sourceMappingURL=xviz-data.js.map