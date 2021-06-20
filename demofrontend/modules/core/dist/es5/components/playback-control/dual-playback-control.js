"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _monochrome = require("@streetscape.gl/monochrome");

var _styled = _interopRequireDefault(require("@emotion/styled"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var LookAheadContainer = _styled["default"].div(function (props) {
  return _objectSpread({
    display: 'flex',
    alignItems: 'center',
    width: 200,
    '>div': {
      flexGrow: 1
    }
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var LookAheadTimestamp = _styled["default"].span(function (props) {
  return _objectSpread({
    marginLeft: props.theme.spacingNormal,
    marginRight: props.theme.spacingNormal
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var lookAheadMarkerStyle = function lookAheadMarkerStyle(props) {
  return _objectSpread({
    position: 'absolute',
    boxSizing: 'content-box',
    borderStyle: 'solid',
    marginTop: 6,
    marginLeft: -6,
    borderWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#888',
    borderBottomStyle: 'none',
    transitionProperty: 'left',
    transitionDuration: props.isPlaying ? '0s' : props.theme.transitionDuration
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
};

var DualPlaybackControl = function (_PureComponent) {
  (0, _inherits2["default"])(DualPlaybackControl, _PureComponent);

  var _super = _createSuper(DualPlaybackControl);

  function DualPlaybackControl() {
    (0, _classCallCheck2["default"])(this, DualPlaybackControl);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(DualPlaybackControl, [{
    key: "_renderLookAheadSlider",
    value: function _renderLookAheadSlider() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          isPlaying = _this$props.isPlaying,
          lookAhead = _this$props.lookAhead,
          formatLookAhead = _this$props.formatLookAhead,
          maxLookAhead = _this$props.maxLookAhead,
          step = _this$props.step;
      return _react["default"].createElement(LookAheadContainer, {
        theme: theme,
        isPlaying: isPlaying,
        userStyle: style.lookAhead
      }, _react["default"].createElement(LookAheadTimestamp, {
        theme: theme,
        isPlaying: isPlaying,
        userStyle: style.lookAheadTimestamp
      }, "Look ahead: ", formatLookAhead(lookAhead)), _react["default"].createElement(_monochrome.Slider, {
        style: style.lookAheadSlider,
        value: lookAhead,
        min: 0,
        max: maxLookAhead,
        step: step,
        size: 16,
        onChange: this.props.onLookAheadChange
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          isPlaying = _this$props2.isPlaying,
          userMarkers = _this$props2.markers,
          style = _this$props2.style,
          children = _this$props2.children,
          currentTime = _this$props2.currentTime,
          lookAhead = _this$props2.lookAhead,
          endTime = _this$props2.endTime;
      var lookAheadTime = Math.min(endTime, currentTime + lookAhead);
      var markers = userMarkers.concat({
        time: lookAheadTime,
        style: lookAheadMarkerStyle({
          theme: theme,
          isPlaying: isPlaying,
          userStyle: style.lookAheadMarker
        })
      });
      return _react["default"].createElement(_monochrome.PlaybackControl, (0, _extends2["default"])({}, this.props, {
        markers: markers
      }), children, _react["default"].createElement("div", {
        style: {
          flexGrow: 1
        }
      }), this._renderLookAheadSlider());
    }
  }]);
  return DualPlaybackControl;
}(_react.PureComponent);

(0, _defineProperty2["default"])(DualPlaybackControl, "propTypes", _objectSpread(_objectSpread({}, _monochrome.PlaybackControl.propTypes), {}, {
  lookAhead: _propTypes["default"].number,
  maxLookAhead: _propTypes["default"].number,
  formatLookAhead: _propTypes["default"].func,
  onLookAheadChange: _propTypes["default"].func
}));
(0, _defineProperty2["default"])(DualPlaybackControl, "defaultProps", _objectSpread(_objectSpread({}, _monochrome.PlaybackControl.defaultProps), {}, {
  step: 0,
  markers: [],
  lookAhead: 0,
  maxLookAhead: 10,
  formatTick: null,
  formatTimestamp: null,
  formatLookAhead: function formatLookAhead(x) {
    return _monochrome.PlaybackControl.formatTimeCode(x, '{ss}.{S}');
  },
  onLookAheadChange: function onLookAheadChange() {}
}));
var ThemedDualPlaybackControl = (0, _monochrome.withTheme)(DualPlaybackControl);
ThemedDualPlaybackControl.formatTimeCode = _monochrome.PlaybackControl.formatTimeCode;
var _default = ThemedDualPlaybackControl;
exports["default"] = _default;
//# sourceMappingURL=dual-playback-control.js.map