import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../theme';
import { DropdownIcon as DefaultDropdownIcon } from '../icons';

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
const DropdownBorder = styled.div(props => _objectSpread({
  position: 'relative',
  width: '100%',
  height: props.height,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: getControlColor(props)
}, evaluateStyle(props.userStyle, props)));
const DropdownInput = styled.select(props => _objectSpread({
  cursor: 'pointer',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  lineHeight: "".concat(props.height, "px"),
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
  appearance: 'none',
  background: props.theme.background,
  border: 'none',
  outline: 0,
  paddingLeft: props.theme.spacingSmall,
  paddingRight: props.theme.spacingLarge
}, evaluateStyle(props.userStyle, props)));
const DropdownIcon = styled.div(props => _objectSpread({
  pointerEvents: 'none',
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  color: getControlColor(props),
  padding: props.theme.spacingSmall,
  width: 16,
  height: 16,
  textAlign: 'center',
  lineHeight: '16px',
  path: {
    fill: 'currentColor'
  }
}, evaluateStyle(props.userStyle, props)));

class Dropdown extends PureComponent {
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
      const {
        onChange
      } = this.props;
      onChange(event.target.value);
    });
  }

  render() {
    const {
      theme,
      style,
      className,
      data,
      value,
      isEnabled
    } = this.props;
    const {
      height = theme.controlSize + theme.spacingTiny * 2
    } = style;
    const styleProps = {
      theme,
      height,
      hasFocus: this.state.hasFocus,
      isHovered: this.state.isHovered,
      isEnabled
    };
    return React.createElement(WrapperComponent, _extends({
      className: className,
      userStyle: style.wrapper
    }, styleProps), React.createElement(DropdownBorder, _extends({
      userStyle: style.border
    }, styleProps, {
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave
    }), React.createElement(DropdownInput, _extends({
      userStyle: style.select
    }, styleProps, {
      tabIndex: isEnabled ? 0 : -1,
      onFocus: this._onFocus,
      onBlur: this._onBlur,
      onChange: this._onChange,
      value: value
    }), Object.keys(data).map(key => React.createElement("option", {
      key: key,
      value: key
    }, data[key]))), React.createElement(DropdownIcon, _extends({
      userStyle: style.icon
    }, styleProps), style.iconArrow || React.createElement(DefaultDropdownIcon, null))));
  }

}

_defineProperty(Dropdown, "propTypes", {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  isEnabled: PropTypes.bool
});

_defineProperty(Dropdown, "defaultProps", {
  className: '',
  style: {},
  isEnabled: true,
  onChange: () => {}
});

export default withTheme(Dropdown);
//# sourceMappingURL=index.js.map