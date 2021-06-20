import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import XVIZBaseBuilder from './xviz-base-builder';
import { CATEGORY, PRIMITIVE_TYPES } from './constant';
export default class XVIZPrimitiveBuilder extends XVIZBaseBuilder {
  constructor(props) {
    super(_objectSpread({
      category: CATEGORY.PRIMITIVE
    }, props));
    this.reset();
    this._primitives = {};
  }

  image(data) {
    if (this._type) {
      this._flush();
    }

    if (!(data instanceof Uint8Array || typeof data === 'string')) {
      this.validateError('An image data must be a string or Uint8Array.');
    }

    this.validatePropSetOnce('_image');
    this._type = PRIMITIVE_TYPES.image;
    this._image = {
      data
    };
    return this;
  }

  dimensions(widthPixel = null, heightPixel = null) {
    if (!this._image) {
      this.validateError('An image needs to be set first.');
    }

    this._image.width_px = widthPixel;
    this._image.height_px = heightPixel;
    return this;
  }

  polygon(vertices) {
    if (this._type) {
      this._flush();
    }

    this.validatePropSetOnce('_vertices');
    this._vertices = vertices;
    this._type = PRIMITIVE_TYPES.polygon;
    return this;
  }

  polyline(vertices) {
    if (this._type) {
      this._flush();
    }

    this.validatePropSetOnce('_vertices');
    this._vertices = vertices;
    this._type = PRIMITIVE_TYPES.polyline;
    return this;
  }

  points(vertices) {
    if (this._type) {
      this._flush();
    }

    this.validatePropSetOnce('_vertices');
    this._vertices = vertices;
    this._type = PRIMITIVE_TYPES.point;
    return this;
  }

  circle(position, radius) {
    if (this._type) {
      this._flush();
    }

    this.validatePropSetOnce('_radius');
    this.position(position);
    this._radius = radius;
    this._type = PRIMITIVE_TYPES.circle;
    return this;
  }

  stadium(start, end, radius) {
    if (this._type) {
      this._flush();
    }

    this.validatePropSetOnce('_radius');

    if (start.length !== 3) {
      this.validateError("The start position must be of the form [x, y, z] where ".concat(start, " was provided"));
    }

    if (end.length !== 3) {
      this.validateError("The end position must be of the form [x, y, z] where ".concat(end, " was provided"));
    }

    this._vertices = [start, end];
    this._radius = radius;
    this._type = PRIMITIVE_TYPES.stadium;
    return this;
  }

  text(message) {
    if (this._type) {
      this._flush();
    }

    this._text = message;
    this._type = 'text';
    return this;
  }

  position(point) {
    this.validatePropSetOnce('_vertices');

    if (point.length !== 3) {
      this.validateError("A position must be of the form [x, y, z] where ".concat(point, " was provided"));
    }

    this._vertices = [point];
    return this;
  }

  colors(colorArray) {
    this.validatePropSetOnce('_colors');
    this._colors = colorArray;
    return this;
  }

  style(style) {
    this._validatePrerequisite();

    this.validatePropSetOnce('_style');
    this._style = style;

    this._validateStyle();

    return this;
  }

  id(identifier) {
    this._validatePrerequisite();

    this.validatePropSetOnce('_id');
    this._id = identifier;
    return this;
  }

  classes(classList) {
    this._validatePrerequisite();

    this.validatePropSetOnce('_classes');
    this._classes = classList;
    return this;
  }

  _validate() {
    super._validate();

    const isImage = this._type === PRIMITIVE_TYPES.image;

    if (isImage && (!this._image || !this._image.data)) {
      this.validateWarn("Stream ".concat(this._streamId, " image data are not provided."));
    }

    if (!isImage && !this._vertices) {
      this.validateWarn("Stream ".concat(this._streamId, " primitives vertices are not provided."));
    }
  }

  _flush() {
    this._validate();

    this._flushPrimitives();
  }

  getData() {
    if (this._type) {
      this._flush();
    }

    if (Object.keys(this._primitives).length === 0) {
      return null;
    }

    return this._primitives;
  }

  _validatePrerequisite() {
    if (!this._type) {
      this.validateError('Start from a primitive first, e.g polygon(), image(), etc.');
    }
  }

  _flushPrimitives() {
    let stream = this._primitives[this._streamId];

    if (!stream) {
      stream = {};
      this._primitives[this._streamId] = stream;
    }

    const primitive = this._formatPrimitive();

    const arrayFieldName = "".concat(this._type, "s");
    let array = stream[arrayFieldName];

    if (array === undefined) {
      array = [];
      stream[arrayFieldName] = array;
    }

    array.push(primitive);
    this.reset();
  }

  _formatPrimitive() {
    const obj = {};

    switch (this._type) {
      case 'polygon':
      case 'polyline':
        obj.vertices = this._vertices;
        break;

      case 'point':
        if (this._colors) {
          obj.colors = this._colors;
        }

        obj.points = this._vertices;
        break;

      case 'text':
        obj.position = this._vertices[0];
        obj.text = this._text;
        break;

      case 'circle':
        obj.center = this._vertices[0];
        obj.radius = this._radius;
        break;

      case 'stadium':
        obj.start = this._vertices[0];
        obj.end = this._vertices[1];
        obj.radius = this._radius;
        break;

      case 'image':
        if (this._vertices) {
          this._image.position = this._vertices[0];
        }

        Object.assign(obj, this._image);
        break;

      default:
    }

    let haveBase = false;
    const base = {};

    if (this._id) {
      haveBase = true;
      base.object_id = this._id;
    }

    if (this._style) {
      haveBase = true;
      base.style = this._style;
    }

    if (this._classes) {
      haveBase = true;
      base.classes = this._classes;
    }

    if (haveBase) {
      obj.base = base;
    }

    return obj;
  }

  _validateStyle() {
    this._validator.validateStyle(this);
  }

  reset() {
    this._type = null;
    this._image = null;
    this._vertices = null;
    this._radius = null;
    this._text = null;
    this._colors = null;
    this._id = null;
    this._style = null;
    this._classes = null;
  }

}
//# sourceMappingURL=xviz-primitive-builder.js.map