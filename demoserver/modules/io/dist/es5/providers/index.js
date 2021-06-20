"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZProviderFactory = exports.XVIZProviderFactoryClass = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _xvizJsonProvider = require("./xviz-json-provider");

var _xvizBinaryProvider = require("./xviz-binary-provider");

var _xvizProtobufProvider = require("./xviz-protobuf-provider");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function createXVIZProvider(_x, _x2) {
  return _createXVIZProvider.apply(this, arguments);
}

function _createXVIZProvider() {
  _createXVIZProvider = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(ProviderClass, args) {
    var provider;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            provider = null;
            provider = new ProviderClass(args);
            _context2.next = 4;
            return provider.init();

          case 4:
            if (!provider.valid()) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", provider);

          case 6:
            return _context2.abrupt("return", null);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createXVIZProvider.apply(this, arguments);
}

var XVIZProviderFactoryClass = function () {
  function XVIZProviderFactoryClass() {
    (0, _classCallCheck2["default"])(this, XVIZProviderFactoryClass);
    this.providerClasses = [{
      className: _xvizJsonProvider.XVIZJSONProvider
    }, {
      className: _xvizBinaryProvider.XVIZBinaryProvider
    }, {
      className: _xvizProtobufProvider.XVIZProtobufProvider
    }];
  }

  (0, _createClass2["default"])(XVIZProviderFactoryClass, [{
    key: "addProviderClass",
    value: function addProviderClass(className, args) {
      this.providerClasses.push({
        className: className,
        args: args
      });
    }
  }, {
    key: "open",
    value: function () {
      var _open = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(args) {
        var _iterator, _step, providerEntry, options, loader;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iterator = _createForOfIteratorHelper(this.providerClasses);
                _context.prev = 1;

                _iterator.s();

              case 3:
                if ((_step = _iterator.n()).done) {
                  _context.next = 13;
                  break;
                }

                providerEntry = _step.value;
                options = _objectSpread(_objectSpread({}, args.options), providerEntry.args);
                _context.next = 8;
                return createXVIZProvider(providerEntry.className, _objectSpread(_objectSpread({}, args), {}, {
                  options: options
                }));

              case 8:
                loader = _context.sent;

                if (!loader) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", loader);

              case 11:
                _context.next = 3;
                break;

              case 13:
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](1);

                _iterator.e(_context.t0);

              case 18:
                _context.prev = 18;

                _iterator.f();

                return _context.finish(18);

              case 21:
                return _context.abrupt("return", null);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 15, 18, 21]]);
      }));

      function open(_x3) {
        return _open.apply(this, arguments);
      }

      return open;
    }()
  }]);
  return XVIZProviderFactoryClass;
}();

exports.XVIZProviderFactoryClass = XVIZProviderFactoryClass;
var XVIZProviderFactory = new XVIZProviderFactoryClass();
exports.XVIZProviderFactory = XVIZProviderFactory;
//# sourceMappingURL=index.js.map