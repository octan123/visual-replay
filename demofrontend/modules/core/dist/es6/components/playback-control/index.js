import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getXVIZConfig } from '@xviz/parser';
import DualPlaybackControl from './dual-playback-control';
import connectToLog from '../connect';
const TIME_SCALES = {
  seconds: 0.001,
  milliseconds: 1
};

class PlaybackControl extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isPlaying: false,
      timeScale: TIME_SCALES[getXVIZConfig().TIMESTAMP_FORMAT] || 1
    });

    _defineProperty(this, "_animationFrame", null);

    _defineProperty(this, "_lastAnimationUpdate", -1);

    _defineProperty(this, "_onPlay", () => {
      this.props.onPlay();
      this.setState({
        isPlaying: true
      });
    });

    _defineProperty(this, "_onPause", () => {
      this.props.onPause();
      this.setState({
        isPlaying: false
      });
    });

    _defineProperty(this, "_onSeek", timestamp => {
      this._onTimeChange(timestamp);

      if (this.state.isPlaying) {
        this._onPause();
      }
    });

    _defineProperty(this, "_onTimeChange", timestamp => {
      const {
        log,
        onSeek
      } = this.props;

      if (!onSeek(timestamp) && log) {
        log.seek(timestamp);
      }
    });

    _defineProperty(this, "_onLookAheadChange", lookAhead => {
      const {
        log,
        onLookAheadChange
      } = this.props;

      if (!onLookAheadChange(lookAhead) && log) {
        log.setLookAhead(lookAhead);
      }
    });

    _defineProperty(this, "_animate", () => {
      if (this.state.isPlaying) {
        const now = Date.now();
        const {
          startTime,
          endTime,
          buffered,
          timestamp
        } = this.props;
        const {
          timeScale
        } = this.state;
        const lastUpdate = this._lastAnimationUpdate;
        const {
          PLAYBACK_FRAME_RATE,
          TIME_WINDOW
        } = getXVIZConfig();
        let timeDeltaMs = lastUpdate > 0 ? now - lastUpdate : 0;
        timeDeltaMs = Math.min(timeDeltaMs, 1000 / PLAYBACK_FRAME_RATE);
        let newTimestamp = timestamp + timeDeltaMs * timeScale;

        if (newTimestamp > endTime) {
          newTimestamp = startTime;
        }

        if (buffered.some(r => newTimestamp >= r[0] && newTimestamp <= r[1] + TIME_WINDOW)) {
          this._onTimeChange(newTimestamp);
        }

        this._lastAnimationUpdate = now;
        this._animationFrame = window.requestAnimationFrame(this._animate);
      }
    });

    _defineProperty(this, "_formatTime", (x, formatter = null) => {
      const {
        startTime
      } = this.props;
      const {
        timeScale
      } = this.state;

      if (formatter) {
        return formatter(x, startTime);
      }

      const deltaTimeS = (x - startTime) / timeScale / 1000;
      return DualPlaybackControl.formatTimeCode(deltaTimeS, '{mm}:{ss}');
    });

    _defineProperty(this, "_formatTick", x => {
      return this._formatTime(x, this.props.formatTick);
    });

    _defineProperty(this, "_formatTimestamp", x => {
      return this._formatTime(x, this.props.formatTimestamp);
    });

    _defineProperty(this, "_formatLookAhead", x => {
      const {
        formatLookAhead
      } = this.props;
      const {
        timeScale
      } = this.state;

      if (formatLookAhead) {
        return formatLookAhead(x);
      }

      const deltaTimeS = x / timeScale / 1000;
      return DualPlaybackControl.formatTimeCode(deltaTimeS, '{s}.{S}s');
    });
  }

  componentWillReceiveProps(nextProps) {
    if ('isPlaying' in nextProps) {
      this.setState({
        isPlaying: Boolean(nextProps.isPlaying)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isPlaying
    } = this.state;

    if (isPlaying && prevState.isPlaying !== isPlaying) {
      this._lastAnimationUpdate = Date.now();
      this._animationFrame = window.requestAnimationFrame(this._animate);
    }
  }

  componentWillUnmount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }

  render() {
    const _this$props = this.props,
          {
      startTime,
      endTime,
      timestamp,
      lookAhead,
      buffered
    } = _this$props,
          otherProps = _objectWithoutProperties(_this$props, ["startTime", "endTime", "timestamp", "lookAhead", "buffered"]);

    if (!Number.isFinite(timestamp) || !Number.isFinite(startTime)) {
      return null;
    }

    const bufferRange = buffered.map(r => ({
      startTime: Math.max(r[0], startTime),
      endTime: Math.min(r[1], endTime)
    }));
    return React.createElement(DualPlaybackControl, _extends({}, otherProps, {
      bufferRange: bufferRange,
      currentTime: timestamp,
      lookAhead: lookAhead,
      startTime: startTime,
      endTime: endTime,
      isPlaying: this.state.isPlaying,
      formatTick: this._formatTick,
      formatTimestamp: this._formatTimestamp,
      formatLookAhead: this._formatLookAhead,
      onSeek: this._onSeek,
      onPlay: this._onPlay,
      onPause: this._onPause,
      onLookAheadChange: this._onLookAheadChange
    }));
  }

}

_defineProperty(PlaybackControl, "propTypes", {
  timestamp: PropTypes.number,
  lookAhead: PropTypes.number,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  buffered: PropTypes.array,
  isPlaying: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  compact: PropTypes.bool,
  className: PropTypes.string,
  step: PropTypes.number,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  tickSpacing: PropTypes.number,
  markers: PropTypes.arrayOf(PropTypes.object),
  formatTick: PropTypes.func,
  formatTimestamp: PropTypes.func,
  maxLookAhead: PropTypes.number,
  formatLookAhead: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onSeek: PropTypes.func,
  onLookAheadChange: PropTypes.func
});

_defineProperty(PlaybackControl, "defaultProps", DualPlaybackControl.defaultProps);

const getLogState = log => ({
  timestamp: log.getCurrentTime(),
  lookAhead: log.getLookAhead(),
  startTime: log.getLogStartTime(),
  endTime: log.getLogEndTime(),
  buffered: log.getBufferedTimeRanges()
});

export default connectToLog({
  getLogState,
  Component: PlaybackControl
});
//# sourceMappingURL=index.js.map