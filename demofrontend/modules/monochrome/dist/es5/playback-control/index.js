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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _autosizer = _interopRequireDefault(require("../shared/autosizer"));

var _slider = _interopRequireDefault(require("../shared/slider"));

var _utils = require("./utils");

var _d3Scale = require("d3-scale");

var _theme = require("../shared/theme");

var _styledComponents = require("./styled-components.js");

var _icons = require("../shared/icons");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DEFAULT_PADDING = 24;
var COMPACT_CONTAINER_STYLE = {
  display: 'flex',
  alignItems: 'flex-end'
};

function noop() {}

function normalizePadding(padding) {
  padding = padding || 0;

  if (Number.isFinite(padding)) {
    return {
      right: padding,
      left: padding
    };
  }

  return Object.assign({
    right: 0,
    left: 0
  }, padding);
}

var PlaybackControl = function (_PureComponent) {
  (0, _inherits2["default"])(PlaybackControl, _PureComponent);

  var _super = _createSuper(PlaybackControl);

  function PlaybackControl(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, PlaybackControl);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_play", function () {
      _this.props.onPlay();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_pause", function () {
      _this.props.onPause();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_seek", function (newTime) {
      var currentTime = _this.props.currentTime;

      if (newTime !== currentTime) {
        _this.props.onSeek(newTime);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onResize", function (_ref) {
      var width = _ref.width;
      var _this$props$style$pad = _this.props.style.padding,
          padding = _this$props$style$pad === void 0 ? 24 : _this$props$style$pad;
      padding = normalizePadding(padding);

      _this.scale.range([0, width - padding.left - padding.right]);

      _this.setState({
        width: width
      });
    });
    _this.scale = (0, _d3Scale.scaleLinear)();
    return _this;
  }

  (0, _createClass2["default"])(PlaybackControl, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var props = this.props;

      if (prevProps.step !== props.step || prevProps.startTime !== props.startTime || prevProps.endTime !== props.endTime) {
        this._pause();

        this._seek(props.startTime);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._pause();
    }
  }, {
    key: "_renderMarker",
    value: function _renderMarker(marker, i, Component, styleProps, userStyle) {
      var scale = this.scale;
      var _marker$startTime = marker.startTime,
          startTime = _marker$startTime === void 0 ? marker.time : _marker$startTime,
          _marker$endTime = marker.endTime,
          endTime = _marker$endTime === void 0 ? marker.time : _marker$endTime,
          style = marker.style,
          content = marker.content;
      var x0 = scale(startTime);
      var x1 = scale(endTime);

      var markerStyle = _objectSpread(_objectSpread({}, style), {}, {
        position: 'absolute',
        left: x0,
        width: x1 - x0
      });

      return _react["default"].createElement(Component, (0, _extends2["default"])({
        key: i
      }, styleProps, {
        style: markerStyle,
        userStyle: userStyle
      }), content);
    }
  }, {
    key: "_renderTimeline",
    value: function _renderTimeline(styleProps) {
      var _this2 = this;

      var _this$props = this.props,
          style = _this$props.style,
          tickSpacing = _this$props.tickSpacing,
          formatTick = _this$props.formatTick,
          markers = _this$props.markers;
      var scale = this.scale;
      var ticks = (0, _utils.getTimelineTicks)(scale, tickSpacing, formatTick);
      return _react["default"].createElement("div", null, _react["default"].createElement(_styledComponents.TicksContainer, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.ticks
      }), ticks.map(function (t, i) {
        var tickStyle = {
          position: 'absolute',
          left: t.x
        };
        return _react["default"].createElement(_styledComponents.Tick, (0, _extends2["default"])({
          key: i
        }, styleProps, {
          userStyle: style.tick,
          style: tickStyle
        }), _react["default"].createElement(_styledComponents.TickLabel, (0, _extends2["default"])({}, styleProps, {
          userStyle: style.tickLabel
        }), t.label));
      })), markers && _react["default"].createElement(_styledComponents.MarkersContainer, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.markers
      }), markers.map(function (marker, i) {
        return _this2._renderMarker(marker, i, _styledComponents.MarkerComponent, styleProps, style.marker);
      })));
    }
  }, {
    key: "_renderSlider",
    value: function _renderSlider(styleProps) {
      var _this3 = this;

      var _this$props2 = this.props,
          style = _this$props2.style,
          currentTime = _this$props2.currentTime,
          startTime = _this$props2.startTime,
          endTime = _this$props2.endTime,
          step = _this$props2.step,
          _this$props2$bufferRa = _this$props2.bufferRange,
          bufferRange = _this$props2$bufferRa === void 0 ? [] : _this$props2$bufferRa;
      var buffers = Array.isArray(bufferRange) ? bufferRange : [bufferRange];
      return _react["default"].createElement(_slider["default"], {
        style: style.slider,
        value: currentTime,
        onChange: this._seek,
        knobSize: 18,
        step: step,
        min: startTime,
        max: endTime
      }, buffers.map(function (range, i) {
        return _this3._renderMarker(range, i, _styledComponents.BufferComponent, styleProps, style.buffer);
      }));
    }
  }, {
    key: "_renderPlayPauseButton",
    value: function _renderPlayPauseButton(styleProps) {
      var _this$props3 = this.props,
          isPlaying = _this$props3.isPlaying,
          style = _this$props3.style;
      return _react["default"].createElement(_styledComponents.PlayPauseButton, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.playPauseButton,
        onClick: isPlaying ? this._pause : this._play
      }), isPlaying ? style.iconPause || _react["default"].createElement(_icons.PauseIcon, null) : style.iconPlay || _react["default"].createElement(_icons.PlayIcon, null));
    }
  }, {
    key: "_renderTimestamp",
    value: function _renderTimestamp(styleProps) {
      var _this$props4 = this.props,
          style = _this$props4.style,
          currentTime = _this$props4.currentTime,
          formatTimestamp = _this$props4.formatTimestamp;
      return _react["default"].createElement(_styledComponents.Timestamp, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.timestamp
      }), formatTimestamp(currentTime));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          theme = _this$props5.theme,
          compact = _this$props5.compact,
          width = _this$props5.width,
          style = _this$props5.style,
          className = _this$props5.className,
          isPlaying = _this$props5.isPlaying,
          startTime = _this$props5.startTime,
          endTime = _this$props5.endTime;
      var _style$padding = style.padding,
          padding = _style$padding === void 0 ? DEFAULT_PADDING : _style$padding;
      padding = normalizePadding(padding);
      this.scale.domain([startTime, endTime]);
      var styleProps = {
        theme: theme,
        compact: compact,
        isPlaying: isPlaying
      };
      var wrapperStyle = {
        width: width
      };

      if (compact) {
        var sliderStyle = {
          flexGrow: 1,
          paddingLeft: padding.left,
          paddingRight: padding.right
        };
        return _react["default"].createElement(_styledComponents.WrapperComponent, (0, _extends2["default"])({
          className: className
        }, styleProps, {
          userStyle: style.wrapper,
          style: wrapperStyle
        }), _react["default"].createElement("div", {
          style: COMPACT_CONTAINER_STYLE
        }, this._renderPlayPauseButton(styleProps), _react["default"].createElement("div", {
          style: sliderStyle
        }, _react["default"].createElement(_autosizer["default"], {
          disableHeight: true,
          onResize: this._onResize
        }), this._renderTimeline(styleProps), this._renderSlider(styleProps)), this._renderTimestamp(styleProps)), _react["default"].createElement(_styledComponents.ControlsContainer, (0, _extends2["default"])({}, styleProps, {
          userStyle: style.controls
        }), this.props.children));
      }

      Object.assign(wrapperStyle, {
        paddingLeft: padding.left,
        paddingRight: padding.right
      });
      return _react["default"].createElement(_styledComponents.WrapperComponent, (0, _extends2["default"])({
        className: className
      }, styleProps, {
        userStyle: style.wrapper,
        style: wrapperStyle
      }), _react["default"].createElement(_autosizer["default"], {
        disableHeight: true,
        onResize: this._onResize
      }), this._renderTimeline(styleProps), this._renderSlider(styleProps), _react["default"].createElement(_styledComponents.ControlsContainer, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.controls
      }), this._renderPlayPauseButton(styleProps), this._renderTimestamp(styleProps), this.props.children));
    }
  }]);
  return PlaybackControl;
}(_react.PureComponent);

(0, _defineProperty2["default"])(PlaybackControl, "propTypes", {
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  style: _propTypes["default"].object,
  compact: _propTypes["default"].bool,
  currentTime: _propTypes["default"].number.isRequired,
  startTime: _propTypes["default"].number,
  endTime: _propTypes["default"].number.isRequired,
  isPlaying: _propTypes["default"].bool.isRequired,
  className: _propTypes["default"].string,
  step: _propTypes["default"].number,
  tickSpacing: _propTypes["default"].number,
  bufferRange: _propTypes["default"].arrayOf(_propTypes["default"].object),
  markers: _propTypes["default"].arrayOf(_propTypes["default"].object),
  formatTick: _propTypes["default"].func,
  formatTimestamp: _propTypes["default"].func,
  onPlay: _propTypes["default"].func,
  onPause: _propTypes["default"].func,
  onSeek: _propTypes["default"].func
});
(0, _defineProperty2["default"])(PlaybackControl, "defaultProps", {
  style: {},
  compact: false,
  className: '',
  startTime: 0,
  step: 0.1,
  tickSpacing: 100,
  formatTick: function formatTick(x) {
    return (0, _utils.formatTimeCode)(x, '{mm}:{ss}');
  },
  formatTimestamp: function formatTimestamp(x) {
    return (0, _utils.formatTimeCode)(x, '{mm}:{ss}.{S}');
  },
  onPlay: noop,
  onPause: noop,
  onSeek: noop
});
var ThemedPlaybackControl = (0, _theme.withTheme)(PlaybackControl);
ThemedPlaybackControl.formatTimeCode = _utils.formatTimeCode;
var _default = ThemedPlaybackControl;
exports["default"] = _default;
//# sourceMappingURL=index.js.map