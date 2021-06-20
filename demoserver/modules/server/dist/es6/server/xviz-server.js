const URL = require('url').URL;

const WebSocket = require('ws');

function getRequestData(requestUrl) {
  const req = new URL(requestUrl, 'https://localhost');
  const params = {};

  for (const [k, v] of req.searchParams.entries()) {
    params[k] = v;
  }

  return {
    path: req.pathname,
    params
  };
}

const DEFAULT_OPTIONS = {
  port: 3000,
  perMessageDeflate: true,
  maxPayload: 64 * 1024 * 1024
};
export class XVIZServer {
  constructor(handlers, options, callback) {
    if (!handlers) {
      throw new Error('Must specify a handler for messages');
    }

    this.handlers = handlers;
    this.options = Object.assign(DEFAULT_OPTIONS, options);
    this._server = new WebSocket.Server(this.options, callback);
    this.server.on('connection', (socket, request) => this.handleSession(socket, request));
  }

  get server() {
    return this._server;
  }

  close(cb) {
    this._server.close(cb);
  }

  async handleSession(socket, request) {
    this.log("[> Connection] created: ".concat(request.url));
    const req = getRequestData(request.url);

    for (const handler of this.handlers) {
      const session = await handler.newSession(socket, req);

      if (session) {
        session.onConnect();
        return;
      }
    }

    socket.close();
    this.log('[> Connection] closed due to no handler found');
  }

  log(...msg) {
    const {
      logger
    } = this.options;

    if (logger && logger.log) {
      logger.log(...msg);
    }
  }

}
//# sourceMappingURL=xviz-server.js.map