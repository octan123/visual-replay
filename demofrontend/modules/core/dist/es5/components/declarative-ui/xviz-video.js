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

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _monochrome = require("@streetscape.gl/monochrome");

var _imageSequence = _interopRequireDefault(require("./image-sequence"));

var _connect = _interopRequireDefault(require("../connect"));

var _streamUtils = require("../../utils/stream-utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var WrapperComponent = _styled["default"].span(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    position: 'relative'
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var BaseComponent = function (_PureComponent) {
  (0, _inherits2["default"])(BaseComponent, _PureComponent);

  var _super = _createSuper(BaseComponent);

  function BaseComponent(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, BaseComponent);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onSelectVideo", function (streamName) {
      _this.setState({
        selectedStreamName: streamName
      });
    });
    _this.state = _objectSpread({}, _this._getStreamNames(props));
    return _this;
  }

  (0, _createClass2["default"])(BaseComponent, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.streamsMetadata !== nextProps.streamsMetadata || this.props.cameras !== nextProps.cameras) {
        this.setState(this._getStreamNames(nextProps));
      }
    }
  }, {
    key: "_getStreamNames",
    value: function _getStreamNames(_ref) {
      var streamsMetadata = _ref.streamsMetadata,
          cameras = _ref.cameras;
      var streamNames = Object.keys(streamsMetadata).filter(function (streamName) {
        var type = streamsMetadata[streamName] && streamsMetadata[streamName].primitive_type;
        return type === 'IMAGE' || type === 'image';
      }).filter((0, _streamUtils.normalizeStreamFilter)(cameras)).sort();

      var _ref2 = this.state || {},
          selectedStreamName = _ref2.selectedStreamName;

      if (!streamNames.includes(selectedStreamName)) {
        selectedStreamName = streamNames[0] || null;
      }

      return {
        selectedStreamName: selectedStreamName,
        streamNames: streamNames
      };
    }
  }, {
    key: "_renderVideoSelector",
    value: function _renderVideoSelector() {
      var style = this.props.style;
      var _this$state = this.state,
          streamNames = _this$state.streamNames,
          selectedStreamName = _this$state.selectedStreamName;

      if (streamNames.length <= 1) {
        return null;
      }

      var data = {};
      streamNames.forEach(function (name) {
        data[name] = name;
      });
      return _react["default"].createElement(_monochrome.Dropdown, {
        style: style.selector,
        value: selectedStreamName,
        data: data,
        onChange: this._onSelectVideo
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          currentTime = _this$props.currentTime,
          streams = _this$props.streams,
          width = _this$props.width,
          height = _this$props.height,
          style = _this$props.style,
          theme = _this$props.theme;
      var selectedStreamName = this.state.selectedStreamName;

      if (!streams || !currentTime || !selectedStreamName) {
        return null;
      }

      var images = streams[selectedStreamName];

      if (images) {
        images = images.filter(Boolean);
      }

      return _react["default"].createElement(WrapperComponent, {
        theme: theme,
        userStyle: style.wrapper
      }, _react["default"].createElement(_imageSequence["default"], {
        width: width,
        height: height,
        src: images,
        currentTime: currentTime
      }), this._renderVideoSelector());
    }
  }]);
  return BaseComponent;
}(_react.PureComponent);

(0, _defineProperty2["default"])(BaseComponent, "propTypes", {
  style: _propTypes["default"].object,
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  cameras: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].array, _propTypes["default"].object, _propTypes["default"].func]),
  currentTime: _propTypes["default"].number,
  streamsMetadata: _propTypes["default"].object,
  streams: _propTypes["default"].object
});
(0, _defineProperty2["default"])(BaseComponent, "defaultProps", {
  style: {},
  width: '100%',
  height: 'auto'
});

var getLogState = function getLogState(log) {
  return {
    currentTime: log.getCurrentTime(),
    streamsMetadata: log.getStreamsMetadata(),
    streams: log.getStreams()
  };
};

var XVIZVideoComponent = (0, _monochrome.withTheme)(BaseComponent);

var _default = (0, _connect["default"])({
  getLogState: getLogState,
  Component: XVIZVideoComponent
});

exports["default"] = _default;
//# sourceMappingURL=xviz-video.js.map