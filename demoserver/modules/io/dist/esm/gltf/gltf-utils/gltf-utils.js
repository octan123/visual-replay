import { assert } from '../assert';
var TYPES = ['SCALAR', 'VEC2', 'VEC3', 'VEC4'];
var ARRAY_TO_COMPONENT_TYPE = new Map([[Int8Array, 5120], [Uint8Array, 5121], [Int16Array, 5122], [Uint16Array, 5123], [Uint32Array, 5125], [Float32Array, 5126]]);
export var ATTRIBUTE_TYPE_TO_COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
export var ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
};
export var ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
export function getAccessorTypeFromSize(size) {
  var type = TYPES[size - 1];
  return type || TYPES[0];
}
export function getComponentTypeFromArray(typedArray) {
  var componentType = ARRAY_TO_COMPONENT_TYPE.get(typedArray.constructor);

  if (!componentType) {
    throw new Error('Illegal typed array');
  }

  return componentType;
}
export function getAccessorArrayTypeAndLength(accessor, bufferView) {
  var ArrayType = ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY[accessor.componentType];
  var components = ATTRIBUTE_TYPE_TO_COMPONENTS[accessor.type];
  var bytesPerComponent = ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE[accessor.componentType];
  var length = accessor.count * components;
  var byteLength = accessor.count * components * bytesPerComponent;
  assert(byteLength >= 0 && byteLength <= bufferView.byteLength);
  return {
    ArrayType: ArrayType,
    length: length,
    byteLength: byteLength
  };
}
export function getFullUri(uri, base) {
  var absolute = uri.startsWith('data:') || uri.startsWith('http:') || uri.startsWith('https:');
  return absolute ? uri : base.substr(0, base.lastIndexOf('/') + 1) + uri;
}
//# sourceMappingURL=gltf-utils.js.map