"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZProviderSession = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _xvizProviderRequestHandler = require("../middlewares/xviz-provider-request-handler");

var _xvizWebsocketSender = require("../middlewares/xviz-websocket-sender");

var _xvizMessageToMiddleware = require("../middlewares/xviz-message-to-middleware");

var _xvizServerMiddlewareStack = require("../middlewares/xviz-server-middleware-stack");

var _xvizSessionContext = require("../middlewares/xviz-session-context");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var XVIZProviderSession = function () {
  function XVIZProviderSession(socket, request, provider, options) {
    (0, _classCallCheck2["default"])(this, XVIZProviderSession);
    this.socket = socket;
    this.request = request;
    this.provider = provider;
    this.options = options;
    this.middleware = null;
    this.context = new _xvizSessionContext.XVIZSessionContext();

    if (options.id) {
      this.context.set('id', options.id);
    }

    this._setupSocket();

    this._setupMiddleware();

    this.handler = new _xvizMessageToMiddleware.XVIZMessageToMiddleware(this.middleware);
  }

  (0, _createClass2["default"])(XVIZProviderSession, [{
    key: "log",
    value: function log(msg) {
      var logger = this.options.logger;

      if (logger && logger.log) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        logger.log.apply(logger, ["".concat(msg)].concat(args));
      }
    }
  }, {
    key: "info",
    value: function info() {
      var logger = this.options.logger;

      if (logger && logger.info) {
        logger.info.apply(logger, arguments);
      }
    }
  }, {
    key: "_setupSocket",
    value: function _setupSocket() {
      var _this = this;

      this.socket.onerror = function (err) {
        _this._onSocketError(err);
      };

      this.socket.onclose = function (event) {
        _this._onSocketClose(event);
      };

      this.socket.onopen = function () {
        _this._onSocketOpen();
      };

      this.socket.onmessage = function (message) {
        _this._onSocketMessage(message);
      };
    }
  }, {
    key: "_setupMiddleware",
    value: function _setupMiddleware() {
      this.middleware = new _xvizServerMiddlewareStack.XVIZServerMiddlewareStack();
      var stack = [new _xvizProviderRequestHandler.XVIZProviderRequestHandler(this.context, this.provider, this.middleware, this.options), new _xvizWebsocketSender.XVIZWebsocketSender(this.context, this.socket, this.options)];
      this.middleware.set(stack);
    }
  }, {
    key: "_onSocketOpen",
    value: function _onSocketOpen() {
      this.log('[> Socket] Open');
    }
  }, {
    key: "_onSocketError",
    value: function _onSocketError(error) {
      this.log('[> Socket] Error: ', error.toString());
    }
  }, {
    key: "_onSocketClose",
    value: function _onSocketClose(event) {
      this.log("[> Socket] Close: Code ".concat(event.code, " Reason: ").concat(event.reason));
    }
  }, {
    key: "_onSocketMessage",
    value: function _onSocketMessage(message) {
      if (!this.handler.onMessage(message)) {
        this.log('[> Socket] Unknown message: ', JSON.stringify(message, null, 2).slice(0, 100));
      }
    }
  }, {
    key: "onConnect",
    value: function onConnect() {
      this.log('[> Connection] made');
      var params = this.request.params;
      this.handler.callMiddleware('start', params);

      if (params.session_type === 'live') {
        this.handler.callMiddleware('transform_log', _objectSpread({
          id: 'live'
        }, params));
      }
    }
  }]);
  return XVIZProviderSession;
}();

exports.XVIZProviderSession = XVIZProviderSession;
//# sourceMappingURL=xviz-provider-session.js.map