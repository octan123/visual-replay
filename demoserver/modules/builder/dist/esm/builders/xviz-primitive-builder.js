import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import XVIZBaseBuilder from './xviz-base-builder';
import { CATEGORY, PRIMITIVE_TYPES } from './constant';

var XVIZPrimitiveBuilder = function (_XVIZBaseBuilder) {
  _inherits(XVIZPrimitiveBuilder, _XVIZBaseBuilder);

  var _super = _createSuper(XVIZPrimitiveBuilder);

  function XVIZPrimitiveBuilder(props) {
    var _this;

    _classCallCheck(this, XVIZPrimitiveBuilder);

    _this = _super.call(this, _objectSpread({
      category: CATEGORY.PRIMITIVE
    }, props));

    _this.reset();

    _this._primitives = {};
    return _this;
  }

  _createClass(XVIZPrimitiveBuilder, [{
    key: "image",
    value: function image(data) {
      if (this._type) {
        this._flush();
      }

      if (!(data instanceof Uint8Array || typeof data === 'string')) {
        this.validateError('An image data must be a string or Uint8Array.');
      }

      this.validatePropSetOnce('_image');
      this._type = PRIMITIVE_TYPES.image;
      this._image = {
        data: data
      };
      return this;
    }
  }, {
    key: "dimensions",
    value: function dimensions() {
      var widthPixel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var heightPixel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!this._image) {
        this.validateError('An image needs to be set first.');
      }

      this._image.width_px = widthPixel;
      this._image.height_px = heightPixel;
      return this;
    }
  }, {
    key: "polygon",
    value: function polygon(vertices) {
      if (this._type) {
        this._flush();
      }

      this.validatePropSetOnce('_vertices');
      this._vertices = vertices;
      this._type = PRIMITIVE_TYPES.polygon;
      return this;
    }
  }, {
    key: "polyline",
    value: function polyline(vertices) {
      if (this._type) {
        this._flush();
      }

      this.validatePropSetOnce('_vertices');
      this._vertices = vertices;
      this._type = PRIMITIVE_TYPES.polyline;
      return this;
    }
  }, {
    key: "points",
    value: function points(vertices) {
      if (this._type) {
        this._flush();
      }

      this.validatePropSetOnce('_vertices');
      this._vertices = vertices;
      this._type = PRIMITIVE_TYPES.point;
      return this;
    }
  }, {
    key: "circle",
    value: function circle(position, radius) {
      if (this._type) {
        this._flush();
      }

      this.validatePropSetOnce('_radius');
      this.position(position);
      this._radius = radius;
      this._type = PRIMITIVE_TYPES.circle;
      return this;
    }
  }, {
    key: "stadium",
    value: function stadium(start, end, radius) {
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
  }, {
    key: "text",
    value: function text(message) {
      if (this._type) {
        this._flush();
      }

      this._text = message;
      this._type = 'text';
      return this;
    }
  }, {
    key: "position",
    value: function position(point) {
      this.validatePropSetOnce('_vertices');

      if (point.length !== 3) {
        this.validateError("A position must be of the form [x, y, z] where ".concat(point, " was provided"));
      }

      this._vertices = [point];
      return this;
    }
  }, {
    key: "colors",
    value: function colors(colorArray) {
      this.validatePropSetOnce('_colors');
      this._colors = colorArray;
      return this;
    }
  }, {
    key: "style",
    value: function style(_style) {
      this._validatePrerequisite();

      this.validatePropSetOnce('_style');
      this._style = _style;

      this._validateStyle();

      return this;
    }
  }, {
    key: "id",
    value: function id(identifier) {
      this._validatePrerequisite();

      this.validatePropSetOnce('_id');
      this._id = identifier;
      return this;
    }
  }, {
    key: "classes",
    value: function classes(classList) {
      this._validatePrerequisite();

      this.validatePropSetOnce('_classes');
      this._classes = classList;
      return this;
    }
  }, {
    key: "_validate",
    value: function _validate() {
      _get(_getPrototypeOf(XVIZPrimitiveBuilder.prototype), "_validate", this).call(this);

      var isImage = this._type === PRIMITIVE_TYPES.image;

      if (isImage && (!this._image || !this._image.data)) {
        this.validateWarn("Stream ".concat(this._streamId, " image data are not provided."));
      }

      if (!isImage && !this._vertices) {
        this.validateWarn("Stream ".concat(this._streamId, " primitives vertices are not provided."));
      }
    }
  }, {
    key: "_flush",
    value: function _flush() {
      this._validate();

      this._flushPrimitives();
    }
  }, {
    key: "getData",
    value: function getData() {
      if (this._type) {
        this._flush();
      }

      if (Object.keys(this._primitives).length === 0) {
        return null;
      }

      return this._primitives;
    }
  }, {
    key: "_validatePrerequisite",
    value: function _validatePrerequisite() {
      if (!this._type) {
        this.validateError('Start from a primitive first, e.g polygon(), image(), etc.');
      }
    }
  }, {
    key: "_flushPrimitives",
    value: function _flushPrimitives() {
      var stream = this._primitives[this._streamId];

      if (!stream) {
        stream = {};
        this._primitives[this._streamId] = stream;
      }

      var primitive = this._formatPrimitive();

      var arrayFieldName = "".concat(this._type, "s");
      var array = stream[arrayFieldName];

      if (array === undefined) {
        array = [];
        stream[arrayFieldName] = array;
      }

      array.push(primitive);
      this.reset();
    }
  }, {
    key: "_formatPrimitive",
    value: function _formatPrimitive() {
      var obj = {};

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

      var haveBase = false;
      var base = {};

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
  }, {
    key: "_validateStyle",
    value: function _validateStyle() {
      this._validator.validateStyle(this);
    }
  }, {
    key: "reset",
    value: function reset() {
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
  }]);

  return XVIZPrimitiveBuilder;
}(XVIZBaseBuilder);

export { XVIZPrimitiveBuilder as default };
//# sourceMappingURL=xviz-primitive-builder.js.map