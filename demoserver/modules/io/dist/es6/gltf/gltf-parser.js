import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import '../common/text-encoding';
import { fetchFile } from '@loaders.gl/core';
import { getFullUri } from './gltf-utils/gltf-utils';
import { getGLTFAccessors, getGLTFAccessor } from './gltf-utils/gltf-attribute-utils';
import { KHR_DRACO_MESH_COMPRESSION, UBER_POINT_CLOUD_EXTENSION } from './gltf-constants';
import GLBParser from './glb-parser';
import GLTFPostProcessorOld from './gltf-post-processor-old';
const DEFAULT_OPTIONS = {
  fetchLinkedResources: true,
  fetch: fetchFile,
  decompress: false,
  DracoLoader: null,
  postProcess: true,
  createImages: false,
  log: console
};
export class GLTFParser {
  async parse(gltf, options = {}) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.parseSync(gltf, _objectSpread(_objectSpread({}, options), {}, {
      postProcess: false,
      decompress: false
    }));

    if (options.fetchLinkedResources) {
      await this._loadLinkedAssets(options);
    }

    if (options.decompress) {
      this._decompressMeshes(options);
    }

    if (options.postProcess) {
      const postProcessor = new GLTFPostProcessorOld();
      postProcessor.postProcess(this.gltf, this.glbParser, options);
    }

    return this.gltf;
  }

  parseSync(gltf, options = {}) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    if (gltf instanceof ArrayBuffer && !GLBParser.isGLB(gltf, options)) {
      const textDecoder = new TextDecoder();
      gltf = textDecoder.decode(gltf);
    }

    if (typeof gltf === 'string') {
      gltf = JSON.parse(gltf);
    }

    if (gltf instanceof ArrayBuffer) {
      this.glbParser = new GLBParser();
      this.gltf = this.glbParser.parseSync(gltf).json;
      this.json = this.gltf;
    } else {
      this.glbParser = null;
      this.gltf = gltf;
      this.json = gltf;
    }

    if (options.decompress) {
      this._decompressMeshes(options);
    }

    if (options.postProcess) {
      const postProcessor = new GLTFPostProcessorOld();
      postProcessor.postProcess(this.gltf, this.glbParser, options);
    }

    return this.gltf;
  }

  getApplicationData(key) {
    if (this.json) {
      return this.json[key];
    }

    return null;
  }

  getExtraData(key) {
    const extras = this.json.extras || {};
    return extras[key];
  }

  getExtension(extensionName) {
    const isExtension = this.getUsedExtensions().find(name => name === extensionName);
    const extensions = this.json.extensions || {};
    return isExtension ? extensions[extensionName] || true : null;
  }

  getRequiredExtension(extensionName) {
    const isRequired = this.getRequiredExtensions().find(name => name === extensionName);
    return isRequired ? this.getExtension(extensionName) : null;
  }

  getRequiredExtensions() {
    return this.json.extensionsRequired || [];
  }

  getUsedExtensions() {
    return this.json.extensionsUsed || [];
  }

  getScene(index) {
    return this._get('scenes', index);
  }

  getNode(index) {
    return this._get('nodes', index);
  }

  getSkin(index) {
    return this._get('skins', index);
  }

  getMesh(index) {
    return this._get('meshes', index);
  }

  getMaterial(index) {
    return this._get('materials', index);
  }

  getAccessor(index) {
    return this._get('accessors', index);
  }

  getCamera(index) {
    return null;
  }

  getTexture(index) {
    return this._get('textures', index);
  }

  getSampler(index) {
    return this._get('samplers', index);
  }

  getImage(index) {
    return this._get('images', index);
  }

  getBufferView(index) {
    return this._get('bufferViews', index);
  }

  getBuffer(index) {
    return this._get('buffers', index);
  }

  _get(array, index) {
    if (typeof index === 'object') {
      return index;
    }

    const object = this.gltf[array] && this.gltf[array][index];

    if (!object) {
      console.warn("glTF file error: Could not find ".concat(array, "[").concat(index, "]"));
    }

    return object;
  }

  async _loadLinkedAssets(options) {
    return await Promise.all(this.gltf.buffers.map(buffer => this._loadBuffer(buffer, options)));
  }

  async _loadBuffer(buffer, options) {
    if (buffer.uri && options.uri) {
      const fetch = options.fetch || window.fetch;
      const uri = getFullUri(buffer.uri, options.uri);
      const response = await fetch(uri);
      const arrayBuffer = await response.arrayBuffer();
      buffer.data = arrayBuffer;
      buffer.uri = null;
    }
  }

  _decompressMeshes(options) {
    if (!options.DracoLoader || !options.decompress) {
      return;
    }

    for (const mesh of this.gltf.meshes || []) {
      for (const primitive of mesh.primitives) {
        this._decompressKhronosDracoPrimitive(primitive, options);

        this._decompressUberDracoPrimitive(primitive, options);

        if (!primitive.attributes || Object.keys(primitive.attributes).length === 0) {
          throw new Error('Empty glTF primitive: decompression failure?');
        }
      }
    }

    this._removeExtension(KHR_DRACO_MESH_COMPRESSION);

    this._removeExtension(UBER_POINT_CLOUD_EXTENSION);
  }

  _decompressKhronosDracoPrimitive(primitive, options) {
    const compressedMesh = primitive.extensions && primitive.extensions[KHR_DRACO_MESH_COMPRESSION];

    if (!compressedMesh) {
      return;
    }

    delete primitive.extensions[KHR_DRACO_MESH_COMPRESSION];

    const buffer = this._getBufferViewArray(compressedMesh.bufferView);

    const decodedData = options.DracoLoader.parseSync(buffer);
    primitive.attributes = getGLTFAccessors(decodedData.attributes);

    if (decodedData.indices) {
      primitive.indices = getGLTFAccessor(decodedData.indices);
    }
  }

  _decompressUberDracoPrimitive(primitive, options) {
    const compressedMesh = primitive.extensions && primitive.extensions[UBER_POINT_CLOUD_EXTENSION];

    if (!compressedMesh) {
      return;
    }

    if (primitive.mode !== 0) {
      throw new Error(UBER_POINT_CLOUD_EXTENSION);
    }

    delete primitive.extensions[UBER_POINT_CLOUD_EXTENSION];

    const buffer = this._getBufferViewArray(compressedMesh.bufferView);

    const decodedData = options.DracoLoader.parseSync(buffer);
    primitive.attributes = decodedData.attributes;
  }

  _getBufferViewArray(bufferViewIndex) {
    const bufferView = this.gltf.bufferViews[bufferViewIndex];

    if (this.glbParser) {
      return this.glbParser.getBufferView(bufferView);
    }

    const buffer = this.gltf.buffers[bufferView.buffer].data;
    const byteOffset = bufferView.byteOffset || 0;
    return new Uint8Array(buffer, byteOffset, bufferView.byteLength);
  }

  _removeExtension(extensionName) {
    if (this.json.extensionsRequired) {
      this._removeStringFromArray(this.json.extensionsRequired, extensionName);
    }

    if (this.json.extensionsUsed) {
      this._removeStringFromArray(this.json.extensionsUsed, extensionName);
    }

    if (this.json.extensions) {
      delete this.json.extensions[extensionName];
    }
  }

  _removeStringFromArray(array, string) {
    let found = true;

    while (found) {
      const index = array.indexOf(string);

      if (index > -1) {
        array.splice(index, 1);
      } else {
        found = false;
      }
    }
  }

}
//# sourceMappingURL=gltf-parser.js.map