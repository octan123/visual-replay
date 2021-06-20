"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeProvider = ThemeProvider;
exports.evaluateStyle = evaluateStyle;
exports.withTheme = withTheme;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _themes = require("./themes");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ThemeContext = _react["default"].createContext(createTheme({}));

var themeCache = new Map();

function ThemeProvider(_ref) {
  var theme = _ref.theme,
      children = _ref.children;
  var resolvedTheme = themeCache.get(theme);

  if (!resolvedTheme) {
    resolvedTheme = createTheme(theme);
    themeCache.set(theme, resolvedTheme);
  }

  return _react["default"].createElement(ThemeContext.Provider, {
    value: resolvedTheme
  }, children);
}

function evaluateStyle(userStyle, props) {
  if (!userStyle) {
    return null;
  }

  if (typeof userStyle === 'function') {
    return userStyle(props);
  }

  return userStyle;
}

function withTheme(Component) {
  var ThemedComponent = function (_React$Component) {
    (0, _inherits2["default"])(ThemedComponent, _React$Component);

    var _super = _createSuper(ThemedComponent);

    function ThemedComponent() {
      (0, _classCallCheck2["default"])(this, ThemedComponent);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(ThemedComponent, [{
      key: "render",
      value: function render() {
        var _this = this;

        return _react["default"].createElement(ThemeContext.Consumer, null, function (_theme) {
          return _react["default"].createElement(Component, (0, _extends2["default"])({}, _this.props, {
            theme: _theme
          }));
        });
      }
    }]);
    return ThemedComponent;
  }(_react["default"].Component);

  ThemedComponent.propTypes = Component.propTypes;
  ThemedComponent.defaultProps = Component.defaultProps;
  return ThemedComponent;
}

function createTheme(theme) {
  var base = null;

  switch (theme["extends"]) {
    case 'dark':
      base = _themes.DARK_THEME;
      break;

    default:
      base = _themes.LIGHT_THEME;
      break;
  }

  theme = _objectSpread(_objectSpread({}, base), theme);
  theme.__reset__ = {
    font: 'initial',
    cursor: 'initial',
    pointerEvents: 'initial',
    background: theme.background,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    lineHeight: theme.lineHeight,
    color: theme.textColorPrimary,
    textAlign: 'start'
  };
  return theme;
}
//# sourceMappingURL=theme.js.map