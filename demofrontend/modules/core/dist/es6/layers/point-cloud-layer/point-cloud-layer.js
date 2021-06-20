import { PointCloudLayer as CorePointCloudLayer } from '@deck.gl/layers';
import vs from './point-cloud-layer-vertex.glsl';
const COLOR_MODE = {
  default: 0,
  elevation: 1,
  distance_to_vehicle: 2,
  DEFAULT: 0,
  ELEVATION: 1,
  DISTANCE_TO_VEHICLE: 2
};
const COLOR_DOMAIN = {
  default: [0, 0],
  elevation: [0, 3],
  distance_to_vehicle: [0, 60],
  DEFAULT: [0, 0],
  ELEVATION: [0, 3],
  DISTANCE_TO_VEHICLE: [0, 60]
};
const defaultProps = {
  colorMode: 'default',
  colorDomain: null
};
export default class PointCloudLayer extends CorePointCloudLayer {
  getShaders() {
    const shaders = super.getShaders();
    shaders.vs = vs;
    return shaders;
  }

  updateState(params) {
    super.updateState(params);
    const {
      props,
      oldProps
    } = params;

    if (props.modelMatrix !== oldProps.modelMatrix || props.vehicleRelativeTransform !== oldProps.vehicleRelativeTransform) {
      const vehicleDistanceTransform = props.vehicleRelativeTransform.clone().invert();

      if (props.modelMatrix) {
        vehicleDistanceTransform.multiplyRight(props.modelMatrix);
      }

      this.setState({
        vehicleDistanceTransform
      });
    }

    if (props.instanceColors !== oldProps.instanceColors) {
      const {
        instanceColors
      } = this.getAttributeManager().getAttributes();
      const colorSize = props.instanceColors ? props.instanceColors.length / props.numInstances : 4;
      instanceColors.size = colorSize;
    }
  }

  draw({
    uniforms
  }) {
    const {
      colorMode,
      colorDomain
    } = this.props;
    const {
      vehicleDistanceTransform
    } = this.state;
    super.draw({
      uniforms: Object.assign({}, uniforms, {
        colorMode: COLOR_MODE[colorMode] || COLOR_MODE.default,
        colorDomain: colorDomain || COLOR_DOMAIN[colorMode] || COLOR_DOMAIN.default,
        vehicleDistanceTransform
      })
    });
  }

}
PointCloudLayer.layerName = 'PointCloudLayer';
PointCloudLayer.defaultProps = defaultProps;
//# sourceMappingURL=point-cloud-layer.js.map