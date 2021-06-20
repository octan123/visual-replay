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
    validate: function validate(primitive) {
      return true;
    },
    normalize: function normalize(primitive) {
      aliasId(primitive);
    }
  },
  circle: {
    category: PRIMITIVE_CAT.FEATURE,
    validate: function validate(primitive) {
      return primitive.center;
    },
    normalize: function normalize(primitive) {
      aliasId(primitive);
    }
  },
  stadium: {
    category: PRIMITIVE_CAT.FEATURE,
    validate: function validate(primitive) {
      return primitive.start && primitive.end;
    },
    normalize: function normalize(primitive) {
      aliasId(primitive);
    }
  },
  polyline: {
    category: PRIMITIVE_CAT.FEATURE,
    validate: function validate(primitive, streamName, time) {
      return primitive.vertices && primitive.vertices.length >= 2;
    },
    normalize: function normalize(primitive) {
      primitive.vertices = filterVertices(primitive.vertices);
      aliasId(primitive);
    }
  },
  polygon: {
    category: PRIMITIVE_CAT.FEATURE,
    validate: function validate(primitive, streamName, time) {
      return primitive.vertices && primitive.vertices.length >= 3;
    },
    normalize: function normalize(primitive) {
      aliasId(primitive);
    }
  },
  point: {
    category: PRIMITIVE_CAT.POINTCLOUD,
    validate: function validate(primitive, streamName, time) {
      return primitive.points && primitive.points.length > 0;
    },
    normalize: function normalize(primitive) {
      primitive.vertices = primitive.points;
      aliasId(primitive);
    }
  },
  image: {
    category: PRIMITIVE_CAT.IMAGE,
    validate: function validate(primitive, streamName, time) {
      return primitive.data;
    },
    normalize: function normalize(primitive) {
      var imageData = primitive.data;
      delete primitive.data;

      if (typeof imageData === 'string') {
        imageData = base64js.toByteArray(imageData);
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
//# sourceMappingURL=xviz-primitives-v2.js.map