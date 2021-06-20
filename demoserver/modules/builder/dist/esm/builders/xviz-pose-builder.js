import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import XVIZBaseBuilder from './xviz-base-builder';
import { CATEGORY } from './constant';

var XVIZPoseBuilder = function (_XVIZBaseBuilder) {
  _inherits(XVIZPoseBuilder, _XVIZBaseBuilder);

  var _super = _createSuper(XVIZPoseBuilder);

  function XVIZPoseBuilder(props) {
    var _this;

    _classCallCheck(this, XVIZPoseBuilder);

    _this = _super.call(this, _objectSpread(_objectSpread({}, props), {}, {
      category: CATEGORY.POSE
    }));
    _this._poses = null;
    return _this;
  }

  _createClass(XVIZPoseBuilder, [{
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
      _get(_getPrototypeOf(XVIZPoseBuilder.prototype), "reset", this).call(this);

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
}(XVIZBaseBuilder);

export { XVIZPoseBuilder as default };
//# sourceMappingURL=xviz-pose-builder.js.map