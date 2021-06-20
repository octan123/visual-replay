import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import styled from '@emotion/styled';
import { evaluateStyle } from '../shared/theme';
export const WrapperComponent = styled.div(props => _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
  display: 'flex',
  flexDirection: 'column'
}, evaluateStyle(props.userStyle, props)));
export const TableBody = styled.div(props => _objectSpread({
  flex: '1 1 auto'
}, evaluateStyle(props.userStyle, props)));
export const HeaderContainer = styled.div(props => _objectSpread({
  display: 'table',
  flex: '0 0 auto'
}, evaluateStyle(props.userStyle, props)));
export const HeaderCell = styled.div(props => _objectSpread({
  cursor: 'pointer',
  display: 'table-cell',
  position: 'relative',
  fontWeight: 'bold',
  background: props.isAscending || props.isDescending ? props.theme.controlColorActive : props.theme.controlColorPrimary,
  color: props.theme.textColorInvert,
  paddingTop: props.theme.spacingTiny,
  paddingBottom: props.theme.spacingTiny,
  paddingLeft: props.theme.spacingSmall,
  paddingRight: props.theme.spacingSmall,
  '&:hover': {
    background: props.theme.controlColorHovered
  }
}, evaluateStyle(props.userStyle, props)));
export const SortIcon = styled.div(props => _objectSpread({
  position: 'absolute',
  right: props.theme.spacingTiny,
  bottom: props.theme.spacingTiny
}, evaluateStyle(props.userStyle, props)));
export const TableRowComponent = styled.div(props => _objectSpread({
  position: 'relative',
  display: 'flex',
  alignItems: 'stretch',
  borderBottomStyle: 'solid',
  borderBottomWidth: 1,
  borderBottomColor: props.theme.controlColorSecondary
}, evaluateStyle(props.userStyle, props)));
export const TableCell = styled.div(props => _objectSpread({
  flex: '0 0 auto',
  overflow: 'hidden',
  boxSizing: 'border-box',
  position: 'relative',
  paddingTop: props.theme.spacingTiny,
  paddingBottom: props.theme.spacingTiny,
  paddingLeft: props.theme.spacingSmall,
  paddingRight: props.theme.spacingSmall,
  borderLeftStyle: 'solid',
  borderLeftWidth: props.index === 0 ? 0 : 1,
  borderLeftColor: props.theme.controlColorSecondary
}, evaluateStyle(props.userStyle, props)));
export const Expander = styled.div(props => _objectSpread({
  position: 'absolute',
  cursor: 'pointer',
  left: -props.theme.spacingSmall
}, evaluateStyle(props.userStyle, props)));
//# sourceMappingURL=styled-components.js.map