"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DARK_THEME = exports.LIGHT_THEME = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lightThemePrimitives = _interopRequireDefault(require("./light-theme-primitives"));

var _darkThemePrimitives = _interopRequireDefault(require("./dark-theme-primitives"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var LIGHT_THEME = _objectSpread(_objectSpread({}, _lightThemePrimitives["default"]), {}, {
  background: _lightThemePrimitives["default"].mono100,
  backgroundAlt: _lightThemePrimitives["default"].mono200,
  backgroundInvert: _lightThemePrimitives["default"].mono1000,
  controlColorPrimary: _lightThemePrimitives["default"].mono600,
  controlColorSecondary: _lightThemePrimitives["default"].mono500,
  controlColorHovered: _lightThemePrimitives["default"].mono900,
  controlColorActive: _lightThemePrimitives["default"].primary400,
  controlColorDisabled: _lightThemePrimitives["default"].mono400,
  textColorPrimary: _lightThemePrimitives["default"].mono900,
  textColorSecondary: _lightThemePrimitives["default"].mono600,
  textColorInvert: _lightThemePrimitives["default"].mono200,
  textColorDisabled: _lightThemePrimitives["default"].mono500,
  textColorWarning: _lightThemePrimitives["default"].warning400,
  textColorError: _lightThemePrimitives["default"].negative400,
  fontFamily: _lightThemePrimitives["default"].primaryFontFamily,
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: 1.5,
  transitionDuration: '300ms',
  transitionTimingFunction: 'ease',
  shadow: '0 2px 4px 0 rgba(0, 0, 0, 0.15)',
  controlSize: 18,
  spacingTiny: 4,
  spacingSmall: 8,
  spacingNormal: 12,
  spacingLarge: 24,
  spacingHuge: 48
});

exports.LIGHT_THEME = LIGHT_THEME;

var DARK_THEME = _objectSpread(_objectSpread({}, _darkThemePrimitives["default"]), {}, {
  background: _darkThemePrimitives["default"].mono1000,
  backgroundAlt: _darkThemePrimitives["default"].mono800,
  backgroundInvert: _darkThemePrimitives["default"].mono100,
  controlColorPrimary: _darkThemePrimitives["default"].mono400,
  controlColorSecondary: _darkThemePrimitives["default"].mono500,
  controlColorHovered: _darkThemePrimitives["default"].mono100,
  controlColorActive: _darkThemePrimitives["default"].primary300,
  controlColorDisabled: _darkThemePrimitives["default"].mono600,
  textColorPrimary: _darkThemePrimitives["default"].mono100,
  textColorSecondary: _darkThemePrimitives["default"].mono300,
  textColorInvert: _darkThemePrimitives["default"].mono800,
  textColorDisabled: _darkThemePrimitives["default"].mono500,
  textColorWarning: _darkThemePrimitives["default"].warning300,
  textColorError: _darkThemePrimitives["default"].negative300,
  fontFamily: _darkThemePrimitives["default"].primaryFontFamily,
  fontSize: 12,
  lineHeight: 1.5,
  transitionDuration: '300ms',
  transitionTimingFunction: 'ease',
  shadow: '0 2px 4px 0 rgba(0, 0, 0, 0.15)',
  controlSize: 18,
  spacingTiny: 4,
  spacingSmall: 8,
  spacingNormal: 12,
  spacingLarge: 24,
  spacingHuge: 48
});

exports.DARK_THEME = DARK_THEME;
//# sourceMappingURL=index.js.map