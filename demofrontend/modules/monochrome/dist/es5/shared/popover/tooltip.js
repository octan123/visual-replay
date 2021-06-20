"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _theme = require("../theme");

var _popover = _interopRequireDefault(require("./popover"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Tooltip = function (_React$Component) {
  (0, _inherits2["default"])(Tooltip, _React$Component);

  var _super = _createSuper(Tooltip);

  function Tooltip() {
    (0, _classCallCheck2["default"])(this, Tooltip);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Tooltip, [{
    key: "render",
    value: function render() {
      var style = this.props.style;

      var tooltipStyle = _objectSpread(_objectSpread({}, style), {}, {
        body: function body(props) {
          return _objectSpread({
            maxWidth: 300,
            paddingTop: props.theme.spacingSmall,
            paddingBottom: props.theme.spacingSmall,
            paddingLeft: props.theme.spacingNormal,
            paddingRight: props.theme.spacingNormal
          }, (0, _theme.evaluateStyle)(style.body, props));
        }
      });

      return _react["default"].createElement(_popover["default"], (0, _extends2["default"])({}, this.props, {
        style: tooltipStyle,
        trigger: _popover["default"].HOVER
      }));
    }
  }]);
  return Tooltip;
}(_react["default"].Component);

(0, _defineProperty2["default"])(Tooltip, "propTypes", _popover["default"].propTypes);
(0, _defineProperty2["default"])(Tooltip, "defaultProps", {
  style: {},
  position: _popover["default"].AUTO
});
var _default = Tooltip;
exports["default"] = _default;
//# sourceMappingURL=tooltip.js.map