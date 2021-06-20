"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZProviderRequestHandler = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _probe = require("probe.gl");

var _io = require("@xviz/io");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var DEFAULT_OPTIONS = {
  delay: 0
};

var XVIZProviderRequestHandler = function () {
  function XVIZProviderRequestHandler(context, provider, middleware) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    (0, _classCallCheck2["default"])(this, XVIZProviderRequestHandler);
    this.context = context;
    this.provider = provider;
    this.middleware = middleware;
    this.metrics = new _probe.Stats({
      id: 'xviz-provider-request-handler'
    });
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    this._setupContext();
  }

  (0, _createClass2["default"])(XVIZProviderRequestHandler, [{
    key: "_setupContext",
    value: function _setupContext() {
      var metadata = this.provider.xvizMetadata().message();

      if (metadata && metadata.data && metadata.data.log_info) {
        var _metadata$data$log_in = metadata.data.log_info,
            start_time = _metadata$data$log_in.start_time,
            end_time = _metadata$data$log_in.end_time;

        if (start_time) {
          this.context.set('start_time', start_time);
        }

        if (end_time) {
          this.context.set('end_time', start_time);
        }
      }
    }
  }, {
    key: "onStart",
    value: function onStart(msg) {
      console.log('onStart');
      var error = null;

      if (error) {
        this.middleware.onError(_io.XVIZEnvelope.Error({
          message: error
        }));
      } else {
        var message = msg.message();

        if (message.data.message_format) {
          this.context.set('message_format', message.data.message_format);
        } else {
          this.context.set('message_format', 'BINARY');
        }

        if (message.data.profile) {
          this.context.set('profile', message.data.profile);
        } else {
          this.context.set('profile', 'default');
        }

        if (message.data.session_type) {
          this.context.set('session_type', message.data.session_type);
        } else {
          this.context.set('session_type', 'LOG');
        }
      }

      var metadata = this.provider.xvizMetadata();
      this.middleware.onMetadata(metadata);
    }
  }, {
    key: "_setupTransformMetrics",
    value: function _setupTransformMetrics() {
      return {
        totalTimer: this.metrics.get("total"),
        loadTimer: this.metrics.get("load"),
        sendTimer: this.metrics.get("send")
      };
    }
  }, {
    key: "onTransformLog",
    value: function onTransformLog(msg) {
      var error = null;

      if (error) {
        this.middleware.onError(_io.XVIZEnvelope.Error({
          message: error
        }));
      } else {
        this._clearActiveTransforms();

        this._startTransform(msg);
      }
    }
  }, {
    key: "onTransformPointInTime",
    value: function onTransformPointInTime(msg) {
      this.middleware.onError(_io.XVIZEnvelope.Error({
        message: 'Error: transform_point_in_time is not supported.'
      }));
    }
  }, {
    key: "onReconfigure",
    value: function onReconfigure(msg) {
      this.middleware.onError(_io.XVIZEnvelope.Error({
        message: 'Error: reconfigure is not supported.'
      }));
    }
  }, {
    key: "log",
    value: function log() {
      var logger = this.options.logger;

      if (logger && logger.log) {
        logger.log.apply(logger, arguments);
      }
    }
  }, {
    key: "_sendStateUpdate",
    value: function () {
      var _sendStateUpdate2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(id, transformState) {
        var _this = this;

        var delay, interval, iterator, loadTimer, sendTimer, totalTimer, data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                delay = transformState.delay, interval = transformState.interval, iterator = transformState.iterator;
                loadTimer = transformState.loadTimer, sendTimer = transformState.sendTimer, totalTimer = transformState.totalTimer;

                if (!interval) {
                  totalTimer && totalTimer.timeStart();
                }

                if (interval) {
                  clearTimeout(interval);
                  transformState.interval = null;
                }

                if (!(iterator.valid() && this.context.transform(id))) {
                  _context.next = 14;
                  break;
                }

                loadTimer && loadTimer.timeStart();
                _context.next = 8;
                return this.provider.xvizMessage(iterator);

              case 8:
                data = _context.sent;
                loadTimer && loadTimer.timeEnd();

                if (data) {
                  sendTimer && sendTimer.timeStart();
                  this.middleware.onStateUpdate(data);
                  sendTimer && sendTimer.timeEnd();
                  this.logMsgSent(id, iterator.value(), loadTimer, sendTimer);
                }

                transformState.interval = setTimeout(function () {
                  return _this._sendStateUpdate(id, transformState);
                }, delay);
                _context.next = 19;
                break;

              case 14:
                this.middleware.onTransformLogDone(_io.XVIZEnvelope.TransformLogDone({
                  id: id
                }));
                totalTimer && totalTimer.timeEnd();
                this.logDone(id, loadTimer, sendTimer, totalTimer);
                this.context.endTransform(id);
                this.metrics.reset();

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _sendStateUpdate(_x, _x2) {
        return _sendStateUpdate2.apply(this, arguments);
      }

      return _sendStateUpdate;
    }()
  }, {
    key: "_clearActiveTransforms",
    value: function _clearActiveTransforms() {
      var transforms = this.context.transforms();

      var _iterator = _createForOfIteratorHelper(transforms),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tKey = _step.value;
          this.context.endTransform(tKey);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_startTransform",
    value: function _startTransform(msg) {
      var message = msg.message();
      var id = message.data.id;

      var tformState = _objectSpread({
        request: message.data,
        iterator: null,
        interval: null,
        delay: this.options.delay
      }, this._setupTransformMetrics());

      this.context.startTransform(id, tformState);
      tformState.iterator = this.provider.getMessageIterator({
        startTime: message.data.start_timestamp,
        endTime: message.data.end_timestamp
      });

      if (tformState.delay < 1) {
        this._sendAllStateUpdates(id, tformState);
      } else {
        this._sendStateUpdate(id, tformState);
      }
    }
  }, {
    key: "_sendAllStateUpdates",
    value: function () {
      var _sendAllStateUpdates2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(id, transformState) {
        var iterator, loadTimer, sendTimer, totalTimer, data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                iterator = transformState.iterator;
                loadTimer = transformState.loadTimer, sendTimer = transformState.sendTimer, totalTimer = transformState.totalTimer;
                totalTimer && totalTimer.timeStart();

              case 3:
                if (!(iterator.valid() && this.context.transform(id))) {
                  _context2.next = 12;
                  break;
                }

                loadTimer && loadTimer.timeStart();
                _context2.next = 7;
                return this.provider.xvizMessage(iterator);

              case 7:
                data = _context2.sent;
                loadTimer && loadTimer.timeEnd();

                if (data) {
                  sendTimer && sendTimer.timeStart();
                  this.middleware.onStateUpdate(data);
                  sendTimer && sendTimer.timeEnd();
                  this.logMsgSent(id, iterator.value(), loadTimer, sendTimer);
                }

                _context2.next = 3;
                break;

              case 12:
                this.middleware.onTransformLogDone(_io.XVIZEnvelope.TransformLogDone({
                  id: id
                }));
                totalTimer && totalTimer.timeEnd();
                this.logDone(id, loadTimer, sendTimer, totalTimer);
                this.context.endTransform(id);
                this.metrics.reset();

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _sendAllStateUpdates(_x3, _x4) {
        return _sendAllStateUpdates2.apply(this, arguments);
      }

      return _sendAllStateUpdates;
    }()
  }, {
    key: "logMsgSent",
    value: function logMsgSent(id, index, loadTimer, sendTimer) {
      var logger = this.options.logger;

      if (logger && logger.verbose) {
        var msg = "id: ".concat(id, " [< STATE_UPDATE] message: ").concat(index);

        if (loadTimer) {
          msg += " ".concat(loadTimer.name, ":").concat(loadTimer.lastTiming.toFixed(3), "ms");
        }

        if (sendTimer) {
          msg += " ".concat(sendTimer.name, ":").concat(sendTimer.lastTiming.toFixed(3), "ms");
        }

        logger.verbose(msg);
      }
    }
  }, {
    key: "logDone",
    value: function logDone(id, load, send, total) {
      var logger = this.options.logger;

      if (logger && logger.info) {
        var msg = "id: ".concat(id, " [< DONE]");

        if (load) {
          logger.info("".concat(msg, " ").concat(load.name, " Avg:").concat(load.getAverageTime().toFixed(3), "ms Total:").concat(load.time.toFixed(3), "ms Hz:").concat(load.getHz().toFixed(3), "/sec Count:").concat(load.count));
        }

        if (send) {
          logger.info("".concat(msg, " ").concat(send.name, " Avg:").concat(send.getAverageTime().toFixed(3), "ms Total:").concat(send.time.toFixed(3), "ms Hz:").concat(send.getHz().toFixed(3), "/sec Count:").concat(send.count));
        }

        if (total) {
          logger.info("".concat(msg, " ").concat(total.name, " ").concat(total.lastTiming.toFixed(3), "ms"));
        }
      }
    }
  }]);
  return XVIZProviderRequestHandler;
}();

exports.XVIZProviderRequestHandler = XVIZProviderRequestHandler;
//# sourceMappingURL=xviz-provider-request-handler.js.map