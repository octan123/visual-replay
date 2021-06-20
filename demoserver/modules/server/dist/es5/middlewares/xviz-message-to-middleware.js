"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZMessageToMiddleware = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _io = require("@xviz/io");

var XVIZMessageToMiddleware = function () {
  function XVIZMessageToMiddleware(middleware) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, XVIZMessageToMiddleware);
    this.middleware = middleware;
    this.options = options;
  }

  (0, _createClass2["default"])(XVIZMessageToMiddleware, [{
    key: "info",
    value: function info() {
      var logger = this.options.logger;

      if (logger && logger.info) {
        logger.info.apply(logger, arguments);
      }
    }
  }, {
    key: "onMessage",
    value: function onMessage(message) {
      if ((0, _io.isXVIZMessage)(message.data)) {
        var xvizData = new _io.XVIZData(message.data);
        this.callMiddleware(xvizData.type, xvizData);
        return true;
      }

      return false;
    }
  }, {
    key: "callMiddleware",
    value: function callMiddleware(xvizType) {
      var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.info("[> ".concat(xvizType.toUpperCase(), "]"));

      switch (xvizType) {
        case 'connect':
          this.middleware.onConnect();
          break;

        case 'close':
          this.middleware.onClose();
          break;

        case 'start':
          this.middleware.onStart(msg);
          break;

        case 'metadata':
          this.middleware.onMetadata(msg);
          break;

        case 'state_update':
          this.middleware.onStateUpdate(msg);
          break;

        case 'transform_log':
          this.middleware.onTransformLog(msg);
          break;

        case 'transform_done':
          this.middleware.onTransformLogDone(msg);
          break;

        case 'transform_point_in_time':
          this.middleware.onTransformPointInTime(msg);
          break;

        case 'reconfigure':
          this.middleware.onReconfigure(msg);
          break;

        case 'error':
          this.middleware.onError(msg);
          break;

        default:
          var message = "Error: unknown XVIZ message type ".concat(xvizType);
          this.middleware.onError({
            type: 'xviz/error',
            data: {
              message: message
            }
          });
          break;
      }
    }
  }]);
  return XVIZMessageToMiddleware;
}();

exports.XVIZMessageToMiddleware = XVIZMessageToMiddleware;
//# sourceMappingURL=xviz-message-to-middleware.js.map