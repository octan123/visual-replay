import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { XVIZProviderRequestHandler } from '../middlewares/xviz-provider-request-handler';
import { XVIZWebsocketSender } from '../middlewares/xviz-websocket-sender';
import { XVIZMessageToMiddleware } from '../middlewares/xviz-message-to-middleware';
import { XVIZServerMiddlewareStack } from '../middlewares/xviz-server-middleware-stack';
import { XVIZSessionContext } from '../middlewares/xviz-session-context';
export class XVIZProviderSession {
  constructor(socket, request, provider, options) {
    this.socket = socket;
    this.request = request;
    this.provider = provider;
    this.options = options;
    this.middleware = null;
    this.context = new XVIZSessionContext();

    if (options.id) {
      this.context.set('id', options.id);
    }

    this._setupSocket();

    this._setupMiddleware();

    this.handler = new XVIZMessageToMiddleware(this.middleware);
  }

  log(msg, ...args) {
    const {
      logger
    } = this.options;

    if (logger && logger.log) {
      logger.log("".concat(msg), ...args);
    }
  }

  info(...msg) {
    const {
      logger
    } = this.options;

    if (logger && logger.info) {
      logger.info(...msg);
    }
  }

  _setupSocket() {
    this.socket.onerror = err => {
      this._onSocketError(err);
    };

    this.socket.onclose = event => {
      this._onSocketClose(event);
    };

    this.socket.onopen = () => {
      this._onSocketOpen();
    };

    this.socket.onmessage = message => {
      this._onSocketMessage(message);
    };
  }

  _setupMiddleware() {
    this.middleware = new XVIZServerMiddlewareStack();
    const stack = [new XVIZProviderRequestHandler(this.context, this.provider, this.middleware, this.options), new XVIZWebsocketSender(this.context, this.socket, this.options)];
    this.middleware.set(stack);
  }

  _onSocketOpen() {
    this.log('[> Socket] Open');
  }

  _onSocketError(error) {
    this.log('[> Socket] Error: ', error.toString());
  }

  _onSocketClose(event) {
    this.log("[> Socket] Close: Code ".concat(event.code, " Reason: ").concat(event.reason));
  }

  _onSocketMessage(message) {
    if (!this.handler.onMessage(message)) {
      this.log('[> Socket] Unknown message: ', JSON.stringify(message, null, 2).slice(0, 100));
    }
  }

  onConnect() {
    this.log('[> Connection] made');
    const params = this.request.params;
    this.handler.callMiddleware('start', params);

    if (params.session_type === 'live') {
      this.handler.callMiddleware('transform_log', _objectSpread({
        id: 'live'
      }, params));
    }
  }

}
//# sourceMappingURL=xviz-provider-session.js.map