import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../theme';
import { InfoIcon } from '../icons';
import { Tooltip } from '../popover';
const LabelComponent = styled.label(props => _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
  display: 'flex',
  alignItems: 'center',
  cursor: 'inherit',
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
  '>*': {
    marginLeft: props.theme.spacingNormal
  }
}, evaluateStyle(props.userStyle, props)));
const LabelInfo = styled.div(props => _objectSpread({
  display: 'inline-block',
  color: props.isEnabled ? props.theme.controlColorPrimary : props.theme.controlColorDisabled,
  cursor: 'default',
  verticalAlign: 'middle',
  width: 16,
  height: 16,
  lineHeight: '16px',
  textAlign: 'center',
  path: {
    fill: 'currentColor'
  }
}, evaluateStyle(props.userStyle, props)));

class Label extends PureComponent {
  render() {
    const {
      theme,
      isEnabled,
      for: htmlFor,
      style,
      children,
      tooltip,
      badge
    } = this.props;
    const labelProps = {};

    if (htmlFor) {
      labelProps.htmlFor = htmlFor;
    }

    const styleProps = {
      theme,
      isEnabled
    };
    return React.createElement(LabelComponent, _extends({}, styleProps, {
      userStyle: style.label
    }), children, tooltip && React.createElement(Tooltip, {
      style: style.tooltip,
      content: tooltip
    }, React.createElement(LabelInfo, _extends({}, styleProps, {
      userStyle: style.tooltipTarget
    }), style.iconInfo || React.createElement(InfoIcon, null))), badge);
  }

}

_defineProperty(Label, "propTypes", {
  for: PropTypes.string,
  style: PropTypes.object,
  tooltip: PropTypes.string,
  badge: PropTypes.element,
  isEnabled: PropTypes.bool
});

_defineProperty(Label, "defaultProps", {
  style: {},
  isEnabled: true
});

export default withTheme(Label);
//# sourceMappingURL=index.js.map