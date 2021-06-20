"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMapGl = require("react-map-gl");

var _react2 = _interopRequireDefault(require("@deck.gl/react"));

var _core = require("@deck.gl/core");

var _objectLabelsOverlay = _interopRequireDefault(require("./object-labels-overlay"));

var _meshLayers = require("@deck.gl/mesh-layers");

var _parser = require("@xviz/parser");

var _xvizLayer = _interopRequireDefault(require("../../layers/xviz-layer"));

var _constants = require("../../constants");

var _viewport = require("../../utils/viewport");

var _transform = require("../../utils/transform");

var _style = require("../../utils/style");

var _streamUtils = require("../../utils/stream-utils");

var _stats = _interopRequireDefault(require("../../utils/stats"));

var _memoize = _interopRequireDefault(require("../../utils/memoize"));

var _constants2 = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var noop = function noop() {};

var Z_INDEX = {
  car: 0,
  point: 1,
  polygon: 2,
  customDefault: 3
};

var Core3DViewer = function (_PureComponent) {
  (0, _inherits2["default"])(Core3DViewer, _PureComponent);

  var _super = _createSuper(Core3DViewer);

  function Core3DViewer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Core3DViewer);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "deckRef", _react["default"].createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMapLoad", function (evt) {
      var map = evt.target;

      _this.props.onMapLoad(map);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDeckLoad", function () {
      var deck = _this.deckRef.current.deck;

      _this.props.onDeckLoad(deck);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMetrics", function (deckMetrics) {
      if (_this.props.debug) {
        var metrics = Object.assign({}, deckMetrics);

        var table = _stats["default"].getTable();

        for (var key in table) {
          metrics[key] = table[key].count;
        }

        _this.props.debug(metrics);
      }

      _stats["default"].reset();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onViewStateChange", function (_ref) {
      var viewState = _ref.viewState,
          oldViewState = _ref.oldViewState;
      var viewOffset = (0, _viewport.getViewStateOffset)(oldViewState, viewState, _this.props.viewOffset);

      _this.props.onViewStateChange({
        viewState: viewState,
        viewOffset: viewOffset
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onLayerHover", function (info, evt) {
      var objectId = info && info.object && info.object.id;
      _this.isHovering = Boolean(objectId);

      _this.props.onHover(info, evt);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onLayerClick", function (info, evt) {
      var isRightClick = evt.which === 3;

      if (isRightClick) {
        _this.props.onContextMenu(info, evt);
      } else {
        _this.props.onClick(info, evt);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_layerFilter", function (_ref2) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getCursor", function () {
      return _this.isHovering ? 'pointer' : 'crosshair';
    });
    _this.state = {
      styleParser: _this._getStyleParser(props),
      views: (0, _viewport.getViews)(props.viewMode, props.viewOptions)
    };
    _this.getLayers = (0, _memoize["default"])(_this._getLayers.bind((0, _assertThisInitialized2["default"])(_this)));
    _this.getViewState = (0, _memoize["default"])(_this._getViewState);
    return _this;
  }

  (0, _createClass2["default"])(Core3DViewer, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.viewMode !== nextProps.viewMode) {
        var viewState = _objectSpread(_objectSpread(_objectSpread({}, this.props.viewState), _constants.DEFAULT_VIEW_STATE), nextProps.viewMode.initialViewState);

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
          views: (0, _viewport.getViews)(nextProps.viewMode, nextProps.viewOptions)
        });
      }

      if (this.props.metadata !== nextProps.metadata || this.props.xvizStyles !== nextProps.xvizStyles) {
        this.setState({
          styleParser: this._getStyleParser(nextProps)
        });
      }

      if (this.props.frame !== nextProps.frame) {
        _stats["default"].get('frame-update').incrementCount();
      }
    }
  }, {
    key: "_getStyleParser",
    value: function _getStyleParser(_ref3) {
      var metadata = _ref3.metadata,
          xvizStyles = _ref3.xvizStyles;
      return new _parser.XVIZStyleParser((0, _style.mergeXVIZStyles)(metadata && metadata.styles, xvizStyles));
    }
  }, {
    key: "_getCarLayer",
    value: function _getCarLayer(_ref4) {
      var frame = _ref4.frame,
          car = _ref4.car;
      var _car$origin = car.origin,
          origin = _car$origin === void 0 ? _constants2.DEFAULT_ORIGIN : _car$origin,
          mesh = car.mesh,
          _car$scale = car.scale,
          scale = _car$scale === void 0 ? [1, 1, 1] : _car$scale,
          _car$wireframe = car.wireframe,
          wireframe = _car$wireframe === void 0 ? false : _car$wireframe,
          _car$texture = car.texture,
          texture = _car$texture === void 0 ? null : _car$texture,
          _car$color = car.color,
          color = _car$color === void 0 ? [0, 0, 0] : _car$color;
      return new _meshLayers.SimpleMeshLayer({
        id: 'car',
        opacity: 1,
        coordinateSystem: _core.COORDINATE_SYSTEM.METER_OFFSETS,
        coordinateOrigin: frame.origin || _constants2.DEFAULT_ORIGIN,
        getTransformMatrix: function getTransformMatrix(d) {
          return frame.vehicleRelativeTransform.clone().translate(origin).scale(scale);
        },
        mesh: mesh,
        data: _constants2.CAR_DATA,
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
      var streamFilter = (0, _streamUtils.normalizeStreamFilter)(opts.streamFilter);
      var featuresAndFutures = new Set(Object.keys(streams).concat(Object.keys(lookAheads)).filter(streamFilter));
      var layerList = [this._getCarLayer(opts)];
      layerList = layerList.concat(Array.from(featuresAndFutures).map(function (streamName) {
        var stream = lookAheads[streamName] || streams[streamName];
        var coordinateProps = (0, _transform.resolveCoordinateTransform)(frame, streamName, streamsMetadata[streamName], getTransformMatrix);
        var stylesheet = styleParser.getStylesheet(streamName);
        var primitives = stream.features || stream;

        if (primitives && primitives.length) {
          return new _xvizLayer["default"](_objectSpread(_objectSpread({
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
          Object.assign(additionalProps, (0, _transform.resolveCoordinateTransform)(frame, props.streamName, streamsMetadata[props.streamName], getTransformMatrix), {
            data: stream && stream.features
          });
        } else if (props.coordinate) {
          Object.assign(additionalProps, (0, _transform.resolveCoordinateTransform)(frame, null, props, getTransformMatrix));
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
      return (0, _viewport.getViewStates)({
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
      return _react["default"].createElement(_react2["default"], {
        width: "100%",
        height: "100%",
        ref: this.deckRef,
        effects: [_constants2.LIGHTS],
        views: views,
        viewState: viewStates,
        layers: layers,
        layerFilter: this._layerFilter,
        getCursor: this._getCursor,
        onLoad: this._onDeckLoad,
        onHover: this._onLayerHover,
        onClick: this._onLayerClick,
        onViewStateChange: this._onViewStateChange,
        ContextProvider: _reactMapGl._MapContext.Provider,
        _onMetrics: this._onMetrics
      }, showMap && _react["default"].createElement(_reactMapGl.StaticMap, {
        reuseMap: true,
        attributionControl: false,
        mapboxApiAccessToken: mapboxApiAccessToken,
        mapStyle: mapStyle,
        visible: frame && frame.origin && !viewMode.firstPerson,
        onLoad: this._onMapLoad
      }), _react["default"].createElement(_objectLabelsOverlay["default"], {
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
}(_react.PureComponent);

exports["default"] = Core3DViewer;
(0, _defineProperty2["default"])(Core3DViewer, "propTypes", {
  frame: _propTypes["default"].object,
  metadata: _propTypes["default"].object,
  streamsMetadata: _propTypes["default"].object,
  showMap: _propTypes["default"].bool,
  showTooltip: _propTypes["default"].bool,
  mapboxApiAccessToken: _propTypes["default"].string,
  mapStyle: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].string]),
  xvizStyles: _propTypes["default"].object,
  car: _propTypes["default"].object,
  viewMode: _propTypes["default"].object,
  streamFilter: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].array, _propTypes["default"].object, _propTypes["default"].func]),
  customLayers: _propTypes["default"].array,
  customXVIZLayers: _propTypes["default"].array,
  renderObjectLabel: _propTypes["default"].func,
  getTransformMatrix: _propTypes["default"].func,
  viewOptions: _propTypes["default"].object,
  onMapLoad: _propTypes["default"].func,
  onDeckLoad: _propTypes["default"].func,
  onHover: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  onContextMenu: _propTypes["default"].func,
  onViewStateChange: _propTypes["default"].func,
  debug: _propTypes["default"].func,
  viewState: _propTypes["default"].object,
  viewOffset: _propTypes["default"].object,
  objectStates: _propTypes["default"].object
});
(0, _defineProperty2["default"])(Core3DViewer, "defaultProps", {
  car: _constants2.DEFAULT_CAR,
  viewMode: _constants.VIEW_MODE.PERSPECTIVE,
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
//# sourceMappingURL=core-3d-viewer.js.map