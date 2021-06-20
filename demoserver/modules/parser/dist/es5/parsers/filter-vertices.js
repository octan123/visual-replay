"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterVertices = filterVertices;

var _math = require("math.gl");

var _xvizConfig = require("../config/xviz-config");

function filterVertices(vertices) {
  var THRESHOLD = (0, _xvizConfig.getXVIZConfig)().pathDistanceThreshold;
  var isFlatArray = Number.isFinite(vertices[0]);
  var vertexCount = isFlatArray ? vertices.length / 3 : vertices.length;
  var newVertices = [];
  var index = 0;
  var lastEmittedVertex = null;
  var lastEmittedIndex = -1;

  for (var i = 0; i < vertexCount; i++) {
    var v = getPointAtIndex(vertices, i, isFlatArray);
    var shouldAddVert = lastEmittedIndex === -1 || lastEmittedVertex.distance(v) > THRESHOLD;

    if (shouldAddVert) {
      newVertices[index++] = v[0];
      newVertices[index++] = v[1];
      newVertices[index++] = v[2];
      lastEmittedVertex = new _math.Vector3(v[0], v[1], v[2]);
      lastEmittedIndex = i;
    }
  }

  if (lastEmittedIndex !== vertexCount - 1) {
    var lastVertex = getPointAtIndex(vertices, vertexCount - 1, isFlatArray);
    index -= 3;
    newVertices[index++] = lastVertex[0];
    newVertices[index++] = lastVertex[1];
    newVertices[index++] = lastVertex[2];
  }

  return newVertices;
}

function getPointAtIndex(vertices, i) {
  var isFlatArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var point = null;

  if (isFlatArray) {
    point = vertices.slice(i * 3, i * 3 + 3);
  } else {
    point = vertices[i];
  }

  point[2] = point[2] || 0;
  return point;
}
//# sourceMappingURL=filter-vertices.js.map