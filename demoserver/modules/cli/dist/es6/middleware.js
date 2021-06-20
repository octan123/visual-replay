export class XVIZMiddlewareStack {
  constructor(middlewares) {
    this.middlewares = middlewares;
  }

  onConnect() {
    this.middlewareDispatch('onConnect');
  }

  onStart(msg) {
    this.middlewareDispatch('onStart', msg);
  }

  onError(msg) {
    this.middlewareDispatch('onError', msg);
  }

  onMetadata(msg) {
    this.middlewareDispatch('onMetadata', msg);
  }

  onTransformLog(msg) {
    this.middlewareDispatch('onTransformLog', msg);
  }

  onStateUpdate(msg) {
    this.middlewareDispatch('onStateUpdate', msg);
  }

  onTransformLogDone(msg) {
    this.middlewareDispatch('onTransformLogDone', msg);
  }

  onClose() {
    this.middlewareDispatch('onClose');
  }

  middlewareDispatch(name, msg) {
    const arrayLength = this.middlewares.length;

    for (let i = 0; i < arrayLength; i++) {
      const middleware = this.middlewares[i];
      const handler = middleware[name];

      if (handler) {
        let args = [];

        if (msg) {
          args = [msg];
        }

        handler.apply(middleware, args);
      }
    }
  }

}
//# sourceMappingURL=middleware.js.map