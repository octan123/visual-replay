import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import assert from 'assert';
import { XVIZStreamBuffer } from '@xviz/parser';
import XVIZWebsocketLoader from './xviz-websocket-loader';
const DEFAULT_LOG_PROFILE = 'default';
const DEFAULT_RETRY_ATTEMPTS = 3;

function getSocketRequestParams(options) {
  const {
    logProfile = DEFAULT_LOG_PROFILE,
    serverConfig,
    bufferLength = 30,
    maxConcurrency,
    WebSocketClass
  } = options,
        passThroughOptions = _objectWithoutProperties(options, ["logProfile", "serverConfig", "bufferLength", "maxConcurrency", "WebSocketClass"]);

  const queryParams = _objectSpread(_objectSpread(_objectSpread({}, passThroughOptions), serverConfig.queryParams), {}, {
    profile: logProfile
  });

  const retryAttempts = Number.isInteger(serverConfig.retryAttempts) ? serverConfig.retryAttempts : DEFAULT_RETRY_ATTEMPTS;
  const qs = Object.keys(queryParams).map(key => "".concat(key, "=").concat(queryParams[key])).join('&');
  return {
    url: "".concat(serverConfig.serverUrl, "?").concat(qs),
    logProfile,
    bufferLength,
    retryAttempts,
    serverConfig
  };
}

export default class XVIZLiveLoader extends XVIZWebsocketLoader {
  constructor(options = {}) {
    super(options);

    _defineProperty(this, "_onOpen", () => {});

    this.requestParams = getSocketRequestParams(options);
    assert(this.requestParams.bufferLength, 'bufferLength must be provided');
    this.retrySettings = {
      retries: this.requestParams.retryAttempts,
      minTimeout: 500,
      randomize: true
    };
    const bufferChunk = this.requestParams.bufferLength / 3;
    this.streamBuffer = new XVIZStreamBuffer({
      startOffset: -2 * bufferChunk,
      endOffset: bufferChunk
    });
  }

  seek(timestamp) {
    super.seek(timestamp);
    this.streamBuffer.setCurrentTime(timestamp);
  }

  _getBufferStartTime() {
    return this.streamBuffer.getBufferRange().start;
  }

  _getBufferEndTime() {
    return this.streamBuffer.getBufferRange().end;
  }

  _onXVIZTimeslice(message) {
    super._onXVIZTimeslice(message);

    this.seek(message.timestamp);
  }

}
//# sourceMappingURL=xviz-live-loader.js.map