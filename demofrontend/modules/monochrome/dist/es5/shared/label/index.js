"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../theme");

var _icons = require("../icons");

var _popover = require("../popover");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var LabelComponent = _styled["default"].label(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    display: 'flex',
    alignItems: 'center',
    cursor: 'inherit',
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
    '>*': {
      marginLeft: props.theme.spacingNormal
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var LabelInfo = _styled["default"].div(function (props) {
  return _objectSpread({
    display: 'inline-block',
    color: props.isEnabled ? props.theme.controlColorPrimary : props.theme.controlColorDisabled,
    cursor: 'default',
    verticalAlign: 'middle',
    width: 16,
    height: 16,
    lineHeight: '16px',
    textAlign: 'center',
    path: {
      fill: 'currentColor'
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var Label = function (_PureComponent) {
  (0, _inherits2["default"])(Label, _PureComponent);

  var _super = _createSuper(Label);

  function Label() {
    (0, _classCallCheck2["default"])(this, Label);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Label, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          isEnabled = _this$props.isEnabled,
          htmlFor = _this$props["for"],
          style = _this$props.style,
          children = _this$props.children,
          tooltip = _this$props.tooltip,
          badge = _this$props.badge;
      var labelProps = {};

      if (htmlFor) {
        labelProps.htmlFor = htmlFor;
      }

      var styleProps = {
        theme: theme,
        isEnabled: isEnabled
      };
      return _react["default"].createElement(LabelComponent, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.label
      }), children, tooltip && _react["default"].createElement(_popover.Tooltip, {
        style: style.tooltip,
        content: tooltip
      }, _react["default"].createElement(LabelInfo, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.tooltipTarget
      }), style.iconInfo || _react["default"].createElement(_icons.InfoIcon, null))), badge);
    }
  }]);
  return Label;
}(_react.PureComponent);

(0, _defineProperty2["default"])(Label, "propTypes", {
  "for": _propTypes["default"].string,
  style: _propTypes["default"].object,
  tooltip: _propTypes["default"].string,
  badge: _propTypes["default"].element,
  isEnabled: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(Label, "defaultProps", {
  style: {},
  isEnabled: true
});

var _default = (0, _theme.withTheme)(Label);

exports["default"] = _default;
//# sourceMappingURL=index.js.map