"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _xvizBaseBuilder = _interopRequireDefault(require("./xviz-base-builder"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var XVIZLinkBuilder = function (_XVIZBaseBuilder) {
  (0, _inherits2["default"])(XVIZLinkBuilder, _XVIZBaseBuilder);

  var _super = _createSuper(XVIZLinkBuilder);

  function XVIZLinkBuilder(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, XVIZLinkBuilder);
    _this = _super.call(this, _objectSpread({}, props));
    _this._links = null;
    _this._targetStream = null;
    return _this;
  }

  (0, _createClass2["default"])(XVIZLinkBuilder, [{
    key: "parent",
    value: function parent(targetStream) {
      this._targetStream = targetStream;
    }
  }, {
    key: "_flush",
    value: function _flush() {
      if (!this._links) {
        this._links = {};
      }

      var data = {};

      if (this._targetStream) {
        data.target_pose = this._targetStream;
        this._links[this._streamId] = data;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZLinkBuilder.prototype), "reset", this).call(this);
      this._targetStream = null;
    }
  }, {
    key: "getData",
    value: function getData() {
      if (this._streamId) {
        this._flush();
      }

      return this._links;
    }
  }]);
  return XVIZLinkBuilder;
}(_xvizBaseBuilder["default"]);

exports["default"] = XVIZLinkBuilder;
//# sourceMappingURL=xviz-link-builder.js.map