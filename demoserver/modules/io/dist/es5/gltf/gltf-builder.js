"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GLTFBuilder = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _images = require("@loaders.gl/images");

var _assert = require("./assert");

var _gltfConstants = require("./gltf-constants");

var _glbBuilder = _interopRequireDefault(require("./glb-builder"));

var _xvizPackBinary = require("../writers/xviz-pack-binary");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GLTFBuilder = function (_GLBBuilder) {
  (0, _inherits2["default"])(GLTFBuilder, _GLBBuilder);

  var _super = _createSuper(GLTFBuilder);

  function GLTFBuilder() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, GLTFBuilder);
    _this = _super.call(this, options);
    _this.DracoWriter = options.DracoWriter;
    _this.DracoLoader = options.DracoLoader;
    return _this;
  }

  (0, _createClass2["default"])(GLTFBuilder, [{
    key: "addApplicationData",
    value: function addApplicationData(key, data) {
      var packOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var jsonData = packOptions.nopack ? data : (0, _xvizPackBinary.packBinaryJson)(data, this, null, packOptions);
      this.json[key] = jsonData;
      return this;
    }
  }, {
    key: "addExtraData",
    value: function addExtraData(key, data) {
      var packOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var packedJson = packOptions.nopack ? data : (0, _xvizPackBinary.packBinaryJson)(data, this, null, packOptions);
      this.json.extras = this.json.extras || {};
      this.json.extras[key] = packedJson;
      return this;
    }
  }, {
    key: "addExtension",
    value: function addExtension(extensionName, data) {
      var packOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      (0, _assert.assert)(data);
      var packedJson = packOptions.nopack ? data : (0, _xvizPackBinary.packBinaryJson)(data, this, null, packOptions);
      this.json.extensions = this.json.extensions || {};
      this.json.extensions[extensionName] = packedJson;
      this.registerUsedExtension(extensionName);
      return this;
    }
  }, {
    key: "addRequiredExtension",
    value: function addRequiredExtension(extensionName, data) {
      var packOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      (0, _assert.assert)(data);
      var packedJson = packOptions.nopack ? data : (0, _xvizPackBinary.packBinaryJson)(data, this, null, packOptions);
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

      this.registerRequiredExtension(_gltfConstants.KHR_DRACO_MESH_COMPRESSION);
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
          extensions: (0, _defineProperty2["default"])({}, _gltfConstants.KHR_DRACO_MESH_COMPRESSION, {
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
          extensions: (0, _defineProperty2["default"])({}, _gltfConstants.UBER_POINT_CLOUD_EXTENSION, {
            bufferView: bufferViewIndex
          })
        }]
      };
      this.registerRequiredExtension(_gltfConstants.UBER_POINT_CLOUD_EXTENSION);
      this.json.meshes = this.json.meshes || [];
      this.json.meshes.push(glTFMesh);
      return this.json.meshes.length - 1;
    }
  }, {
    key: "addImage",
    value: function addImage(imageData) {
      var bufferViewIndex = this.addBufferView(imageData);
      var sizeAndType = (0, _images.getBinaryImageMetadata)(imageData) || {};

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
}(_glbBuilder["default"]);

exports.GLTFBuilder = GLTFBuilder;
//# sourceMappingURL=gltf-builder.js.map