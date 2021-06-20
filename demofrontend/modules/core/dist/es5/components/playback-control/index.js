"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _parser = require("@xviz/parser");

var _dualPlaybackControl = _interopRequireDefault(require("./dual-playback-control"));

var _connect = _interopRequireDefault(require("../connect"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TIME_SCALES = {
  seconds: 0.001,
  milliseconds: 1
};

var PlaybackControl = function (_PureComponent) {
  (0, _inherits2["default"])(PlaybackControl, _PureComponent);

  var _super = _createSuper(PlaybackControl);

  function PlaybackControl() {
    var _this;

    (0, _classCallCheck2["default"])(this, PlaybackControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      isPlaying: false,
      timeScale: TIME_SCALES[(0, _parser.getXVIZConfig)().TIMESTAMP_FORMAT] || 1
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_animationFrame", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_lastAnimationUpdate", -1);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onPlay", function () {
      _this.props.onPlay();

      _this.setState({
        isPlaying: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onPause", function () {
      _this.props.onPause();

      _this.setState({
        isPlaying: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onSeek", function (timestamp) {
      _this._onTimeChange(timestamp);

      if (_this.state.isPlaying) {
        _this._onPause();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onTimeChange", function (timestamp) {
      var _this$props = _this.props,
          log = _this$props.log,
          onSeek = _this$props.onSeek;

      if (!onSeek(timestamp) && log) {
        log.seek(timestamp);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onLookAheadChange", function (lookAhead) {
      var _this$props2 = _this.props,
          log = _this$props2.log,
          onLookAheadChange = _this$props2.onLookAheadChange;

      if (!onLookAheadChange(lookAhead) && log) {
        log.setLookAhead(lookAhead);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_animate", function () {
      if (_this.state.isPlaying) {
        var now = Date.now();
        var _this$props3 = _this.props,
            startTime = _this$props3.startTime,
            endTime = _this$props3.endTime,
            buffered = _this$props3.buffered,
            timestamp = _this$props3.timestamp;
        var timeScale = _this.state.timeScale;
        var lastUpdate = _this._lastAnimationUpdate;

        var _getXVIZConfig = (0, _parser.getXVIZConfig)(),
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_formatTime", function (x) {
      var formatter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var startTime = _this.props.startTime;
      var timeScale = _this.state.timeScale;

      if (formatter) {
        return formatter(x, startTime);
      }

      var deltaTimeS = (x - startTime) / timeScale / 1000;
      return _dualPlaybackControl["default"].formatTimeCode(deltaTimeS, '{mm}:{ss}');
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_formatTick", function (x) {
      return _this._formatTime(x, _this.props.formatTick);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_formatTimestamp", function (x) {
      return _this._formatTime(x, _this.props.formatTimestamp);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_formatLookAhead", function (x) {
      var formatLookAhead = _this.props.formatLookAhead;
      var timeScale = _this.state.timeScale;

      if (formatLookAhead) {
        return formatLookAhead(x);
      }

      var deltaTimeS = x / timeScale / 1000;
      return _dualPlaybackControl["default"].formatTimeCode(deltaTimeS, '{s}.{S}s');
    });
    return _this;
  }

  (0, _createClass2["default"])(PlaybackControl, [{
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
          otherProps = (0, _objectWithoutProperties2["default"])(_this$props4, ["startTime", "endTime", "timestamp", "lookAhead", "buffered"]);

      if (!Number.isFinite(timestamp) || !Number.isFinite(startTime)) {
        return null;
      }

      var bufferRange = buffered.map(function (r) {
        return {
          startTime: Math.max(r[0], startTime),
          endTime: Math.min(r[1], endTime)
        };
      });
      return _react["default"].createElement(_dualPlaybackControl["default"], (0, _extends2["default"])({}, otherProps, {
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
}(_react.PureComponent);

(0, _defineProperty2["default"])(PlaybackControl, "propTypes", {
  timestamp: _propTypes["default"].number,
  lookAhead: _propTypes["default"].number,
  startTime: _propTypes["default"].number,
  endTime: _propTypes["default"].number,
  buffered: _propTypes["default"].array,
  isPlaying: _propTypes["default"].bool,
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  style: _propTypes["default"].object,
  compact: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  step: _propTypes["default"].number,
  padding: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].object]),
  tickSpacing: _propTypes["default"].number,
  markers: _propTypes["default"].arrayOf(_propTypes["default"].object),
  formatTick: _propTypes["default"].func,
  formatTimestamp: _propTypes["default"].func,
  maxLookAhead: _propTypes["default"].number,
  formatLookAhead: _propTypes["default"].func,
  onPlay: _propTypes["default"].func,
  onPause: _propTypes["default"].func,
  onSeek: _propTypes["default"].func,
  onLookAheadChange: _propTypes["default"].func
});
(0, _defineProperty2["default"])(PlaybackControl, "defaultProps", _dualPlaybackControl["default"].defaultProps);

var getLogState = function getLogState(log) {
  return {
    timestamp: log.getCurrentTime(),
    lookAhead: log.getLookAhead(),
    startTime: log.getLogStartTime(),
    endTime: log.getLogEndTime(),
    buffered: log.getBufferedTimeRanges()
  };
};

var _default = (0, _connect["default"])({
  getLogState: getLogState,
  Component: PlaybackControl
});

exports["default"] = _default;
//# sourceMappingURL=index.js.map