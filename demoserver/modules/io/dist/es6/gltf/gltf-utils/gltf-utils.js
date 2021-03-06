import { assert } from '../assert';
const TYPES = ['SCALAR', 'VEC2', 'VEC3', 'VEC4'];
const ARRAY_TO_COMPONENT_TYPE = new Map([[Int8Array, 5120], [Uint8Array, 5121], [Int16Array, 5122], [Uint16Array, 5123], [Uint32Array, 5125], [Float32Array, 5126]]);
export const ATTRIBUTE_TYPE_TO_COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
export const ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
};
export const ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
export function getAccessorTypeFromSize(size) {
  const type = TYPES[size - 1];
  return type || TYPES[0];
}
export function getComponentTypeFromArray(typedArray) {
  const componentType = ARRAY_TO_COMPONENT_TYPE.get(typedArray.constructor);

  if (!componentType) {
    throw new Error('Illegal typed array');
  }

  return componentType;
}
export function getAccessorArrayTypeAndLength(accessor, bufferView) {
  const ArrayType = ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY[accessor.componentType];
  const components = ATTRIBUTE_TYPE_TO_COMPONENTS[accessor.type];
  const bytesPerComponent = ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE[accessor.componentType];
  const length = accessor.count * components;
  const byteLength = accessor.count * components * bytesPerComponent;
  assert(byteLength >= 0 && byteLength <= bufferView.byteLength);
  return {
    ArrayType,
    length,
    byteLength
  };
}
export function getFullUri(uri, base) {
  const absolute = uri.startsWith('data:') || uri.startsWith('http:') || uri.startsWith('https:');
  return absolute ? uri : base.substr(0, base.lastIndexOf('/') + 1) + uri;
}
//# sourceMappingURL=gltf-utils.js.map