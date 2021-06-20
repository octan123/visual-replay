"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PRIMARY_POSE_STREAM = exports.PRIMITIVE_STYLE_MAP = exports.STYLES = exports.PRIMITIVE_TYPES = exports.CATEGORY = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _PRIMITIVE_STYLE_MAP;

var CATEGORY = {
  annotation: 'ANNOTATION',
  future_instance: 'FUTURE_INSTANCE',
  pose: 'POSE',
  primitive: 'PRIMITIVE',
  ui_primitive: 'UI_PRIMITIVE',
  time_series: 'TIME_SERIES',
  variable: 'VARIABLE',
  ANNOTATION: 'ANNOTATION',
  FUTURE_INSTANCE: 'FUTURE_INSTANCE',
  POSE: 'POSE',
  PRIMITIVE: 'PRIMITIVE',
  UI_PRIMITIVE: 'UI_PRIMITIVE',
  TIME_SERIES: 'TIME_SERIES',
  VARIABLE: 'VARIABLE'
};
exports.CATEGORY = CATEGORY;
var PRIMITIVE_TYPES = {
  circle: 'circle',
  image: 'image',
  point: 'point',
  polygon: 'polygon',
  polyline: 'polyline',
  stadium: 'stadium',
  text: 'text',
  treetable: 'treetable'
};
exports.PRIMITIVE_TYPES = PRIMITIVE_TYPES;
var STYLES = {
  stroke_color: 'stroke_color',
  fill_color: 'fill_color',
  radius: 'radius',
  radius_pixels: 'radius_pixels',
  radius_min_pixels: 'radius_min_pixels',
  radius_max_pixels: 'radius_max_pixels',
  stroke_width: 'stroke_width',
  stroke_width_min_pixels: 'stroke_width_min_pixels',
  stroke_width_max_pixels: 'stroke_width_max_pixels',
  height: 'height',
  opacity: 'opacity',
  stroked: 'stroked',
  filled: 'filled',
  extruded: 'extruded',
  font_family: 'font_family',
  font_weight: 'font_weight',
  text_size: 'text_size',
  text_rotation: 'text_rotation',
  text_anchor: 'text_anchor',
  text_baseline: 'text_baseline',
  point_color_mode: 'point_color_mode',
  point_color_domain: 'point_color_domain'
};
exports.STYLES = STYLES;
var PRIMITIVE_STYLE_MAP = (_PRIMITIVE_STYLE_MAP = {}, (0, _defineProperty2["default"])(_PRIMITIVE_STYLE_MAP, PRIMITIVE_TYPES.circle, [STYLES.opacity, STYLES.stroked, STYLES.filled, STYLES.stroke_color, STYLES.fill_color, STYLES.radius, STYLES.radius_min_pixels, STYLES.radius_max_pixels, STYLES.stroke_width, STYLES.stroke_width_min_pixels, STYLES.stroke_width_max_pixels]), (0, _defineProperty2["default"])(_PRIMITIVE_STYLE_MAP, PRIMITIVE_TYPES.point, [STYLES.opacity, STYLES.fill_color, STYLES.radius_pixels, STYLES.point_color_mode, STYLES.point_color_domain]), (0, _defineProperty2["default"])(_PRIMITIVE_STYLE_MAP, PRIMITIVE_TYPES.polygon, [STYLES.stroke_color, STYLES.fill_color, STYLES.stroke_width, STYLES.stroke_width_min_pixels, STYLES.stroke_width_max_pixels, STYLES.height, STYLES.opacity, STYLES.stroked, STYLES.filled, STYLES.extruded]), (0, _defineProperty2["default"])(_PRIMITIVE_STYLE_MAP, PRIMITIVE_TYPES.text, [STYLES.opacity, STYLES.font_family, STYLES.font_weight, STYLES.text_size, STYLES.text_rotation, STYLES.text_anchor, STYLES.text_baseline, STYLES.fill_color]), (0, _defineProperty2["default"])(_PRIMITIVE_STYLE_MAP, PRIMITIVE_TYPES.polyline, [STYLES.opacity, STYLES.stroke_color, STYLES.stroke_width, STYLES.stroke_width_min_pixels, STYLES.stroke_width_max_pixels]), (0, _defineProperty2["default"])(_PRIMITIVE_STYLE_MAP, PRIMITIVE_TYPES.stadium, [STYLES.opacity, STYLES.fill_color, STYLES.radius, STYLES.radius_min_pixels, STYLES.radius_max_pixels]), _PRIMITIVE_STYLE_MAP);
exports.PRIMITIVE_STYLE_MAP = PRIMITIVE_STYLE_MAP;
var PRIMARY_POSE_STREAM = '/vehicle_pose';
exports.PRIMARY_POSE_STREAM = PRIMARY_POSE_STREAM;
//# sourceMappingURL=constant.js.map