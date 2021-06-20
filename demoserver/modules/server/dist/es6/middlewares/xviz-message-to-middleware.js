import { isXVIZMessage, XVIZData } from '@xviz/io';
export class XVIZMessageToMiddleware {
  constructor(middleware, options = {}) {
    this.middleware = middleware;
    this.options = options;
  }

  info(...msg) {
    const {
      logger
    } = this.options;

    if (logger && logger.info) {
      logger.info(...msg);
    }
  }

  onMessage(message) {
    if (isXVIZMessage(message.data)) {
      const xvizData = new XVIZData(message.data);
      this.callMiddleware(xvizData.type, xvizData);
      return true;
    }

    return false;
  }

  callMiddleware(xvizType, msg = {}) {
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
        const message = "Error: unknown XVIZ message type ".concat(xvizType);
        this.middleware.onError({
          type: 'xviz/error',
          data: {
            message
          }
        });
        break;
    }
  }

}
//# sourceMappingURL=xviz-message-to-middleware.js.map