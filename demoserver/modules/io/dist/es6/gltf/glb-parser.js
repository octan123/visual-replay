import { assert } from './assert';
import parseGLBSync, { isGLB } from './parse-glb';
import { ATTRIBUTE_TYPE_TO_COMPONENTS, ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE, ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY } from './gltf-utils/gltf-utils';
import unpackBinaryJson from './packed-json/unpack-binary-json';
import unpackGLTFBuffers from './packed-json/unpack-gltf-buffers';
export default class GLBParser {
  static isGLB(arrayBuffer, options = {}) {
    const byteOffset = 0;
    return isGLB(arrayBuffer, byteOffset);
  }

  parse(arrayBuffer, options = {}) {
    return this.parseSync(arrayBuffer, options);
  }

  parseSync(arrayBuffer, options = {}) {
    this.glbArrayBuffer = arrayBuffer;
    this.binaryByteOffset = null;
    this.packedJson = null;
    this.json = null;

    if (this.json === null && this.binaryByteOffset === null) {
      const byteOffset = 0;
      parseGLBSync(this, this.glbArrayBuffer, byteOffset, options);
      this.binaryByteOffset = this.binChunkByteOffset;
      this.packedJson = this.json;
      const unpackedBuffers = unpackGLTFBuffers(this.glbArrayBuffer, this.json, this.binaryByteOffset);
      this.json = unpackBinaryJson(this.json, unpackedBuffers);
      this.unpackedBuffers = unpackedBuffers;
    }

    return this;
  }

  getApplicationData(key) {
    if (this.json) {
      return this.json[key];
    }

    return null;
  }

  getJSON() {
    return this.json;
  }

  getArrayBuffer() {
    return this.glbArrayBuffer;
  }

  getBinaryByteOffset() {
    return this.binaryByteOffset;
  }

  getBufferView(glTFBufferView) {
    const byteOffset = (glTFBufferView.byteOffset || 0) + this.binaryByteOffset;
    return new Uint8Array(this.glbArrayBuffer, byteOffset, glTFBufferView.byteLength);
  }

  getBuffer(glTFAccessor) {
    const ArrayType = ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY[glTFAccessor.componentType];
    const components = ATTRIBUTE_TYPE_TO_COMPONENTS[glTFAccessor.type];
    const bytesPerComponent = ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE[glTFAccessor.componentType];
    const length = glTFAccessor.count * components;
    const byteLength = glTFAccessor.count * components * bytesPerComponent;
    const glTFBufferView = this.json.bufferViews[glTFAccessor.bufferView];
    assert(byteLength >= 0 && glTFAccessor.byteOffset + byteLength <= glTFBufferView.byteLength);
    const byteOffset = glTFBufferView.byteOffset + this.binaryByteOffset + glTFAccessor.byteOffset;
    return new ArrayType(this.glbArrayBuffer, byteOffset, length);
  }

  getImageData(glTFImage) {
    return {
      typedArray: this.getBufferView(glTFImage.bufferView),
      mimeType: glTFImage.mimeType || 'image/jpeg'
    };
  }

  getImage(glTFImage) {
    const arrayBufferView = this.getBufferView(glTFImage.bufferView);
    const mimeType = glTFImage.mimeType || 'image/jpeg';
    const blob = new Blob([arrayBufferView], {
      type: mimeType
    });
    const urlCreator = self.URL || self.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    const img = new Image();
    img.src = imageUrl;
    return img;
  }

  getImageAsync(glTFImage) {
    return new Promise(resolve => {
      const arrayBufferView = this.getBufferView(glTFImage.bufferView);
      const mimeType = glTFImage.mimeType || 'image/jpeg';
      const blob = new Blob([arrayBufferView], {
        type: mimeType
      });
      const urlCreator = self.URL || self.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);
      const img = new Image();

      img.onload = () => resolve(img);

      img.src = imageUrl;
    });
  }

}
//# sourceMappingURL=glb-parser.js.map