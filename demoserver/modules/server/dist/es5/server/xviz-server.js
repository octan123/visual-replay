"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZServer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var URL = require('url').URL;

var WebSocket = require('ws');

function getRequestData(requestUrl) {
  var req = new URL(requestUrl, 'https://localhost');
  var params = {};

  var _iterator = _createForOfIteratorHelper(req.searchParams.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
          k = _step$value[0],
          v = _step$value[1];

      params[k] = v;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return {
    path: req.pathname,
    params: params
  };
}

var DEFAULT_OPTIONS = {
  port: 3000,
  perMessageDeflate: true,
  maxPayload: 64 * 1024 * 1024
};

var XVIZServer = function () {
  function XVIZServer(handlers, options, callback) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, XVIZServer);

    if (!handlers) {
      throw new Error('Must specify a handler for messages');
    }

    this.handlers = handlers;
    this.options = Object.assign(DEFAULT_OPTIONS, options);
    this._server = new WebSocket.Server(this.options, callback);
    this.server.on('connection', function (socket, request) {
      return _this.handleSession(socket, request);
    });
  }

  (0, _createClass2["default"])(XVIZServer, [{
    key: "close",
    value: function close(cb) {
      this._server.close(cb);
    }
  }, {
    key: "handleSession",
    value: function () {
      var _handleSession = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(socket, request) {
        var req, _iterator2, _step2, handler, session;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.log("[> Connection] created: ".concat(request.url));
                req = getRequestData(request.url);
                _iterator2 = _createForOfIteratorHelper(this.handlers);
                _context.prev = 3;

                _iterator2.s();

              case 5:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 15;
                  break;
                }

                handler = _step2.value;
                _context.next = 9;
                return handler.newSession(socket, req);

              case 9:
                session = _context.sent;

                if (!session) {
                  _context.next = 13;
                  break;
                }

                session.onConnect();
                return _context.abrupt("return");

              case 13:
                _context.next = 5;
                break;

              case 15:
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](3);

                _iterator2.e(_context.t0);

              case 20:
                _context.prev = 20;

                _iterator2.f();

                return _context.finish(20);

              case 23:
                socket.close();
                this.log('[> Connection] closed due to no handler found');

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 17, 20, 23]]);
      }));

      function handleSession(_x, _x2) {
        return _handleSession.apply(this, arguments);
      }

      return handleSession;
    }()
  }, {
    key: "log",
    value: function log() {
      var logger = this.options.logger;

      if (logger && logger.log) {
        logger.log.apply(logger, arguments);
      }
    }
  }, {
    key: "server",
    get: function get() {
      return this._server;
    }
  }]);
  return XVIZServer;
}();

exports.XVIZServer = XVIZServer;
//# sourceMappingURL=xviz-server.js.map