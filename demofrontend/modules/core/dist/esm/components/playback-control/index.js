import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getXVIZConfig } from '@xviz/parser';
import DualPlaybackControl from './dual-playback-control';
import connectToLog from '../connect';
var TIME_SCALES = {
  seconds: 0.001,
  milliseconds: 1
};

var PlaybackControl = function (_PureComponent) {
  _inherits(PlaybackControl, _PureComponent);

  var _super = _createSuper(PlaybackControl);

  function PlaybackControl() {
    var _this;

    _classCallCheck(this, PlaybackControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isPlaying: false,
      timeScale: TIME_SCALES[getXVIZConfig().TIMESTAMP_FORMAT] || 1
    });

    _defineProperty(_assertThisInitialized(_this), "_animationFrame", null);

    _defineProperty(_assertThisInitialized(_this), "_lastAnimationUpdate", -1);

    _defineProperty(_assertThisInitialized(_this), "_onPlay", function () {
      _this.props.onPlay();

      _this.setState({
        isPlaying: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onPause", function () {
      _this.props.onPause();

      _this.setState({
        isPlaying: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onSeek", function (timestamp) {
      _this._onTimeChange(timestamp);

      if (_this.state.isPlaying) {
        _this._onPause();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onTimeChange", function (timestamp) {
      var _this$props = _this.props,
          log = _this$props.log,
          onSeek = _this$props.onSeek;

      if (!onSeek(timestamp) && log) {
        log.seek(timestamp);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onLookAheadChange", function (lookAhead) {
      var _this$props2 = _this.props,
          log = _this$props2.log,
          onLookAheadChange = _this$props2.onLookAheadChange;

      if (!onLookAheadChange(lookAhead) && log) {
        log.setLookAhead(lookAhead);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_animate", function () {
      if (_this.state.isPlaying) {
        var now = Date.now();
        var _this$props3 = _this.props,
            startTime = _this$props3.startTime,
            endTime = _this$props3.endTime,
            buffered = _this$props3.buffered,
            timestamp = _this$props3.timestamp;
        var timeScale = _this.state.timeScale;
        var lastUpdate = _this._lastAnimationUpdate;

        var _getXVIZConfig = getXVIZConfig(),
            PLAYBACK_FRAME_RATE = _getXVIZConfig.PLAYBACK_FRAME_RATE,
            TIME_WINDOW = _getXVIZConfig.TIME_WINDOW;

        var timeDeltaMs = lastUpdate > 0 ? now - lastUpdate : 0;
        timeDeltaMs = Math.min(timeDeltaMs, 1000 / PLAYBACK_FRAME_RATE);
        var newTimestamp = timestamp + timeDeltaMs * timeScale;

        if (newTimestamp > endTime) {
          newTimestamp = startTime;
        }

        if (buffered.some(function (r) {
          return newTimestamp >= r[0] && newTimestamp <= r[1] + TIME_WINDOW;
        })) {
          _this._onTimeChange(newTimestamp);
        }

        _this._lastAnimationUpdate = now;
        _this._animationFrame = window.requestAnimationFrame(_this._animate);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_formatTime", function (x) {
      var formatter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var startTime = _this.props.startTime;
      var timeScale = _this.state.timeScale;

      if (formatter) {
        return formatter(x, startTime);
      }

      var deltaTimeS = (x - startTime) / timeScale / 1000;
      return DualPlaybackControl.formatTimeCode(deltaTimeS, '{mm}:{ss}');
    });

    _defineProperty(_assertThisInitialized(_this), "_formatTick", function (x) {
      return _this._formatTime(x, _this.props.formatTick);
    });

    _defineProperty(_assertThisInitialized(_this), "_formatTimestamp", function (x) {
      return _this._formatTime(x, _this.props.formatTimestamp);
    });

    _defineProperty(_assertThisInitialized(_this), "_formatLookAhead", function (x) {
      var formatLookAhead = _this.props.formatLookAhead;
      var timeScale = _this.state.timeScale;

      if (formatLookAhead) {
        return formatLookAhead(x);
      }

      var deltaTimeS = x / timeScale / 1000;
      return DualPlaybackControl.formatTimeCode(deltaTimeS, '{s}.{S}s');
    });

    return _this;
  }

  _createClass(PlaybackControl, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ('isPlaying' in nextProps) {
        this.setState({
          isPlaying: Boolean(nextProps.isPlaying)
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var isPlaying = this.state.isPlaying;

      if (isPlaying && prevState.isPlaying !== isPlaying) {
        this._lastAnimationUpdate = Date.now();
        this._animationFrame = window.requestAnimationFrame(this._animate);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._animationFrame) {
        window.cancelAnimationFrame(this._animationFrame);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          startTime = _this$props4.startTime,
          endTime = _this$props4.endTime,
          timestamp = _this$props4.timestamp,
          lookAhead = _this$props4.lookAhead,
          buffered = _this$props4.buffered,
          otherProps = _objectWithoutProperties(_this$props4, ["startTime", "endTime", "timestamp", "lookAhead", "buffered"]);

      if (!Number.isFinite(timestamp) || !Number.isFinite(startTime)) {
        return null;
      }

      var bufferRange = buffered.map(function (r) {
        return {
          startTime: Math.max(r[0], startTime),
          endTime: Math.min(r[1], endTime)
        };
      });
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
  }]);

  return PlaybackControl;
}(PureComponent);

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

var getLogState = function getLogState(log) {
  return {
    timestamp: log.getCurrentTime(),
    lookAhead: log.getLookAhead(),
    startTime: log.getLogStartTime(),
    endTime: log.getLogEndTime(),
    buffered: log.getBufferedTimeRanges()
  };
};

export default connectToLog({
  getLogState: getLogState,
  Component: PlaybackControl
});
//# sourceMappingURL=index.js.map