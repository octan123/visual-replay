import { filterVertices } from './filter-vertices';
import { PRIMITIVE_CAT } from './parse-xviz-primitive';
import base64js from 'base64-js';

function aliasId(primitive) {
  if (primitive && primitive.base && primitive.base.object_id) {
    primitive.id = primitive.base.object_id;
  }
}

export default {
  text: {
    category: PRIMITIVE_CAT.FEATURE,
    validate: primitive => true,
    normalize: primitive => {
      aliasId(primitive);
    }
  },
  circle: {
    category: PRIMITIVE_CAT.FEATURE,
    validate: primitive => primitive.center,
    normalize: primitive => {
      aliasId(primitive);
    }
  },
  stadium: {
    category: PRIMITIVE_CAT.FEATURE,
    validate: primitive => primitive.start && primitive.end,
    normalize: primitive => {
      aliasId(primitive);
    }
  },
  polyline: {
    category: PRIMITIVE_CAT.FEATURE,
    validate: (primitive, streamName, time) => primitive.vertices && primitive.vertices.length >= 2,
    normalize: primitive => {
      primitive.vertices = filterVertices(primitive.vertices);
      aliasId(primitive);
    }
  },
  polygon: {
    category: PRIMITIVE_CAT.FEATURE,
    validate: (primitive, streamName, time) => primitive.vertices && primitive.vertices.length >= 3,
    normalize: primitive => {
      aliasId(primitive);
    }
  },
  point: {
    category: PRIMITIVE_CAT.POINTCLOUD,
    validate: (primitive, streamName, time) => primitive.points && primitive.points.length > 0,
    normalize: primitive => {
      primitive.vertices = primitive.points;
      aliasId(primitive);
    }
  },
  image: {
    category: PRIMITIVE_CAT.IMAGE,
    validate: (primitive, streamName, time) => primitive.data,
    normalize: primitive => {
      let imageData = primitive.data;
      delete primitive.data;

      if (typeof imageData === 'string') {
        imageData = base64js.toByteArray(imageData);
      }

      const imgType = primitive.format ? "image/".concat(primitive.format) : null;
      primitive.imageData = imageData;
      primitive.imageType = imgType;

      if (primitive.position) {
        primitive.vertices = primitive.position;
      }

      aliasId(primitive);
    }
  }
};
//# sourceMappingURL=xviz-primitives-v2.js.map