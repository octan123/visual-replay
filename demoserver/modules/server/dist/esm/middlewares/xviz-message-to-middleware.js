import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { isXVIZMessage, XVIZData } from '@xviz/io';
export var XVIZMessageToMiddleware = function () {
  function XVIZMessageToMiddleware(middleware) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, XVIZMessageToMiddleware);

    this.middleware = middleware;
    this.options = options;
  }

  _createClass(XVIZMessageToMiddleware, [{
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
      if (isXVIZMessage(message.data)) {
        var xvizData = new XVIZData(message.data);
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
//# sourceMappingURL=xviz-message-to-middleware.js.map