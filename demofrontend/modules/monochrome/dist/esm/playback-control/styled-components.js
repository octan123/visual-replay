import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import styled from '@emotion/styled';
import { evaluateStyle } from '../shared/theme';
export var WrapperComponent = styled.div(function (props) {
  var result = _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    boxSizing: 'border-box'
  });

  if (props.isPlaying) {
    result.div = {
      transitionDuration: '0s !important'
    };
  }

  return Object.assign(result, evaluateStyle(props.userStyle, props));
});
export var ControlsContainer = styled.div(function (props) {
  return _objectSpread({
    display: 'flex',
    alignItems: 'center',
    marginTop: props.theme.spacingTiny
  }, evaluateStyle(props.userStyle, props));
});
export var PlayPauseButton = styled.div(function (props) {
  return _objectSpread({
    width: 16,
    height: 16,
    marginLeft: props.compact ? 0 : -8,
    marginRight: props.theme.spacingSmall,
    cursor: 'pointer',
    color: props.theme.controlColorPrimary,
    '&:hover': {
      color: props.theme.controlColorHovered
    },
    path: {
      fill: 'currentColor'
    }
  }, evaluateStyle(props.userStyle, props));
});
export var Timestamp = styled.div(function (props) {
  return _objectSpread({}, evaluateStyle(props.userStyle, props));
});
export var TicksContainer = styled.div(function (props) {
  return _objectSpread({
    position: 'relative',
    height: 20
  }, evaluateStyle(props.userStyle, props));
});
export var Tick = styled.div(function (props) {
  return _objectSpread({
    height: 4,
    bottom: 0,
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    borderLeftColor: props.theme.controlColorSecondary
  }, evaluateStyle(props.userStyle, props));
});
export var TickLabel = styled.div(function (props) {
  return _objectSpread({
    transform: 'translate(-50%, -18px)'
  }, evaluateStyle(props.userStyle, props));
});
export var MarkersContainer = styled.div(function (props) {
  return _objectSpread({
    position: 'relative',
    height: 3
  }, evaluateStyle(props.userStyle, props));
});
export var MarkerComponent = styled.div(function (props) {
  return _objectSpread({
    height: '100%'
  }, evaluateStyle(props.userStyle, props));
});
export var BufferComponent = styled.div(function (props) {
  return _objectSpread({
    height: '100%',
    background: props.theme.controlColorHovered
  }, evaluateStyle(props.userStyle, props));
});
//# sourceMappingURL=styled-components.js.map