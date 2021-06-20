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

var _xvizBaseUiBuilder = _interopRequireDefault(require("./xviz-base-ui-builder"));

var _constants = require("./constants");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var XVIZMetricBuilder = function (_XVIZBaseUiBuilder) {
  (0, _inherits2["default"])(XVIZMetricBuilder, _XVIZBaseUiBuilder);

  var _super = _createSuper(XVIZMetricBuilder);

  function XVIZMetricBuilder(_ref) {
    var _this;

    var streams = _ref.streams,
        description = _ref.description,
        title = _ref.title,
        validateWarn = _ref.validateWarn,
        validateError = _ref.validateError;
    (0, _classCallCheck2["default"])(this, XVIZMetricBuilder);
    _this = _super.call(this, {
      type: _constants.UI_TYPES.METRIC,
      validateWarn: validateWarn,
      validateError: validateError
    });
    _this._streams = streams;
    _this._description = description;
    _this._title = title;

    _this._validate();

    return _this;
  }

  (0, _createClass2["default"])(XVIZMetricBuilder, [{
    key: "_validate",
    value: function _validate() {
      if (!this._streams || !this._streams.length) {
        this._validateError('Metric component should have `streams`.');
      }
    }
  }, {
    key: "getUI",
    value: function getUI() {
      var obj = (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZMetricBuilder.prototype), "getUI", this).call(this);
      obj.streams = this._streams;

      if (this._title) {
        obj.title = this._title;
      }

      if (this._description) {
        obj.description = this._description;
      }

      return obj;
    }
  }]);
  return XVIZMetricBuilder;
}(_xvizBaseUiBuilder["default"]);

exports["default"] = XVIZMetricBuilder;
//# sourceMappingURL=xviz-metric-builder.js.map