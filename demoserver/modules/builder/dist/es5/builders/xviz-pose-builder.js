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

var _constant = require("./constant");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var XVIZPoseBuilder = function (_XVIZBaseBuilder) {
  (0, _inherits2["default"])(XVIZPoseBuilder, _XVIZBaseBuilder);

  var _super = _createSuper(XVIZPoseBuilder);

  function XVIZPoseBuilder(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, XVIZPoseBuilder);
    _this = _super.call(this, _objectSpread(_objectSpread({}, props), {}, {
      category: _constant.CATEGORY.POSE
    }));
    _this._poses = null;
    return _this;
  }

  (0, _createClass2["default"])(XVIZPoseBuilder, [{
    key: "mapOrigin",
    value: function mapOrigin(longitude, latitude, altitude) {
      this._map_origin = {
        longitude: longitude,
        latitude: latitude,
        altitude: altitude
      };
      return this;
    }
  }, {
    key: "position",
    value: function position(x, y, z) {
      this._position = [x, y, z];
      return this;
    }
  }, {
    key: "orientation",
    value: function orientation(roll, pitch, yaw) {
      this._orientation = [roll, pitch, yaw];
      return this;
    }
  }, {
    key: "timestamp",
    value: function timestamp(_timestamp) {
      this._timestamp = _timestamp;
      return this;
    }
  }, {
    key: "_flush",
    value: function _flush() {
      if (!this._poses) {
        this._poses = {};
      }

      var data = {};

      if (this._timestamp) {
        data.timestamp = this._timestamp;
      }

      if (this._map_origin) {
        data.map_origin = this._map_origin;
      }

      if (this._position) {
        data.position = this._position;
      }

      if (this._orientation) {
        data.orientation = this._orientation;
      }

      this._poses[this._streamId] = data;
    }
  }, {
    key: "reset",
    value: function reset() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZPoseBuilder.prototype), "reset", this).call(this);
      this._timestamp = null;
      this._map_origin = null;
      this._position = null;
      this._orientation = null;
    }
  }, {
    key: "getData",
    value: function getData() {
      if (this._streamId) {
        this._flush();
      }

      return {
        poses: this._poses
      };
    }
  }]);
  return XVIZPoseBuilder;
}(_xvizBaseBuilder["default"]);

exports["default"] = XVIZPoseBuilder;
//# sourceMappingURL=xviz-pose-builder.js.map