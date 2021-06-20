import { getXVIZConfig } from '../config/xviz-config';
const PrimitiveTypes = ['circles', 'images', 'points', 'polygons', 'polylines', 'stadiums', 'texts'];
export function parseVersionString(versionString) {
  const versionSplit = versionString.split('.');
  let major = null;
  let minor = null;
  let patch = null;
  let field = versionSplit.shift();

  if (field) {
    major = Number.parseInt(field, 10);
  }

  field = versionSplit.shift();

  if (field) {
    minor = Number.parseInt(field, 10);
  }

  field = versionSplit.shift();

  if (field) {
    patch = Number.parseInt(field, 10);
  }

  return {
    major,
    minor,
    patch
  };
}
export function getPrimitiveData(primitiveObject) {
  const {
    currentMajorVersion
  } = getXVIZConfig();

  if (currentMajorVersion === 1) {
    if (primitiveObject instanceof Array) {
      if (primitiveObject.length === 0) {
        return {
          type: null,
          primitives: primitiveObject
        };
      } else if (primitiveObject.length > 0) {
        return {
          type: primitiveObject[0].type,
          primitives: primitiveObject
        };
      }
    }
  }

  if (currentMajorVersion === 2) {
    const keys = Object.keys(primitiveObject);

    for (const type of keys) {
      if (PrimitiveTypes.includes(type)) {
        const singularType = type.slice(0, -1);
        return {
          type: singularType,
          primitives: primitiveObject[type]
        };
      }
    }
  }

  return {};
}
export function unFlattenVertices(vertices) {
  const result = [];

  for (let i = 0; i < vertices.length; i = i + 3) {
    result.push([vertices[i], vertices[i + 1], vertices[i + 2]]);
  }

  return result;
}
export function ensureUnFlattenedVertices(vertices) {
  if (vertices.length > 0 && !Array.isArray(vertices[0])) {
    return unFlattenVertices(vertices);
  }

  return vertices;
}
//# sourceMappingURL=xviz-v2-common.js.map