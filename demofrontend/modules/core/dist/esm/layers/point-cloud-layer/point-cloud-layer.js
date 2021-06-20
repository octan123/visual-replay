import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { PointCloudLayer as CorePointCloudLayer } from '@deck.gl/layers';
import vs from './point-cloud-layer-vertex.glsl';
var COLOR_MODE = {
  "default": 0,
  elevation: 1,
  distance_to_vehicle: 2,
  DEFAULT: 0,
  ELEVATION: 1,
  DISTANCE_TO_VEHICLE: 2
};
var COLOR_DOMAIN = {
  "default": [0, 0],
  elevation: [0, 3],
  distance_to_vehicle: [0, 60],
  DEFAULT: [0, 0],
  ELEVATION: [0, 3],
  DISTANCE_TO_VEHICLE: [0, 60]
};
var defaultProps = {
  colorMode: 'default',
  colorDomain: null
};

var PointCloudLayer = function (_CorePointCloudLayer) {
  _inherits(PointCloudLayer, _CorePointCloudLayer);

  var _super = _createSuper(PointCloudLayer);

  function PointCloudLayer() {
    _classCallCheck(this, PointCloudLayer);

    return _super.apply(this, arguments);
  }

  _createClass(PointCloudLayer, [{
    key: "getShaders",
    value: function getShaders() {
      var shaders = _get(_getPrototypeOf(PointCloudLayer.prototype), "getShaders", this).call(this);

      shaders.vs = vs;
      return shaders;
    }
  }, {
    key: "updateState",
    value: function updateState(params) {
      _get(_getPrototypeOf(PointCloudLayer.prototype), "updateState", this).call(this, params);

      var props = params.props,
          oldProps = params.oldProps;

      if (props.modelMatrix !== oldProps.modelMatrix || props.vehicleRelativeTransform !== oldProps.vehicleRelativeTransform) {
        var vehicleDistanceTransform = props.vehicleRelativeTransform.clone().invert();

        if (props.modelMatrix) {
          vehicleDistanceTransform.multiplyRight(props.modelMatrix);
        }

        this.setState({
          vehicleDistanceTransform: vehicleDistanceTransform
        });
      }

      if (props.instanceColors !== oldProps.instanceColors) {
        var _this$getAttributeMan = this.getAttributeManager().getAttributes(),
            instanceColors = _this$getAttributeMan.instanceColors;

        var colorSize = props.instanceColors ? props.instanceColors.length / props.numInstances : 4;
        instanceColors.size = colorSize;
      }
    }
  }, {
    key: "draw",
    value: function draw(_ref) {
      var uniforms = _ref.uniforms;
      var _this$props = this.props,
          colorMode = _this$props.colorMode,
          colorDomain = _this$props.colorDomain;
      var vehicleDistanceTransform = this.state.vehicleDistanceTransform;

      _get(_getPrototypeOf(PointCloudLayer.prototype), "draw", this).call(this, {
        uniforms: Object.assign({}, uniforms, {
          colorMode: COLOR_MODE[colorMode] || COLOR_MODE["default"],
          colorDomain: colorDomain || COLOR_DOMAIN[colorMode] || COLOR_DOMAIN["default"],
          vehicleDistanceTransform: vehicleDistanceTransform
        })
      });
    }
  }]);

  return PointCloudLayer;
}(CorePointCloudLayer);

export { PointCloudLayer as default };
PointCloudLayer.layerName = 'PointCloudLayer';
PointCloudLayer.defaultProps = defaultProps;
//# sourceMappingURL=point-cloud-layer.js.map