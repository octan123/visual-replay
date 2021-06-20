import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { withTheme, evaluateStyle } from '../theme';
const spin = keyframes(_templateObject());
const PreLoader = styled.div(props => _objectSpread({
  width: props.size,
  height: props.size,
  marginLeft: -props.size / 2,
  marginTop: props.theme.spacingNormal,
  marginBottom: props.theme.spacingNormal,
  left: '50%',
  borderRadius: '50%',
  position: 'absolute',
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: props.theme.controlColorActive,
  clipPath: 'polygon(50% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
  animation: "".concat(spin, " 1s ease infinite")
}, evaluateStyle(props.userStyle, props)));

class Spinner extends PureComponent {
  render() {
    const {
      theme,
      style
    } = this.props;
    const {
      size = 32
    } = style;
    return React.createElement(PreLoader, {
      size: size,
      theme: theme,
      userStyle: style
    });
  }

}

_defineProperty(Spinner, "propTypes", {
  style: PropTypes.object
});

_defineProperty(Spinner, "defaultProps", {
  style: {}
});

export default withTheme(Spinner);
//# sourceMappingURL=index.js.map