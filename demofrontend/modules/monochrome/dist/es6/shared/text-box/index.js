import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../theme';
import { ClearIcon } from '../icons';

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

const WrapperComponent = styled.div(props => _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
  pointerEvents: props.isEnabled ? 'all' : 'none'
}, evaluateStyle(props.userStyle, props)));
const TextBoxBorder = styled.div(props => _objectSpread({
  position: 'relative',
  width: '100%',
  height: props.height,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: getControlColor(props)
}, evaluateStyle(props.userStyle, props)));
const TextBoxInput = styled.input(props => _objectSpread({
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
}, evaluateStyle(props.userStyle, props)));
const TextBoxClearButton = styled.div(props => _objectSpread({
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
}, evaluateStyle(props.userStyle, props)));

class TextBox extends PureComponent {
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

    _defineProperty(this, "_onChange", event => {
      this.props.onChange(event.target.value);
    });

    _defineProperty(this, "_onClear", event => {
      this.props.onChange('');
    });
  }

  render() {
    const {
      value,
      className,
      theme,
      style,
      showClearButton,
      isEnabled
    } = this.props;
    const {
      height = theme.controlSize + theme.spacingTiny * 2
    } = style;
    const styleProps = {
      theme,
      height,
      isEnabled,
      isHovered: this.state.isHovered,
      hasFocus: this.state.hasFocus
    };
    return React.createElement(WrapperComponent, _extends({
      className: className,
      userStyle: style.wrapper
    }, styleProps), React.createElement(TextBoxBorder, _extends({
      userStyle: style.border
    }, styleProps, {
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave
    }), React.createElement(TextBoxInput, _extends({
      userStyle: style.input
    }, styleProps, {
      ref: _ref => {
        this._input = _ref;
      },
      type: "text",
      tabIndex: isEnabled ? 0 : -1,
      onFocus: this._onFocus,
      onBlur: this._onBlur,
      onChange: this._onChange,
      value: value
    })), Boolean(value && showClearButton && isEnabled) && React.createElement(TextBoxClearButton, _extends({
      userStyle: style.clear
    }, styleProps, {
      onClick: this._onClear
    }), style.iconClear || React.createElement(ClearIcon, null))));
  }

}

_defineProperty(TextBox, "propTypes", {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  showClearButton: PropTypes.bool,
  isEnabled: PropTypes.bool
});

_defineProperty(TextBox, "defaultProps", {
  className: '',
  style: {},
  showClearButton: true,
  isEnabled: true,
  onChange: () => {}
});

export default withTheme(TextBox);
//# sourceMappingURL=index.js.map