import { XVIZData } from '@xviz/io';
export class XVIZServerMiddlewareStack {
  constructor(middlewares) {
    this.middlewares = middlewares;
  }

  set(middlewares) {
    this.middlewares = middlewares;
  }

  onClose() {
    this.middlewareDispatch('onClose');
  }

  onConnect() {
    this.middlewareDispatch('onConnect');
  }

  onStart(msg) {
    this.middlewareDispatch('onStart', msg);
  }

  onTransformLog(msg) {
    this.middlewareDispatch('onTransformLog', msg);
  }

  onTransformPointInTime(msg) {
    this.middlewareDispatch('onTransformPointInTime', msg);
  }

  onError(msg) {
    this.middlewareDispatch('onError', msg);
  }

  onMetadata(msg) {
    this.middlewareDispatch('onMetadata', msg);
  }

  onStateUpdate(msg) {
    this.middlewareDispatch('onStateUpdate', msg);
  }

  onTransformLogDone(msg) {
    this.middlewareDispatch('onTransformLogDone', msg);
  }

  onReconfigure(msg) {
    this.middlewareDispatch('onReconfigure', msg);
  }

  middlewareDispatch(name, msg) {
    const arrayLength = this.middlewares.length;

    for (let i = 0; i < arrayLength; i++) {
      const middleware = this.middlewares[i];
      const handler = middleware[name];

      if (handler) {
        let args = [];

        if (msg && !(msg instanceof XVIZData)) {
          msg = new XVIZData(msg);
        }

        args = [msg];
        const nextMiddleware = handler.apply(middleware, args);

        if (nextMiddleware === false) {
          break;
        }
      }
    }
  }

}
//# sourceMappingURL=xviz-server-middleware-stack.js.map