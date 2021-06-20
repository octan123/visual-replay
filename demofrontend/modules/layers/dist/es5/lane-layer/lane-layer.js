"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _layers = require("@deck.gl/layers");

var _constants = _interopRequireDefault(require("@luma.gl/constants"));

var _math = require("math.gl");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultProps = _objectSpread(_objectSpread({}, _layers.PathLayer.defaultProps), {}, {
  highPrecisionDash: false,
  getColor2: {
    type: 'accessor',
    value: [0, 0, 0, 255]
  },
  getWidth: {
    type: 'accessor',
    value: [1, 0, 0]
  },
  getDashArray2: {
    type: 'accessor',
    value: [0, 0]
  }
});

var LaneLayer = function (_PathLayer) {
  (0, _inherits2["default"])(LaneLayer, _PathLayer);

  var _super = _createSuper(LaneLayer);

  function LaneLayer() {
    (0, _classCallCheck2["default"])(this, LaneLayer);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(LaneLayer, [{
    key: "getShaders",
    value: function getShaders() {
      var shaders = (0, _get2["default"])((0, _getPrototypeOf2["default"])(LaneLayer.prototype), "getShaders", this).call(this);
      shaders.vs = shaders.vs.replace('attribute float instanceStrokeWidths', 'attribute vec3 instanceStrokeWidths').replace('instanceStrokeWidths * widthScale', '(instanceStrokeWidths.x + instanceStrokeWidths.y + instanceStrokeWidths.z) * widthScale');
      shaders.inject = {
        'vs:#decl': "\nuniform float strokeIndex;\n\nattribute vec4 instanceDashArrays;\nattribute float instanceStartRatio;\n\nvarying vec4 vDashArray;\nvarying vec2 vWidth;\nvarying float vPathOffset;\n",
        'vs:#main-end': "\n  vDashArray = instanceDashArrays;\n\n  float totalWidth = instanceStrokeWidths.x + instanceStrokeWidths.y + instanceStrokeWidths.z;\n  if (strokeIndex == 0.0) {\n    vWidth = vec2(0.0, instanceStrokeWidths.x / totalWidth);\n  } else {\n    vWidth = vec2(1.0 - instanceStrokeWidths.z / totalWidth, 1.0);\n  }\n  // map to [-1.0, 1.0] space\n  vWidth = 1.0 - vWidth * 2.0;\n  vPathOffset = vPathLength * instanceStartRatio;\n",
        'fs:#decl': "\nuniform float dashAlignMode;\nvarying vec4 vDashArray;\nvarying vec2 vWidth;\nvarying float vPathOffset;\n\n// mod doesn't work correctly for negative numbers\nfloat mod2(float a, float b) {\n  return a - floor(a / b) * b;\n}\n\nfloat round(float x) {\n  return floor(x + 0.5);\n}\n",
        'fs:#main-start': "\n  if (vPathPosition.x > vWidth.x || vPathPosition.x < vWidth.y) {\n    discard;\n  }\n\n  float solid1 = vDashArray.x;\n  float gap1 = solid1 + vDashArray.y;\n  float solid2 = gap1 + vDashArray.z;\n  float unitLength = solid2 + vDashArray.w;\n\n  if (unitLength > 0.0 && vDashArray.y > 0.0) {\n    unitLength = mix(\n      unitLength,\n      vPathLength / round(vPathLength / unitLength),\n      dashAlignMode\n    );\n\n    float offset = mix(vPathOffset, vDashArray.x / 2.0, dashAlignMode);\n    float unitPosition = mod2(vPathPosition.y + offset, unitLength);\n\n    if (unitPosition > solid1 && unitPosition < gap1 || unitPosition > solid2) {\n      discard;\n    }\n  }\n"
      };
      return shaders;
    }
  }, {
    key: "initializeState",
    value: function initializeState(context) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(LaneLayer.prototype), "initializeState", this).call(this, context);
      this.getAttributeManager().addInstanced({
        instanceStrokeWidths: {
          size: 3,
          accessor: 'getWidth',
          defaultValue: [1, 0, 0]
        },
        instanceColors2: {
          size: this.props.colorFormat.length,
          type: _constants["default"].UNSIGNED_BYTE,
          normalized: true,
          accessor: 'getColor2',
          defaultValue: [0, 0, 0, 255]
        },
        instanceStartRatio: {
          size: 1,
          update: this.calculateStartRatios
        },
        instanceDashArrays: {
          size: 4,
          accessor: 'getDashArray'
        },
        instanceDashArrays2: {
          size: 4,
          accessor: 'getDashArray2'
        }
      });
    }
  }, {
    key: "draw",
    value: function draw(params) {
      var model = this.state.model;
      var attributes = this.getAttributeManager().getAttributes();
      model.setUniforms({
        strokeIndex: 0
      });
      model.setAttributes({
        instanceColors: attributes.instanceColors,
        instanceDashArrays: attributes.instanceDashArrays
      });
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(LaneLayer.prototype), "draw", this).call(this, params);
      model.setUniforms({
        strokeIndex: 1,
        dashAlignMode: this.props.dashJustified ? 1 : 0
      });
      model.setAttributes({
        instanceColors: attributes.instanceColors2,
        instanceDashArrays: attributes.instanceDashArrays2
      });
      model.draw();
    }
  }, {
    key: "calculateStartRatios",
    value: function calculateStartRatios(attribute) {
      if (!this.props.highPrecisionDash) {
        attribute.constant = true;
        attribute.value = new Float32Array(1);
        return;
      }

      var numInstances = this.state.numInstances;
      var viewport = this.context.viewport;

      var _this$getAttributeMan = this.getAttributeManager().getAttributes(),
          positions = _this$getAttributeMan.positions,
          instanceTypes = _this$getAttributeMan.instanceTypes;

      positions = positions.value;
      instanceTypes = instanceTypes.value;
      var target = attribute.value;
      var startPoint = new _math.Vector3();
      var endPoint = new _math.Vector3();
      var totalLength = 0;

      for (var i = 0; i < numInstances - 1; i++) {
        startPoint.set(positions[i * 3 + 0], positions[i * 3 + 1], positions[i * 3 + 2]);
        endPoint.set(positions[i * 3 + 3], positions[i * 3 + 4], positions[i * 3 + 5]);
        startPoint.copy(viewport.projectPosition(startPoint));
        endPoint.copy(viewport.projectPosition(endPoint));
        var segmentLength = startPoint.distance(endPoint);
        target[i] = segmentLength ? totalLength / segmentLength : 0;

        if (instanceTypes[i] <= 1) {
          totalLength += segmentLength;
        } else {
          totalLength = 0;
        }
      }
    }
  }]);
  return LaneLayer;
}(_layers.PathLayer);

exports["default"] = LaneLayer;
LaneLayer.layerName = 'LaneLayer';
LaneLayer.defaultProps = defaultProps;
//# sourceMappingURL=lane-layer.js.map