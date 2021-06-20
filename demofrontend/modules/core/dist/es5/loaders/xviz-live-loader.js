"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEFAULT_LOG_PROFILE = 'default';
var DEFAULT_RETRY_ATTEMPTS = 3;

function getSocketRequestParams(options) {
  var _options$logProfile = options.logProfile,
      logProfile = _options$logProfile === void 0 ? DEFAULT_LOG_PROFILE : _options$logProfile,
      serverConfig = options.serverConfig,
      _options$bufferLength = options.bufferLength,
      bufferLength = _options$bufferLength === void 0 ? 30 : _options$bufferLength,
      maxConcurrency = options.maxConcurrency,
      WebSocketClass = options.WebSocketClass,
      passThroughOptions = (0, _objectWithoutProperties2["default"])(options, ["logProfile", "serverConfig", "bufferLength", "maxConcurrency", "WebSocketClass"]);

  var queryParams = _objectSpread(_objectSpread(_objectSpread({}, passThroughOptions), serverConfig.queryParams), {}, {
    profile: logProfile
  });

  var retryAttempts = Number.isInteger(serverConfig.retryAttempts) ? serverConfig.retryAttempts : DEFAULT_RETRY_ATTEMPTS;
  var qs = Object.keys(queryParams).map(function (key) {
    return "".concat(key, "=").concat(queryParams[key]);
  }).join('&');
  return {
    url: "".concat(serverConfig.serverUrl, "?").concat(qs),
    logProfile: logProfile,
    bufferLength: bufferLength,
    retryAttempts: retryAttempts,
    serverConfig: serverConfig
  };
}

var XVIZLiveLoader = function (_XVIZWebsocketLoader) {
  (0, _inherits2["default"])(XVIZLiveLoader, _XVIZWebsocketLoader);

  var _super = _createSuper(XVIZLiveLoader);

  function XVIZLiveLoader() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, XVIZLiveLoader);
    _this = _super.call(this, options);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onOpen", function () {});
    _this.requestParams = getSocketRequestParams(options);
    (0, _assert["default"])(_this.requestParams.bufferLength, 'bufferLength must be provided');
    _this.retrySettings = {
      retries: _this.requestParams.retryAttempts,
      minTimeout: 500,
      randomize: true
    };
    var bufferChunk = _this.requestParams.bufferLength / 3;
    _this.streamBuffer = new _parser.XVIZStreamBuffer({
      startOffset: -2 * bufferChunk,
      endOffset: bufferChunk
    });
    return _this;
  }

  (0, _createClass2["default"])(XVIZLiveLoader, [{
    key: "seek",
    value: function seek(timestamp) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZLiveLoader.prototype), "seek", this).call(this, timestamp);
      this.streamBuffer.setCurrentTime(timestamp);
    }
  }, {
    key: "_getBufferStartTime",
    value: function _getBufferStartTime() {
      return this.streamBuffer.getBufferRange().start;
    }
  }, {
    key: "_getBufferEndTime",
    value: function _getBufferEndTime() {
      return this.streamBuffer.getBufferRange().end;
    }
  }, {
    key: "_onXVIZTimeslice",
    value: function _onXVIZTimeslice(message) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZLiveLoader.prototype), "_onXVIZTimeslice", this).call(this, message);
      this.seek(message.timestamp);
    }
  }]);
  return XVIZLiveLoader;
}(_xvizWebsocketLoader["default"]);

exports["default"] = XVIZLiveLoader;
//# sourceMappingURL=xviz-live-loader.js.map