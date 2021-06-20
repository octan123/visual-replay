export const PRIMITIVE_CAT = {
  LOOKAHEAD: 'lookAheads',
  FEATURE: 'features',
  LABEL: 'labels',
  POINTCLOUD: 'pointCloud',
  IMAGE: 'images',
  COMPONENT: 'components'
};
export function normalizeXVIZPrimitive(PRIMITIVE_PROCCESSOR, primitive, objectIndex, streamName, type, time, postProcessPrimitive) {
  const primitiveType = primitive.type || type;
  const {
    vertices,
    center
  } = primitive;
  const {
    enableZOffset,
    validate,
    normalize
  } = PRIMITIVE_PROCCESSOR[primitiveType];

  if (enableZOffset) {
    const zOffset = objectIndex * 1e-6;

    if (vertices) {
      for (let i = 0; i < vertices.length; i++) {
        vertices[i][2] = zOffset;
      }
    }

    if (center && center.length === 2) {
      center[2] = zOffset;
    }
  }

  if (primitiveType) {
    primitive.type = primitiveType;
  }

  if (!validate(primitive, streamName, time)) {
    return null;
  }

  if (normalize) {
    normalize(primitive);
  }

  if (postProcessPrimitive) {
    postProcessPrimitive(primitive);
  }

  return primitive;
}
//# sourceMappingURL=parse-xviz-primitive.js.map