"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZWebsocketSender = exports.WebsocketSink = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _io = require("@xviz/io");

var WebsocketSink = function () {
  function WebsocketSink(socket, options) {
    (0, _classCallCheck2["default"])(this, WebsocketSink);
    this.socket = socket;
    this.options = options;
  }

  (0, _createClass2["default"])(WebsocketSink, [{
    key: "writeSync",
    value: function writeSync(name, data) {
      var _this$options$compres = this.options.compress,
          compress = _this$options$compres === void 0 ? false : _this$options$compres;

      if (typeof data === 'string') {
        compress = true;
      }

      this.socket.send(data, {
        compress: compress
      });
    }
  }]);
  return WebsocketSink;
}();

exports.WebsocketSink = WebsocketSink;

var XVIZWebsocketSender = function () {
  function XVIZWebsocketSender(context, socket) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, XVIZWebsocketSender);
    this.context = context;
    this.socket = socket;
    this.sink = new WebsocketSink(socket, options);
    this.options = options;
    this.format = options.format;

    if (this.format === _io.XVIZ_FORMAT.OBJECT) {
      this.format = _io.XVIZ_FORMAT.BINARY_GLB;
    }

    this.writer = null;
    this.writerFormat = null;

    this._syncFormatWithWriter(this.format);
  }

  (0, _createClass2["default"])(XVIZWebsocketSender, [{
    key: "log",
    value: function log() {
      var logger = this.options.logger;
      logger.log.apply(logger, arguments);
    }
  }, {
    key: "_syncFormatWithWriter",
    value: function _syncFormatWithWriter(format) {
      if (format && (!this.writer || this.writerFormat !== format)) {
        this.writer = new _io.XVIZFormatWriter(this.sink, {
          format: format
        });
        this.writerFormat = format;
      }
    }
  }, {
    key: "_sendDataDirect",
    value: function _sendDataDirect(format, resp) {
      var sourceFormat = resp.format;

      if (format === sourceFormat && !resp.hasMessage()) {
        return true;
      }

      return false;
    }
  }, {
    key: "_getFormatOptions",
    value: function _getFormatOptions(msg) {
      if (!this.format) {
        if (msg.format === _io.XVIZ_FORMAT.OBJECT || !msg.hasMessage() && typeof msg.buffer !== 'string' && !msg.buffer.byteLength) {
          return _io.XVIZ_FORMAT.BINARY_GLB;
        }

        return msg.format;
      }

      return this.format;
    }
  }, {
    key: "onError",
    value: function onError(msg) {
      var response = JSON.stringify(msg.buffer);
      this.sink.writeSync('error', response);
    }
  }, {
    key: "onMetadata",
    value: function onMetadata(msg) {
      var format = this._getFormatOptions(msg);

      if (this._sendDataDirect(format, msg)) {
        this.sink.writeSync("1-frame", msg.buffer);
      } else {
        this._syncFormatWithWriter(format);

        this.writer.writeMetadata(msg);
      }
    }
  }, {
    key: "onStateUpdate",
    value: function onStateUpdate(msg) {
      var format = this._getFormatOptions(msg);

      if (this._sendDataDirect(format, msg)) {
        this.sink.writeSync('2-frame', msg.buffer);
      } else {
        this._syncFormatWithWriter(format);

        this.writer.writeMessage(0, msg);
      }
    }
  }, {
    key: "onTransformLogDone",
    value: function onTransformLogDone(msg) {
      var response = JSON.stringify(msg.buffer);
      this.sink.writeSync('done', response);
    }
  }]);
  return XVIZWebsocketSender;
}();

exports.XVIZWebsocketSender = XVIZWebsocketSender;
//# sourceMappingURL=xviz-websocket-sender.js.map