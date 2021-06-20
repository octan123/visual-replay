"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assert = _interopRequireDefault(require("assert"));

var _parser = require("@xviz/parser");

var _xvizLoaderInterface = _interopRequireDefault(require("./xviz-loader-interface"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DEFAULT_BATCH_SIZE = 4;

var XVIZFileLoader = function (_XVIZLoaderInterface) {
  (0, _inherits2["default"])(XVIZFileLoader, _XVIZLoaderInterface);

  var _super = _createSuper(XVIZFileLoader);

  function XVIZFileLoader(options) {
    var _this;

    (0, _classCallCheck2["default"])(this, XVIZFileLoader);
    _this = _super.call(this, options);
    (0, _assert["default"])(options.timingsFilePath && options.getFilePath);
    _this._timingsFilePath = options.timingsFilePath;
    _this._getFilePath = options.getFilePath;
    _this._batchSize = options.maxConcurrency || DEFAULT_BATCH_SIZE;
    _this.streamBuffer = new _parser.XVIZStreamBuffer();
    _this._isOpen = false;
    _this._lastLoadFrame = -1;
    return _this;
  }

  (0, _createClass2["default"])(XVIZFileLoader, [{
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
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZFileLoader.prototype), "seek", this).call(this, timestamp);
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

      (0, _assert["default"])(metadataPath);
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

      (0, _assert["default"])(filePath);
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
          (0, _parser.parseStreamMessage)({
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
}(_xvizLoaderInterface["default"]);

exports["default"] = XVIZFileLoader;
//# sourceMappingURL=xviz-file-loader.js.map