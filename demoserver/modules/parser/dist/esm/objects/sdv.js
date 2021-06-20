import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import BaseObject from './base-object';
import { Vector3, degrees } from 'math.gl';
import assert from '../utils/assert';

var SDV = function (_BaseObject) {
  _inherits(SDV, _BaseObject);

  var _super = _createSuper(SDV);

  function SDV(_ref) {
    var _this;

    var vehicleLog = _ref.vehicleLog,
        _ref$validate = _ref.validate,
        validate = _ref$validate === void 0 ? false : _ref$validate;

    _classCallCheck(this, SDV);

    if (validate) {
      assert(validate || vehicleLog, 'sdv validate');
    }

    _this = _super.call(this);
    _this.xvizLog = vehicleLog;
    return _this;
  }

  _createClass(SDV, [{
    key: "isValid",
    get: function get() {
      return Boolean(this.xvizLog);
    }
  }, {
    key: "position",
    get: function get() {
      return this.xvizLog && new Vector3().copy(this.xvizLog.carPosition);
    }
  }, {
    key: "bearing",
    get: function get() {
      return this.xvizLog && degrees(this.xvizLog.heading);
    }
  }]);

  return SDV;
}(BaseObject);

export { SDV as default };
//# sourceMappingURL=sdv.js.map