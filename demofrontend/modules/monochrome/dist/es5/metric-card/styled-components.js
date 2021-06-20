"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterLegend = exports.FilterItem = exports.FilterToggle = exports.FilterContainer = exports.CrosshairItemLegend = exports.CrosshairItemValue = exports.CrosshairItemTitle = exports.ChartContainer = exports.ErrorMessage = exports.CardTitle = exports.CardContainer = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../shared/theme");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CardContainer = _styled["default"].div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    position: 'relative',
    fontSize: props.theme.fontSize
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.CardContainer = CardContainer;

var CardTitle = _styled["default"].div(function (props) {
  return _objectSpread({
    textAlign: 'center',
    fontWeight: 200,
    fontSize: '1.6em',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.CardTitle = CardTitle;

var ErrorMessage = _styled["default"].div(function (props) {
  return _objectSpread({
    fontWeight: 'bold',
    textAlign: 'center',
    margin: props.theme.spacingNormal,
    color: props.theme.textColorError
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ErrorMessage = ErrorMessage;

var ChartContainer = _styled["default"].div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    cursor: 'pointer',
    background: props.theme.background,
    '.rv-xy-plot': {
      color: props.theme.textColorPrimary,
      position: 'relative'
    },
    '.rv-xy-plot__inner': {
      display: 'block',
      position: 'relative',
      zIndex: 1
    },
    '.rv-xy-plot__axis__line': {
      display: 'none'
    },
    '.rv-xy-plot__axis__tick__line': {
      display: 'none'
    },
    '.rv-xy-plot__axis__tick__text': {
      fill: props.theme.textColorPrimary,
      fontSize: '0.8em'
    },
    '.rv-xy-plot__series, .rv-xy-plot__series path': {
      pointerEvents: 'all'
    },
    '.rv-xy-plot__series--line': {
      fill: 'none',
      stroke: '#000',
      strokeWidth: 2
    },
    '.rv-xy-plot__grid-lines__line': {
      stroke: props.theme.textColorSecondary,
      strokeDasharray: '1,2'
    },
    '.rv-xy-plot__series--mark circle': {
      pointerEvents: 'none'
    },
    '.rv-crosshair': {
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: props.theme.fontSize
    },
    '.rv-crosshair__line': {
      background: props.theme.textColorPrimary,
      width: 1
    },
    '.rv-crosshair__inner': {
      zIndex: 2,
      margin: -6,
      transform: 'translateY(100%)',
      bottom: 0,
      display: 'none',
      position: 'absolute',
      textAlign: 'left'
    },
    '&:hover .rv-crosshair__inner': {
      display: 'block'
    },
    '.rv-crosshair__inner__content': _objectSpread({
      borderRadius: 2,
      background: props.theme.backgroundInvert,
      color: props.theme.textColorInvert,
      padding: props.theme.spacingSmall,
      boxShadow: props.theme.shadow
    }, (0, _theme.evaluateStyle)(props.tooltipStyle, props)),
    '.rv-crosshair__item': {
      whiteSpace: 'nowrap',
      fontSize: '0.9em',
      lineHeight: '18px',
      position: 'relative'
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ChartContainer = ChartContainer;

var CrosshairItemTitle = _styled["default"].span(function (props) {
  return _objectSpread({
    fontWeight: 'bold',
    marginRight: props.theme.spacingTiny
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.CrosshairItemTitle = CrosshairItemTitle;

var CrosshairItemValue = _styled["default"].span(function (props) {
  return _objectSpread({
    span: {
      color: props.theme.textColorSecondary,
      marginLeft: props.theme.spacingTiny
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.CrosshairItemValue = CrosshairItemValue;

var CrosshairItemLegend = _styled["default"].div(function (props) {
  var style = {
    background: props.color,
    width: 4,
    left: -10,
    height: 18,
    top: 0,
    bottom: 0,
    position: 'absolute'
  };

  if (props.isFirst) {
    style.height += props.theme.spacingSmall;
    style.top = -props.theme.spacingSmall;
    style.borderTopLeftRadius = 4;
  }

  if (props.isLast) {
    style.height += props.theme.spacingSmall;
    style.bottom = -props.theme.spacingSmall;
    style.borderBottomLeftRadius = 4;
  }

  return Object.assign(style, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.CrosshairItemLegend = CrosshairItemLegend;

var FilterContainer = _styled["default"].div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    position: 'relative',
    paddingLeft: props.theme.spacingLarge,
    fontSize: props.theme.fontSize
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.FilterContainer = FilterContainer;

var FilterToggle = _styled["default"].div(function (props) {
  return _objectSpread({
    position: 'absolute',
    left: 0,
    cursor: 'pointer',
    fontWeight: 'bold',
    width: 16,
    height: 16
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.FilterToggle = FilterToggle;

var FilterItem = _styled["default"].div(function (props) {
  return _objectSpread({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: props.theme.spacingTiny,
    fontWeight: props.isHovered ? 'bold' : 'normal',
    color: props.isActive ? props.theme.textColorPrimary : props.theme.textColorDisabled
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.FilterItem = FilterItem;

var FilterLegend = _styled["default"].div(function (props) {
  return _objectSpread({
    display: 'inline-block',
    width: 16,
    height: 16,
    textAlign: 'center',
    lineHeight: '16px',
    marginRight: props.theme.spacingSmall,
    color: props.isActive ? props.color : props.theme.textColorDisabled,
    path: {
      fill: 'currentColor'
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.FilterLegend = FilterLegend;
//# sourceMappingURL=styled-components.js.map