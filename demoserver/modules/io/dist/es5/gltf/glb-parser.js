"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assert = require("./assert");

var _parseGlb = _interopRequireWildcard(require("./parse-glb"));

var _gltfUtils = require("./gltf-utils/gltf-utils");

var _unpackBinaryJson = _interopRequireDefault(require("./packed-json/unpack-binary-json"));

var _unpackGltfBuffers = _interopRequireDefault(require("./packed-json/unpack-gltf-buffers"));

var GLBParser = function () {
  function GLBParser() {
    (0, _classCallCheck2["default"])(this, GLBParser);
  }

  (0, _createClass2["default"])(GLBParser, [{
    key: "parse",
    value: function parse(arrayBuffer) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.parseSync(arrayBuffer, options);
    }
  }, {
    key: "parseSync",
    value: function parseSync(arrayBuffer) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.glbArrayBuffer = arrayBuffer;
      this.binaryByteOffset = null;
      this.packedJson = null;
      this.json = null;

      if (this.json === null && this.binaryByteOffset === null) {
        var byteOffset = 0;
        (0, _parseGlb["default"])(this, this.glbArrayBuffer, byteOffset, options);
        this.binaryByteOffset = this.binChunkByteOffset;
        this.packedJson = this.json;
        var unpackedBuffers = (0, _unpackGltfBuffers["default"])(this.glbArrayBuffer, this.json, this.binaryByteOffset);
        this.json = (0, _unpackBinaryJson["default"])(this.json, unpackedBuffers);
        this.unpackedBuffers = unpackedBuffers;
      }

      return this;
    }
  }, {
    key: "getApplicationData",
    value: function getApplicationData(key) {
      if (this.json) {
        return this.json[key];
      }

      return null;
    }
  }, {
    key: "getJSON",
    value: function getJSON() {
      return this.json;
    }
  }, {
    key: "getArrayBuffer",
    value: function getArrayBuffer() {
      return this.glbArrayBuffer;
    }
  }, {
    key: "getBinaryByteOffset",
    value: function getBinaryByteOffset() {
      return this.binaryByteOffset;
    }
  }, {
    key: "getBufferView",
    value: function getBufferView(glTFBufferView) {
      var byteOffset = (glTFBufferView.byteOffset || 0) + this.binaryByteOffset;
      return new Uint8Array(this.glbArrayBuffer, byteOffset, glTFBufferView.byteLength);
    }
  }, {
    key: "getBuffer",
    value: function getBuffer(glTFAccessor) {
      var ArrayType = _gltfUtils.ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY[glTFAccessor.componentType];
      var components = _gltfUtils.ATTRIBUTE_TYPE_TO_COMPONENTS[glTFAccessor.type];
      var bytesPerComponent = _gltfUtils.ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE[glTFAccessor.componentType];
      var length = glTFAccessor.count * components;
      var byteLength = glTFAccessor.count * components * bytesPerComponent;
      var glTFBufferView = this.json.bufferViews[glTFAccessor.bufferView];
      (0, _assert.assert)(byteLength >= 0 && glTFAccessor.byteOffset + byteLength <= glTFBufferView.byteLength);
      var byteOffset = glTFBufferView.byteOffset + this.binaryByteOffset + glTFAccessor.byteOffset;
      return new ArrayType(this.glbArrayBuffer, byteOffset, length);
    }
  }, {
    key: "getImageData",
    value: function getImageData(glTFImage) {
      return {
        typedArray: this.getBufferView(glTFImage.bufferView),
        mimeType: glTFImage.mimeType || 'image/jpeg'
      };
    }
  }, {
    key: "getImage",
    value: function getImage(glTFImage) {
      var arrayBufferView = this.getBufferView(glTFImage.bufferView);
      var mimeType = glTFImage.mimeType || 'image/jpeg';
      var blob = new Blob([arrayBufferView], {
        type: mimeType
      });
      var urlCreator = self.URL || self.webkitURL;
      var imageUrl = urlCreator.createObjectURL(blob);
      var img = new Image();
      img.src = imageUrl;
      return img;
    }
  }, {
    key: "getImageAsync",
    value: function getImageAsync(glTFImage) {
      var _this = this;

      return new Promise(function (resolve) {
        var arrayBufferView = _this.getBufferView(glTFImage.bufferView);

        var mimeType = glTFImage.mimeType || 'image/jpeg';
        var blob = new Blob([arrayBufferView], {
          type: mimeType
        });
        var urlCreator = self.URL || self.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        var img = new Image();

        img.onload = function () {
          return resolve(img);
        };

        img.src = imageUrl;
      });
    }
  }], [{
    key: "isGLB",
    value: function isGLB(arrayBuffer) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var byteOffset = 0;
      return (0, _parseGlb.isGLB)(arrayBuffer, byteOffset);
    }
  }]);
  return GLBParser;
}();

exports["default"] = GLBParser;
//# sourceMappingURL=glb-parser.js.map