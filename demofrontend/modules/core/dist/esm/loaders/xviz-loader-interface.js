import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { getXVIZConfig, StreamSynchronizer, LOG_STREAM_MESSAGE } from '@xviz/parser';
import { clamp } from 'math.gl';
import PlayableLoaderInterface from './playable-loader-interface';
import createSelector from '../utils/create-selector';
import stats from '../utils/stats';

var XVIZLoaderInterface = function (_PlayableLoaderInterf) {
  _inherits(XVIZLoaderInterface, _PlayableLoaderInterf);

  var _super = _createSuper(XVIZLoaderInterface);

  function XVIZLoaderInterface() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, XVIZLoaderInterface);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "onXVIZMessage", function (message) {
      switch (message.type) {
        case LOG_STREAM_MESSAGE.METADATA:
          _this._onXVIZMetadata(message);

          _this.emit('ready', message);

          break;

        case LOG_STREAM_MESSAGE.TIMESLICE:
          _this._onXVIZTimeslice(message);

          _this.emit('update', message);

          break;

        case LOG_STREAM_MESSAGE.DONE:
          _this.emit('finish', message);

          break;

        default:
          _this.emit('error', message);

      }
    });

    _defineProperty(_assertThisInitialized(_this), "onError", function (error) {
      _this.emit('error', error);
    });

    _defineProperty(_assertThisInitialized(_this), "getMetadata", function () {
      return _this.get('metadata');
    });

    _defineProperty(_assertThisInitialized(_this), "getStreamSettings", function () {
      return _this.get('streamSettings');
    });

    _defineProperty(_assertThisInitialized(_this), "_getStreamsMetadata", function () {
      return _this.get('streamsMetadata');
    });

    _defineProperty(_assertThisInitialized(_this), "_getStreams", createSelector(_assertThisInitialized(_this), _this._getDataVersion, function () {
      return _this._getDataByStream();
    }));

    _defineProperty(_assertThisInitialized(_this), "getBufferedTimeRanges", createSelector(_assertThisInitialized(_this), _this._getDataVersion, function () {
      return _this._getBufferedTimeRanges();
    }));

    _defineProperty(_assertThisInitialized(_this), "getStreams", createSelector(_assertThisInitialized(_this), [_this.getStreamSettings, _this._getStreams, _this._getDataVersion], function (streamSettings, streams) {
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

    _defineProperty(_assertThisInitialized(_this), "getStreamsMetadata", getXVIZConfig().DYNAMIC_STREAM_METADATA ? createSelector(_assertThisInitialized(_this), [_this.getMetadata, _this._getStreamsMetadata], function (metadata, streamsMetadata) {
      return Object.assign({}, streamsMetadata, metadata && metadata.streams);
    }) : createSelector(_assertThisInitialized(_this), _this.getMetadata, function (metadata) {
      return metadata && metadata.streams || {};
    }));

    _defineProperty(_assertThisInitialized(_this), "getBufferStartTime", createSelector(_assertThisInitialized(_this), _this.getCurrentTime, function () {
      return _this._getBufferStartTime();
    }));

    _defineProperty(_assertThisInitialized(_this), "getBufferEndTime", createSelector(_assertThisInitialized(_this), _this.getCurrentTime, function () {
      return _this._getBufferEndTime();
    }));

    _defineProperty(_assertThisInitialized(_this), "getLogStartTime", createSelector(_assertThisInitialized(_this), _this.getMetadata, function (metadata) {
      return _this._getLogStartTime(metadata);
    }));

    _defineProperty(_assertThisInitialized(_this), "getLogEndTime", createSelector(_assertThisInitialized(_this), _this.getMetadata, function (metadata) {
      return _this._getLogEndTime(metadata);
    }));

    _defineProperty(_assertThisInitialized(_this), "getCurrentFrame", createSelector(_assertThisInitialized(_this), [_this.getStreamSettings, _this.getCurrentTime, _this.getLookAhead, _this._getDataVersion], function (streamSettings, timestamp, lookAhead) {
      var _assertThisInitialize = _assertThisInitialized(_this),
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

  _createClass(XVIZLoaderInterface, [{
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

      stats.get("loader-".concat(eventType)).incrementCount();
    }
  }, {
    key: "seek",
    value: function seek(timestamp) {
      var metadata = this.getMetadata();

      if (metadata) {
        var startTime = this.getLogStartTime();
        var endTime = this.getLogEndTime();

        if (Number.isFinite(startTime) && Number.isFinite(endTime)) {
          timestamp = clamp(timestamp, startTime, endTime);
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

      this.logSynchronizer = this.logSynchronizer || new StreamSynchronizer(this.streamBuffer);
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

      if (getXVIZConfig().DYNAMIC_STREAM_METADATA && this.streamBuffer.streamCount > oldStreamCount) {
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
      return metadata && metadata.start_time && metadata.start_time + getXVIZConfig().TIME_WINDOW;
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
}(PlayableLoaderInterface);

export { XVIZLoaderInterface as default };
//# sourceMappingURL=xviz-loader-interface.js.map