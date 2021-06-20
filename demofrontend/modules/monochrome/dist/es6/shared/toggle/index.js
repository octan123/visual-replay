import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../theme';
const WrapperComponent = styled.div(props => _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  pointerEvents: props.isEnabled ? 'all' : 'none',
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled
}, evaluateStyle(props.userStyle, props)));
const ToggleComponent = styled.div(props => _objectSpread({
  outline: 'none',
  position: 'relative',
  height: props.knobSize,
  width: props.knobSize * 2,
  flexShrink: 0
}, evaluateStyle(props.userStyle, props)));
const ToggleTrack = styled.div(props => _objectSpread({
  boxSizing: 'border-box',
  position: 'absolute',
  width: '100%',
  height: 2,
  background: props.isEnabled ? props.value ? props.theme.controlColorActive : props.theme.controlColorPrimary : props.theme.controlColorDisabled,
  top: '50%',
  transform: 'translateY(-50%)'
}, evaluateStyle(props.userStyle, props)));
const ToggleKnob = styled.div(props => _objectSpread({
  boxSizing: 'border-box',
  position: 'absolute',
  width: props.knobSize,
  height: props.knobSize,
  background: props.theme.background,
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: props.isEnabled ? props.isHovered ? props.theme.controlColorHovered : props.hasFocus ? props.theme.controlColorActive : props.theme.controlColorPrimary : props.theme.controlColorDisabled,
  borderRadius: '50%',
  left: props.value ? "calc(100% - ".concat(props.knobSize, "px)") : 0,
  transitionProperty: 'left',
  transitionDuration: props.theme.transitionDuration,
  transitionTimingFunction: props.theme.transitionTimingFunction
}, evaluateStyle(props.userStyle, props)));

class Toggle extends PureComponent {
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
        this.props.onChange(!this.props.value);
      }
    });

    _defineProperty(this, "_onClick", () => {
      this.props.onChange(!this.props.value);
    });
  }

  render() {
    const {
      theme,
      className,
      style,
      value,
      label,
      isEnabled
    } = this.props;
    const {
      knobSize = theme.controlSize
    } = style;
    const styleProps = {
      theme,
      knobSize,
      value,
      isHovered: this.state.isHovered,
      hasFocus: this.state.hasFocus,
      isEnabled
    };
    return React.createElement(WrapperComponent, _extends({
      className: className,
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
      onClick: this._onClick,
      userStyle: style.wrapper
    }, styleProps), label, React.createElement(ToggleComponent, _extends({
      userStyle: style.toggle
    }, styleProps, {
      tabIndex: isEnabled ? 0 : -1,
      onKeyDown: this._onKeyDown,
      onFocus: this._onFocus,
      onBlur: this._onBlur
    }), React.createElement(ToggleTrack, _extends({
      userStyle: style.track
    }, styleProps)), React.createElement(ToggleKnob, _extends({
      userStyle: style.knob
    }, styleProps))));
  }

}

_defineProperty(Toggle, "propTypes", {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.node,
  style: PropTypes.object,
  isEnabled: PropTypes.bool
});

_defineProperty(Toggle, "defaultProps", {
  className: '',
  value: true,
  style: {},
  isEnabled: true,
  onChange: () => {}
});

export default withTheme(Toggle);
//# sourceMappingURL=index.js.map