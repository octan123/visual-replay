import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from '../shared/autosizer';
import Slider from '../shared/slider';
import { getTimelineTicks, formatTimeCode } from './utils';
import { scaleLinear } from 'd3-scale';
import { withTheme } from '../shared/theme';
import { WrapperComponent, ControlsContainer, PlayPauseButton, Timestamp, TicksContainer, Tick, TickLabel, MarkersContainer, MarkerComponent, BufferComponent } from './styled-components.js';
import { PlayIcon, PauseIcon } from '../shared/icons';
const DEFAULT_PADDING = 24;
const COMPACT_CONTAINER_STYLE = {
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

class PlaybackControl extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_play", () => {
      this.props.onPlay();
    });

    _defineProperty(this, "_pause", () => {
      this.props.onPause();
    });

    _defineProperty(this, "_seek", newTime => {
      const {
        currentTime
      } = this.props;

      if (newTime !== currentTime) {
        this.props.onSeek(newTime);
      }
    });

    _defineProperty(this, "_onResize", ({
      width
    }) => {
      let {
        padding = 24
      } = this.props.style;
      padding = normalizePadding(padding);
      this.scale.range([0, width - padding.left - padding.right]);
      this.setState({
        width
      });
    });

    this.scale = scaleLinear();
  }

  componentDidUpdate(prevProps) {
    const props = this.props;

    if (prevProps.step !== props.step || prevProps.startTime !== props.startTime || prevProps.endTime !== props.endTime) {
      this._pause();

      this._seek(props.startTime);
    }
  }

  componentWillUnmount() {
    this._pause();
  }

  _renderMarker(marker, i, Component, styleProps, userStyle) {
    const {
      scale
    } = this;
    const {
      startTime = marker.time,
      endTime = marker.time,
      style,
      content
    } = marker;
    const x0 = scale(startTime);
    const x1 = scale(endTime);

    const markerStyle = _objectSpread(_objectSpread({}, style), {}, {
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

  _renderTimeline(styleProps) {
    const {
      style,
      tickSpacing,
      formatTick,
      markers
    } = this.props;
    const {
      scale
    } = this;
    const ticks = getTimelineTicks(scale, tickSpacing, formatTick);
    return React.createElement("div", null, React.createElement(TicksContainer, _extends({}, styleProps, {
      userStyle: style.ticks
    }), ticks.map((t, i) => {
      const tickStyle = {
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
    }), markers.map((marker, i) => this._renderMarker(marker, i, MarkerComponent, styleProps, style.marker))));
  }

  _renderSlider(styleProps) {
    const {
      style,
      currentTime,
      startTime,
      endTime,
      step,
      bufferRange = []
    } = this.props;
    const buffers = Array.isArray(bufferRange) ? bufferRange : [bufferRange];
    return React.createElement(Slider, {
      style: style.slider,
      value: currentTime,
      onChange: this._seek,
      knobSize: 18,
      step: step,
      min: startTime,
      max: endTime
    }, buffers.map((range, i) => this._renderMarker(range, i, BufferComponent, styleProps, style.buffer)));
  }

  _renderPlayPauseButton(styleProps) {
    const {
      isPlaying,
      style
    } = this.props;
    return React.createElement(PlayPauseButton, _extends({}, styleProps, {
      userStyle: style.playPauseButton,
      onClick: isPlaying ? this._pause : this._play
    }), isPlaying ? style.iconPause || React.createElement(PauseIcon, null) : style.iconPlay || React.createElement(PlayIcon, null));
  }

  _renderTimestamp(styleProps) {
    const {
      style,
      currentTime,
      formatTimestamp
    } = this.props;
    return React.createElement(Timestamp, _extends({}, styleProps, {
      userStyle: style.timestamp
    }), formatTimestamp(currentTime));
  }

  render() {
    const {
      theme,
      compact,
      width,
      style,
      className,
      isPlaying,
      startTime,
      endTime
    } = this.props;
    let {
      padding = DEFAULT_PADDING
    } = style;
    padding = normalizePadding(padding);
    this.scale.domain([startTime, endTime]);
    const styleProps = {
      theme,
      compact,
      isPlaying
    };
    const wrapperStyle = {
      width
    };

    if (compact) {
      const sliderStyle = {
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

}

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
  formatTick: x => formatTimeCode(x, '{mm}:{ss}'),
  formatTimestamp: x => formatTimeCode(x, '{mm}:{ss}.{S}'),
  onPlay: noop,
  onPause: noop,
  onSeek: noop
});

const ThemedPlaybackControl = withTheme(PlaybackControl);
ThemedPlaybackControl.formatTimeCode = formatTimeCode;
export default ThemedPlaybackControl;
//# sourceMappingURL=index.js.map