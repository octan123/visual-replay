import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import assert from 'assert';
import { parseStreamMessage, XVIZStreamBuffer } from '@xviz/parser';
import XVIZLoaderInterface from './xviz-loader-interface';
var DEFAULT_BATCH_SIZE = 4;

var XVIZFileLoader = function (_XVIZLoaderInterface) {
  _inherits(XVIZFileLoader, _XVIZLoaderInterface);

  var _super = _createSuper(XVIZFileLoader);

  function XVIZFileLoader(options) {
    var _this;

    _classCallCheck(this, XVIZFileLoader);

    _this = _super.call(this, options);
    assert(options.timingsFilePath && options.getFilePath);
    _this._timingsFilePath = options.timingsFilePath;
    _this._getFilePath = options.getFilePath;
    _this._batchSize = options.maxConcurrency || DEFAULT_BATCH_SIZE;
    _this.streamBuffer = new XVIZStreamBuffer();
    _this._isOpen = false;
    _this._lastLoadFrame = -1;
    return _this;
  }

  _createClass(XVIZFileLoader, [{
    key: "isOpen",
    value: function isOpen() {
      return this._isOpen;
    }
  }, {
    key: "connect",
    value: function connect() {
      var _this2 = this;

      this._isOpen = true;

      this._loadTimings().then(function (data) {
        _this2._numberOfFrames = data.timing.length + 1;

        _this2._loadMetadata().then(function () {
          return _this2._startLoad();
        });
      });
    }
  }, {
    key: "seek",
    value: function seek(timestamp) {
      _get(_getPrototypeOf(XVIZFileLoader.prototype), "seek", this).call(this, timestamp);
    }
  }, {
    key: "close",
    value: function close() {
      this._isOpen = false;
    }
  }, {
    key: "_loadTimings",
    value: function _loadTimings() {
      return fetch(this._timingsFilePath).then(function (resp) {
        return resp.json();
      });
    }
  }, {
    key: "_loadMetadata",
    value: function _loadMetadata() {
      var metadataPath = this._getFilePath(0);

      assert(metadataPath);
      return this._loadFile(metadataPath, {
        worker: false
      });
    }
  }, {
    key: "_startLoad",
    value: function _startLoad() {
      this._lastLoadFrame = 0;

      for (var i = 0; i < this._batchSize && i < this._numberOfFrames; i++) {
        this._loadNextFrame();
      }
    }
  }, {
    key: "_loadNextFrame",
    value: function _loadNextFrame() {
      var _this3 = this;

      if (!this.isOpen()) {
        return;
      }

      this._lastLoadFrame = this._lastLoadFrame + 1;

      if (this._lastLoadFrame >= this._numberOfFrames) {
        this.emit('done');
        return;
      }

      var filePath = this._getFilePath(this._lastLoadFrame);

      assert(filePath);
      Promise.resolve(this._loadFile(filePath, this.options)).then(function () {
        _this3._loadNextFrame();
      });
    }
  }, {
    key: "_loadFile",
    value: function _loadFile(filePath, options) {
      var _this4 = this;

      var fileFormat = filePath.toLowerCase().match(/[^\.]*$/)[0];
      var file;

      switch (fileFormat) {
        case 'glb':
          file = fetch(filePath).then(function (resp) {
            return resp.arrayBuffer();
          });
          break;

        case 'json':
          file = fetch(filePath).then(function (resp) {
            return resp.json();
          });
          break;

        default:
          return Promise.reject('Unknown file format');
      }

      return file.then(function (data) {
        if (_this4._isOpen) {
          parseStreamMessage({
            message: data,
            onResult: _this4.onXVIZMessage,
            onError: _this4.onError,
            worker: options.worker,
            maxConcurrency: options.maxConcurrency,
            debug: _this4._debug.bind(_this4, 'parse_message')
          });
        }
      });
    }
  }]);

  return XVIZFileLoader;
}(XVIZLoaderInterface);

export { XVIZFileLoader as default };
//# sourceMappingURL=xviz-file-loader.js.map