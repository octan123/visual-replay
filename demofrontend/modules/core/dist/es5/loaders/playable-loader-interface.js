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

var _loaderInterface = _interopRequireDefault(require("./loader-interface"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var PlayableLoaderInterface = function (_LoaderInterface) {
  (0, _inherits2["default"])(PlayableLoaderInterface, _LoaderInterface);

  var _super = _createSuper(PlayableLoaderInterface);

  function PlayableLoaderInterface() {
    var _this;

    (0, _classCallCheck2["default"])(this, PlayableLoaderInterface);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getCurrentTime", function () {
      return _this.get('timestamp');
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getLookAhead", function () {
      return _this.get('lookAhead');
    });
    return _this;
  }

  (0, _createClass2["default"])(PlayableLoaderInterface, [{
    key: "seek",
    value: function seek(timestamp) {
      throw new Error('Not implemented');
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      return false;
    }
  }, {
    key: "connect",
    value: function connect() {
      throw new Error('not implemented');
    }
  }, {
    key: "close",
    value: function close() {
      throw new Error('Not implemented');
    }
  }, {
    key: "setLookAhead",
    value: function setLookAhead(lookAhead) {
      this.set('lookAhead', lookAhead);
    }
  }, {
    key: "getLogStartTime",
    value: function getLogStartTime() {
      throw new Error('Not implemented');
    }
  }, {
    key: "getLogEndTime",
    value: function getLogEndTime() {
      throw new Error('Not implemented');
    }
  }, {
    key: "getBufferedTimeRanges",
    value: function getBufferedTimeRanges() {
      throw new Error('Not implemented');
    }
  }]);
  return PlayableLoaderInterface;
}(_loaderInterface["default"]);

exports["default"] = PlayableLoaderInterface;
//# sourceMappingURL=playable-loader-interface.js.map