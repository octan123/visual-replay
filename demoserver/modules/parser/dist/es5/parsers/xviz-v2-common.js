"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseVersionString = parseVersionString;
exports.getPrimitiveData = getPrimitiveData;
exports.unFlattenVertices = unFlattenVertices;
exports.ensureUnFlattenedVertices = ensureUnFlattenedVertices;

var _xvizConfig = require("../config/xviz-config");

var PrimitiveTypes = ['circles', 'images', 'points', 'polygons', 'polylines', 'stadiums', 'texts'];

function parseVersionString(versionString) {
  var versionSplit = versionString.split('.');
  var major = null;
  var minor = null;
  var patch = null;
  var field = versionSplit.shift();

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
    major: major,
    minor: minor,
    patch: patch
  };
}

function getPrimitiveData(primitiveObject) {
  var _getXVIZConfig = (0, _xvizConfig.getXVIZConfig)(),
      currentMajorVersion = _getXVIZConfig.currentMajorVersion;

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
    var keys = Object.keys(primitiveObject);

    for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
      var type = _keys[_i];

      if (PrimitiveTypes.includes(type)) {
        var singularType = type.slice(0, -1);
        return {
          type: singularType,
          primitives: primitiveObject[type]
        };
      }
    }
  }

  return {};
}

function unFlattenVertices(vertices) {
  var result = [];

  for (var i = 0; i < vertices.length; i = i + 3) {
    result.push([vertices[i], vertices[i + 1], vertices[i + 2]]);
  }

  return result;
}

function ensureUnFlattenedVertices(vertices) {
  if (vertices.length > 0 && !Array.isArray(vertices[0])) {
    return unFlattenVertices(vertices);
  }

  return vertices;
}
//# sourceMappingURL=xviz-v2-common.js.map