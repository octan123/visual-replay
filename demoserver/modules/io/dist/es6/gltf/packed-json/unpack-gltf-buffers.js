import { assert } from '../assert';
import { getAccessorArrayTypeAndLength } from '../gltf-utils/gltf-utils';
export default function unpackGLBBuffers(arrayBuffer, json, binaryByteOffset) {
  if (binaryByteOffset) {
    arrayBuffer = getArrayBufferAtOffset(arrayBuffer, binaryByteOffset);
  }

  const bufferViews = json.bufferViews || [];

  for (let i = 0; i < bufferViews.length; ++i) {
    const bufferView = bufferViews[i];
    assert(bufferView.byteLength >= 0);
  }

  return {
    accessors: unpackAccessors(arrayBuffer, bufferViews, json),
    images: unpackImages(arrayBuffer, bufferViews, json)
  };
}

function unpackAccessors(arrayBuffer, bufferViews, json) {
  const accessors = json.accessors || [];
  const accessorBuffers = [];

  for (let i = 0; i < accessors.length; ++i) {
    const accessor = accessors[i];
    assert(accessor);
    const bufferView = bufferViews[accessor.bufferView];

    if (bufferView) {
      const {
        ArrayType,
        length
      } = getAccessorArrayTypeAndLength(accessor, bufferView);
      const array = new ArrayType(arrayBuffer, bufferView.byteOffset, length);
      array.accessor = accessor;
      accessorBuffers.push(array);
    }
  }

  return accessorBuffers;
}

function unpackImages(arrayBuffer, bufferViews, json) {
  const images = json.images || [];
  const imageBuffers = [];

  for (let i = 0; i < images.length; ++i) {
    const image = images[i];
    assert(image);
    const bufferView = bufferViews[image.bufferView];
    assert(bufferView);
    const array = new Uint8Array(arrayBuffer, bufferView.byteOffset, bufferView.byteLength);
    array.imate = image;
    imageBuffers.push(array);
  }

  return imageBuffers;
}

function getArrayBufferAtOffset(arrayBuffer, byteOffset) {
  const length = arrayBuffer.byteLength - byteOffset;
  const binaryBuffer = new ArrayBuffer(length);
  const sourceArray = new Uint8Array(arrayBuffer);
  const binaryArray = new Uint8Array(binaryBuffer);

  for (let i = 0; i < length; i++) {
    binaryArray[i] = sourceArray[byteOffset + i];
  }

  return binaryBuffer;
}
//# sourceMappingURL=unpack-gltf-buffers.js.map