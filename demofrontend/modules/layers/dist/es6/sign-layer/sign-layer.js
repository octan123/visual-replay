import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { IconLayer } from '@deck.gl/layers';
import vs from './sign-layer-vertex.glsl';
import fs from './sign-layer-fragment.glsl';

const defaultProps = _objectSpread(_objectSpread({}, IconLayer.defaultProps), {}, {
  sizeUnits: 'meters',
  render3D: true
});

export default class SignLayer extends IconLayer {
  updateState({
    oldProps,
    props,
    changeFlags
  }) {
    super.updateState({
      props,
      oldProps,
      changeFlags
    });

    if (props.render3D !== oldProps.render3D) {
      this.state.model.setUniforms({
        render3D: props.render3D ? 1 : 0
      });
    }
  }

  getShaders() {
    return _objectSpread(_objectSpread({}, super.getShaders()), {}, {
      vs,
      fs
    });
  }

}
SignLayer.layerName = 'SignLayer';
SignLayer.defaultProps = defaultProps;
//# sourceMappingURL=sign-layer.js.map