import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import Converter from './converter';
export var NavPath = function (_Converter) {
  _inherits(NavPath, _Converter);

  var _super = _createSuper(NavPath);

  function NavPath(config) {
    _classCallCheck(this, NavPath);

    return _super.call(this, config);
  }

  _createClass(NavPath, [{
    key: "convertMessage",
    value: function () {
      var _convertMessage = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(frame, xvizBuilder) {
        var data, _iterator, _step, d, polyline;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
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
}(Converter);
//# sourceMappingURL=nav-path-converter.js.map