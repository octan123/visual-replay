import { assert } from '../assert';
import { getAccessorArrayTypeAndLength } from '../gltf-utils/gltf-utils';
export default function unpackGLBBuffers(arrayBuffer, json, binaryByteOffset) {
  if (binaryByteOffset) {
    arrayBuffer = getArrayBufferAtOffset(arrayBuffer, binaryByteOffset);
  }

  var bufferViews = json.bufferViews || [];

  for (var i = 0; i < bufferViews.length; ++i) {
    var bufferView = bufferViews[i];
    assert(bufferView.byteLength >= 0);
  }

  return {
    accessors: unpackAccessors(arrayBuffer, bufferViews, json),
    images: unpackImages(arrayBuffer, bufferViews, json)
  };
}

function unpackAccessors(arrayBuffer, bufferViews, json) {
  var accessors = json.accessors || [];
  var accessorBuffers = [];

  for (var i = 0; i < accessors.length; ++i) {
    var accessor = accessors[i];
    assert(accessor);
    var bufferView = bufferViews[accessor.bufferView];

    if (bufferView) {
      var _getAccessorArrayType = getAccessorArrayTypeAndLength(accessor, bufferView),
          ArrayType = _getAccessorArrayType.ArrayType,
          length = _getAccessorArrayType.length;

      var array = new ArrayType(arrayBuffer, bufferView.byteOffset, length);
      array.accessor = accessor;
      accessorBuffers.push(array);
    }
  }

  return accessorBuffers;
}

function unpackImages(arrayBuffer, bufferViews, json) {
  var images = json.images || [];
  var imageBuffers = [];

  for (var i = 0; i < images.length; ++i) {
    var image = images[i];
    assert(image);
    var bufferView = bufferViews[image.bufferView];
    assert(bufferView);
    var array = new Uint8Array(arrayBuffer, bufferView.byteOffset, bufferView.byteLength);
    array.imate = image;
    imageBuffers.push(array);
  }

  return imageBuffers;
}

function getArrayBufferAtOffset(arrayBuffer, byteOffset) {
  var length = arrayBuffer.byteLength - byteOffset;
  var binaryBuffer = new ArrayBuffer(length);
  var sourceArray = new Uint8Array(arrayBuffer);
  var binaryArray = new Uint8Array(binaryBuffer);

  for (var i = 0; i < length; i++) {
    binaryArray[i] = sourceArray[byteOffset + i];
  }

  return binaryBuffer;
}
//# sourceMappingURL=unpack-gltf-buffers.js.map