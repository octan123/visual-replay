"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _core = require("@deck.gl/core");

var _core2 = require("@luma.gl/core");

var _constants = _interopRequireDefault(require("@luma.gl/constants"));

var _trafficLightLayerVertex = _interopRequireDefault(require("./traffic-light-layer-vertex.glsl"));

var _trafficLightLayerFragment = _interopRequireDefault(require("./traffic-light-layer-fragment.glsl"));

var _trafficLightUtils = require("./traffic-light-utils");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var LIGHT_COLOR = {
  invalid: [0, 0, 0],
  green: [0, 255, 128],
  yellow: [255, 250, 0],
  red: [255, 16, 16]
};
var LIGHT_SHAPE = {
  circular: 0,
  left_arrow: 1,
  right_arrow: 2
};
var defaultProps = {
  getPosition: {
    type: 'accessor',
    value: function value(x) {
      return x.position;
    }
  },
  getAngle: {
    type: 'accessor',
    value: 0
  },
  getShape: {
    type: 'accessor',
    value: function value(x) {
      return 'circular';
    }
  },
  getColor: {
    type: 'accessor',
    value: function value(x) {
      return 'green';
    }
  },
  getState: {
    type: 'accessor',
    value: 1
  },
  sizeScale: {
    type: 'number',
    value: 0.15,
    min: 0
  },
  material: {
    shininess: 0,
    specularColor: [0, 0, 0]
  }
};

var TrafficLightLayer = function (_Layer) {
  (0, _inherits2["default"])(TrafficLightLayer, _Layer);

  var _super = _createSuper(TrafficLightLayer);

  function TrafficLightLayer() {
    (0, _classCallCheck2["default"])(this, TrafficLightLayer);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(TrafficLightLayer, [{
    key: "getShaders",
    value: function getShaders() {
      return {
        vs: _trafficLightLayerVertex["default"],
        fs: _trafficLightLayerFragment["default"],
        modules: [_core.project32, _core.gouraudLighting, _core.picking]
      };
    }
  }, {
    key: "initializeState",
    value: function initializeState() {
      var gl = this.context.gl;

      var modelsByName = this._getModels(gl);

      this.setState({
        models: [modelsByName.box, modelsByName.lights],
        modelsByName: modelsByName
      });
      var attributeManager = this.getAttributeManager();
      attributeManager.addInstanced({
        instancePositions: {
          size: 3,
          type: _constants["default"].DOUBLE,
          fp64: this.use64bitPositions(),
          accessor: 'getPosition'
        },
        instanceAngles: {
          size: 1,
          accessor: 'getAngle'
        },
        instanceShapes: {
          size: 1,
          type: _constants["default"].UNSIGNED_BYTE,
          accessor: 'getShape',
          transform: function transform(shape) {
            return LIGHT_SHAPE[shape] || 0;
          }
        },
        instanceColors: {
          size: 3,
          type: _constants["default"].UNSIGNED_BYTE,
          accessor: 'getColor',
          transform: function transform(color) {
            return LIGHT_COLOR[color] || LIGHT_COLOR.invalid;
          }
        },
        instanceStates: {
          size: 1,
          type: _constants["default"].UNSIGNED_BYTE,
          accessor: 'getState'
        }
      });
    }
  }, {
    key: "draw",
    value: function draw(_ref) {
      var uniforms = _ref.uniforms;
      var sizeScale = this.props.sizeScale;
      var modelsByName = this.state.modelsByName;
      modelsByName.box.setUniforms(Object.assign({}, uniforms, {
        modelScale: [sizeScale * 0.8, sizeScale * 1.6, sizeScale * 1.6]
      })).draw();
      modelsByName.lights.setUniforms(Object.assign({}, uniforms, {
        modelScale: [sizeScale, sizeScale, sizeScale]
      })).draw();
    }
  }, {
    key: "_getModels",
    value: function _getModels(gl) {
      var shaders = this.getShaders();
      var box = new _core2.Model(gl, _objectSpread(_objectSpread({
        id: "".concat(this.props.id, "-box")
      }, shaders), {}, {
        shaderCache: this.context.shaderCache,
        geometry: new _core2.CubeGeometry(),
        isInstanced: true,
        uniforms: {
          modelTranslate: [0, 0, 0],
          useInstanceColor: false
        }
      }));
      var lights = new _core2.Model(gl, _objectSpread(_objectSpread({
        id: "".concat(this.props.id, "-light")
      }, shaders), {}, {
        shaderCache: this.context.shaderCache,
        geometry: new _core2.SphereGeometry(),
        isInstanced: true,
        uniforms: {
          lightShapeTexture: (0, _trafficLightUtils.makeLightShapeTexture)(gl),
          modelTranslate: [-0.4, 0, 0],
          useInstanceColor: true
        }
      }));
      return {
        box: box,
        lights: lights
      };
    }
  }, {
    key: "updateAttributes",
    value: function updateAttributes(changedAttributes) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(TrafficLightLayer.prototype), "updateAttributes", this).call(this, changedAttributes);

      var _iterator = _createForOfIteratorHelper(this.getModels()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var model = _step.value;
          model.setInstanceCount(this.props.data.length);
          model.setAttributes(changedAttributes);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);
  return TrafficLightLayer;
}(_core.Layer);

exports["default"] = TrafficLightLayer;
TrafficLightLayer.layerName = 'TrafficLightLayer';
TrafficLightLayer.defaultProps = defaultProps;
//# sourceMappingURL=traffic-light-layer.js.map