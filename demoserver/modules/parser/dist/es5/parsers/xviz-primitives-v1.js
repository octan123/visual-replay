"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _filterVertices = require("./filter-vertices");

var _parseXvizPrimitive = require("./parse-xviz-primitive");

var _default = {
  text: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.LABEL,
    validate: function validate(primitive) {
      return true;
    }
  },
  tree_table: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.COMPONENT,
    validate: function validate(primitive) {
      return true;
    }
  },
  points3d: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.POINTCLOUD,
    validate: function validate(primitive, streamName, time) {
      return primitive.vertices && primitive.vertices.length > 0;
    }
  },
  points2d: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.FEATURE,
    validate: function validate(primitive, streamName, time) {
      return primitive.vertices && primitive.vertices.length > 0;
    },
    normalize: function normalize(primitive) {
      for (var i = 0; i < primitive.vertices.length; i++) {
        primitive.vertices[i][2] = 0;
      }
    }
  },
  point2d: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.FEATURE,
    enableZOffSet: true,
    validate: function validate(primitive, streamName, time) {
      return primitive.vertices && primitive.vertices.length === 1;
    },
    normalize: function normalize(primitive) {
      primitive.vertices = primitive.vertices[0];
    }
  },
  line2d: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.FEATURE,
    enableZOffset: true,
    validate: function validate(primitive, streamName, time) {
      return primitive.vertices && primitive.vertices.length >= 2 && streamName !== '/route_follower/kickout/object/velocity';
    },
    normalize: function normalize(primitive) {
      primitive.vertices = (0, _filterVertices.filterVertices)(primitive.vertices);
    }
  },
  polygon2d: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.FEATURE,
    enableZOffset: true,
    validate: function validate(primitive, streamName, time) {
      return primitive.vertices && primitive.vertices.length >= 3;
    },
    normalize: function normalize(primitive) {
      if (Array.isArray(primitive.vertices)) {
        primitive.vertices.push(primitive.vertices[0]);
      }
    }
  },
  circle: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.FEATURE,
    enableZOffset: true,
    validate: function validate(primitive, streamName, time) {
      return primitive.vertices && primitive.vertices.length > 0;
    }
  },
  circle2d: {
    category: _parseXvizPrimitive.PRIMITIVE_CAT.FEATURE,
    enableZOffset: true,
    validate: function validate(primitive, streamName, time) {
      return primitive.center;
    },
    normalize: function normalize(primitive) {
      primitive.vertices = primitive.center;
    }
  }
};
exports["default"] = _default;
//# sourceMappingURL=xviz-primitives-v1.js.map