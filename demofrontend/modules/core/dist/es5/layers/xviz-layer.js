"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _core = require("@deck.gl/core");

var _layers = require("@deck.gl/layers");

var _pointCloudLayer = _interopRequireDefault(require("./point-cloud-layer/point-cloud-layer"));

var _parser = require("@xviz/parser");

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _STYLE_TO_LAYER_PROP, _LAYER_HANDLERS;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
var STYLE_TO_LAYER_PROP = (_STYLE_TO_LAYER_PROP = {}, (0, _defineProperty2["default"])(_STYLE_TO_LAYER_PROP, LAYER_TYPES.SCATTERPLOT, {
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
}), (0, _defineProperty2["default"])(_STYLE_TO_LAYER_PROP, LAYER_TYPES.POINTCLOUD, {
  opacity: 'opacity',
  radius_pixels: 'pointSize',
  fill_color: 'getColor',
  point_color_mode: 'colorMode',
  point_color_domain: 'colorDomain'
}), (0, _defineProperty2["default"])(_STYLE_TO_LAYER_PROP, LAYER_TYPES.PATH, {
  opacity: 'opacity',
  stroke_width_min_pixels: 'widthMinPixels',
  stroke_width_max_pixels: 'widthMaxPixels',
  stroke_color: 'getColor',
  stroke_width: 'getWidth'
}), (0, _defineProperty2["default"])(_STYLE_TO_LAYER_PROP, LAYER_TYPES.STADIUM, {
  opacity: 'opacity',
  radius_min_pixels: 'widthMinPixels',
  radius_max_pixels: 'widthMaxPixels',
  fill_color: 'getColor',
  radius: 'getWidth'
}), (0, _defineProperty2["default"])(_STYLE_TO_LAYER_PROP, LAYER_TYPES.POLYGON, {
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
}), (0, _defineProperty2["default"])(_STYLE_TO_LAYER_PROP, LAYER_TYPES.TEXT, {
  opacity: 'opacity',
  fill_color: 'getColor',
  font_family: 'fontFamily',
  font_weight: 'fontWeight',
  text_size: 'getSize',
  text_rotation: 'getAngle',
  text_anchor: 'getTextAnchor',
  text_baseline: 'getAlignmentBaseline'
}), _STYLE_TO_LAYER_PROP);
var LAYER_HANDLERS = (_LAYER_HANDLERS = {}, (0, _defineProperty2["default"])(_LAYER_HANDLERS, LAYER_TYPES.SCATTERPLOT, {
  layerType: LAYER_TYPES.SCATTERPLOT,
  layerClass: _layers.ScatterplotLayer,
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
      updateTriggers: (0, _lodash["default"])(updateTriggers, {
        getFillColor: {
          useSemanticColor: xvizLayerProps.useSemanticColor
        }
      })
    };
  }
}), (0, _defineProperty2["default"])(_LAYER_HANDLERS, LAYER_TYPES.STADIUM, {
  layerType: LAYER_TYPES.STADIUM,
  layerClass: _layers.PathLayer,
  getLayerTypeProps: function getLayerTypeProps(_ref2) {
    var xvizLayerProps = _ref2.xvizLayerProps,
        layerProps = _ref2.layerProps;
    var updateTriggers = layerProps.updateTriggers;
    return {
      getPath: function getPath(f) {
        return [f.start, f.end];
      },
      rounded: true,
      updateTriggers: (0, _lodash["default"])(updateTriggers, {
        getColor: {
          useSemanticColor: xvizLayerProps.useSemanticColor
        }
      })
    };
  }
}), (0, _defineProperty2["default"])(_LAYER_HANDLERS, LAYER_TYPES.POINTCLOUD, {
  layerType: LAYER_TYPES.POINTCLOUD,
  layerClass: _pointCloudLayer["default"],
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
}), (0, _defineProperty2["default"])(_LAYER_HANDLERS, LAYER_TYPES.PATH, {
  layerType: LAYER_TYPES.PATH,
  layerClass: _layers.PathLayer,
  getLayerTypeProps: function getLayerTypeProps(_ref4) {
    var xvizLayerProps = _ref4.xvizLayerProps,
        layerProps = _ref4.layerProps;
    var updateTriggers = layerProps.updateTriggers;
    return {
      getPath: function getPath(f) {
        return f.vertices;
      },
      updateTriggers: (0, _lodash["default"])(updateTriggers, {
        getColor: {
          useSemanticColor: xvizLayerProps.useSemanticColor
        }
      })
    };
  }
}), (0, _defineProperty2["default"])(_LAYER_HANDLERS, LAYER_TYPES.POLYGON, {
  layerType: LAYER_TYPES.POLYGON,
  layerClass: _layers.PolygonLayer,
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
      updateTriggers: (0, _lodash["default"])(updateTriggers, {
        getLineColor: {
          useSemanticColor: useSemanticColor
        },
        getFillColor: {
          useSemanticColor: useSemanticColor
        }
      })
    };
  }
}), (0, _defineProperty2["default"])(_LAYER_HANDLERS, LAYER_TYPES.TEXT, {
  layerType: LAYER_TYPES.TEXT,
  layerClass: _layers.TextLayer,
  getLayerTypeProps: function getLayerTypeProps(_ref6) {
    var xvizLayerProps = _ref6.xvizLayerProps,
        layerProps = _ref6.layerProps;
    var updateTriggers = layerProps.updateTriggers;
    var useSemanticColor = xvizLayerProps.useSemanticColor;
    return {
      getText: function getText(f) {
        return f.text;
      },
      updateTriggers: (0, _lodash["default"])(updateTriggers, {
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
        objectState = _parser.XVIZObject.get(f.id) || f;
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
  (0, _inherits2["default"])(XVIZLayer, _CompositeLayer);

  var _super = _createSuper(XVIZLayer);

  function XVIZLayer() {
    (0, _classCallCheck2["default"])(this, XVIZLayer);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(XVIZLayer, [{
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
}(_core.CompositeLayer);

exports["default"] = XVIZLayer;
XVIZLayer.layerName = 'XVIZLayer';
//# sourceMappingURL=xviz-layer.js.map