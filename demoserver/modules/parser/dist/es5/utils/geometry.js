"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCentroid = getCentroid;

function getCentroid(polygon) {
  var sx = 0;
  var sy = 0;
  var sz = 0;
  var len = polygon.length;

  if (len === 1) {
    return polygon[0];
  }

  if (polygon[0] === polygon[len - 1]) {
    len -= 1;
  }

  for (var i = 0; i < len; i++) {
    var point = polygon[i];
    sx += point[0];
    sy += point[1];
    sz += point[2] || 0;
  }

  return [sx / len, sy / len, sz / len];
}
//# sourceMappingURL=geometry.js.map