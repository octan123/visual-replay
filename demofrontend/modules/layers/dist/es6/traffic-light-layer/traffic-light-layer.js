import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Layer, project32, gouraudLighting, picking } from '@deck.gl/core';
import { CubeGeometry, SphereGeometry, Model } from '@luma.gl/core';
import GL from '@luma.gl/constants';
import vs from './traffic-light-layer-vertex.glsl';
import fs from './traffic-light-layer-fragment.glsl';
import { makeLightShapeTexture } from './traffic-light-utils';
const LIGHT_COLOR = {
  invalid: [0, 0, 0],
  green: [0, 255, 128],
  yellow: [255, 250, 0],
  red: [255, 16, 16]
};
const LIGHT_SHAPE = {
  circular: 0,
  left_arrow: 1,
  right_arrow: 2
};
const defaultProps = {
  getPosition: {
    type: 'accessor',
    value: x => x.position
  },
  getAngle: {
    type: 'accessor',
    value: 0
  },
  getShape: {
    type: 'accessor',
    value: x => 'circular'
  },
  getColor: {
    type: 'accessor',
    value: x => 'green'
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
export default class TrafficLightLayer extends Layer {
  getShaders() {
    return {
      vs,
      fs,
      modules: [project32, gouraudLighting, picking]
    };
  }

  initializeState() {
    const {
      gl
    } = this.context;

    const modelsByName = this._getModels(gl);

    this.setState({
      models: [modelsByName.box, modelsByName.lights],
      modelsByName
    });
    const attributeManager = this.getAttributeManager();
    attributeManager.addInstanced({
      instancePositions: {
        size: 3,
        type: GL.DOUBLE,
        fp64: this.use64bitPositions(),
        accessor: 'getPosition'
      },
      instanceAngles: {
        size: 1,
        accessor: 'getAngle'
      },
      instanceShapes: {
        size: 1,
        type: GL.UNSIGNED_BYTE,
        accessor: 'getShape',
        transform: shape => LIGHT_SHAPE[shape] || 0
      },
      instanceColors: {
        size: 3,
        type: GL.UNSIGNED_BYTE,
        accessor: 'getColor',
        transform: color => LIGHT_COLOR[color] || LIGHT_COLOR.invalid
      },
      instanceStates: {
        size: 1,
        type: GL.UNSIGNED_BYTE,
        accessor: 'getState'
      }
    });
  }

  draw({
    uniforms
  }) {
    const {
      sizeScale
    } = this.props;
    const {
      modelsByName
    } = this.state;
    modelsByName.box.setUniforms(Object.assign({}, uniforms, {
      modelScale: [sizeScale * 0.8, sizeScale * 1.6, sizeScale * 1.6]
    })).draw();
    modelsByName.lights.setUniforms(Object.assign({}, uniforms, {
      modelScale: [sizeScale, sizeScale, sizeScale]
    })).draw();
  }

  _getModels(gl) {
    const shaders = this.getShaders();
    const box = new Model(gl, _objectSpread(_objectSpread({
      id: "".concat(this.props.id, "-box")
    }, shaders), {}, {
      shaderCache: this.context.shaderCache,
      geometry: new CubeGeometry(),
      isInstanced: true,
      uniforms: {
        modelTranslate: [0, 0, 0],
        useInstanceColor: false
      }
    }));
    const lights = new Model(gl, _objectSpread(_objectSpread({
      id: "".concat(this.props.id, "-light")
    }, shaders), {}, {
      shaderCache: this.context.shaderCache,
      geometry: new SphereGeometry(),
      isInstanced: true,
      uniforms: {
        lightShapeTexture: makeLightShapeTexture(gl),
        modelTranslate: [-0.4, 0, 0],
        useInstanceColor: true
      }
    }));
    return {
      box,
      lights
    };
  }

  updateAttributes(changedAttributes) {
    super.updateAttributes(changedAttributes);

    for (const model of this.getModels()) {
      model.setInstanceCount(this.props.data.length);
      model.setAttributes(changedAttributes);
    }
  }

}
TrafficLightLayer.layerName = 'TrafficLightLayer';
TrafficLightLayer.defaultProps = defaultProps;
//# sourceMappingURL=traffic-light-layer.js.map