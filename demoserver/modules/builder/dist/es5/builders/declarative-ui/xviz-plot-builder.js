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

var XVIZPlotBuilder = function (_XVIZBaseUiBuilder) {
  (0, _inherits2["default"])(XVIZPlotBuilder, _XVIZBaseUiBuilder);

  var _super = _createSuper(XVIZPlotBuilder);

  function XVIZPlotBuilder(_ref) {
    var _this;

    var independentVariable = _ref.independentVariable,
        dependentVariables = _ref.dependentVariables,
        regions = _ref.regions,
        description = _ref.description,
        title = _ref.title,
        validateWarn = _ref.validateWarn,
        validateError = _ref.validateError;
    (0, _classCallCheck2["default"])(this, XVIZPlotBuilder);
    _this = _super.call(this, {
      type: _constants.UI_TYPES.PLOT,
      validateWarn: validateWarn,
      validateError: validateError
    });
    _this._independentVariable = independentVariable;
    _this._dependentVariables = dependentVariables;
    _this._regions = regions;
    _this._description = description;
    _this._title = title;

    _this._validate();

    return _this;
  }

  (0, _createClass2["default"])(XVIZPlotBuilder, [{
    key: "_validate",
    value: function _validate() {
      if (this._independentVariable) {
        if (!this._dependentVariables) {
          this._validateError('Plot should have `dependentVariables`.');
        }
      } else if (!this._regions) {
        this._validateError('Plot should have either `independentVariable` or `regions`.');
      }
    }
  }, {
    key: "getUI",
    value: function getUI() {
      var obj = (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZPlotBuilder.prototype), "getUI", this).call(this);

      if (this._independentVariable) {
        obj.independentVariable = this._independentVariable;
        obj.dependentVariables = this._dependentVariables;
      }

      if (this._regions) {
        obj.regions = this._regions;
      }

      if (this._title) {
        obj.title = this._title;
      }

      if (this._description) {
        obj.description = this._description;
      }

      return obj;
    }
  }]);
  return XVIZPlotBuilder;
}(_xvizBaseUiBuilder["default"]);

exports["default"] = XVIZPlotBuilder;
//# sourceMappingURL=xviz-plot-builder.js.map