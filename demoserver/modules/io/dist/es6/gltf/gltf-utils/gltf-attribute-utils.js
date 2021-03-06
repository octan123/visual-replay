import { getAccessorTypeFromSize, getComponentTypeFromArray } from './gltf-utils';
export function getGLTFAccessors(attributes) {
  const accessors = {};

  for (const name in attributes) {
    const attribute = attributes[name];

    if (name !== 'indices') {
      const glTFAccessor = getGLTFAccessor(attribute);
      accessors[name] = glTFAccessor;
    }
  }

  return accessors;
}
export function getGLTFAccessor(attribute, gltfAttributeName) {
  const {
    buffer,
    size,
    count
  } = getAccessorData(attribute, gltfAttributeName);
  const glTFAccessor = {
    value: buffer,
    size,
    bufferView: null,
    byteOffset: 0,
    count,
    type: getAccessorTypeFromSize(size),
    componentType: getComponentTypeFromArray(buffer)
  };
  return glTFAccessor;
}
export function getGLTFAttribute(data, gltfAttributeName) {
  return data.attributes[data.glTFAttributeMap[gltfAttributeName]];
}

function getAccessorData(attribute, attributeName) {
  let buffer = attribute;
  let size = 1;
  let count = 0;

  if (attribute && attribute.value) {
    buffer = attribute.value;
    size = attribute.size || 1;
  }

  if (buffer) {
    if (!ArrayBuffer.isView(buffer)) {
      buffer = toTypedArray(buffer, Float32Array);
    }

    count = buffer.length / size;
  }

  return {
    buffer,
    size,
    count
  };
}

function toTypedArray(array, ArrayType, convertTypedArrays = false) {
  if (!array) {
    return null;
  }

  if (Array.isArray(array)) {
    return new ArrayType(array);
  }

  if (convertTypedArrays && !(array instanceof ArrayType)) {
    return new ArrayType(array);
  }

  return array;
}
//# sourceMappingURL=gltf-attribute-utils.js.map