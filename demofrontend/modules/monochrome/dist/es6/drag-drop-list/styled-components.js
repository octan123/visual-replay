import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import styled from '@emotion/styled';
import { evaluateStyle } from '../shared/theme';
export const ListContainer = styled.div(props => _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
  userSelect: 'none'
}, evaluateStyle(props.userStyle, props)));
export const ListItemContainer = styled.div(props => {
  const style = props.isActive ? {
    boxSizing: 'border-box',
    position: 'fixed',
    zIndex: 999,
    transitionProperty: 'all',
    transitionTimingFunction: props.theme.transitionTimingFunction,
    transitionDuration: props.isDragging ? 0 : props.theme.transitionDuration,
    boxShadow: props.theme.shadow
  } : {};
  return Object.assign(style, evaluateStyle(props.userStyle, props));
});
export const ListItemTitle = styled.div(props => _objectSpread({}, evaluateStyle(props.userStyle, props)));
export const ListItemPlaceholder = styled.div(props => _objectSpread({
  boxSizing: 'border-box',
  transitionProperty: 'height',
  transitionTimingFunction: props.theme.transitionTimingFunction,
  transitionDuration: props.theme.transitionDuration,
  borderStyle: 'dotted',
  borderColor: props.theme.controlColorPrimary,
  borderWidth: 2
}, evaluateStyle(props.userStyle, props)));
//# sourceMappingURL=styled-components.js.map