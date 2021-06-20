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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../theme");

var _icons = require("../icons");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getControlColor(props) {
  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  } else if (props.hasFocus) {
    return props.theme.controlColorActive;
  } else if (props.isHovered) {
    return props.theme.controlColorHovered;
  }

  return props.theme.controlColorPrimary;
}

var WrapperComponent = _styled["default"].div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    pointerEvents: props.isEnabled ? 'all' : 'none'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var TextBoxBorder = _styled["default"].div(function (props) {
  return _objectSpread({
    position: 'relative',
    width: '100%',
    height: props.height,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: getControlColor(props)
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var TextBoxInput = _styled["default"].input(function (props) {
  return _objectSpread({
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    lineHeight: "".concat(props.height, "px"),
    background: props.theme.background,
    outline: 'none',
    paddingLeft: props.theme.spacingSmall,
    paddingRight: props.theme.spacingSmall,
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
    border: 'none'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var TextBoxClearButton = _styled["default"].div(function (props) {
  return _objectSpread({
    cursor: 'pointer',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    color: props.theme.controlColorPrimary,
    padding: props.theme.spacingSmall,
    width: 16,
    height: 16,
    textAlign: 'center',
    lineHeight: '16px',
    path: {
      fill: 'currentColor'
    },
    '&:hover': {
      color: props.theme.controlColorHovered
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var TextBox = function (_PureComponent) {
  (0, _inherits2["default"])(TextBox, _PureComponent);

  var _super = _createSuper(TextBox);

  function TextBox() {
    var _this;

    (0, _classCallCheck2["default"])(this, TextBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      hasFocus: false,
      isHovered: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseEnter", function () {
      return _this.setState({
        isHovered: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseLeave", function () {
      return _this.setState({
        isHovered: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onFocus", function () {
      return _this.setState({
        hasFocus: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onBlur", function () {
      return _this.setState({
        hasFocus: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onChange", function (event) {
      _this.props.onChange(event.target.value);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClear", function (event) {
      _this.props.onChange('');
    });
    return _this;
  }

  (0, _createClass2["default"])(TextBox, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          value = _this$props.value,
          className = _this$props.className,
          theme = _this$props.theme,
          style = _this$props.style,
          showClearButton = _this$props.showClearButton,
          isEnabled = _this$props.isEnabled;
      var _style$height = style.height,
          height = _style$height === void 0 ? theme.controlSize + theme.spacingTiny * 2 : _style$height;
      var styleProps = {
        theme: theme,
        height: height,
        isEnabled: isEnabled,
        isHovered: this.state.isHovered,
        hasFocus: this.state.hasFocus
      };
      return _react["default"].createElement(WrapperComponent, (0, _extends2["default"])({
        className: className,
        userStyle: style.wrapper
      }, styleProps), _react["default"].createElement(TextBoxBorder, (0, _extends2["default"])({
        userStyle: style.border
      }, styleProps, {
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave
      }), _react["default"].createElement(TextBoxInput, (0, _extends2["default"])({
        userStyle: style.input
      }, styleProps, {
        ref: function ref(_ref) {
          _this2._input = _ref;
        },
        type: "text",
        tabIndex: isEnabled ? 0 : -1,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onChange: this._onChange,
        value: value
      })), Boolean(value && showClearButton && isEnabled) && _react["default"].createElement(TextBoxClearButton, (0, _extends2["default"])({
        userStyle: style.clear
      }, styleProps, {
        onClick: this._onClear
      }), style.iconClear || _react["default"].createElement(_icons.ClearIcon, null))));
    }
  }]);
  return TextBox;
}(_react.PureComponent);

(0, _defineProperty2["default"])(TextBox, "propTypes", {
  value: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  showClearButton: _propTypes["default"].bool,
  isEnabled: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(TextBox, "defaultProps", {
  className: '',
  style: {},
  showClearButton: true,
  isEnabled: true,
  onChange: function onChange() {}
});

var _default = (0, _theme.withTheme)(TextBox);

exports["default"] = _default;
//# sourceMappingURL=index.js.map