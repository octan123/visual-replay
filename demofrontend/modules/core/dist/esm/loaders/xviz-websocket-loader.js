import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import assert from 'assert';
import { XVIZStreamBuffer, parseStreamMessage } from '@xviz/parser';
import PromiseRetry from 'promise-retry';
import XVIZLoaderInterface from './xviz-loader-interface';
import XVIZController from './xviz-controller-v2';

var XVIZWebsocketLoader = function (_XVIZLoaderInterface) {
  _inherits(XVIZWebsocketLoader, _XVIZLoaderInterface);

  var _super = _createSuper(XVIZWebsocketLoader);

  function XVIZWebsocketLoader() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, XVIZWebsocketLoader);

    _this = _super.call(this, options);

    _defineProperty(_assertThisInitialized(_this), "_onWSOpen", function () {
      _this.xvizHandler = new XVIZController(_this.socket);

      _this._debug('socket_open', _this.requestParams);

      _this._onOpen();
    });

    _defineProperty(_assertThisInitialized(_this), "_onWSClose", function (event) {
      _this._debug('socket_closed', event);
    });

    _defineProperty(_assertThisInitialized(_this), "_onWSError", function (event) {
      _this._debug('socket_error', event);
    });

    _this.socket = null;
    _this.retrySettings = {
      retries: 3,
      minTimeout: 500,
      randomize: true
    };
    _this.streamBuffer = new XVIZStreamBuffer();
    _this.WebSocketClass = options.WebSocketClass || WebSocket;
    return _this;
  }

  _createClass(XVIZWebsocketLoader, [{
    key: "isOpen",
    value: function isOpen() {
      return this.socket;
    }
  }, {
    key: "seek",
    value: function seek(timestamp) {
      _get(_getPrototypeOf(XVIZWebsocketLoader.prototype), "seek", this).call(this, timestamp);
    }
  }, {
    key: "connect",
    value: function connect() {
      var _this2 = this;

      assert(this.socket === null, 'Socket Manager still connected');

      this._debug('stream_start');

      var url = this.requestParams.url;
      return PromiseRetry(function (retry) {
        return new Promise(function (resolve, reject) {
          try {
            var ws = new _this2.WebSocketClass(url);
            ws.binaryType = 'arraybuffer';

            ws.onmessage = function (message) {
              var hasMetadata = Boolean(_this2.getMetadata());
              return parseStreamMessage({
                message: message.data,
                onResult: _this2.onXVIZMessage,
                onError: _this2.onError,
                debug: _this2._debug.bind(_this2, 'parse_message'),
                worker: hasMetadata && _this2.options.worker,
                maxConcurrency: _this2.options.maxConcurrency
              });
            };

            ws.onerror = _this2.onError;

            ws.onclose = function (event) {
              _this2._onWSClose(event);

              reject(event);
            };

            ws.onopen = function () {
              _this2.socket = ws;

              _this2._onWSOpen();

              resolve(ws);
            };
          } catch (err) {
            reject(err);
          }
        })["catch"](function (event) {
          _this2._onWSError(event);

          var isAbnormalClosure = event.code > 1000 && event.code !== 1005;

          if (isAbnormalClosure || !_this2.socket) {
            retry();
          }
        });
      }, this.retrySettings)["catch"](this._onWSError);
    }
  }, {
    key: "close",
    value: function close() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    }
  }, {
    key: "_onOpen",
    value: function _onOpen() {
      throw new Error('_onOpen() method must be overridden');
    }
  }]);

  return XVIZWebsocketLoader;
}(XVIZLoaderInterface);

export { XVIZWebsocketLoader as default };
//# sourceMappingURL=xviz-websocket-loader.js.map