export function mirrorMesh({
  indices,
  positions,
  normals
}) {
  const indexSize = indices.length;
  const vertexSize = positions.length;
  const vertexCount = vertexSize / 3;
  const indices2 = new Uint16Array(indexSize * 2);
  const positions2 = new Float32Array(vertexSize * 2);
  const normals2 = new Float32Array(vertexSize * 2);
  indices2.set(indices);
  indices2.set(indices, indexSize);
  positions2.set(positions);
  positions2.set(positions, vertexSize);
  normals2.set(normals);
  normals2.set(normals, vertexSize);

  for (let i = 0; i < vertexSize; i += 3) {
    positions2[i + 1] *= -1;
    normals2[i + 1] *= -1;
  }

  for (let i = 0; i < indexSize; i++) {
    indices2[i] += vertexCount;
  }

  return {
    indices: indices2,
    positions: positions2,
    normals: normals2
  };
}
//# sourceMappingURL=utils.js.map