"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _baseObject = _interopRequireDefault(require("./base-object"));

var _math = require("math.gl");

var _assert = _interopRequireDefault(require("../utils/assert"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SDV = function (_BaseObject) {
  (0, _inherits2["default"])(SDV, _BaseObject);

  var _super = _createSuper(SDV);

  function SDV(_ref) {
    var _this;

    var vehicleLog = _ref.vehicleLog,
        _ref$validate = _ref.validate,
        validate = _ref$validate === void 0 ? false : _ref$validate;
    (0, _classCallCheck2["default"])(this, SDV);

    if (validate) {
      (0, _assert["default"])(validate || vehicleLog, 'sdv validate');
    }

    _this = _super.call(this);
    _this.xvizLog = vehicleLog;
    return _this;
  }

  (0, _createClass2["default"])(SDV, [{
    key: "isValid",
    get: function get() {
      return Boolean(this.xvizLog);
    }
  }, {
    key: "position",
    get: function get() {
      return this.xvizLog && new _math.Vector3().copy(this.xvizLog.carPosition);
    }
  }, {
    key: "bearing",
    get: function get() {
      return this.xvizLog && (0, _math.degrees)(this.xvizLog.heading);
    }
  }]);
  return SDV;
}(_baseObject["default"]);

exports["default"] = SDV;
//# sourceMappingURL=sdv.js.map