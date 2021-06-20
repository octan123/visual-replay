import _extends from "@babel/runtime/helpers/esm/extends";
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
import AutoSizer from '../shared/autosizer';
import Slider from '../shared/slider';
import { getTimelineTicks, formatTimeCode } from './utils';
import { scaleLinear } from 'd3-scale';
import { withTheme } from '../shared/theme';
import { WrapperComponent, ControlsContainer, PlayPauseButton, Timestamp, TicksContainer, Tick, TickLabel, MarkersContainer, MarkerComponent, BufferComponent } from './styled-components.js';
import { PlayIcon, PauseIcon } from '../shared/icons';
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
  _inherits(PlaybackControl, _PureComponent);

  var _super = _createSuper(PlaybackControl);

  function PlaybackControl(props) {
    var _this;

    _classCallCheck(this, PlaybackControl);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_play", function () {
      _this.props.onPlay();
    });

    _defineProperty(_assertThisInitialized(_this), "_pause", function () {
      _this.props.onPause();
    });

    _defineProperty(_assertThisInitialized(_this), "_seek", function (newTime) {
      var currentTime = _this.props.currentTime;

      if (newTime !== currentTime) {
        _this.props.onSeek(newTime);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onResize", function (_ref) {
      var width = _ref.width;
      var _this$props$style$pad = _this.props.style.padding,
          padding = _this$props$style$pad === void 0 ? 24 : _this$props$style$pad;
      padding = normalizePadding(padding);

      _this.scale.range([0, width - padding.left - padding.right]);

      _this.setState({
        width: width
      });
    });

    _this.scale = scaleLinear();
    return _this;
  }

  _createClass(PlaybackControl, [{
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

      return React.createElement(Component, _extends({
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
      var ticks = getTimelineTicks(scale, tickSpacing, formatTick);
      return React.createElement("div", null, React.createElement(TicksContainer, _extends({}, styleProps, {
        userStyle: style.ticks
      }), ticks.map(function (t, i) {
        var tickStyle = {
          position: 'absolute',
          left: t.x
        };
        return React.createElement(Tick, _extends({
          key: i
        }, styleProps, {
          userStyle: style.tick,
          style: tickStyle
        }), React.createElement(TickLabel, _extends({}, styleProps, {
          userStyle: style.tickLabel
        }), t.label));
      })), markers && React.createElement(MarkersContainer, _extends({}, styleProps, {
        userStyle: style.markers
      }), markers.map(function (marker, i) {
        return _this2._renderMarker(marker, i, MarkerComponent, styleProps, style.marker);
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
      return React.createElement(Slider, {
        style: style.slider,
        value: currentTime,
        onChange: this._seek,
        knobSize: 18,
        step: step,
        min: startTime,
        max: endTime
      }, buffers.map(function (range, i) {
        return _this3._renderMarker(range, i, BufferComponent, styleProps, style.buffer);
      }));
    }
  }, {
    key: "_renderPlayPauseButton",
    value: function _renderPlayPauseButton(styleProps) {
      var _this$props3 = this.props,
          isPlaying = _this$props3.isPlaying,
          style = _this$props3.style;
      return React.createElement(PlayPauseButton, _extends({}, styleProps, {
        userStyle: style.playPauseButton,
        onClick: isPlaying ? this._pause : this._play
      }), isPlaying ? style.iconPause || React.createElement(PauseIcon, null) : style.iconPlay || React.createElement(PlayIcon, null));
    }
  }, {
    key: "_renderTimestamp",
    value: function _renderTimestamp(styleProps) {
      var _this$props4 = this.props,
          style = _this$props4.style,
          currentTime = _this$props4.currentTime,
          formatTimestamp = _this$props4.formatTimestamp;
      return React.createElement(Timestamp, _extends({}, styleProps, {
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
        return React.createElement(WrapperComponent, _extends({
          className: className
        }, styleProps, {
          userStyle: style.wrapper,
          style: wrapperStyle
        }), React.createElement("div", {
          style: COMPACT_CONTAINER_STYLE
        }, this._renderPlayPauseButton(styleProps), React.createElement("div", {
          style: sliderStyle
        }, React.createElement(AutoSizer, {
          disableHeight: true,
          onResize: this._onResize
        }), this._renderTimeline(styleProps), this._renderSlider(styleProps)), this._renderTimestamp(styleProps)), React.createElement(ControlsContainer, _extends({}, styleProps, {
          userStyle: style.controls
        }), this.props.children));
      }

      Object.assign(wrapperStyle, {
        paddingLeft: padding.left,
        paddingRight: padding.right
      });
      return React.createElement(WrapperComponent, _extends({
        className: className
      }, styleProps, {
        userStyle: style.wrapper,
        style: wrapperStyle
      }), React.createElement(AutoSizer, {
        disableHeight: true,
        onResize: this._onResize
      }), this._renderTimeline(styleProps), this._renderSlider(styleProps), React.createElement(ControlsContainer, _extends({}, styleProps, {
        userStyle: style.controls
      }), this._renderPlayPauseButton(styleProps), this._renderTimestamp(styleProps), this.props.children));
    }
  }]);

  return PlaybackControl;
}(PureComponent);

_defineProperty(PlaybackControl, "propTypes", {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  compact: PropTypes.bool,
  currentTime: PropTypes.number.isRequired,
  startTime: PropTypes.number,
  endTime: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  className: PropTypes.string,
  step: PropTypes.number,
  tickSpacing: PropTypes.number,
  bufferRange: PropTypes.arrayOf(PropTypes.object),
  markers: PropTypes.arrayOf(PropTypes.object),
  formatTick: PropTypes.func,
  formatTimestamp: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onSeek: PropTypes.func
});

_defineProperty(PlaybackControl, "defaultProps", {
  style: {},
  compact: false,
  className: '',
  startTime: 0,
  step: 0.1,
  tickSpacing: 100,
  formatTick: function formatTick(x) {
    return formatTimeCode(x, '{mm}:{ss}');
  },
  formatTimestamp: function formatTimestamp(x) {
    return formatTimeCode(x, '{mm}:{ss}.{S}');
  },
  onPlay: noop,
  onPause: noop,
  onSeek: noop
});

var ThemedPlaybackControl = withTheme(PlaybackControl);
ThemedPlaybackControl.formatTimeCode = formatTimeCode;
export default ThemedPlaybackControl;
//# sourceMappingURL=index.js.map