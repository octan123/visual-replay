"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSocketRequestParams = updateSocketRequestParams;
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _assert = _interopRequireDefault(require("assert"));

var _parser = require("@xviz/parser");

var _xvizWebsocketLoader = _interopRequireDefault(require("./xviz-websocket-loader"));

var rangeUtils = _interopRequireWildcard(require("../utils/buffer-range"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
      bufferLength = _options$bufferLength === void 0 ? DEFAULT_BUFFER_LENGTH[(0, _parser.getXVIZConfig)().TIMESTAMP_FORMAT] : _options$bufferLength,
      maxConcurrency = options.maxConcurrency,
      WebSocketClass = options.WebSocketClass,
      passThroughOptions = (0, _objectWithoutProperties2["default"])(options, ["logGuid", "logProfile", "duration", "timestamp", "serverConfig", "bufferLength", "maxConcurrency", "WebSocketClass"]);
  var duration = requestedDuration || serverConfig.defaultLogLength;
  (0, _assert["default"])(logGuid && duration);

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

function updateSocketRequestParams(timestamp, metadata, bufferLength, bufferRange) {
  var _metadata$start_time = metadata.start_time,
      logStartTime = _metadata$start_time === void 0 ? -Infinity : _metadata$start_time,
      _metadata$end_time = metadata.end_time,
      logEndTime = _metadata$end_time === void 0 ? Infinity : _metadata$end_time;
  var totalDuration = logEndTime - logStartTime;
  var chunkSize = bufferLength || totalDuration;

  if (!Number.isFinite(totalDuration)) {
    (0, _assert["default"])(bufferLength, 'bufferLength is invalid');
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
  (0, _inherits2["default"])(XVIZStreamLoader, _XVIZWebsocketLoader);

  var _super = _createSuper(XVIZStreamLoader);

  function XVIZStreamLoader() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, XVIZStreamLoader);
    _this = _super.call(this, options);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onOpen", function () {
      if (_this.lastRequest) {
        _this.xvizHandler.transformLog(_this.lastRequest);
      }
    });
    _this.requestParams = getSocketRequestParams(options);
    (0, _assert["default"])(_this.requestParams.bufferLength, 'bufferLength must be provided');
    _this.retrySettings = {
      retries: _this.requestParams.retryAttempts,
      minTimeout: 500,
      randomize: true
    };
    _this.lastRequest = null;
    _this.bufferRange = rangeUtils.empty();
    return _this;
  }

  (0, _createClass2["default"])(XVIZStreamLoader, [{
    key: "seek",
    value: function seek(timestamp) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZStreamLoader.prototype), "seek", this).call(this, timestamp);
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
      var bufferUpdated = (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZStreamLoader.prototype), "_onXVIZTimeslice", this).call(this, message);

      if (bufferUpdated) {
        this.bufferRange = rangeUtils.add([this.lastRequest.startTimestamp, message.timestamp], this.bufferRange);
      }
    }
  }]);
  return XVIZStreamLoader;
}(_xvizWebsocketLoader["default"]);

exports["default"] = XVIZStreamLoader;
//# sourceMappingURL=xviz-stream-loader.js.map