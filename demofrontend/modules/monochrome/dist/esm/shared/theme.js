import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import { LIGHT_THEME, DARK_THEME } from './themes';
var ThemeContext = React.createContext(createTheme({}));
var themeCache = new Map();
export function ThemeProvider(_ref) {
  var theme = _ref.theme,
      children = _ref.children;
  var resolvedTheme = themeCache.get(theme);

  if (!resolvedTheme) {
    resolvedTheme = createTheme(theme);
    themeCache.set(theme, resolvedTheme);
  }

  return React.createElement(ThemeContext.Provider, {
    value: resolvedTheme
  }, children);
}
export function evaluateStyle(userStyle, props) {
  if (!userStyle) {
    return null;
  }

  if (typeof userStyle === 'function') {
    return userStyle(props);
  }

  return userStyle;
}
export function withTheme(Component) {
  var ThemedComponent = function (_React$Component) {
    _inherits(ThemedComponent, _React$Component);

    var _super = _createSuper(ThemedComponent);

    function ThemedComponent() {
      _classCallCheck(this, ThemedComponent);

      return _super.apply(this, arguments);
    }

    _createClass(ThemedComponent, [{
      key: "render",
      value: function render() {
        var _this = this;

        return React.createElement(ThemeContext.Consumer, null, function (_theme) {
          return React.createElement(Component, _extends({}, _this.props, {
            theme: _theme
          }));
        });
      }
    }]);

    return ThemedComponent;
  }(React.Component);

  ThemedComponent.propTypes = Component.propTypes;
  ThemedComponent.defaultProps = Component.defaultProps;
  return ThemedComponent;
}

function createTheme(theme) {
  var base = null;

  switch (theme["extends"]) {
    case 'dark':
      base = DARK_THEME;
      break;

    default:
      base = LIGHT_THEME;
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