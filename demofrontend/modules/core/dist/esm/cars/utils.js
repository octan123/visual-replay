export function mirrorMesh(_ref) {
  var indices = _ref.indices,
      positions = _ref.positions,
      normals = _ref.normals;
  var indexSize = indices.length;
  var vertexSize = positions.length;
  var vertexCount = vertexSize / 3;
  var indices2 = new Uint16Array(indexSize * 2);
  var positions2 = new Float32Array(vertexSize * 2);
  var normals2 = new Float32Array(vertexSize * 2);
  indices2.set(indices);
  indices2.set(indices, indexSize);
  positions2.set(positions);
  positions2.set(positions, vertexSize);
  normals2.set(normals);
  normals2.set(normals, vertexSize);

  for (var i = 0; i < vertexSize; i += 3) {
    positions2[i + 1] *= -1;
    normals2[i + 1] *= -1;
  }

  for (var _i = 0; _i < indexSize; _i++) {
    indices2[_i] += vertexCount;
  }

  return {
    indices: indices2,
    positions: positions2,
    normals: normals2
  };
}
//# sourceMappingURL=utils.js.map