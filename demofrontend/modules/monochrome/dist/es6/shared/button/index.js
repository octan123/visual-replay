import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../theme';
const BUTTON_TYPE = {
  NORMAL: 0,
  PRIMARY: 1,
  WARNING: 2,
  MUTED: 3
};

function getBackgroundColor(props) {
  if (props.type === BUTTON_TYPE.MUTED) {
    return props.theme.background;
  }

  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  }

  switch (props.type) {
    case BUTTON_TYPE.PRIMARY:
      return props.isHovered ? props.theme.primary500 : props.theme.controlColorActive;

    case BUTTON_TYPE.WARNING:
      return props.isHovered ? props.theme.warning500 : props.theme.warning400;

    case BUTTON_TYPE.NORMAL:
    default:
      return props.isHovered ? props.theme.controlColorHovered : props.theme.controlColorPrimary;
  }
}

function getTextColor(props) {
  if (props.type !== BUTTON_TYPE.MUTED) {
    return props.theme.textColorInvert;
  }

  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  }

  if (props.isHovered) {
    return props.theme.controlColorHovered;
  }

  return props.theme.controlColorPrimary;
}

const WrapperComponent = styled.button(props => _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
  outline: 'none',
  display: 'inline-block',
  boxSizing: 'border-box',
  border: 'none',
  paddingLeft: props.theme.spacingNormal,
  paddingRight: props.theme.spacingNormal,
  height: props.size,
  lineHeight: "".concat(props.size, "px"),
  textAlign: 'center',
  cursor: 'pointer',
  pointerEvents: props.isEnabled ? 'all' : 'none',
  background: getBackgroundColor(props),
  color: getTextColor(props)
}, evaluateStyle(props.userStyle, props)));

class Button extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isHovered: false
    });

    _defineProperty(this, "_onMouseEnter", () => this.setState({
      isHovered: true
    }));

    _defineProperty(this, "_onMouseLeave", () => this.setState({
      isHovered: false
    }));

    _defineProperty(this, "_onFocus", () => this.setState({
      hasFocus: true
    }));

    _defineProperty(this, "_onBlur", () => this.setState({
      hasFocus: false
    }));

    _defineProperty(this, "_onClick", () => {
      this.props.onChange(!this.props.value);
    });
  }

  render() {
    const {
      theme,
      type,
      className,
      style,
      isEnabled,
      onClick
    } = this.props;
    const {
      size = theme.controlSize + theme.spacingTiny * 2
    } = style;
    const styleProps = {
      type,
      theme,
      size,
      hasFocus: this.state.hasFocus,
      isHovered: this.state.isHovered,
      isEnabled
    };
    return React.createElement(WrapperComponent, _extends({
      className: className,
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
      onFocus: this._onFocus,
      onBlur: this._onBlur,
      onClick: onClick,
      userStyle: style.wrapper
    }, styleProps), this.props.children);
  }

}

_defineProperty(Button, "propTypes", {
  type: PropTypes.oneOf(Object.values(BUTTON_TYPE)),
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  isEnabled: PropTypes.bool
});

_defineProperty(Button, "defaultProps", {
  type: BUTTON_TYPE.NORMAL,
  className: '',
  style: {},
  isEnabled: true
});

const ThemedButton = withTheme(Button);
Object.assign(ThemedButton, BUTTON_TYPE);
export default ThemedButton;
//# sourceMappingURL=index.js.map