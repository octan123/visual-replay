import _typeof from "@babel/runtime/helpers/esm/typeof";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var _DEFAULT_SAMPLER;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { getFullUri } from './gltf-utils/gltf-utils';
var COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
var BYTES = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
};
var GL_SAMPLER = {
  TEXTURE_MAG_FILTER: 0x2800,
  TEXTURE_MIN_FILTER: 0x2801,
  TEXTURE_WRAP_S: 0x2802,
  TEXTURE_WRAP_T: 0x2803,
  REPEAT: 0x2901,
  LINEAR: 0x2601,
  NEAREST_MIPMAP_LINEAR: 0x2702
};
var SAMPLER_PARAMETER_GLTF_TO_GL = {
  magFilter: GL_SAMPLER.TEXTURE_MAG_FILTER,
  minFilter: GL_SAMPLER.TEXTURE_MIN_FILTER,
  wrapS: GL_SAMPLER.TEXTURE_WRAP_S,
  wrapT: GL_SAMPLER.TEXTURE_WRAP_T
};
var DEFAULT_SAMPLER = (_DEFAULT_SAMPLER = {}, _defineProperty(_DEFAULT_SAMPLER, GL_SAMPLER.TEXTURE_MAG_FILTER, GL_SAMPLER.LINEAR), _defineProperty(_DEFAULT_SAMPLER, GL_SAMPLER.TEXTURE_MIN_FILTER, GL_SAMPLER.NEAREST_MIPMAP_LINEAR), _defineProperty(_DEFAULT_SAMPLER, GL_SAMPLER.TEXTURE_WRAP_S, GL_SAMPLER.REPEAT), _defineProperty(_DEFAULT_SAMPLER, GL_SAMPLER.TEXTURE_WRAP_, GL_SAMPLER.REPEAT), _DEFAULT_SAMPLER);

function getBytesFromComponentType(componentType) {
  return BYTES[componentType];
}

function getSizeFromAccessorType(type) {
  return COMPONENTS[type];
}

var GLTFPostProcessorOld = function () {
  function GLTFPostProcessorOld() {
    _classCallCheck(this, GLTFPostProcessorOld);
  }

  _createClass(GLTFPostProcessorOld, [{
    key: "postProcess",
    value: function postProcess(gltf, glbParser) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.gltf = gltf;
      this.glbParser = glbParser;

      this._resolveToTree(options);

      return this.gltf;
    }
  }, {
    key: "_resolveToTree",
    value: function _resolveToTree() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var gltf = this.gltf;
      (gltf.bufferViews || []).forEach(function (bufView, i) {
        return _this._resolveBufferView(bufView, i);
      });
      (gltf.images || []).forEach(function (image, i) {
        return _this._resolveImage(image, i, options);
      });
      (gltf.samplers || []).forEach(function (sampler, i) {
        return _this._resolveSampler(sampler, i);
      });
      (gltf.textures || []).forEach(function (texture, i) {
        return _this._resolveTexture(texture, i);
      });
      (gltf.accessors || []).forEach(function (accessor, i) {
        return _this._resolveAccessor(accessor, i);
      });
      (gltf.materials || []).forEach(function (material, i) {
        return _this._resolveMaterial(material, i);
      });
      (gltf.meshes || []).forEach(function (mesh, i) {
        return _this._resolveMesh(mesh, i);
      });
      (gltf.nodes || []).forEach(function (node, i) {
        return _this._resolveNode(node, i);
      });
      (gltf.skins || []).forEach(function (skin, i) {
        return _this._resolveSkin(skin, i);
      });
      (gltf.scenes || []).forEach(function (scene, i) {
        return _this._resolveScene(scene, i);
      });

      if (gltf.scene !== undefined) {
        gltf.scene = gltf.scenes[this.gltf.scene];
      }

      this._process_extension_KHR_lights_punctual();

      return gltf;
    }
  }, {
    key: "getScene",
    value: function getScene(index) {
      return this._get('scenes', index);
    }
  }, {
    key: "getNode",
    value: function getNode(index) {
      return this._get('nodes', index);
    }
  }, {
    key: "getSkin",
    value: function getSkin(index) {
      return this._get('skins', index);
    }
  }, {
    key: "getMesh",
    value: function getMesh(index) {
      return this._get('meshes', index);
    }
  }, {
    key: "getMaterial",
    value: function getMaterial(index) {
      return this._get('materials', index);
    }
  }, {
    key: "getAccessor",
    value: function getAccessor(index) {
      return this._get('accessors', index);
    }
  }, {
    key: "getCamera",
    value: function getCamera(index) {
      return null;
    }
  }, {
    key: "getTexture",
    value: function getTexture(index) {
      return this._get('textures', index);
    }
  }, {
    key: "getSampler",
    value: function getSampler(index) {
      return this._get('samplers', index);
    }
  }, {
    key: "getImage",
    value: function getImage(index) {
      return this._get('images', index);
    }
  }, {
    key: "getBufferView",
    value: function getBufferView(index) {
      return this._get('bufferViews', index);
    }
  }, {
    key: "getBuffer",
    value: function getBuffer(index) {
      return this._get('buffers', index);
    }
  }, {
    key: "_get",
    value: function _get(array, index) {
      if (_typeof(index) === 'object') {
        return index;
      }

      var object = this.gltf[array] && this.gltf[array][index];

      if (!object) {
        console.warn("glTF file error: Could not find ".concat(array, "[").concat(index, "]"));
      }

      return object;
    }
  }, {
    key: "_resolveScene",
    value: function _resolveScene(scene, index) {
      var _this2 = this;

      scene.id = "scene-".concat(index);
      scene.nodes = (scene.nodes || []).map(function (node) {
        return _this2.getNode(node);
      });
    }
  }, {
    key: "_resolveNode",
    value: function _resolveNode(node, index) {
      var _this3 = this;

      node.id = "node-".concat(index);
      node.children = (node.children || []).map(function (child) {
        return _this3.getNode(child);
      });

      if (node.mesh !== undefined) {
        node.mesh = this.getMesh(node.mesh);
      }

      if (node.camera !== undefined) {
        node.camera = this.getCamera(node.camera);
      }

      if (node.skin !== undefined) {
        node.skin = this.getSkin(node.skin);
      }
    }
  }, {
    key: "_resolveSkin",
    value: function _resolveSkin(skin, index) {
      skin.id = "skin-".concat(index);
      skin.inverseBindMatrices = this.getAccessor(skin.inverseBindMatrices);
    }
  }, {
    key: "_resolveMesh",
    value: function _resolveMesh(mesh, index) {
      mesh.id = "mesh-".concat(index);

      var _iterator = _createForOfIteratorHelper(mesh.primitives),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var primitive = _step.value;

          for (var attribute in primitive.attributes) {
            primitive.attributes[attribute] = this.getAccessor(primitive.attributes[attribute]);
          }

          if (primitive.indices !== undefined) {
            primitive.indices = this.getAccessor(primitive.indices);
          }

          if (primitive.material !== undefined) {
            primitive.material = this.getMaterial(primitive.material);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_resolveMaterial",
    value: function _resolveMaterial(material, index) {
      material.id = "material-".concat(index);

      if (material.normalTexture) {
        material.normalTexture.texture = this.getTexture(material.normalTexture.index);
      }

      if (material.occlusionTexture) {
        material.occlusionTexture.texture = this.getTexture(material.occlusionTexture.index);
      }

      if (material.emissiveTexture) {
        material.emissiveTexture.texture = this.getTexture(material.emissiveTexture.index);
      }

      if (material.pbrMetallicRoughness) {
        var mr = material.pbrMetallicRoughness;

        if (mr.baseColorTexture) {
          mr.baseColorTexture.texture = this.getTexture(mr.baseColorTexture.index);
        }

        if (mr.metallicRoughnessTexture) {
          mr.metallicRoughnessTexture.texture = this.getTexture(mr.metallicRoughnessTexture.index);
        }
      }
    }
  }, {
    key: "_resolveAccessor",
    value: function _resolveAccessor(accessor, index) {
      accessor.id = "accessor-".concat(index);

      if (accessor.bufferView !== undefined) {
        accessor.bufferView = this.getBufferView(accessor.bufferView);
      }

      accessor.bytesPerComponent = getBytesFromComponentType(accessor);
      accessor.components = getSizeFromAccessorType(accessor);
      accessor.bytesPerElement = accessor.bytesPerComponent * accessor.components;
    }
  }, {
    key: "_resolveTexture",
    value: function _resolveTexture(texture, index) {
      texture.id = "texture-".concat(index);
      texture.sampler = 'sampler' in texture ? this.getSampler(texture.sampler) : DEFAULT_SAMPLER;
      texture.source = this.getImage(texture.source);
    }
  }, {
    key: "_resolveSampler",
    value: function _resolveSampler(sampler, index) {
      sampler.id = "sampler-".concat(index);
      sampler.parameters = {};

      for (var key in sampler) {
        var glEnum = this._enumSamplerParameter(key);

        if (glEnum !== undefined) {
          sampler.parameters[glEnum] = sampler[key];
        }
      }
    }
  }, {
    key: "_enumSamplerParameter",
    value: function _enumSamplerParameter(key) {
      return SAMPLER_PARAMETER_GLTF_TO_GL[key];
    }
  }, {
    key: "_resolveImage",
    value: function _resolveImage(image, index, options) {
      var _this4 = this;

      image.id = "image-".concat(index);

      if (image.bufferView !== undefined) {
        image.bufferView = this.getBufferView(image.bufferView);
      }

      var _options$createImages = options.createImages,
          createImages = _options$createImages === void 0 ? true : _options$createImages;

      if (createImages) {
        image.image = this.glbParser.getImage(image);
      } else {
        image.getImageAsync = function () {
          if (_this4.glbParser) {
            return _this4.glbParser.getImageAsync(image);
          } else if (image.uri) {
            return new Promise(function (resolve) {
              var img = new Image();
              img.crossOrigin = 'anonymous';

              img.onload = function () {
                return resolve(img);
              };

              img.src = getFullUri(image.uri, options.uri);
            });
          }

          return null;
        };
      }
    }
  }, {
    key: "_resolveBufferView",
    value: function _resolveBufferView(bufferView, index) {
      bufferView.id = "bufferView-".concat(index);
      bufferView.buffer = this.getBuffer(bufferView.buffer);

      if (this.glbParser) {
        bufferView.data = this.glbParser.getBufferView(bufferView);
      } else {
        var byteOffset = bufferView.byteOffset || 0;
        bufferView.data = new Uint8Array(bufferView.buffer.data, byteOffset, bufferView.byteLength);
      }
    }
  }, {
    key: "_resolveCamera",
    value: function _resolveCamera(camera) {
      if (camera.perspective) {}

      if (camera.orthographic) {}
    }
  }, {
    key: "_process_extension_KHR_lights_punctual",
    value: function _process_extension_KHR_lights_punctual() {
      var gltf = this.gltf;
      var extension = gltf.extensions && gltf.extensions.KHR_lights_punctual;

      if (extension) {
        gltf.lights = extension.lights;
      }

      this._removeExtension('KHR_lights_punctual');

      var _iterator2 = _createForOfIteratorHelper(gltf.nodes || []),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var node = _step2.value;
          var nodeExtension = node.extensions && node.extensions.KHR_lights_punctual;

          if (nodeExtension) {
            node.light = this._get('lights', nodeExtension.light);
            delete node.extensions.KHR_lights_punctual;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      delete gltf.lights;
    }
  }, {
    key: "_removeExtension",
    value: function _removeExtension(extensionName) {
      if (this.gltf.extensionsRequired) {
        this._removeStringFromArray(this.gltf.extensionsRequired, extensionName);
      }

      if (this.gltf.extensionsUsed) {
        this._removeStringFromArray(this.gltf.extensionsUsed, extensionName);
      }

      if (this.gltf.extensions) {
        delete this.gltf.extensions[extensionName];
      }
    }
  }, {
    key: "_removeStringFromArray",
    value: function _removeStringFromArray(array, string) {
      var found = true;

      while (found) {
        var index = array.indexOf(string);

        if (index > -1) {
          array.splice(index, 1);
        } else {
          found = false;
        }
      }
    }
  }]);

  return GLTFPostProcessorOld;
}();

export { GLTFPostProcessorOld as default };
//# sourceMappingURL=gltf-post-processor-old.js.map