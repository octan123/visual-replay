import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { COORDINATE_SYSTEM } from '@deck.gl/core';
import { _MapContext as MapContext } from 'react-map-gl';
import ObjectLabelsOverlay from './object-labels-overlay';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { XVIZStyleParser } from '@xviz/parser';
import XVIZLayer from '../../layers/xviz-layer';
import { VIEW_MODE, DEFAULT_VIEW_STATE } from '../../constants';
import { getViewStateOffset, getViews, getViewStates } from '../../utils/viewport';
import { resolveCoordinateTransform } from '../../utils/transform';
import { mergeXVIZStyles } from '../../utils/style';
import { normalizeStreamFilter } from '../../utils/stream-utils';
import stats from '../../utils/stats';
import memoize from '../../utils/memoize';
import { DEFAULT_ORIGIN, CAR_DATA, LIGHTS, DEFAULT_CAR } from './constants';

var noop = function noop() {};

var Z_INDEX = {
  car: 0,
  point: 1,
  polygon: 2,
  customDefault: 3
};

var Core3DViewer = function (_PureComponent) {
  _inherits(Core3DViewer, _PureComponent);

  var _super = _createSuper(Core3DViewer);

  function Core3DViewer(props) {
    var _this;

    _classCallCheck(this, Core3DViewer);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "deckRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "_onMapLoad", function (evt) {
      var map = evt.target;

      _this.props.onMapLoad(map);
    });

    _defineProperty(_assertThisInitialized(_this), "_onDeckLoad", function () {
      var deck = _this.deckRef.current.deck;

      _this.props.onDeckLoad(deck);
    });

    _defineProperty(_assertThisInitialized(_this), "_onMetrics", function (deckMetrics) {
      if (_this.props.debug) {
        var metrics = Object.assign({}, deckMetrics);
        var table = stats.getTable();

        for (var key in table) {
          metrics[key] = table[key].count;
        }

        _this.props.debug(metrics);
      }

      stats.reset();
    });

    _defineProperty(_assertThisInitialized(_this), "_onViewStateChange", function (_ref) {
      var viewState = _ref.viewState,
          oldViewState = _ref.oldViewState;
      var viewOffset = getViewStateOffset(oldViewState, viewState, _this.props.viewOffset);

      _this.props.onViewStateChange({
        viewState: viewState,
        viewOffset: viewOffset
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onLayerHover", function (info, evt) {
      var objectId = info && info.object && info.object.id;
      _this.isHovering = Boolean(objectId);

      _this.props.onHover(info, evt);
    });

    _defineProperty(_assertThisInitialized(_this), "_onLayerClick", function (info, evt) {
      var isRightClick = evt.which === 3;

      if (isRightClick) {
        _this.props.onContextMenu(info, evt);
      } else {
        _this.props.onClick(info, evt);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_layerFilter", function (_ref2) {
      var layer = _ref2.layer,
          viewport = _ref2.viewport,
          isPicking = _ref2.isPicking;

      if (viewport.id === 'driver' && layer.id === 'car') {
        return false;
      }

      if (isPicking) {
        if (_this.props.showTooltip) {
          return true;
        }

        if (layer.id.startsWith('xviz-')) {
          var sampleData = layer.props.data[0];
          return sampleData && sampleData.id;
        }
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "_getCursor", function () {
      return _this.isHovering ? 'pointer' : 'crosshair';
    });

    _this.state = {
      styleParser: _this._getStyleParser(props),
      views: getViews(props.viewMode, props.viewOptions)
    };
    _this.getLayers = memoize(_this._getLayers.bind(_assertThisInitialized(_this)));
    _this.getViewState = memoize(_this._getViewState);
    return _this;
  }

  _createClass(Core3DViewer, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.viewMode !== nextProps.viewMode) {
        var viewState = _objectSpread(_objectSpread(_objectSpread({}, this.props.viewState), DEFAULT_VIEW_STATE), nextProps.viewMode.initialViewState);

        var viewOffset = {
          x: 0,
          y: 0,
          bearing: 0
        };
        nextProps.onViewStateChange({
          viewState: viewState,
          viewOffset: viewOffset
        });
        this.setState({
          views: getViews(nextProps.viewMode, nextProps.viewOptions)
        });
      }

      if (this.props.metadata !== nextProps.metadata || this.props.xvizStyles !== nextProps.xvizStyles) {
        this.setState({
          styleParser: this._getStyleParser(nextProps)
        });
      }

      if (this.props.frame !== nextProps.frame) {
        stats.get('frame-update').incrementCount();
      }
    }
  }, {
    key: "_getStyleParser",
    value: function _getStyleParser(_ref3) {
      var metadata = _ref3.metadata,
          xvizStyles = _ref3.xvizStyles;
      return new XVIZStyleParser(mergeXVIZStyles(metadata && metadata.styles, xvizStyles));
    }
  }, {
    key: "_getCarLayer",
    value: function _getCarLayer(_ref4) {
      var frame = _ref4.frame,
          car = _ref4.car;
      var _car$origin = car.origin,
          origin = _car$origin === void 0 ? DEFAULT_ORIGIN : _car$origin,
          mesh = car.mesh,
          _car$scale = car.scale,
          scale = _car$scale === void 0 ? [1, 1, 1] : _car$scale,
          _car$wireframe = car.wireframe,
          wireframe = _car$wireframe === void 0 ? false : _car$wireframe,
          _car$texture = car.texture,
          texture = _car$texture === void 0 ? null : _car$texture,
          _car$color = car.color,
          color = _car$color === void 0 ? [0, 0, 0] : _car$color;
      return new SimpleMeshLayer({
        id: 'car',
        opacity: 1,
        coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
        coordinateOrigin: frame.origin || DEFAULT_ORIGIN,
        getTransformMatrix: function getTransformMatrix(d) {
          return frame.vehicleRelativeTransform.clone().translate(origin).scale(scale);
        },
        mesh: mesh,
        data: CAR_DATA,
        pickable: true,
        getPosition: function getPosition(d) {
          return d;
        },
        getColor: color,
        texture: texture,
        wireframe: wireframe,
        updateTriggers: {
          getTransformMatrix: frame.vehicleRelativeTransform
        },
        zIndex: Z_INDEX.car
      });
    }
  }, {
    key: "_getLayers",
    value: function _getLayers(opts) {
      var frame = opts.frame,
          streamsMetadata = opts.streamsMetadata,
          objectStates = opts.objectStates,
          customLayers = opts.customLayers,
          customXVIZLayers = opts.customXVIZLayers,
          getTransformMatrix = opts.getTransformMatrix,
          styleParser = opts.styleParser;

      if (!frame) {
        return [];
      }

      var streams = frame.streams,
          _frame$lookAheads = frame.lookAheads,
          lookAheads = _frame$lookAheads === void 0 ? {} : _frame$lookAheads;
      var streamFilter = normalizeStreamFilter(opts.streamFilter);
      var featuresAndFutures = new Set(Object.keys(streams).concat(Object.keys(lookAheads)).filter(streamFilter));
      var layerList = [this._getCarLayer(opts)];
      layerList = layerList.concat(Array.from(featuresAndFutures).map(function (streamName) {
        var stream = lookAheads[streamName] || streams[streamName];
        var coordinateProps = resolveCoordinateTransform(frame, streamName, streamsMetadata[streamName], getTransformMatrix);
        var stylesheet = styleParser.getStylesheet(streamName);
        var primitives = stream.features || stream;

        if (primitives && primitives.length) {
          return new XVIZLayer(_objectSpread(_objectSpread({
            id: "xviz-".concat(streamName)
          }, coordinateProps), {}, {
            pickable: true,
            data: primitives,
            style: stylesheet,
            objectStates: objectStates,
            vehicleRelativeTransform: frame.vehicleRelativeTransform,
            zIndex: Z_INDEX[primitives[0].type] || 0,
            streamName: streamName,
            streamMetadata: streamsMetadata[streamName],
            customXVIZLayers: customXVIZLayers
          }));
        }

        return null;
      }).filter(Boolean));
      layerList = layerList.concat(customLayers.map(function (layer) {
        var props = layer.props;
        var additionalProps = {
          zIndex: 'zIndex' in props ? props.zIndex : Z_INDEX.customDefault
        };

        if (props.streamName) {
          var stream = streams[props.streamName];
          Object.assign(additionalProps, resolveCoordinateTransform(frame, props.streamName, streamsMetadata[props.streamName], getTransformMatrix), {
            data: stream && stream.features
          });
        } else if (props.coordinate) {
          Object.assign(additionalProps, resolveCoordinateTransform(frame, null, props, getTransformMatrix));
        } else {
          return layer;
        }

        return layer.clone(additionalProps);
      }));
      return layerList.sort(function (layer1, layer2) {
        return (layer1.props.zIndex || 0) - (layer2.props.zIndex || 0);
      });
    }
  }, {
    key: "_getViewState",
    value: function _getViewState(_ref5) {
      var viewMode = _ref5.viewMode,
          frame = _ref5.frame,
          viewState = _ref5.viewState,
          viewOffset = _ref5.viewOffset;
      var trackedPosition = frame ? {
        longitude: frame.trackPosition[0],
        latitude: frame.trackPosition[1],
        altitude: frame.trackPosition[2],
        bearing: 90 - frame.heading
      } : null;
      return getViewStates({
        viewState: viewState,
        viewMode: viewMode,
        trackedPosition: trackedPosition,
        offset: viewOffset
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          mapboxApiAccessToken = _this$props.mapboxApiAccessToken,
          frame = _this$props.frame,
          car = _this$props.car,
          streamsMetadata = _this$props.streamsMetadata,
          streamFilter = _this$props.streamFilter,
          objectStates = _this$props.objectStates,
          renderObjectLabel = _this$props.renderObjectLabel,
          customLayers = _this$props.customLayers,
          getTransformMatrix = _this$props.getTransformMatrix,
          style = _this$props.style,
          mapStyle = _this$props.mapStyle,
          viewMode = _this$props.viewMode,
          viewState = _this$props.viewState,
          viewOffset = _this$props.viewOffset,
          showMap = _this$props.showMap,
          customXVIZLayers = _this$props.customXVIZLayers;
      var _this$state = this.state,
          styleParser = _this$state.styleParser,
          views = _this$state.views;
      var layers = this.getLayers({
        frame: frame,
        car: car,
        streamsMetadata: streamsMetadata,
        streamFilter: streamFilter,
        objectStates: objectStates,
        customLayers: customLayers,
        getTransformMatrix: getTransformMatrix,
        styleParser: styleParser,
        customXVIZLayers: customXVIZLayers
      });
      var viewStates = this.getViewState({
        viewMode: viewMode,
        frame: frame,
        viewState: viewState,
        viewOffset: viewOffset
      });
      return React.createElement(DeckGL, {
        width: "100%",
        height: "100%",
        ref: this.deckRef,
        effects: [LIGHTS],
        views: views,
        viewState: viewStates,
        layers: layers,
        layerFilter: this._layerFilter,
        getCursor: this._getCursor,
        onLoad: this._onDeckLoad,
        onHover: this._onLayerHover,
        onClick: this._onLayerClick,
        onViewStateChange: this._onViewStateChange,
        ContextProvider: MapContext.Provider,
        _onMetrics: this._onMetrics
      }, showMap && React.createElement(StaticMap, {
        reuseMap: true,
        attributionControl: false,
        mapboxApiAccessToken: mapboxApiAccessToken,
        mapStyle: mapStyle,
        visible: frame && frame.origin && !viewMode.firstPerson,
        onLoad: this._onMapLoad
      }), React.createElement(ObjectLabelsOverlay, {
        objectSelection: objectStates.selected,
        frame: frame,
        streamsMetadata: streamsMetadata,
        renderObjectLabel: renderObjectLabel,
        xvizStyleParser: styleParser,
        style: style,
        getTransformMatrix: getTransformMatrix
      }), this.props.children);
    }
  }]);

  return Core3DViewer;
}(PureComponent);

_defineProperty(Core3DViewer, "propTypes", {
  frame: PropTypes.object,
  metadata: PropTypes.object,
  streamsMetadata: PropTypes.object,
  showMap: PropTypes.bool,
  showTooltip: PropTypes.bool,
  mapboxApiAccessToken: PropTypes.string,
  mapStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  xvizStyles: PropTypes.object,
  car: PropTypes.object,
  viewMode: PropTypes.object,
  streamFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.func]),
  customLayers: PropTypes.array,
  customXVIZLayers: PropTypes.array,
  renderObjectLabel: PropTypes.func,
  getTransformMatrix: PropTypes.func,
  viewOptions: PropTypes.object,
  onMapLoad: PropTypes.func,
  onDeckLoad: PropTypes.func,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  onViewStateChange: PropTypes.func,
  debug: PropTypes.func,
  viewState: PropTypes.object,
  viewOffset: PropTypes.object,
  objectStates: PropTypes.object
});

_defineProperty(Core3DViewer, "defaultProps", {
  car: DEFAULT_CAR,
  viewMode: VIEW_MODE.PERSPECTIVE,
  xvizStyles: {},
  customLayers: [],
  customXVIZLayers: [],
  onMapLoad: noop,
  onDeckLoad: noop,
  onViewStateChange: noop,
  onHover: noop,
  onClick: noop,
  onContextMenu: noop,
  showMap: true,
  showTooltip: false
});

export { Core3DViewer as default };
//# sourceMappingURL=core-3d-viewer.js.map