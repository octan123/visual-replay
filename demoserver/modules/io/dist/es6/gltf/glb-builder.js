import { padTo4Bytes, copyToArray } from '@loaders.gl/loader-utils';
import { isImage } from '@loaders.gl/images';
import { getAccessorTypeFromSize, getComponentTypeFromArray } from './gltf-utils/gltf-utils';
import encodeGLBSync from './encode-glb';
import { packBinaryJson } from '../writers/xviz-pack-binary';
export default class GLBBuilder {
  constructor(options = {}) {
    this.byteLength = 0;
    this.json = {
      buffers: [{
        byteLength: 0
      }],
      bufferViews: [],
      accessors: [],
      images: [],
      meshes: []
    };
    this.sourceBuffers = [];
    this.log = options.log || console;
  }

  getByteLength() {
    return this.byteLength;
  }

  isImage(imageData) {
    return isImage(imageData);
  }

  encodeSync(options = {}) {
    return this.encodeAsGLB(options);
  }

  encodeAsGLB(options = {}) {
    this._packBinaryChunk();

    if (options.magic) {
      console.warn('Custom glTF magic number no longer supported');
    }

    const glb = {
      version: 2,
      json: this.json,
      binary: this.arrayBuffer
    };
    const byteLength = encodeGLBSync(glb, null, 0, options);
    const glbArrayBuffer = new ArrayBuffer(byteLength);
    const dataView = new DataView(glbArrayBuffer);
    encodeGLBSync(glb, dataView, 0, options);
    return glbArrayBuffer;
  }

  addApplicationData(key, data, packOptions = {}) {
    const jsonData = packOptions.nopack ? data : packBinaryJson(data, this, null, packOptions);
    this.json[key] = jsonData;
    return this;
  }

  addBuffer(sourceBuffer, accessor = {
    size: 3
  }) {
    const bufferViewIndex = this.addBufferView(sourceBuffer);
    const accessorDefaults = {
      size: accessor.size,
      componentType: getComponentTypeFromArray(sourceBuffer),
      count: Math.round(sourceBuffer.length / accessor.size)
    };
    return this.addAccessor(bufferViewIndex, Object.assign(accessorDefaults, accessor));
  }

  addBufferView(buffer) {
    const byteLength = buffer.byteLength || buffer.length;
    this.json.bufferViews.push({
      buffer: 0,
      byteOffset: this.byteLength,
      byteLength
    });
    this.byteLength += padTo4Bytes(byteLength);
    this.sourceBuffers.push(buffer);
    return this.json.bufferViews.length - 1;
  }

  addAccessor(bufferViewIndex, accessor) {
    this.json.accessors.push({
      bufferView: bufferViewIndex,
      type: getAccessorTypeFromSize(accessor.size),
      componentType: accessor.componentType,
      count: accessor.count
    });
    return this.json.accessors.length - 1;
  }

  _pack() {
    this._packBinaryChunk();

    return {
      arrayBuffer: this.arrayBuffer,
      json: this.json
    };
  }

  _packBinaryChunk() {
    if (this.arrayBuffer) {
      return;
    }

    const totalByteLength = this.byteLength;
    const arrayBuffer = new ArrayBuffer(totalByteLength);
    const targetArray = new Uint8Array(arrayBuffer);
    let dstByteOffset = 0;

    for (let i = 0; i < this.sourceBuffers.length; i++) {
      const sourceBuffer = this.sourceBuffers[i];
      dstByteOffset = copyToArray(sourceBuffer, targetArray, dstByteOffset);
    }

    this.json.buffers[0].byteLength = totalByteLength;
    this.arrayBuffer = arrayBuffer;
    this.sourceBuffers = [];
  }

  _getInternalCounts() {
    return {
      buffers: this.json.buffers.length,
      bufferViews: this.json.bufferViews.length,
      accessors: this.json.accessors.length,
      images: this.json.images.length
    };
  }

}
//# sourceMappingURL=glb-builder.js.map