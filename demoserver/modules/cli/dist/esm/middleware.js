import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
export var XVIZMiddlewareStack = function () {
  function XVIZMiddlewareStack(middlewares) {
    _classCallCheck(this, XVIZMiddlewareStack);

    this.middlewares = middlewares;
  }

  _createClass(XVIZMiddlewareStack, [{
    key: "onConnect",
    value: function onConnect() {
      this.middlewareDispatch('onConnect');
    }
  }, {
    key: "onStart",
    value: function onStart(msg) {
      this.middlewareDispatch('onStart', msg);
    }
  }, {
    key: "onError",
    value: function onError(msg) {
      this.middlewareDispatch('onError', msg);
    }
  }, {
    key: "onMetadata",
    value: function onMetadata(msg) {
      this.middlewareDispatch('onMetadata', msg);
    }
  }, {
    key: "onTransformLog",
    value: function onTransformLog(msg) {
      this.middlewareDispatch('onTransformLog', msg);
    }
  }, {
    key: "onStateUpdate",
    value: function onStateUpdate(msg) {
      this.middlewareDispatch('onStateUpdate', msg);
    }
  }, {
    key: "onTransformLogDone",
    value: function onTransformLogDone(msg) {
      this.middlewareDispatch('onTransformLogDone', msg);
    }
  }, {
    key: "onClose",
    value: function onClose() {
      this.middlewareDispatch('onClose');
    }
  }, {
    key: "middlewareDispatch",
    value: function middlewareDispatch(name, msg) {
      var arrayLength = this.middlewares.length;

      for (var i = 0; i < arrayLength; i++) {
        var middleware = this.middlewares[i];
        var handler = middleware[name];

        if (handler) {
          var args = [];

          if (msg) {
            args = [msg];
          }

          handler.apply(middleware, args);
        }
      }
    }
  }]);

  return XVIZMiddlewareStack;
}();
//# sourceMappingURL=middleware.js.map