"use strict";

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

var _parser = require("@xviz/parser");

var _math = require("math.gl");

var _playableLoaderInterface = _interopRequireDefault(require("./playable-loader-interface"));

var _createSelector = _interopRequireDefault(require("../utils/create-selector"));

var _stats = _interopRequireDefault(require("../utils/stats"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var XVIZLoaderInterface = function (_PlayableLoaderInterf) {
  (0, _inherits2["default"])(XVIZLoaderInterface, _PlayableLoaderInterf);

  var _super = _createSuper(XVIZLoaderInterface);

  function XVIZLoaderInterface() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, XVIZLoaderInterface);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onXVIZMessage", function (message) {
      switch (message.type) {
        case _parser.LOG_STREAM_MESSAGE.METADATA:
          _this._onXVIZMetadata(message);

          _this.emit('ready', message);

          break;

        case _parser.LOG_STREAM_MESSAGE.TIMESLICE:
          _this._onXVIZTimeslice(message);

          _this.emit('update', message);

          break;

        case _parser.LOG_STREAM_MESSAGE.DONE:
          _this.emit('finish', message);

          break;

        default:
          _this.emit('error', message);

      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onError", function (error) {
      _this.emit('error', error);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getMetadata", function () {
      return _this.get('metadata');
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getStreamSettings", function () {
      return _this.get('streamSettings');
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getStreamsMetadata", function () {
      return _this.get('streamsMetadata');
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getStreams", (0, _createSelector["default"])((0, _assertThisInitialized2["default"])(_this), _this._getDataVersion, function () {
      return _this._getDataByStream();
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getBufferedTimeRanges", (0, _createSelector["default"])((0, _assertThisInitialized2["default"])(_this), _this._getDataVersion, function () {
      return _this._getBufferedTimeRanges();
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getStreams", (0, _createSelector["default"])((0, _assertThisInitialized2["default"])(_this), [_this.getStreamSettings, _this._getStreams, _this._getDataVersion], function (streamSettings, streams) {
      if (!streamSettings || !streams) {
        return streams;
      }

      var result = {};

      for (var streamName in streams) {
        if (streamSettings[streamName]) {
          result[streamName] = streams[streamName];
        }
      }

      return result;
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getStreamsMetadata", (0, _parser.getXVIZConfig)().DYNAMIC_STREAM_METADATA ? (0, _createSelector["default"])((0, _assertThisInitialized2["default"])(_this), [_this.getMetadata, _this._getStreamsMetadata], function (metadata, streamsMetadata) {
      return Object.assign({}, streamsMetadata, metadata && metadata.streams);
    }) : (0, _createSelector["default"])((0, _assertThisInitialized2["default"])(_this), _this.getMetadata, function (metadata) {
      return metadata && metadata.streams || {};
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getBufferStartTime", (0, _createSelector["default"])((0, _assertThisInitialized2["default"])(_this), _this.getCurrentTime, function () {
      return _this._getBufferStartTime();
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getBufferEndTime", (0, _createSelector["default"])((0, _assertThisInitialized2["default"])(_this), _this.getCurrentTime, function () {
      return _this._getBufferEndTime();
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getLogStartTime", (0, _createSelector["default"])((0, _assertThisInitialized2["default"])(_this), _this.getMetadata, function (metadata) {
      return _this._getLogStartTime(metadata);
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getLogEndTime", (0, _createSelector["default"])((0, _assertThisInitialized2["default"])(_this), _this.getMetadata, function (metadata) {
      return _this._getLogEndTime(metadata);
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getCurrentFrame", (0, _createSelector["default"])((0, _assertThisInitialized2["default"])(_this), [_this.getStreamSettings, _this.getCurrentTime, _this.getLookAhead, _this._getDataVersion], function (streamSettings, timestamp, lookAhead) {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          logSynchronizer = _assertThisInitialize.logSynchronizer;

      if (logSynchronizer && Number.isFinite(timestamp)) {
        logSynchronizer.setTime(timestamp);
        logSynchronizer.setLookAheadTimeOffset(lookAhead);
        return logSynchronizer.getCurrentFrame(streamSettings);
      }

      return null;
    }));
    _this.options = options;

    _this._debug = options.debug || function () {};

    _this.callbacks = {};
    return _this;
  }

  (0, _createClass2["default"])(XVIZLoaderInterface, [{
    key: "on",
    value: function on(eventType, cb) {
      this.callbacks[eventType] = this.callbacks[eventType] || [];
      this.callbacks[eventType].push(cb);
      return this;
    }
  }, {
    key: "off",
    value: function off(eventType, cb) {
      var callbacks = this.callbacks[eventType];

      if (callbacks) {
        var index = callbacks.indexOf(cb);

        if (index >= 0) {
          callbacks.splice(index, 1);
        }
      }

      return this;
    }
  }, {
    key: "emit",
    value: function emit(eventType, eventArgs) {
      var callbacks = this.callbacks[eventType];

      if (callbacks) {
        var _iterator = _createForOfIteratorHelper(callbacks),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var cb = _step.value;
            cb(eventType, eventArgs);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      _stats["default"].get("loader-".concat(eventType)).incrementCount();
    }
  }, {
    key: "seek",
    value: function seek(timestamp) {
      var metadata = this.getMetadata();

      if (metadata) {
        var startTime = this.getLogStartTime();
        var endTime = this.getLogEndTime();

        if (Number.isFinite(startTime) && Number.isFinite(endTime)) {
          timestamp = (0, _math.clamp)(timestamp, startTime, endTime);
        }
      }

      this.set('timestamp', timestamp);
      this.streamBuffer.setCurrentTime(timestamp);
    }
  }, {
    key: "updateStreamSettings",
    value: function updateStreamSettings(settings) {
      var streamSettings = this.get('streamSettings');
      this.set('streamSettings', _objectSpread(_objectSpread({}, streamSettings), settings));
    }
  }, {
    key: "_onXVIZMetadata",
    value: function _onXVIZMetadata(metadata) {
      this.set('metadata', metadata);

      if (metadata.streams && Object.keys(metadata.streams).length > 0) {
        this.set('streamSettings', metadata.streams);
      }

      if (!this.streamBuffer) {
        throw new Error('streamBuffer is missing');
      }

      this.logSynchronizer = this.logSynchronizer || new _parser.StreamSynchronizer(this.streamBuffer);
      var timestamp = this.get('timestamp');
      var newTimestamp = Number.isFinite(timestamp) ? timestamp : metadata.start_time;

      if (Number.isFinite(newTimestamp)) {
        this.seek(newTimestamp);
      }
    }
  }, {
    key: "_onXVIZTimeslice",
    value: function _onXVIZTimeslice(timeslice) {
      var oldStreamCount = this.streamBuffer.streamCount;
      var bufferUpdated = this.streamBuffer.insert(timeslice);

      if (bufferUpdated) {
        this._bumpDataVersion();
      }

      if ((0, _parser.getXVIZConfig)().DYNAMIC_STREAM_METADATA && this.streamBuffer.streamCount > oldStreamCount) {
        var streamsMetadata = {};
        var streamSettings = this.get('streamSettings');

        for (var streamName in timeslice.streams) {
          streamsMetadata[streamName] = timeslice.streams[streamName].__metadata;

          if (!(streamName in streamSettings)) {
            streamSettings[streamName] = true;
          }
        }

        this.set('streamsMetadata', streamsMetadata);
      }

      return bufferUpdated;
    }
  }, {
    key: "_getDataByStream",
    value: function _getDataByStream() {
      return this.streamBuffer.streams;
    }
  }, {
    key: "_getBufferedTimeRanges",
    value: function _getBufferedTimeRanges() {
      var range = this.streamBuffer.getLoadedTimeRange();

      if (range) {
        return [[range.start, range.end]];
      }

      return [];
    }
  }, {
    key: "_getLogStartTime",
    value: function _getLogStartTime(metadata) {
      return metadata && metadata.start_time && metadata.start_time + (0, _parser.getXVIZConfig)().TIME_WINDOW;
    }
  }, {
    key: "_getLogEndTime",
    value: function _getLogEndTime(metadata) {
      return metadata && metadata.end_time;
    }
  }, {
    key: "_getBufferStartTime",
    value: function _getBufferStartTime() {
      return this.getLogStartTime();
    }
  }, {
    key: "_getBufferEndTime",
    value: function _getBufferEndTime() {
      return this.getLogEndTime();
    }
  }]);
  return XVIZLoaderInterface;
}(_playableLoaderInterface["default"]);

exports["default"] = XVIZLoaderInterface;
//# sourceMappingURL=xviz-loader-interface.js.map