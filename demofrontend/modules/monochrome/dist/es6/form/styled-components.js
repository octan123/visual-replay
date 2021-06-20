import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import styled from '@emotion/styled';
import { evaluateStyle } from '../shared/theme';
export const Container = styled.div(props => _objectSpread(_objectSpread({}, props.theme.__reset__), evaluateStyle(props.userStyle, props)));
export const Expander = styled.div(props => _objectSpread({
  position: 'absolute',
  cursor: 'pointer',
  left: -20,
  top: 4,
  width: 16,
  height: 16,
  color: props.theme.controlColorPrimary,
  '&:hover': {
    color: props.theme.controlColorHovered
  },
  path: {
    fill: 'currentColor'
  }
}, evaluateStyle(props.userStyle, props)));
export const Title = styled.div(props => _objectSpread({
  marginTop: props.theme.spacingNormal,
  marginBottom: props.theme.spacingNormal,
  fontSize: props.theme.fontSize * 2,
  fontWeight: 200
}, evaluateStyle(props.userStyle, props)));
export const Heading = styled.div(props => _objectSpread({
  marginTop: props.theme.spacingNormal,
  marginBottom: props.theme.spacingNormal,
  fontSize: props.theme.fontSize * 1.2,
  fontWeight: 600
}, evaluateStyle(props.userStyle, props)));
export const Separator = styled.div(props => _objectSpread({
  width: '100%',
  height: 1,
  background: props.theme.controlColorSecondary
}, evaluateStyle(props.userStyle, props)));
//# sourceMappingURL=styled-components.js.map