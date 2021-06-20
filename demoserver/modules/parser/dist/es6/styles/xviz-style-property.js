import Color from 'color';
import log from '../utils/log';

function getColor(value) {
  if (typeof value === 'string') {
    try {
      const color = Color.rgb(value).array();

      if (Number.isFinite(color[3])) {
        color[3] *= 255;
      }

      return color;
    } catch (error) {
      return null;
    }
  }

  if (Array.isArray(value) && Number.isFinite(value[0])) {
    return value;
  }

  if (ArrayBuffer.isView(value) && Number.isFinite(value[0])) {
    return value;
  }

  return null;
}

function getNumber(value) {
  switch (typeof value) {
    case 'string':
      value = Number(value);
      return isNaN(value) ? null : value;

    case 'number':
      return value;

    default:
      return null;
  }
}

function getBool(value) {
  switch (typeof value) {
    case 'boolean':
      return value;

    case 'string':
      return value.toLowerCase() !== 'false';

    case 'number':
      return Boolean(value);

    default:
      return null;
  }
}

const IDENTITY = x => x;

const PROPERTY_FORMATTERS = {
  opacity: getNumber,
  stroked: getBool,
  filled: getBool,
  extruded: getBool,
  height: getNumber,
  stroke_color: getColor,
  fill_color: getColor,
  font_family: String,
  font_weight: String,
  text_size: getNumber,
  text_rotation: getNumber,
  text_anchor: String,
  text_baseline: String,
  radius: getNumber,
  radius_min_pixels: getNumber,
  radius_max_pixels: getNumber,
  stroke_width: getNumber,
  stroke_width_min_pixels: getNumber,
  stroke_width_max_pixels: getNumber
};
const DEFAULT_STYLES = {
  opacity: 1,
  stroked: true,
  filled: true,
  extruded: false,
  height: 0,
  stroke_color: [0, 0, 0],
  fill_color: [255, 255, 255],
  font_family: 'Arial',
  font_weight: 'normal',
  text_size: 12,
  text_rotation: 0,
  text_anchor: 'MIDDLE',
  text_baseline: 'CENTER',
  radius: 1,
  radius_pixels: 1,
  radius_min_pixels: 0,
  radius_max_pixels: Number.MAX_SAFE_INTEGER,
  stroke_width: 0.1,
  stroke_width_min_pixels: 0,
  stroke_width_max_pixels: Number.MAX_SAFE_INTEGER,
  point_color_mode: 'DEFAULT',
  point_color_domain: stylesheet => {
    let colorMode = stylesheet.getProperty('point_color_mode');

    if (colorMode) {
      colorMode = colorMode.toUpperCase();
    }

    switch (colorMode) {
      case 'ELEVATION':
        return [0, 3];

      case 'DISTANCE_TO_VEHICLE':
        return [0, 60];

      default:
        return [0, 0];
    }
  }
};
export default class XVIZStyleProperty {
  static getDefault(key) {
    return DEFAULT_STYLES[key];
  }

  static formatValue(key, value) {
    const formatter = PROPERTY_FORMATTERS[key] || IDENTITY;
    return formatter(value);
  }

  constructor(key, value) {
    this.key = key;
    const formatter = PROPERTY_FORMATTERS[key] || IDENTITY;
    this._value = formatter(value);

    if (this._value === null && Array.isArray(value)) {
      if (value.length > 1) {
        this._value = value.map(formatter);
        this._valueCount = value.length;
      } else {
        this._value = formatter(value[0]);
      }
    }

    if (this._value === null) {
      log.warn("illegal ".concat(key, " value: ").concat(value))();
    }
  }

  getValue(context) {
    if (this._valueCount) {
      const index = (context.index || 0) % this._valueCount;
      return this._value[index];
    }

    return this._value;
  }

}
//# sourceMappingURL=xviz-style-property.js.map