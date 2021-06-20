export var PRIMITIVE_CAT = {
  LOOKAHEAD: 'lookAheads',
  FEATURE: 'features',
  LABEL: 'labels',
  POINTCLOUD: 'pointCloud',
  IMAGE: 'images',
  COMPONENT: 'components'
};
export function normalizeXVIZPrimitive(PRIMITIVE_PROCCESSOR, primitive, objectIndex, streamName, type, time, postProcessPrimitive) {
  var primitiveType = primitive.type || type;
  var vertices = primitive.vertices,
      center = primitive.center;
  var _PRIMITIVE_PROCCESSOR = PRIMITIVE_PROCCESSOR[primitiveType],
      enableZOffset = _PRIMITIVE_PROCCESSOR.enableZOffset,
      validate = _PRIMITIVE_PROCCESSOR.validate,
      normalize = _PRIMITIVE_PROCCESSOR.normalize;

  if (enableZOffset) {
    var zOffset = objectIndex * 1e-6;

    if (vertices) {
      for (var i = 0; i < vertices.length; i++) {
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