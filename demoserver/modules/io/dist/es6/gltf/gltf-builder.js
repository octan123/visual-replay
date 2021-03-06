import { getBinaryImageMetadata } from '@loaders.gl/images';
import { assert } from './assert';
import { KHR_DRACO_MESH_COMPRESSION, UBER_POINT_CLOUD_EXTENSION } from './gltf-constants';
import GLBBuilder from './glb-builder';
import { packBinaryJson } from '../writers/xviz-pack-binary';
export class GLTFBuilder extends GLBBuilder {
  constructor(options = {}) {
    super(options);
    this.DracoWriter = options.DracoWriter;
    this.DracoLoader = options.DracoLoader;
  }

  addApplicationData(key, data, packOptions = {}) {
    const jsonData = packOptions.nopack ? data : packBinaryJson(data, this, null, packOptions);
    this.json[key] = jsonData;
    return this;
  }

  addExtraData(key, data, packOptions = {}) {
    const packedJson = packOptions.nopack ? data : packBinaryJson(data, this, null, packOptions);
    this.json.extras = this.json.extras || {};
    this.json.extras[key] = packedJson;
    return this;
  }

  addExtension(extensionName, data, packOptions = {}) {
    assert(data);
    const packedJson = packOptions.nopack ? data : packBinaryJson(data, this, null, packOptions);
    this.json.extensions = this.json.extensions || {};
    this.json.extensions[extensionName] = packedJson;
    this.registerUsedExtension(extensionName);
    return this;
  }

  addRequiredExtension(extensionName, data, packOptions = {}) {
    assert(data);
    const packedJson = packOptions.nopack ? data : packBinaryJson(data, this, null, packOptions);
    this.addExtension(extensionName, packedJson);
    this.registerRequiredExtension(extensionName);
    return this;
  }

  registerUsedExtension(extensionName) {
    this.json.extensionsUsed = this.json.extensionsUsed || [];

    if (!this.json.extensionsUsed.find(ext => ext === extensionName)) {
      this.json.extensionsUsed.push(extensionName);
    }
  }

  registerRequiredExtension(extensionName) {
    this.registerUsedExtension(extensionName);
    this.json.extensionsRequired = this.json.extensionsRequired || [];

    if (!this.json.extensionsRequired.find(ext => ext === extensionName)) {
      this.json.extensionsRequired.push(extensionName);
    }
  }

  addMesh(attributes, indices, mode = 4) {
    const accessors = this._addAttributes(attributes);

    const glTFMesh = {
      primitives: [{
        attributes: accessors,
        indices,
        mode
      }]
    };
    this.json.meshes = this.json.meshes || [];
    this.json.meshes.push(glTFMesh);
    return this.json.meshes.length - 1;
  }

  addPointCloud(attributes) {
    const accessorIndices = this._addAttributes(attributes);

    const glTFMesh = {
      primitives: [{
        attributes: accessorIndices,
        mode: 0
      }]
    };
    this.json.meshes = this.json.meshes || [];
    this.json.meshes.push(glTFMesh);
    return this.json.meshes.length - 1;
  }

  addCompressedMesh(attributes, indices, mode = 4) {
    if (!this.DracoWriter || !this.DracoLoader) {
      throw new Error('DracoWriter/DracoLoader not available');
    }

    this.registerRequiredExtension(KHR_DRACO_MESH_COMPRESSION);
    const compressedData = this.DracoWriter.encodeSync({
      attributes
    });
    const decodedData = this.DracoLoader.parseSync({
      attributes
    });

    const fauxAccessors = this._addFauxAttributes(decodedData.attributes);

    const bufferViewIndex = this.addBufferView(compressedData);
    const glTFMesh = {
      primitives: [{
        attributes: fauxAccessors,
        mode,
        extensions: {
          [KHR_DRACO_MESH_COMPRESSION]: {
            bufferView: bufferViewIndex,
            attributes: fauxAccessors
          }
        }
      }]
    };
    this.json.meshes = this.json.meshes || [];
    this.json.meshes.push(glTFMesh);
    return this.json.meshes.length - 1;
  }

  addCompressedPointCloud(attributes) {
    if (!this.DracoWriter || !this.DracoLoader) {
      throw new Error('DracoWriter/DracoLoader not available');
    }

    attributes.mode = 0;
    const compressedData = this.DracoWriter.encodeSync(attributes, {
      pointcloud: true
    });
    const bufferViewIndex = this.addBufferView(compressedData);
    const glTFMesh = {
      primitives: [{
        attributes: {},
        mode: 0,
        extensions: {
          [UBER_POINT_CLOUD_EXTENSION]: {
            bufferView: bufferViewIndex
          }
        }
      }]
    };
    this.registerRequiredExtension(UBER_POINT_CLOUD_EXTENSION);
    this.json.meshes = this.json.meshes || [];
    this.json.meshes.push(glTFMesh);
    return this.json.meshes.length - 1;
  }

  addImage(imageData) {
    const bufferViewIndex = this.addBufferView(imageData);
    const sizeAndType = getBinaryImageMetadata(imageData) || {};

    if (sizeAndType) {
      const {
        mimeType,
        width,
        height
      } = sizeAndType;
      this.json.images.push({
        bufferView: bufferViewIndex,
        mimeType,
        width,
        height
      });
    } else {
      this.json.images.push({
        bufferView: bufferViewIndex
      });
    }

    return this.json.images.length - 1;
  }

}
//# sourceMappingURL=gltf-builder.js.map