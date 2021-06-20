import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { evaluateStyle } from '../theme';
const RadioItem = styled.div(props => _objectSpread({
  outline: 'none',
  cursor: 'pointer',
  pointerEvents: props.isEnabled ? 'all' : 'none',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: props.theme.spacingTiny,
  marginBottom: props.theme.spacingTiny
}, evaluateStyle(props.userStyle, props)));
const RadioButton = styled.div(props => {
  let color = props.theme.controlColorPrimary;

  if (!props.isEnabled) {
    color = props.theme.controlColorDisabled;
  } else if (props.hasFocus) {
    color = props.theme.controlColorActive;
  } else if (props.isHovered) {
    color = props.theme.controlColorHovered;
  }

  return _objectSpread({
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: '50%',
    width: props.size,
    height: props.size,
    marginLeft: props.theme.spacingSmall,
    background: props.theme.background,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: color,
    color,
    flexShrink: 0
  }, evaluateStyle(props.userStyle, props));
});
const RadioIcon = styled.div(props => _objectSpread({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  width: 16,
  height: 16,
  textAlign: 'center',
  lineHeight: '16px',
  path: {
    fill: 'currentColor'
  }
}, evaluateStyle(props.userStyle, props)));
export default class RadioBoxItem extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      hasFocus: false,
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

    _defineProperty(this, "_onKeyDown", evt => {
      if (evt.keyCode === 32) {
        this.props.onClick(evt);
      }
    });
  }

  render() {
    const {
      theme,
      style,
      size,
      isSelected,
      label,
      isEnabled
    } = this.props;
    const styleProps = {
      theme,
      size,
      isSelected,
      hasFocus: this.state.hasFocus,
      isHovered: this.state.isHovered,
      isEnabled
    };
    return React.createElement(RadioItem, _extends({}, styleProps, {
      userStyle: style.item,
      tabIndex: isEnabled ? 0 : -1,
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
      onFocus: this._onFocus,
      onBlur: this._onBlur,
      onKeyDown: this._onKeyDown,
      onClick: this.props.onClick
    }), label, React.createElement(RadioButton, _extends({}, styleProps, {
      userStyle: style.button
    }), React.createElement(RadioIcon, _extends({}, styleProps, {
      userStyle: style.icon
    }), isSelected ? style.iconSelected || '●' : null)));
  }

}

_defineProperty(RadioBoxItem, "propTypes", {
  onClick: PropTypes.func,
  label: PropTypes.string,
  style: PropTypes.object,
  isEnabled: PropTypes.bool,
  isSelected: PropTypes.bool
});

_defineProperty(RadioBoxItem, "defaultProps", {
  style: {},
  isEnabled: true,
  onClick: () => {}
});
//# sourceMappingURL=radio-box-item.js.map