import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import GL from '@luma.gl/constants';
import { Geometry } from '@luma.gl/core';
export default class GridGeometry extends Geometry {
  constructor(_ref = {}) {
    let {
      id = uid('grid-geometry'),
      uCount = 1,
      vCount = 1,
      drawMode = GL.TRIANGLES
    } = _ref,
        opts = _objectWithoutProperties(_ref, ["id", "uCount", "vCount", "drawMode"]);

    super(Object.assign({}, opts, {
      id,
      drawMode,
      attributes: {
        indices: calculateIndices({
          uCount,
          vCount
        }),
        texCoords: calculateTexCoords({
          uCount,
          vCount
        })
      }
    }));
  }

}
const uidCounters = {};

function uid(id = 'id') {
  uidCounters[id] = uidCounters[id] || 1;
  const count = uidCounters[id]++;
  return "".concat(id, "-").concat(count);
}

function calculateIndices({
  uCount,
  vCount
}) {
  const indicesCount = uCount * vCount * 2 * 3;
  const indices = new Uint32Array(indicesCount);
  let i = 0;

  for (let uIndex = 0; uIndex < uCount; uIndex++) {
    for (let vIndex = 0; vIndex < vCount; vIndex++) {
      const i0 = vIndex * (uCount + 1) + uIndex;
      const i1 = i0 + 1;
      const i2 = i0 + uCount + 1;
      const i3 = i2 + 1;
      indices[i++] = i0;
      indices[i++] = i2;
      indices[i++] = i1;
      indices[i++] = i1;
      indices[i++] = i2;
      indices[i++] = i3;
    }
  }

  return indices;
}

function calculateTexCoords({
  uCount,
  vCount
}) {
  const texCoords = new Float32Array((uCount + 1) * (vCount + 1) * 2);
  let i = 0;

  for (let vIndex = 0; vIndex <= vCount; vIndex++) {
    for (let uIndex = 0; uIndex <= uCount; uIndex++) {
      texCoords[i++] = uIndex / uCount;
      texCoords[i++] = vIndex / vCount;
    }
  }

  return {
    value: texCoords,
    size: 2
  };
}
//# sourceMappingURL=grid-geometry.js.map