import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { getBinaryImageMetadata } from '@loaders.gl/images';
import { assert } from './assert';
import { KHR_DRACO_MESH_COMPRESSION, UBER_POINT_CLOUD_EXTENSION } from './gltf-constants';
import GLBBuilder from './glb-builder';
import { packBinaryJson } from '../writers/xviz-pack-binary';
export var GLTFBuilder = function (_GLBBuilder) {
  _inherits(GLTFBuilder, _GLBBuilder);

  var _super = _createSuper(GLTFBuilder);

  function GLTFBuilder() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, GLTFBuilder);

    _this = _super.call(this, options);
    _this.DracoWriter = options.DracoWriter;
    _this.DracoLoader = options.DracoLoader;
    return _this;
  }

  _createClass(GLTFBuilder, [{
    key: "addApplicationData",
    value: function addApplicationData(key, data) {
      var packOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var jsonData = packOptions.nopack ? data : packBinaryJson(data, this, null, packOptions);
      this.json[key] = jsonData;
      return this;
    }
  }, {
    key: "addExtraData",
    value: function addExtraData(key, data) {
      var packOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var packedJson = packOptions.nopack ? data : packBinaryJson(data, this, null, packOptions);
      this.json.extras = this.json.extras || {};
      this.json.extras[key] = packedJson;
      return this;
    }
  }, {
    key: "addExtension",
    value: function addExtension(extensionName, data) {
      var packOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      assert(data);
      var packedJson = packOptions.nopack ? data : packBinaryJson(data, this, null, packOptions);
      this.json.extensions = this.json.extensions || {};
      this.json.extensions[extensionName] = packedJson;
      this.registerUsedExtension(extensionName);
      return this;
    }
  }, {
    key: "addRequiredExtension",
    value: function addRequiredExtension(extensionName, data) {
      var packOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      assert(data);
      var packedJson = packOptions.nopack ? data : packBinaryJson(data, this, null, packOptions);
      this.addExtension(extensionName, packedJson);
      this.registerRequiredExtension(extensionName);
      return this;
    }
  }, {
    key: "registerUsedExtension",
    value: function registerUsedExtension(extensionName) {
      this.json.extensionsUsed = this.json.extensionsUsed || [];

      if (!this.json.extensionsUsed.find(function (ext) {
        return ext === extensionName;
      })) {
        this.json.extensionsUsed.push(extensionName);
      }
    }
  }, {
    key: "registerRequiredExtension",
    value: function registerRequiredExtension(extensionName) {
      this.registerUsedExtension(extensionName);
      this.json.extensionsRequired = this.json.extensionsRequired || [];

      if (!this.json.extensionsRequired.find(function (ext) {
        return ext === extensionName;
      })) {
        this.json.extensionsRequired.push(extensionName);
      }
    }
  }, {
    key: "addMesh",
    value: function addMesh(attributes, indices) {
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

      var accessors = this._addAttributes(attributes);

      var glTFMesh = {
        primitives: [{
          attributes: accessors,
          indices: indices,
          mode: mode
        }]
      };
      this.json.meshes = this.json.meshes || [];
      this.json.meshes.push(glTFMesh);
      return this.json.meshes.length - 1;
    }
  }, {
    key: "addPointCloud",
    value: function addPointCloud(attributes) {
      var accessorIndices = this._addAttributes(attributes);

      var glTFMesh = {
        primitives: [{
          attributes: accessorIndices,
          mode: 0
        }]
      };
      this.json.meshes = this.json.meshes || [];
      this.json.meshes.push(glTFMesh);
      return this.json.meshes.length - 1;
    }
  }, {
    key: "addCompressedMesh",
    value: function addCompressedMesh(attributes, indices) {
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

      if (!this.DracoWriter || !this.DracoLoader) {
        throw new Error('DracoWriter/DracoLoader not available');
      }

      this.registerRequiredExtension(KHR_DRACO_MESH_COMPRESSION);
      var compressedData = this.DracoWriter.encodeSync({
        attributes: attributes
      });
      var decodedData = this.DracoLoader.parseSync({
        attributes: attributes
      });

      var fauxAccessors = this._addFauxAttributes(decodedData.attributes);

      var bufferViewIndex = this.addBufferView(compressedData);
      var glTFMesh = {
        primitives: [{
          attributes: fauxAccessors,
          mode: mode,
          extensions: _defineProperty({}, KHR_DRACO_MESH_COMPRESSION, {
            bufferView: bufferViewIndex,
            attributes: fauxAccessors
          })
        }]
      };
      this.json.meshes = this.json.meshes || [];
      this.json.meshes.push(glTFMesh);
      return this.json.meshes.length - 1;
    }
  }, {
    key: "addCompressedPointCloud",
    value: function addCompressedPointCloud(attributes) {
      if (!this.DracoWriter || !this.DracoLoader) {
        throw new Error('DracoWriter/DracoLoader not available');
      }

      attributes.mode = 0;
      var compressedData = this.DracoWriter.encodeSync(attributes, {
        pointcloud: true
      });
      var bufferViewIndex = this.addBufferView(compressedData);
      var glTFMesh = {
        primitives: [{
          attributes: {},
          mode: 0,
          extensions: _defineProperty({}, UBER_POINT_CLOUD_EXTENSION, {
            bufferView: bufferViewIndex
          })
        }]
      };
      this.registerRequiredExtension(UBER_POINT_CLOUD_EXTENSION);
      this.json.meshes = this.json.meshes || [];
      this.json.meshes.push(glTFMesh);
      return this.json.meshes.length - 1;
    }
  }, {
    key: "addImage",
    value: function addImage(imageData) {
      var bufferViewIndex = this.addBufferView(imageData);
      var sizeAndType = getBinaryImageMetadata(imageData) || {};

      if (sizeAndType) {
        var mimeType = sizeAndType.mimeType,
            width = sizeAndType.width,
            height = sizeAndType.height;
        this.json.images.push({
          bufferView: bufferViewIndex,
          mimeType: mimeType,
          width: width,
          height: height
        });
      } else {
        this.json.images.push({
          bufferView: bufferViewIndex
        });
      }

      return this.json.images.length - 1;
    }
  }]);

  return GLTFBuilder;
}(GLBBuilder);
//# sourceMappingURL=gltf-builder.js.map