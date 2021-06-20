import _typeof from "@babel/runtime/helpers/esm/typeof";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { flattenToTypedArray } from './flatten';

function packBinaryJsonTypedArray(gltfBuilder, object, objectKey, info) {
  if (gltfBuilder.isImage(object) || info && info.isImage) {
    var imageIndex = gltfBuilder.addImage(object);
    return "#/images/".concat(imageIndex);
  }

  var opts = info && info.size ? {
    size: info.size
  } : {
    size: 3
  };
  var bufferIndex = gltfBuilder.addBuffer(object, opts);
  return "#/accessors/".concat(bufferIndex);
}

export function packBinaryJson(json, gltfBuilder) {
  var objectKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options = options,
      _options$flattenArray = _options.flattenArrays,
      flattenArrays = _options$flattenArray === void 0 ? true : _options$flattenArray;
  var object = json;
  var objectInfo = null;

  if (typeof object === 'string' && object.indexOf('#/') === 0) {
    return "#".concat(object);
  }

  if (Array.isArray(object)) {
    var flatObject = flattenArrays && flattenObject(objectKey, object);

    if (flatObject) {
      object = flatObject.typedArray;
      objectInfo = flatObject;
    } else {
      return object.map(function (element) {
        return packBinaryJson(element, gltfBuilder, null, options);
      });
    }
  }

  if (ArrayBuffer.isView(object) && gltfBuilder) {
    if (options && options.isImage) {
      objectInfo = _objectSpread(_objectSpread({}, objectInfo), {}, {
        isImage: true
      });
    }

    return packBinaryJsonTypedArray(gltfBuilder, object, objectKey, objectInfo);
  }

  if (object !== null && _typeof(object) === 'object') {
    var newObject = {};

    for (var key in object) {
      if (['data', 'width_px', 'height_px'].every(function (field) {
        return field in object;
      })) {
        options = _objectSpread(_objectSpread({}, options), {}, {
          isImage: true
        });
      }

      newObject[key] = packBinaryJson(object[key], gltfBuilder, key, options);
    }

    return newObject;
  }

  return object;
}

function flattenObject(key, object) {
  var typedArray = null;
  var size = 3;

  if (key === 'vertices' || key === 'points') {
    typedArray = flattenToTypedArray(object, size, Float32Array);
  }

  if (key === 'colors') {
    size = object[0].length === 4 ? 4 : 3;
    typedArray = flattenToTypedArray(object, size, Uint8Array);
  }

  if (typedArray) {
    return {
      typedArray: typedArray,
      size: size
    };
  }

  return null;
}
//# sourceMappingURL=xviz-pack-binary.js.map