import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { LIGHT_THEME, DARK_THEME } from './themes';
const ThemeContext = React.createContext(createTheme({}));
const themeCache = new Map();
export function ThemeProvider({
  theme,
  children
}) {
  let resolvedTheme = themeCache.get(theme);

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
  class ThemedComponent extends React.Component {
    render() {
      return React.createElement(ThemeContext.Consumer, null, _theme => React.createElement(Component, _extends({}, this.props, {
        theme: _theme
      })));
    }

  }

  ThemedComponent.propTypes = Component.propTypes;
  ThemedComponent.defaultProps = Component.defaultProps;
  return ThemedComponent;
}

function createTheme(theme) {
  let base = null;

  switch (theme.extends) {
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