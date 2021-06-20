"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Expander = exports.TableCell = exports.TableRowComponent = exports.SortIcon = exports.HeaderCell = exports.HeaderContainer = exports.TableBody = exports.WrapperComponent = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../shared/theme");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var WrapperComponent = _styled["default"].div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    display: 'flex',
    flexDirection: 'column'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.WrapperComponent = WrapperComponent;

var TableBody = _styled["default"].div(function (props) {
  return _objectSpread({
    flex: '1 1 auto'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.TableBody = TableBody;

var HeaderContainer = _styled["default"].div(function (props) {
  return _objectSpread({
    display: 'table',
    flex: '0 0 auto'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.HeaderContainer = HeaderContainer;

var HeaderCell = _styled["default"].div(function (props) {
  return _objectSpread({
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
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.HeaderCell = HeaderCell;

var SortIcon = _styled["default"].div(function (props) {
  return _objectSpread({
    position: 'absolute',
    right: props.theme.spacingTiny,
    bottom: props.theme.spacingTiny
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.SortIcon = SortIcon;

var TableRowComponent = _styled["default"].div(function (props) {
  return _objectSpread({
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: props.theme.controlColorSecondary
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.TableRowComponent = TableRowComponent;

var TableCell = _styled["default"].div(function (props) {
  return _objectSpread({
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
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.TableCell = TableCell;

var Expander = _styled["default"].div(function (props) {
  return _objectSpread({
    position: 'absolute',
    cursor: 'pointer',
    left: -props.theme.spacingSmall
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Expander = Expander;
//# sourceMappingURL=styled-components.js.map