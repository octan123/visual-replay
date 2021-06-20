import { filterVertices } from './filter-vertices';
import { PRIMITIVE_CAT } from './parse-xviz-primitive';
export default {
  text: {
    category: PRIMITIVE_CAT.LABEL,
    validate: primitive => true
  },
  tree_table: {
    category: PRIMITIVE_CAT.COMPONENT,
    validate: primitive => true
  },
  points3d: {
    category: PRIMITIVE_CAT.POINTCLOUD,
    validate: (primitive, streamName, time) => primitive.vertices && primitive.vertices.length > 0
  },
  points2d: {
    category: PRIMITIVE_CAT.FEATURE,
    validate: (primitive, streamName, time) => primitive.vertices && primitive.vertices.length > 0,
    normalize: primitive => {
      for (let i = 0; i < primitive.vertices.length; i++) {
        primitive.vertices[i][2] = 0;
      }
    }
  },
  point2d: {
    category: PRIMITIVE_CAT.FEATURE,
    enableZOffSet: true,
    validate: (primitive, streamName, time) => primitive.vertices && primitive.vertices.length === 1,
    normalize: primitive => {
      primitive.vertices = primitive.vertices[0];
    }
  },
  line2d: {
    category: PRIMITIVE_CAT.FEATURE,
    enableZOffset: true,
    validate: (primitive, streamName, time) => primitive.vertices && primitive.vertices.length >= 2 && streamName !== '/route_follower/kickout/object/velocity',
    normalize: primitive => {
      primitive.vertices = filterVertices(primitive.vertices);
    }
  },
  polygon2d: {
    category: PRIMITIVE_CAT.FEATURE,
    enableZOffset: true,
    validate: (primitive, streamName, time) => primitive.vertices && primitive.vertices.length >= 3,
    normalize: primitive => {
      if (Array.isArray(primitive.vertices)) {
        primitive.vertices.push(primitive.vertices[0]);
      }
    }
  },
  circle: {
    category: PRIMITIVE_CAT.FEATURE,
    enableZOffset: true,
    validate: (primitive, streamName, time) => primitive.vertices && primitive.vertices.length > 0
  },
  circle2d: {
    category: PRIMITIVE_CAT.FEATURE,
    enableZOffset: true,
    validate: (primitive, streamName, time) => primitive.center,
    normalize: primitive => {
      primitive.vertices = primitive.center;
    }
  }
};
//# sourceMappingURL=xviz-primitives-v1.js.map