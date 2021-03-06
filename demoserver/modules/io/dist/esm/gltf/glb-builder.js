import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { padTo4Bytes, copyToArray } from '@loaders.gl/loader-utils';
import { isImage as _isImage } from '@loaders.gl/images';
import { getAccessorTypeFromSize, getComponentTypeFromArray } from './gltf-utils/gltf-utils';
import encodeGLBSync from './encode-glb';
import { packBinaryJson } from '../writers/xviz-pack-binary';

var GLBBuilder = function () {
  function GLBBuilder() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, GLBBuilder);

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

  _createClass(GLBBuilder, [{
    key: "getByteLength",
    value: function getByteLength() {
      return this.byteLength;
    }
  }, {
    key: "isImage",
    value: function isImage(imageData) {
      return _isImage(imageData);
    }
  }, {
    key: "encodeSync",
    value: function encodeSync() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.encodeAsGLB(options);
    }
  }, {
    key: "encodeAsGLB",
    value: function encodeAsGLB() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._packBinaryChunk();

      if (options.magic) {
        console.warn('Custom glTF magic number no longer supported');
      }

      var glb = {
        version: 2,
        json: this.json,
        binary: this.arrayBuffer
      };
      var byteLength = encodeGLBSync(glb, null, 0, options);
      var glbArrayBuffer = new ArrayBuffer(byteLength);
      var dataView = new DataView(glbArrayBuffer);
      encodeGLBSync(glb, dataView, 0, options);
      return glbArrayBuffer;
    }
  }, {
    key: "addApplicationData",
    value: function addApplicationData(key, data) {
      var packOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var jsonData = packOptions.nopack ? data : packBinaryJson(data, this, null, packOptions);
      this.json[key] = jsonData;
      return this;
    }
  }, {
    key: "addBuffer",
    value: function addBuffer(sourceBuffer) {
      var accessor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        size: 3
      };
      var bufferViewIndex = this.addBufferView(sourceBuffer);
      var accessorDefaults = {
        size: accessor.size,
        componentType: getComponentTypeFromArray(sourceBuffer),
        count: Math.round(sourceBuffer.length / accessor.size)
      };
      return this.addAccessor(bufferViewIndex, Object.assign(accessorDefaults, accessor));
    }
  }, {
    key: "addBufferView",
    value: function addBufferView(buffer) {
      var byteLength = buffer.byteLength || buffer.length;
      this.json.bufferViews.push({
        buffer: 0,
        byteOffset: this.byteLength,
        byteLength: byteLength
      });
      this.byteLength += padTo4Bytes(byteLength);
      this.sourceBuffers.push(buffer);
      return this.json.bufferViews.length - 1;
    }
  }, {
    key: "addAccessor",
    value: function addAccessor(bufferViewIndex, accessor) {
      this.json.accessors.push({
        bufferView: bufferViewIndex,
        type: getAccessorTypeFromSize(accessor.size),
        componentType: accessor.componentType,
        count: accessor.count
      });
      return this.json.accessors.length - 1;
    }
  }, {
    key: "_pack",
    value: function _pack() {
      this._packBinaryChunk();

      return {
        arrayBuffer: this.arrayBuffer,
        json: this.json
      };
    }
  }, {
    key: "_packBinaryChunk",
    value: function _packBinaryChunk() {
      if (this.arrayBuffer) {
        return;
      }

      var totalByteLength = this.byteLength;
      var arrayBuffer = new ArrayBuffer(totalByteLength);
      var targetArray = new Uint8Array(arrayBuffer);
      var dstByteOffset = 0;

      for (var i = 0; i < this.sourceBuffers.length; i++) {
        var sourceBuffer = this.sourceBuffers[i];
        dstByteOffset = copyToArray(sourceBuffer, targetArray, dstByteOffset);
      }

      this.json.buffers[0].byteLength = totalByteLength;
      this.arrayBuffer = arrayBuffer;
      this.sourceBuffers = [];
    }
  }, {
    key: "_getInternalCounts",
    value: function _getInternalCounts() {
      return {
        buffers: this.json.buffers.length,
        bufferViews: this.json.bufferViews.length,
        accessors: this.json.accessors.length,
        images: this.json.images.length
      };
    }
  }]);

  return GLBBuilder;
}();

export { GLBBuilder as default };
//# sourceMappingURL=glb-builder.js.map