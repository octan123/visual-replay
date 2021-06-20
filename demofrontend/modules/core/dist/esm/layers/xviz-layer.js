import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var _STYLE_TO_LAYER_PROP, _LAYER_HANDLERS;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { CompositeLayer } from '@deck.gl/core';
import { ScatterplotLayer, PathLayer, PolygonLayer, TextLayer } from '@deck.gl/layers';
import PointCloudLayer from './point-cloud-layer/point-cloud-layer';
import { XVIZObject } from '@xviz/parser';
import deepExtend from 'lodash.merge';
var LAYER_TYPES = {
  SCATTERPLOT: 'scatterplot',
  PATH: 'path',
  POINTCLOUD: 'pointcloud',
  STADIUM: 'stadium',
  POLYGON: 'polygon',
  TEXT: 'text'
};
var XVIZ_TO_LAYER_TYPE = {
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
var STYLE_TO_LAYER_PROP = (_STYLE_TO_LAYER_PROP = {}, _defineProperty(_STYLE_TO_LAYER_PROP, LAYER_TYPES.SCATTERPLOT, {
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
}), _defineProperty(_STYLE_TO_LAYER_PROP, LAYER_TYPES.POINTCLOUD, {
  opacity: 'opacity',
  radius_pixels: 'pointSize',
  fill_color: 'getColor',
  point_color_mode: 'colorMode',
  point_color_domain: 'colorDomain'
}), _defineProperty(_STYLE_TO_LAYER_PROP, LAYER_TYPES.PATH, {
  opacity: 'opacity',
  stroke_width_min_pixels: 'widthMinPixels',
  stroke_width_max_pixels: 'widthMaxPixels',
  stroke_color: 'getColor',
  stroke_width: 'getWidth'
}), _defineProperty(_STYLE_TO_LAYER_PROP, LAYER_TYPES.STADIUM, {
  opacity: 'opacity',
  radius_min_pixels: 'widthMinPixels',
  radius_max_pixels: 'widthMaxPixels',
  fill_color: 'getColor',
  radius: 'getWidth'
}), _defineProperty(_STYLE_TO_LAYER_PROP, LAYER_TYPES.POLYGON, {
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
}), _defineProperty(_STYLE_TO_LAYER_PROP, LAYER_TYPES.TEXT, {
  opacity: 'opacity',
  fill_color: 'getColor',
  font_family: 'fontFamily',
  font_weight: 'fontWeight',
  text_size: 'getSize',
  text_rotation: 'getAngle',
  text_anchor: 'getTextAnchor',
  text_baseline: 'getAlignmentBaseline'
}), _STYLE_TO_LAYER_PROP);
var LAYER_HANDLERS = (_LAYER_HANDLERS = {}, _defineProperty(_LAYER_HANDLERS, LAYER_TYPES.SCATTERPLOT, {
  layerType: LAYER_TYPES.SCATTERPLOT,
  layerClass: ScatterplotLayer,
  preprocessData: function preprocessData(props) {
    var data = props.data;

    if (data[0].vertices && Array.isArray(data[0].vertices[0])) {
      var processedData = data.reduce(function (arr, multiPoints) {
        multiPoints.vertices.forEach(function (pt) {
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
  getLayerTypeProps: function getLayerTypeProps(_ref) {
    var xvizLayerProps = _ref.xvizLayerProps,
        layerProps = _ref.layerProps;
    var updateTriggers = layerProps.updateTriggers;
    return {
      getPosition: function getPosition(f) {
        return f.vertices || f.center;
      },
      updateTriggers: deepExtend(updateTriggers, {
        getFillColor: {
          useSemanticColor: xvizLayerProps.useSemanticColor
        }
      })
    };
  }
}), _defineProperty(_LAYER_HANDLERS, LAYER_TYPES.STADIUM, {
  layerType: LAYER_TYPES.STADIUM,
  layerClass: PathLayer,
  getLayerTypeProps: function getLayerTypeProps(_ref2) {
    var xvizLayerProps = _ref2.xvizLayerProps,
        layerProps = _ref2.layerProps;
    var updateTriggers = layerProps.updateTriggers;
    return {
      getPath: function getPath(f) {
        return [f.start, f.end];
      },
      rounded: true,
      updateTriggers: deepExtend(updateTriggers, {
        getColor: {
          useSemanticColor: xvizLayerProps.useSemanticColor
        }
      })
    };
  }
}), _defineProperty(_LAYER_HANDLERS, LAYER_TYPES.POINTCLOUD, {
  layerType: LAYER_TYPES.POINTCLOUD,
  layerClass: PointCloudLayer,
  getLayerTypeProps: function getLayerTypeProps(_ref3) {
    var xvizLayerProps = _ref3.xvizLayerProps,
        state = _ref3.state;
    var data = state.data;
    return {
      data: {
        length: data[0].points.length / 3,
        attributes: {
          getPosition: data[0].points,
          getColor: data[0].colors
        }
      },
      vehicleRelativeTransform: xvizLayerProps.vehicleRelativeTransform,
      getPosition: function getPosition(p) {
        return p;
      }
    };
  }
}), _defineProperty(_LAYER_HANDLERS, LAYER_TYPES.PATH, {
  layerType: LAYER_TYPES.PATH,
  layerClass: PathLayer,
  getLayerTypeProps: function getLayerTypeProps(_ref4) {
    var xvizLayerProps = _ref4.xvizLayerProps,
        layerProps = _ref4.layerProps;
    var updateTriggers = layerProps.updateTriggers;
    return {
      getPath: function getPath(f) {
        return f.vertices;
      },
      updateTriggers: deepExtend(updateTriggers, {
        getColor: {
          useSemanticColor: xvizLayerProps.useSemanticColor
        }
      })
    };
  }
}), _defineProperty(_LAYER_HANDLERS, LAYER_TYPES.POLYGON, {
  layerType: LAYER_TYPES.POLYGON,
  layerClass: PolygonLayer,
  getLayerTypeProps: function getLayerTypeProps(_ref5) {
    var xvizLayerProps = _ref5.xvizLayerProps,
        layerProps = _ref5.layerProps;
    var updateTriggers = layerProps.updateTriggers;
    var lightSettings = xvizLayerProps.lightSettings,
        useSemanticColor = xvizLayerProps.useSemanticColor,
        opacity = xvizLayerProps.opacity;
    var stroked = layerProps.stroked;
    return {
      opacity: opacity || 1,
      lightSettings: lightSettings,
      wireframe: stroked,
      getPolygon: function getPolygon(f) {
        return f.vertices;
      },
      updateTriggers: deepExtend(updateTriggers, {
        getLineColor: {
          useSemanticColor: useSemanticColor
        },
        getFillColor: {
          useSemanticColor: useSemanticColor
        }
      })
    };
  }
}), _defineProperty(_LAYER_HANDLERS, LAYER_TYPES.TEXT, {
  layerType: LAYER_TYPES.TEXT,
  layerClass: TextLayer,
  getLayerTypeProps: function getLayerTypeProps(_ref6) {
    var xvizLayerProps = _ref6.xvizLayerProps,
        layerProps = _ref6.layerProps;
    var updateTriggers = layerProps.updateTriggers;
    var useSemanticColor = xvizLayerProps.useSemanticColor;
    return {
      getText: function getText(f) {
        return f.text;
      },
      updateTriggers: deepExtend(updateTriggers, {
        getColor: {
          useSemanticColor: useSemanticColor
        }
      })
    };
  }
}), _LAYER_HANDLERS);
var EMPTY_OBJECT = {};

var getInlineProperty = function getInlineProperty(context, propertyName, objectState) {
  var inlineProp = objectState[propertyName];
  return inlineProp === undefined ? null : inlineProp;
};

var getStylesheetProperty = function getStylesheetProperty(context, propertyName, objectState) {
  return context.style.getProperty(propertyName, objectState);
};

function getProperty(context, propertyName) {
  var f = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJECT;
  var objectState = f;

  if (context.useSemanticColor) {
    switch (propertyName) {
      case 'stroke_color':
      case 'fill_color':
        objectState = XVIZObject.get(f.id) || f;
        break;

      default:
    }
  }

  var altPropertyName = null;

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

  var property = getStylesheetProperty(context, propertyName, objectState);

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

var XVIZLayer = function (_CompositeLayer) {
  _inherits(XVIZLayer, _CompositeLayer);

  var _super = _createSuper(XVIZLayer);

  function XVIZLayer() {
    _classCallCheck(this, XVIZLayer);

    return _super.apply(this, arguments);
  }

  _createClass(XVIZLayer, [{
    key: "_getProperty",
    value: function _getProperty(propertyName) {
      return getProperty(this.props, propertyName);
    }
  }, {
    key: "_getPropertyAccessor",
    value: function _getPropertyAccessor(propertyName) {
      var _this = this;

      return function (f) {
        return getProperty(_this.props, propertyName, f);
      };
    }
  }, {
    key: "_getDefaultLayerProps",
    value: function _getDefaultLayerProps(style, styleToLayerProp) {
      var layerProps = {
        updateTriggers: {}
      };

      for (var stylePropName in styleToLayerProp) {
        var layerPropName = styleToLayerProp[stylePropName];
        var isAccessor = layerPropName.startsWith('get');

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
  }, {
    key: "_getLayerProps",
    value: function _getLayerProps() {
      var _this2 = this;

      var objectStates = this.props.objectStates;
      var layerProps = this.state.layerProps;
      var updateTriggers = layerProps.updateTriggers;

      var _loop = function _loop(key) {
        var trigger = updateTriggers[key];
        layerProps[key] = _this2._getPropertyAccessor(trigger.style);
        updateTriggers[key] = _objectSpread({}, trigger);
        trigger.dependencies.forEach(function (stateName) {
          updateTriggers[key][stateName] = objectStates[stateName];
        });
      };

      for (var key in updateTriggers) {
        _loop(key);
      }

      return layerProps;
    }
  }, {
    key: "_getLayerType",
    value: function _getLayerType(data) {
      if (data.length > 0) {
        return data[0].type;
      }

      return null;
    }
  }, {
    key: "updateState",
    value: function updateState(_ref7) {
      var props = _ref7.props,
          oldProps = _ref7.oldProps,
          changeFlags = _ref7.changeFlags;
      var type = this.state.type;

      if (changeFlags.dataChanged) {
        var data = props.data;

        var dataType = this._getLayerType(data);

        type = XVIZ_TO_LAYER_TYPE[dataType];
        var layerHandler = LAYER_HANDLERS[type];

        if (layerHandler && layerHandler.preprocessData) {
          data = layerHandler.preprocessData(props);
        }

        this.setState({
          data: data
        });
      }

      if (type !== this.state.type || props.style !== oldProps.style) {
        var styleToLayerProp = STYLE_TO_LAYER_PROP[type];

        var layerProps = this._getDefaultLayerProps(props.style, styleToLayerProp);

        this.setState({
          type: type,
          layerProps: layerProps
        });
      }
    }
  }, {
    key: "renderLayers",
    value: function renderLayers() {
      var _this$state = this.state,
          type = _this$state.type,
          data = _this$state.data;

      if (!type) {
        return null;
      }

      var _this$props = this.props,
          linkTitle = _this$props.linkTitle,
          streamName = _this$props.streamName,
          streamMetadata = _this$props.streamMetadata,
          objectType = _this$props.objectType;

      var layerProps = this._getLayerProps();

      var forwardProps = {
        linkTitle: linkTitle,
        streamName: streamName,
        objectType: objectType
      };
      var customXvizLayerMatch = this.props.customXVIZLayers.find(function (_ref8) {
        var streamMatch = _ref8.streamMatch;
        return streamMatch(streamName, streamMetadata);
      });

      if (customXvizLayerMatch) {
        var primitiveLayerProps = {};
        var layerType = XVIZ_TO_LAYER_TYPE[customXvizLayerMatch.primitive];
        var parentLayerHandler = LAYER_HANDLERS[layerType];

        if (parentLayerHandler) {
          primitiveLayerProps = parentLayerHandler.getLayerTypeProps({
            xvizLayerProps: this.props,
            layerProps: layerProps,
            state: this.state
          });
        }

        var _LayerClass = customXvizLayerMatch.layerClass || (parentLayerHandler === null || parentLayerHandler === void 0 ? void 0 : parentLayerHandler.layerClass);

        return new _LayerClass(forwardProps, layerProps, this.getSubLayerProps(_objectSpread(_objectSpread({
          id: "".concat(layerType ? layerType : '', "-").concat(customXvizLayerMatch.id),
          data: data
        }, primitiveLayerProps), customXvizLayerMatch.getSubProps({
          xvizLayerProps: this.props,
          primitiveLayerProps: primitiveLayerProps,
          state: this.state
        }))));
      }

      if (!LAYER_HANDLERS[type]) {
        return null;
      }

      var _LAYER_HANDLERS$type = LAYER_HANDLERS[type],
          LayerClass = _LAYER_HANDLERS$type.layerClass,
          getLayerTypeProps = _LAYER_HANDLERS$type.getLayerTypeProps;
      return new LayerClass(forwardProps, layerProps, this.getSubLayerProps(_objectSpread({
        id: type,
        data: data
      }, getLayerTypeProps({
        xvizLayerProps: this.props,
        layerProps: layerProps,
        state: this.state
      }))));
    }
  }]);

  return XVIZLayer;
}(CompositeLayer);

export { XVIZLayer as default };
XVIZLayer.layerName = 'XVIZLayer';
//# sourceMappingURL=xviz-layer.js.map