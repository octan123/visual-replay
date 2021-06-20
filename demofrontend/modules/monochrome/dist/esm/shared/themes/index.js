import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import lightPrimitives from './light-theme-primitives';
import darkPrimitives from './dark-theme-primitives';
export var LIGHT_THEME = _objectSpread(_objectSpread({}, lightPrimitives), {}, {
  background: lightPrimitives.mono100,
  backgroundAlt: lightPrimitives.mono200,
  backgroundInvert: lightPrimitives.mono1000,
  controlColorPrimary: lightPrimitives.mono600,
  controlColorSecondary: lightPrimitives.mono500,
  controlColorHovered: lightPrimitives.mono900,
  controlColorActive: lightPrimitives.primary400,
  controlColorDisabled: lightPrimitives.mono400,
  textColorPrimary: lightPrimitives.mono900,
  textColorSecondary: lightPrimitives.mono600,
  textColorInvert: lightPrimitives.mono200,
  textColorDisabled: lightPrimitives.mono500,
  textColorWarning: lightPrimitives.warning400,
  textColorError: lightPrimitives.negative400,
  fontFamily: lightPrimitives.primaryFontFamily,
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
export var DARK_THEME = _objectSpread(_objectSpread({}, darkPrimitives), {}, {
  background: darkPrimitives.mono1000,
  backgroundAlt: darkPrimitives.mono800,
  backgroundInvert: darkPrimitives.mono100,
  controlColorPrimary: darkPrimitives.mono400,
  controlColorSecondary: darkPrimitives.mono500,
  controlColorHovered: darkPrimitives.mono100,
  controlColorActive: darkPrimitives.primary300,
  controlColorDisabled: darkPrimitives.mono600,
  textColorPrimary: darkPrimitives.mono100,
  textColorSecondary: darkPrimitives.mono300,
  textColorInvert: darkPrimitives.mono800,
  textColorDisabled: darkPrimitives.mono500,
  textColorWarning: darkPrimitives.warning300,
  textColorError: darkPrimitives.negative300,
  fontFamily: darkPrimitives.primaryFontFamily,
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
//# sourceMappingURL=index.js.map