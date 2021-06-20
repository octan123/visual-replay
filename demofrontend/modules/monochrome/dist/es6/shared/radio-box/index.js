import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../theme';
import RadioBoxItem from './radio-box-item';
const WrapperComponent = styled.div(props => _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled
}, evaluateStyle(props.userStyle, props)));

class RadioBox extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onClick", value => {
      this.props.onChange(value);
    });
  }

  render() {
    const {
      theme,
      className,
      style,
      data,
      value,
      isEnabled
    } = this.props;
    const {
      size = theme.controlSize
    } = style;
    const styleProps = {
      theme,
      size,
      value,
      isEnabled
    };
    return React.createElement(WrapperComponent, _extends({
      className: className
    }, styleProps, {
      userStyle: style.wrapper
    }), Object.keys(data).map(key => React.createElement(RadioBoxItem, {
      key: key,
      label: data[key],
      theme: theme,
      size: size,
      style: style,
      isSelected: key === value,
      isEnabled: isEnabled,
      onClick: () => this._onClick(key)
    })));
  }

}

_defineProperty(RadioBox, "propTypes", {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  isEnabled: PropTypes.bool
});

_defineProperty(RadioBox, "defaultProps", {
  className: '',
  style: {},
  isEnabled: true,
  onChange: () => {}
});

export default withTheme(RadioBox);
//# sourceMappingURL=index.js.map