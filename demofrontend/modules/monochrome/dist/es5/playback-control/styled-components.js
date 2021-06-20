"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BufferComponent = exports.MarkerComponent = exports.MarkersContainer = exports.TickLabel = exports.Tick = exports.TicksContainer = exports.Timestamp = exports.PlayPauseButton = exports.ControlsContainer = exports.WrapperComponent = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../shared/theme");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var WrapperComponent = _styled["default"].div(function (props) {
  var result = _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    boxSizing: 'border-box'
  });

  if (props.isPlaying) {
    result.div = {
      transitionDuration: '0s !important'
    };
  }

  return Object.assign(result, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.WrapperComponent = WrapperComponent;

var ControlsContainer = _styled["default"].div(function (props) {
  return _objectSpread({
    display: 'flex',
    alignItems: 'center',
    marginTop: props.theme.spacingTiny
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ControlsContainer = ControlsContainer;

var PlayPauseButton = _styled["default"].div(function (props) {
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
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.PlayPauseButton = PlayPauseButton;

var Timestamp = _styled["default"].div(function (props) {
  return _objectSpread({}, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Timestamp = Timestamp;

var TicksContainer = _styled["default"].div(function (props) {
  return _objectSpread({
    position: 'relative',
    height: 20
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.TicksContainer = TicksContainer;

var Tick = _styled["default"].div(function (props) {
  return _objectSpread({
    height: 4,
    bottom: 0,
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    borderLeftColor: props.theme.controlColorSecondary
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Tick = Tick;

var TickLabel = _styled["default"].div(function (props) {
  return _objectSpread({
    transform: 'translate(-50%, -18px)'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.TickLabel = TickLabel;

var MarkersContainer = _styled["default"].div(function (props) {
  return _objectSpread({
    position: 'relative',
    height: 3
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.MarkersContainer = MarkersContainer;

var MarkerComponent = _styled["default"].div(function (props) {
  return _objectSpread({
    height: '100%'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.MarkerComponent = MarkerComponent;

var BufferComponent = _styled["default"].div(function (props) {
  return _objectSpread({
    height: '100%',
    background: props.theme.controlColorHovered
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.BufferComponent = BufferComponent;
//# sourceMappingURL=styled-components.js.map