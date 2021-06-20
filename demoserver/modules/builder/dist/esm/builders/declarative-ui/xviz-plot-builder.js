import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import XVIZBaseUiBuilder from './xviz-base-ui-builder';
import { UI_TYPES } from './constants';

var XVIZPlotBuilder = function (_XVIZBaseUiBuilder) {
  _inherits(XVIZPlotBuilder, _XVIZBaseUiBuilder);

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

    _classCallCheck(this, XVIZPlotBuilder);

    _this = _super.call(this, {
      type: UI_TYPES.PLOT,
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

  _createClass(XVIZPlotBuilder, [{
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
      var obj = _get(_getPrototypeOf(XVIZPlotBuilder.prototype), "getUI", this).call(this);

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
}(XVIZBaseUiBuilder);

export { XVIZPlotBuilder as default };
//# sourceMappingURL=xviz-plot-builder.js.map