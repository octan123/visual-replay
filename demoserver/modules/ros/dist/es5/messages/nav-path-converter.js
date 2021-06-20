"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavPath = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _converter = _interopRequireDefault(require("./converter"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var NavPath = function (_Converter) {
  (0, _inherits2["default"])(NavPath, _Converter);

  var _super = _createSuper(NavPath);

  function NavPath(config) {
    (0, _classCallCheck2["default"])(this, NavPath);
    return _super.call(this, config);
  }

  (0, _createClass2["default"])(NavPath, [{
    key: "convertMessage",
    value: function () {
      var _convertMessage = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(frame, xvizBuilder) {
        var data, _iterator, _step, d, polyline;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = frame[this.topic];

                if (data) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                _iterator = _createForOfIteratorHelper(data);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    d = _step.value;
                    polyline = d.message.poses.map(function (p) {
                      var position = p.pose.position;
                      return [position.x, position.y, 0];
                    });
                    xvizBuilder.primitive(this.xvizStream).polyline(polyline);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function convertMessage(_x, _x2) {
        return _convertMessage.apply(this, arguments);
      }

      return convertMessage;
    }()
  }, {
    key: "getMetadata",
    value: function getMetadata(xvizMetaBuilder) {
      xvizMetaBuilder.stream(this.xvizStream).coordinate('IDENTITY').category('primitive').type('polyline').streamStyle({
        stroke_color: '#57AD57AA',
        stroke_width: 1.4,
        stroke_width_min_pixels: 1
      });
    }
  }], [{
    key: "name",
    get: function get() {
      return 'NavPath';
    }
  }, {
    key: "messageType",
    get: function get() {
      return 'nav_msgs/Path';
    }
  }]);
  return NavPath;
}(_converter["default"]);

exports.NavPath = NavPath;
//# sourceMappingURL=nav-path-converter.js.map