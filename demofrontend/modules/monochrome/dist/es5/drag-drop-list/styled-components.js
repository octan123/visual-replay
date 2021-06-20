"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItemPlaceholder = exports.ListItemTitle = exports.ListItemContainer = exports.ListContainer = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../shared/theme");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ListContainer = _styled["default"].div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    userSelect: 'none'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ListContainer = ListContainer;

var ListItemContainer = _styled["default"].div(function (props) {
  var style = props.isActive ? {
    boxSizing: 'border-box',
    position: 'fixed',
    zIndex: 999,
    transitionProperty: 'all',
    transitionTimingFunction: props.theme.transitionTimingFunction,
    transitionDuration: props.isDragging ? 0 : props.theme.transitionDuration,
    boxShadow: props.theme.shadow
  } : {};
  return Object.assign(style, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ListItemContainer = ListItemContainer;

var ListItemTitle = _styled["default"].div(function (props) {
  return _objectSpread({}, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ListItemTitle = ListItemTitle;

var ListItemPlaceholder = _styled["default"].div(function (props) {
  return _objectSpread({
    boxSizing: 'border-box',
    transitionProperty: 'height',
    transitionTimingFunction: props.theme.transitionTimingFunction,
    transitionDuration: props.theme.transitionDuration,
    borderStyle: 'dotted',
    borderColor: props.theme.controlColorPrimary,
    borderWidth: 2
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ListItemPlaceholder = ListItemPlaceholder;
//# sourceMappingURL=styled-components.js.map