import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { CompositeLayer } from '@deck.gl/core';
import { ScatterplotLayer, PathLayer, PolygonLayer, TextLayer } from '@deck.gl/layers';
import PointCloudLayer from './point-cloud-layer/point-cloud-layer';
import { XVIZObject } from '@xviz/parser';
import deepExtend from 'lodash.merge';
const LAYER_TYPES = {
  SCATTERPLOT: 'scatterplot',
  PATH: 'path',
  POINTCLOUD: 'pointcloud',
  STADIUM: 'stadium',
  POLYGON: 'polygon',
  TEXT: 'text'
};
const XVIZ_TO_LAYER_TYPE = {
  points2d: LAYER_TYPES.SCATTERPLOT,
  points3d: LAYER_TYPES.POINTCLOUD,
  point2d: LAYER_TYPES.SCATTERPLOT,
  circle2d: LAYER_TYPES.SCATTERPLOT,
  line2d: LAYER_TYPES.PATH,
  path2d: LAYER_TYPES.PATH,
  polygon2d: LAYER_TYPES.POLYGON,
  point: LAYER_TYPES.POINTCLOUD,
  circle: LAYER_TYPES.SCATTERPLOT,
  polyline: LAYER_TYPES.PATH,
  polygon: LAYER_TYPES.POLYGON,
  text: LAYER_TYPES.TEXT,
  stadium: LAYER_TYPES.STADIUM
};
const STYLE_TO_LAYER_PROP = {
  [LAYER_TYPES.SCATTERPLOT]: {
    opacity: 'opacity',
    radius_min_pixels: 'radiusMinPixels',
    radius_max_pixels: 'radiusMaxPixels',
    radius: 'getRadius',
    stroked: 'stroked',
    filled: 'filled',
    stroke_width_min_pixels: 'lineWidthMinPixels',
    stroke_width_max_pixels: 'lineWidthMaxPixels',
    stroke_width: 'getLineWidth',
    stroke_color: 'getLineColor',
    fill_color: 'getFillColor'
  },
  [LAYER_TYPES.POINTCLOUD]: {
    opacity: 'opacity',
    radius_pixels: 'pointSize',
    fill_color: 'getColor',
    point_color_mode: 'colorMode',
    point_color_domain: 'colorDomain'
  },
  [LAYER_TYPES.PATH]: {
    opacity: 'opacity',
    stroke_width_min_pixels: 'widthMinPixels',
    stroke_width_max_pixels: 'widthMaxPixels',
    stroke_color: 'getColor',
    stroke_width: 'getWidth'
  },
  [LAYER_TYPES.STADIUM]: {
    opacity: 'opacity',
    radius_min_pixels: 'widthMinPixels',
    radius_max_pixels: 'widthMaxPixels',
    fill_color: 'getColor',
    radius: 'getWidth'
  },
  [LAYER_TYPES.POLYGON]: {
    opacity: 'opacity',
    stroked: 'stroked',
    filled: 'filled',
    extruded: 'extruded',
    stroke_color: 'getLineColor',
    stroke_width: 'getLineWidth',
    stroke_width_min_pixels: 'lineWidthMinPixels',
    stroke_width_max_pixels: 'lineWidthMaxPixels',
    fill_color: 'getFillColor',
    height: 'getElevation'
  },
  [LAYER_TYPES.TEXT]: {
    opacity: 'opacity',
    fill_color: 'getColor',
    font_family: 'fontFamily',
    font_weight: 'fontWeight',
    text_size: 'getSize',
    text_rotation: 'getAngle',
    text_anchor: 'getTextAnchor',
    text_baseline: 'getAlignmentBaseline'
  }
};
const LAYER_HANDLERS = {
  [LAYER_TYPES.SCATTERPLOT]: {
    layerType: LAYER_TYPES.SCATTERPLOT,
    layerClass: ScatterplotLayer,
    preprocessData: props => {
      const {
        data
      } = props;

      if (data[0].vertices && Array.isArray(data[0].vertices[0])) {
        const processedData = data.reduce((arr, multiPoints) => {
          multiPoints.vertices.forEach(pt => {
            arr.push(_objectSpread(_objectSpread({}, multiPoints), {}, {
              vertices: pt
            }));
          });
          return arr;
        }, []);
        return processedData;
      }

      return data;
    },
    getLayerTypeProps: ({
      xvizLayerProps,
      layerProps
    }) => {
      const {
        updateTriggers
      } = layerProps;
      return {
        getPosition: f => f.vertices || f.center,
        updateTriggers: deepExtend(updateTriggers, {
          getFillColor: {
            useSemanticColor: xvizLayerProps.useSemanticColor
          }
        })
      };
    }
  },
  [LAYER_TYPES.STADIUM]: {
    layerType: LAYER_TYPES.STADIUM,
    layerClass: PathLayer,
    getLayerTypeProps: ({
      xvizLayerProps,
      layerProps
    }) => {
      const {
        updateTriggers
      } = layerProps;
      return {
        getPath: f => [f.start, f.end],
        rounded: true,
        updateTriggers: deepExtend(updateTriggers, {
          getColor: {
            useSemanticColor: xvizLayerProps.useSemanticColor
          }
        })
      };
    }
  },
  [LAYER_TYPES.POINTCLOUD]: {
    layerType: LAYER_TYPES.POINTCLOUD,
    layerClass: PointCloudLayer,
    getLayerTypeProps: ({
      xvizLayerProps,
      state
    }) => {
      const {
        data
      } = state;
      return {
        data: {
          length: data[0].points.length / 3,
          attributes: {
            getPosition: data[0].points,
            getColor: data[0].colors
          }
        },
        vehicleRelativeTransform: xvizLayerProps.vehicleRelativeTransform,
        getPosition: p => p
      };
    }
  },
  [LAYER_TYPES.PATH]: {
    layerType: LAYER_TYPES.PATH,
    layerClass: PathLayer,
    getLayerTypeProps: ({
      xvizLayerProps,
      layerProps
    }) => {
      const {
        updateTriggers
      } = layerProps;
      return {
        getPath: f => f.vertices,
        updateTriggers: deepExtend(updateTriggers, {
          getColor: {
            useSemanticColor: xvizLayerProps.useSemanticColor
          }
        })
      };
    }
  },
  [LAYER_TYPES.POLYGON]: {
    layerType: LAYER_TYPES.POLYGON,
    layerClass: PolygonLayer,
    getLayerTypeProps: ({
      xvizLayerProps,
      layerProps
    }) => {
      const {
        updateTriggers
      } = layerProps;
      const {
        lightSettings,
        useSemanticColor,
        opacity
      } = xvizLayerProps;
      const {
        stroked
      } = layerProps;
      return {
        opacity: opacity || 1,
        lightSettings,
        wireframe: stroked,
        getPolygon: f => f.vertices,
        updateTriggers: deepExtend(updateTriggers, {
          getLineColor: {
            useSemanticColor
          },
          getFillColor: {
            useSemanticColor
          }
        })
      };
    }
  },
  [LAYER_TYPES.TEXT]: {
    layerType: LAYER_TYPES.TEXT,
    layerClass: TextLayer,
    getLayerTypeProps: ({
      xvizLayerProps,
      layerProps
    }) => {
      const {
        updateTriggers
      } = layerProps;
      const {
        useSemanticColor
      } = xvizLayerProps;
      return {
        getText: f => f.text,
        updateTriggers: deepExtend(updateTriggers, {
          getColor: {
            useSemanticColor
          }
        })
      };
    }
  }
};
const EMPTY_OBJECT = {};

const getInlineProperty = (context, propertyName, objectState) => {
  const inlineProp = objectState[propertyName];
  return inlineProp === undefined ? null : inlineProp;
};

const getStylesheetProperty = (context, propertyName, objectState) => context.style.getProperty(propertyName, objectState);

function getProperty(context, propertyName, f = EMPTY_OBJECT) {
  let objectState = f;

  if (context.useSemanticColor) {
    switch (propertyName) {
      case 'stroke_color':
      case 'fill_color':
        objectState = XVIZObject.get(f.id) || f;
        break;

      default:
    }
  }

  let altPropertyName = null;

  switch (propertyName) {
    case 'stroke_color':
    case 'fill_color':
      altPropertyName = 'color';
      break;

    case 'stroke_width':
      altPropertyName = 'thickness';
      break;

    case 'radius':
      if (f.radius) {
        return f.radius;
      }

      break;

    default:
      break;
  }

  let property = getStylesheetProperty(context, propertyName, objectState);

  if (property === null && altPropertyName) {
    property = getStylesheetProperty(context, altPropertyName, objectState);
  }

  if (property === null && !context.disableInlineStyling) {
    property = getInlineProperty(context, propertyName, objectState);

    if (property === null && altPropertyName) {
      property = getInlineProperty(context, altPropertyName, objectState);
    }
  }

  if (property === null) {
    property = context.style.getPropertyDefault(propertyName);
  }

  if (propertyName === 'text_anchor' || propertyName === 'text_baseline') {
    property = property.toLowerCase();
  }

  return property;
}

export default class XVIZLayer extends CompositeLayer {
  _getProperty(propertyName) {
    return getProperty(this.props, propertyName);
  }

  _getPropertyAccessor(propertyName) {
    return f => getProperty(this.props, propertyName, f);
  }

  _getDefaultLayerProps(style, styleToLayerProp) {
    const layerProps = {
      updateTriggers: {}
    };

    for (const stylePropName in styleToLayerProp) {
      const layerPropName = styleToLayerProp[stylePropName];
      const isAccessor = layerPropName.startsWith('get');

      if (isAccessor) {
        layerProps.updateTriggers[layerPropName] = {
          style: stylePropName,
          dependencies: style.getPropertyDependencies(stylePropName)
        };
      } else {
        layerProps[layerPropName] = this._getProperty(stylePropName);
      }
    }

    return layerProps;
  }

  _getLayerProps() {
    const {
      objectStates
    } = this.props;
    const {
      layerProps
    } = this.state;
    const {
      updateTriggers
    } = layerProps;

    for (const key in updateTriggers) {
      const trigger = updateTriggers[key];
      layerProps[key] = this._getPropertyAccessor(trigger.style);
      updateTriggers[key] = _objectSpread({}, trigger);
      trigger.dependencies.forEach(stateName => {
        updateTriggers[key][stateName] = objectStates[stateName];
      });
    }

    return layerProps;
  }

  _getLayerType(data) {
    if (data.length > 0) {
      return data[0].type;
    }

    return null;
  }

  updateState({
    props,
    oldProps,
    changeFlags
  }) {
    let {
      type
    } = this.state;

    if (changeFlags.dataChanged) {
      let data = props.data;

      const dataType = this._getLayerType(data);

      type = XVIZ_TO_LAYER_TYPE[dataType];
      const layerHandler = LAYER_HANDLERS[type];

      if (layerHandler && layerHandler.preprocessData) {
        data = layerHandler.preprocessData(props);
      }

      this.setState({
        data
      });
    }

    if (type !== this.state.type || props.style !== oldProps.style) {
      const styleToLayerProp = STYLE_TO_LAYER_PROP[type];

      const layerProps = this._getDefaultLayerProps(props.style, styleToLayerProp);

      this.setState({
        type,
        layerProps
      });
    }
  }

  renderLayers() {
    const {
      type,
      data
    } = this.state;

    if (!type) {
      return null;
    }

    const {
      linkTitle,
      streamName,
      streamMetadata,
      objectType
    } = this.props;

    const layerProps = this._getLayerProps();

    const forwardProps = {
      linkTitle,
      streamName,
      objectType
    };
    const customXvizLayerMatch = this.props.customXVIZLayers.find(({
      streamMatch
    }) => streamMatch(streamName, streamMetadata));

    if (customXvizLayerMatch) {
      let primitiveLayerProps = {};
      const layerType = XVIZ_TO_LAYER_TYPE[customXvizLayerMatch.primitive];
      const parentLayerHandler = LAYER_HANDLERS[layerType];

      if (parentLayerHandler) {
        primitiveLayerProps = parentLayerHandler.getLayerTypeProps({
          xvizLayerProps: this.props,
          layerProps,
          state: this.state
        });
      }

      const LayerClass = customXvizLayerMatch.layerClass || (parentLayerHandler === null || parentLayerHandler === void 0 ? void 0 : parentLayerHandler.layerClass);
      return new LayerClass(forwardProps, layerProps, this.getSubLayerProps(_objectSpread(_objectSpread({
        id: "".concat(layerType ? layerType : '', "-").concat(customXvizLayerMatch.id),
        data
      }, primitiveLayerProps), customXvizLayerMatch.getSubProps({
        xvizLayerProps: this.props,
        primitiveLayerProps,
        state: this.state
      }))));
    }

    if (!LAYER_HANDLERS[type]) {
      return null;
    }

    const {
      layerClass: LayerClass,
      getLayerTypeProps
    } = LAYER_HANDLERS[type];
    return new LayerClass(forwardProps, layerProps, this.getSubLayerProps(_objectSpread({
      id: type,
      data
    }, getLayerTypeProps({
      xvizLayerProps: this.props,
      layerProps,
      state: this.state
    }))));
  }

}
XVIZLayer.layerName = 'XVIZLayer';
//# sourceMappingURL=xviz-layer.js.map