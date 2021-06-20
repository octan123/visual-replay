"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _filterVertices = require("./filter-vertices");

var _parseXvizPrimitive = require("./parse-xviz-primitive");

var _base64Js = _interopRequireDefault(require("base64-js"));

function aliasId(primitive) {
  if (primitive && primitive.base && primitive.base.object_id) {
    primitive.id = primitive.base.object_id;
  }
}

var _default = {
  text: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.FEATURE,
    validate: function validate(primitive) {
      return true;
    },
    normalize: function normalize(primitive) {
      aliasId(primitive);
    }
  },
  circle: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.FEATURE,
    validate: function validate(primitive) {
      return primitive.center;
    },
    normalize: function normalize(primitive) {
      aliasId(primitive);
    }
  },
  stadium: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.FEATURE,
    validate: function validate(primitive) {
      return primitive.start && primitive.end;
    },
    normalize: function normalize(primitive) {
      aliasId(primitive);
    }
  },
  polyline: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.FEATURE,
    validate: function validate(primitive, streamName, time) {
      return primitive.vertices && primitive.vertices.length >= 2;
    },
    normalize: function normalize(primitive) {
      primitive.vertices = (0, _filterVertices.filterVertices)(primitive.vertices);
      aliasId(primitive);
    }
  },
  polygon: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.FEATURE,
    validate: function validate(primitive, streamName, time) {
      return primitive.vertices && primitive.vertices.length >= 3;
    },
    normalize: function normalize(primitive) {
      aliasId(primitive);
    }
  },
  point: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.POINTCLOUD,
    validate: function validate(primitive, streamName, time) {
      return primitive.points && primitive.points.length > 0;
    },
    normalize: function normalize(primitive) {
      primitive.vertices = primitive.points;
      aliasId(primitive);
    }
  },
  image: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.IMAGE,
    validate: function validate(primitive, streamName, time) {
      return primitive.data;
    },
    normalize: function normalize(primitive) {
      var imageData = primitive.data;
      delete primitive.data;

      if (typeof imageData === 'string') {
        imageData = _base64Js["default"].toByteArray(imageData);
      }

      var imgType = primitive.format ? "image/".concat(primitive.format) : null;
      primitive.imageData = imageData;
      primitive.imageType = imgType;

      if (primitive.position) {
        primitive.vertices = primitive.position;
      }

      aliasId(primitive);
    }
  }
};
exports["default"] = _default;
//# sourceMappingURL=xviz-primitives-v2.js.map