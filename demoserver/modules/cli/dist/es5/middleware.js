"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZMiddlewareStack = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var XVIZMiddlewareStack = function () {
  function XVIZMiddlewareStack(middlewares) {
    (0, _classCallCheck2["default"])(this, XVIZMiddlewareStack);
    this.middlewares = middlewares;
  }

  (0, _createClass2["default"])(XVIZMiddlewareStack, [{
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

exports.XVIZMiddlewareStack = XVIZMiddlewareStack;
//# sourceMappingURL=middleware.js.map