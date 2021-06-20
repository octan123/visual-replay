import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import assert from 'assert';
import { getXVIZConfig } from '@xviz/parser';
import XVIZWebsocketLoader from './xviz-websocket-loader';
import * as rangeUtils from '../utils/buffer-range';
var DEFAULT_LOG_PROFILE = 'default';
var DEFAULT_RETRY_ATTEMPTS = 3;
var DEFAULT_BUFFER_LENGTH = {
  seconds: 30,
  milliseconds: 30000
};

function getSocketRequestParams(options) {
  var logGuid = options.logGuid,
      _options$logProfile = options.logProfile,
      logProfile = _options$logProfile === void 0 ? DEFAULT_LOG_PROFILE : _options$logProfile,
      requestedDuration = options.duration,
      timestamp = options.timestamp,
      serverConfig = options.serverConfig,
      _options$bufferLength = options.bufferLength,
      bufferLength = _options$bufferLength === void 0 ? DEFAULT_BUFFER_LENGTH[getXVIZConfig().TIMESTAMP_FORMAT] : _options$bufferLength,
      maxConcurrency = options.maxConcurrency,
      WebSocketClass = options.WebSocketClass,
      passThroughOptions = _objectWithoutProperties(options, ["logGuid", "logProfile", "duration", "timestamp", "serverConfig", "bufferLength", "maxConcurrency", "WebSocketClass"]);

  var duration = requestedDuration || serverConfig.defaultLogLength;
  assert(logGuid && duration);

  var queryParams = _objectSpread(_objectSpread(_objectSpread({}, passThroughOptions), serverConfig.queryParams), {}, {
    log: logGuid,
    profile: logProfile
  });

  if (duration) {
    queryParams.duration = duration;
  }

  if (timestamp) {
    queryParams.timestamp = timestamp;
  }

  var retryAttempts = Number.isInteger(serverConfig.retryAttempts) ? serverConfig.retryAttempts : DEFAULT_RETRY_ATTEMPTS;
  var qs = Object.keys(queryParams).map(function (key) {
    return "".concat(key, "=").concat(queryParams[key]);
  }).join('&');
  return {
    url: "".concat(serverConfig.serverUrl, "?").concat(qs),
    logGuid: logGuid,
    logProfile: logProfile,
    duration: duration,
    timestamp: timestamp,
    bufferLength: bufferLength,
    retryAttempts: retryAttempts,
    serverConfig: serverConfig
  };
}

export function updateSocketRequestParams(timestamp, metadata, bufferLength, bufferRange) {
  var _metadata$start_time = metadata.start_time,
      logStartTime = _metadata$start_time === void 0 ? -Infinity : _metadata$start_time,
      _metadata$end_time = metadata.end_time,
      logEndTime = _metadata$end_time === void 0 ? Infinity : _metadata$end_time;
  var totalDuration = logEndTime - logStartTime;
  var chunkSize = bufferLength || totalDuration;

  if (!Number.isFinite(totalDuration)) {
    assert(bufferLength, 'bufferLength is invalid');
  }

  if (chunkSize >= totalDuration) {
    return {
      startTimestamp: logStartTime,
      endTimestamp: logEndTime,
      bufferStart: logStartTime,
      bufferEnd: logEndTime
    };
  }

  var bufferStart = Math.max(timestamp - chunkSize / 2, logStartTime);
  var bufferEnd = Math.min(bufferStart + chunkSize, logEndTime);
  var newBufferRange = rangeUtils.subtract([bufferStart, bufferEnd], bufferRange);

  if (newBufferRange.length === 0) {
    return null;
  }

  var start = newBufferRange[0][0];
  var end = newBufferRange[newBufferRange.length - 1][1];
  return {
    startTimestamp: start,
    endTimestamp: end,
    bufferStart: bufferStart,
    bufferEnd: bufferEnd
  };
}

var XVIZStreamLoader = function (_XVIZWebsocketLoader) {
  _inherits(XVIZStreamLoader, _XVIZWebsocketLoader);

  var _super = _createSuper(XVIZStreamLoader);

  function XVIZStreamLoader() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, XVIZStreamLoader);

    _this = _super.call(this, options);

    _defineProperty(_assertThisInitialized(_this), "_onOpen", function () {
      if (_this.lastRequest) {
        _this.xvizHandler.transformLog(_this.lastRequest);
      }
    });

    _this.requestParams = getSocketRequestParams(options);
    assert(_this.requestParams.bufferLength, 'bufferLength must be provided');
    _this.retrySettings = {
      retries: _this.requestParams.retryAttempts,
      minTimeout: 500,
      randomize: true
    };
    _this.lastRequest = null;
    _this.bufferRange = rangeUtils.empty();
    return _this;
  }

  _createClass(XVIZStreamLoader, [{
    key: "seek",
    value: function seek(timestamp) {
      _get(_getPrototypeOf(XVIZStreamLoader.prototype), "seek", this).call(this, timestamp);

      timestamp = this.getCurrentTime();

      if (this.lastRequest && this.streamBuffer.isInBufferRange(timestamp)) {
        return;
      }

      var metadata = this.getMetadata();

      if (!metadata) {
        return;
      }

      var params = updateSocketRequestParams(timestamp, metadata, this.requestParams.bufferLength, this.bufferRange);

      if (!params) {
        return;
      }

      this.lastRequest = params;
      this.streamBuffer.updateFixedBuffer(params.bufferStart, params.bufferEnd);
      this.bufferRange = rangeUtils.intersect([params.bufferStart, params.bufferEnd], this.bufferRange);

      if (this.isOpen()) {
        this.xvizHandler.transformLog(params);
      } else {}
    }
  }, {
    key: "_getBufferedTimeRanges",
    value: function _getBufferedTimeRanges() {
      return this.bufferRange;
    }
  }, {
    key: "_getBufferStartTime",
    value: function _getBufferStartTime() {
      return this.lastRequest && this.lastRequest.bufferStart;
    }
  }, {
    key: "_getBufferEndTime",
    value: function _getBufferEndTime() {
      return this.lastRequest && this.lastRequest.bufferEnd;
    }
  }, {
    key: "_onXVIZTimeslice",
    value: function _onXVIZTimeslice(message) {
      var bufferUpdated = _get(_getPrototypeOf(XVIZStreamLoader.prototype), "_onXVIZTimeslice", this).call(this, message);

      if (bufferUpdated) {
        this.bufferRange = rangeUtils.add([this.lastRequest.startTimestamp, message.timestamp], this.bufferRange);
      }
    }
  }]);

  return XVIZStreamLoader;
}(XVIZWebsocketLoader);

export { XVIZStreamLoader as default };
//# sourceMappingURL=xviz-stream-loader.js.map