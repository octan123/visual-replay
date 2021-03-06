import _typeof from "@babel/runtime/helpers/esm/typeof";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import '../common/text-encoding';
import { fetchFile } from '@loaders.gl/core';
import { getFullUri } from './gltf-utils/gltf-utils';
import { getGLTFAccessors, getGLTFAccessor } from './gltf-utils/gltf-attribute-utils';
import { KHR_DRACO_MESH_COMPRESSION, UBER_POINT_CLOUD_EXTENSION } from './gltf-constants';
import GLBParser from './glb-parser';
import GLTFPostProcessorOld from './gltf-post-processor-old';
var DEFAULT_OPTIONS = {
  fetchLinkedResources: true,
  fetch: fetchFile,
  decompress: false,
  DracoLoader: null,
  postProcess: true,
  createImages: false,
  log: console
};
export var GLTFParser = function () {
  function GLTFParser() {
    _classCallCheck(this, GLTFParser);
  }

  _createClass(GLTFParser, [{
    key: "parse",
    value: function () {
      var _parse = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(gltf) {
        var options,
            postProcessor,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                options = Object.assign({}, DEFAULT_OPTIONS, options);
                this.parseSync(gltf, _objectSpread(_objectSpread({}, options), {}, {
                  postProcess: false,
                  decompress: false
                }));

                if (!options.fetchLinkedResources) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return this._loadLinkedAssets(options);

              case 6:
                if (options.decompress) {
                  this._decompressMeshes(options);
                }

                if (options.postProcess) {
                  postProcessor = new GLTFPostProcessorOld();
                  postProcessor.postProcess(this.gltf, this.glbParser, options);
                }

                return _context.abrupt("return", this.gltf);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function parse(_x) {
        return _parse.apply(this, arguments);
      }

      return parse;
    }()
  }, {
    key: "parseSync",
    value: function parseSync(gltf) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options = Object.assign({}, DEFAULT_OPTIONS, options);

      if (gltf instanceof ArrayBuffer && !GLBParser.isGLB(gltf, options)) {
        var textDecoder = new TextDecoder();
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
        var postProcessor = new GLTFPostProcessorOld();
        postProcessor.postProcess(this.gltf, this.glbParser, options);
      }

      return this.gltf;
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
    key: "getExtraData",
    value: function getExtraData(key) {
      var extras = this.json.extras || {};
      return extras[key];
    }
  }, {
    key: "getExtension",
    value: function getExtension(extensionName) {
      var isExtension = this.getUsedExtensions().find(function (name) {
        return name === extensionName;
      });
      var extensions = this.json.extensions || {};
      return isExtension ? extensions[extensionName] || true : null;
    }
  }, {
    key: "getRequiredExtension",
    value: function getRequiredExtension(extensionName) {
      var isRequired = this.getRequiredExtensions().find(function (name) {
        return name === extensionName;
      });
      return isRequired ? this.getExtension(extensionName) : null;
    }
  }, {
    key: "getRequiredExtensions",
    value: function getRequiredExtensions() {
      return this.json.extensionsRequired || [];
    }
  }, {
    key: "getUsedExtensions",
    value: function getUsedExtensions() {
      return this.json.extensionsUsed || [];
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
    key: "_loadLinkedAssets",
    value: function () {
      var _loadLinkedAssets2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(options) {
        var _this = this;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Promise.all(this.gltf.buffers.map(function (buffer) {
                  return _this._loadBuffer(buffer, options);
                }));

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _loadLinkedAssets(_x2) {
        return _loadLinkedAssets2.apply(this, arguments);
      }

      return _loadLinkedAssets;
    }()
  }, {
    key: "_loadBuffer",
    value: function () {
      var _loadBuffer2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(buffer, options) {
        var fetch, uri, response, arrayBuffer;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(buffer.uri && options.uri)) {
                  _context3.next = 11;
                  break;
                }

                fetch = options.fetch || window.fetch;
                uri = getFullUri(buffer.uri, options.uri);
                _context3.next = 5;
                return fetch(uri);

              case 5:
                response = _context3.sent;
                _context3.next = 8;
                return response.arrayBuffer();

              case 8:
                arrayBuffer = _context3.sent;
                buffer.data = arrayBuffer;
                buffer.uri = null;

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function _loadBuffer(_x3, _x4) {
        return _loadBuffer2.apply(this, arguments);
      }

      return _loadBuffer;
    }()
  }, {
    key: "_decompressMeshes",
    value: function _decompressMeshes(options) {
      if (!options.DracoLoader || !options.decompress) {
        return;
      }

      var _iterator = _createForOfIteratorHelper(this.gltf.meshes || []),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mesh = _step.value;

          var _iterator2 = _createForOfIteratorHelper(mesh.primitives),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var primitive = _step2.value;

              this._decompressKhronosDracoPrimitive(primitive, options);

              this._decompressUberDracoPrimitive(primitive, options);

              if (!primitive.attributes || Object.keys(primitive.attributes).length === 0) {
                throw new Error('Empty glTF primitive: decompression failure?');
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this._removeExtension(KHR_DRACO_MESH_COMPRESSION);

      this._removeExtension(UBER_POINT_CLOUD_EXTENSION);
    }
  }, {
    key: "_decompressKhronosDracoPrimitive",
    value: function _decompressKhronosDracoPrimitive(primitive, options) {
      var compressedMesh = primitive.extensions && primitive.extensions[KHR_DRACO_MESH_COMPRESSION];

      if (!compressedMesh) {
        return;
      }

      delete primitive.extensions[KHR_DRACO_MESH_COMPRESSION];

      var buffer = this._getBufferViewArray(compressedMesh.bufferView);

      var decodedData = options.DracoLoader.parseSync(buffer);
      primitive.attributes = getGLTFAccessors(decodedData.attributes);

      if (decodedData.indices) {
        primitive.indices = getGLTFAccessor(decodedData.indices);
      }
    }
  }, {
    key: "_decompressUberDracoPrimitive",
    value: function _decompressUberDracoPrimitive(primitive, options) {
      var compressedMesh = primitive.extensions && primitive.extensions[UBER_POINT_CLOUD_EXTENSION];

      if (!compressedMesh) {
        return;
      }

      if (primitive.mode !== 0) {
        throw new Error(UBER_POINT_CLOUD_EXTENSION);
      }

      delete primitive.extensions[UBER_POINT_CLOUD_EXTENSION];

      var buffer = this._getBufferViewArray(compressedMesh.bufferView);

      var decodedData = options.DracoLoader.parseSync(buffer);
      primitive.attributes = decodedData.attributes;
    }
  }, {
    key: "_getBufferViewArray",
    value: function _getBufferViewArray(bufferViewIndex) {
      var bufferView = this.gltf.bufferViews[bufferViewIndex];

      if (this.glbParser) {
        return this.glbParser.getBufferView(bufferView);
      }

      var buffer = this.gltf.buffers[bufferView.buffer].data;
      var byteOffset = bufferView.byteOffset || 0;
      return new Uint8Array(buffer, byteOffset, bufferView.byteLength);
    }
  }, {
    key: "_removeExtension",
    value: function _removeExtension(extensionName) {
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

  return GLTFParser;
}();
//# sourceMappingURL=gltf-parser.js.map