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

var XVIZContainerBuilder = function (_XVIZBaseUiBuilder) {
  _inherits(XVIZContainerBuilder, _XVIZBaseUiBuilder);

  var _super = _createSuper(XVIZContainerBuilder);

  function XVIZContainerBuilder(_ref) {
    var _this;

    var name = _ref.name,
        layout = _ref.layout,
        interactions = _ref.interactions,
        validateWarn = _ref.validateWarn,
        validateError = _ref.validateError;

    _classCallCheck(this, XVIZContainerBuilder);

    _this = _super.call(this, {
      type: UI_TYPES.CONTAINER,
      validateWarn: validateWarn,
      validateError: validateError
    });
    _this._name = name;
    _this._layout = layout;
    _this._interactions = interactions;

    _this._validate();

    return _this;
  }

  _createClass(XVIZContainerBuilder, [{
    key: "_validate",
    value: function _validate() {
      if (!this._name) {
        this._validateError('Container should have `name`.');
      }
    }
  }, {
    key: "getUI",
    value: function getUI() {
      var obj = _get(_getPrototypeOf(XVIZContainerBuilder.prototype), "getUI", this).call(this);

      obj.name = this._name;

      if (this._layout) {
        obj.layout = this._layout;
      }

      if (this._interactions) {
        obj.interactions = this._interactions;
      }

      return obj;
    }
  }]);

  return XVIZContainerBuilder;
}(XVIZBaseUiBuilder);

export { XVIZContainerBuilder as default };
//# sourceMappingURL=xviz-container-builder.js.map