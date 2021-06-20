"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Separator = exports.Heading = exports.Title = exports.Expander = exports.Container = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../shared/theme");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Container = _styled["default"].div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Container = Container;

var Expander = _styled["default"].div(function (props) {
  return _objectSpread({
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
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Expander = Expander;

var Title = _styled["default"].div(function (props) {
  return _objectSpread({
    marginTop: props.theme.spacingNormal,
    marginBottom: props.theme.spacingNormal,
    fontSize: props.theme.fontSize * 2,
    fontWeight: 200
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Title = Title;

var Heading = _styled["default"].div(function (props) {
  return _objectSpread({
    marginTop: props.theme.spacingNormal,
    marginBottom: props.theme.spacingNormal,
    fontSize: props.theme.fontSize * 1.2,
    fontWeight: 600
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Heading = Heading;

var Separator = _styled["default"].div(function (props) {
  return _objectSpread({
    width: '100%',
    height: 1,
    background: props.theme.controlColorSecondary
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Separator = Separator;
//# sourceMappingURL=styled-components.js.map