import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { XVIZData } from '@xviz/io';
export var XVIZServerMiddlewareStack = function () {
  function XVIZServerMiddlewareStack(middlewares) {
    _classCallCheck(this, XVIZServerMiddlewareStack);

    this.middlewares = middlewares;
  }

  _createClass(XVIZServerMiddlewareStack, [{
    key: "set",
    value: function set(middlewares) {
      this.middlewares = middlewares;
    }
  }, {
    key: "onClose",
    value: function onClose() {
      this.middlewareDispatch('onClose');
    }
  }, {
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
    key: "onTransformLog",
    value: function onTransformLog(msg) {
      this.middlewareDispatch('onTransformLog', msg);
    }
  }, {
    key: "onTransformPointInTime",
    value: function onTransformPointInTime(msg) {
      this.middlewareDispatch('onTransformPointInTime', msg);
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
    key: "onReconfigure",
    value: function onReconfigure(msg) {
      this.middlewareDispatch('onReconfigure', msg);
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

          if (msg && !(msg instanceof XVIZData)) {
            msg = new XVIZData(msg);
          }

          args = [msg];
          var nextMiddleware = handler.apply(middleware, args);

          if (nextMiddleware === false) {
            break;
          }
        }
      }
    }
  }]);

  return XVIZServerMiddlewareStack;
}();
//# sourceMappingURL=xviz-server-middleware-stack.js.map