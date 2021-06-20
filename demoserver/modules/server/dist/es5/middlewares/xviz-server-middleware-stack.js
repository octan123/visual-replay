"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZServerMiddlewareStack = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _io = require("@xviz/io");

var XVIZServerMiddlewareStack = function () {
  function XVIZServerMiddlewareStack(middlewares) {
    (0, _classCallCheck2["default"])(this, XVIZServerMiddlewareStack);
    this.middlewares = middlewares;
  }

  (0, _createClass2["default"])(XVIZServerMiddlewareStack, [{
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

          if (msg && !(msg instanceof _io.XVIZData)) {
            msg = new _io.XVIZData(msg);
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

exports.XVIZServerMiddlewareStack = XVIZServerMiddlewareStack;
//# sourceMappingURL=xviz-server-middleware-stack.js.map