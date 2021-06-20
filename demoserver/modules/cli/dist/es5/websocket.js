"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebSocketInterface = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _io = require("@xviz/io");

var WebSocketInterface = function () {
  function WebSocketInterface() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, WebSocketInterface);
    this.middleware = options.middleware;
    this.start = options.start;
    this.socket = options.socket;
    this.unknownMessageTypes = new Set([]);

    this.socket.onerror = function (error) {
      console.log('WebSocket Error: ', error);
    };

    this.socket.onclose = function () {
      _this.onClose();
    };

    this.socket.onopen = function () {
      _this.onConnect();
    };

    this.socket.onmessage = function (message) {
      _this.onMessage(message);
    };
  }

  (0, _createClass2["default"])(WebSocketInterface, [{
    key: "close",
    value: function close() {
      this.socket.close();
    }
  }, {
    key: "onConnect",
    value: function onConnect() {
      this.middleware.onConnect();

      if (this.start) {
        this.sendMessage('start', this.start);
      } else {
        this.middleware.onStart(null);
      }
    }
  }, {
    key: "onError",
    value: function onError(error) {
      console.log('Connection Error: ', error.toString());
    }
  }, {
    key: "onClose",
    value: function onClose(message) {
      this.middleware.onClose();
    }
  }, {
    key: "onMessage",
    value: function onMessage(message) {
      if (typeof message.data !== 'string') {
        if ((0, _io.isBinaryXVIZ)(message.data)) {
          var parsed = (0, _io.parseBinaryXVIZ)(message.data);
          this.processMessage(parsed);
        } else {
          var utf8decoder = new TextDecoder();

          var _parsed = JSON.parse(utf8decoder.decode(message.data));

          this.processMessage(_parsed);
        }
      } else {
        var _parsed2 = JSON.parse(message.data);

        this.processMessage(_parsed2);
      }
    }
  }, {
    key: "processMessage",
    value: function processMessage(parsed) {
      if ((0, _io.isEnvelope)(parsed)) {
        var unpacked = (0, _io.unpackEnvelope)(parsed);

        if (unpacked.namespace === 'xviz') {
          this.callMiddleware(unpacked.type, unpacked.data);
        } else if (!this.unknownMessageTypes.has(parsed.type)) {
          this.unknownMessageTypes.add(parsed.type);
          console.log("Unknown message namespace: \"".concat(unpacked.namespace, "\" type: \"").concat(unpacked.type, "\""));
        }
      } else {
        console.log('Unknown message format', parsed);
      }
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(msgType, data) {
      this.callMiddleware(msgType, data);
      var enveloped = {
        type: "xviz/".concat(msgType),
        data: data
      };
      this.socket.send(JSON.stringify(enveloped));
    }
  }, {
    key: "callMiddleware",
    value: function callMiddleware(xvizType, data) {
      switch (xvizType) {
        case 'start':
          this.middleware.onStart(data);
          break;

        case 'error':
          this.middleware.onError(data);
          break;

        case 'metadata':
          this.middleware.onMetadata(data);
          break;

        case 'transform_log':
          this.middleware.onTransformLog(data);
          break;

        case 'state_update':
          this.middleware.onStateUpdate(data);
          break;

        case 'transform_log_done':
          this.middleware.onTransformLogDone(data);
          break;

        default:
          console.log('UNKNOWN XVIZ', xvizType, data);
          break;
      }
    }
  }]);
  return WebSocketInterface;
}();

exports.WebSocketInterface = WebSocketInterface;
//# sourceMappingURL=websocket.js.map