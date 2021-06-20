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

var XVIZSelectBuilder = function (_XVIZBaseUiBuilder) {
  _inherits(XVIZSelectBuilder, _XVIZBaseUiBuilder);

  var _super = _createSuper(XVIZSelectBuilder);

  function XVIZSelectBuilder(_ref) {
    var _this;

    var stream = _ref.stream,
        target = _ref.target,
        description = _ref.description,
        title = _ref.title,
        validateWarn = _ref.validateWarn,
        validateError = _ref.validateError;

    _classCallCheck(this, XVIZSelectBuilder);

    _this = _super.call(this, {
      type: UI_TYPES.SELECT,
      validateWarn: validateWarn,
      validateError: validateError
    });
    _this._stream = stream;
    _this._target = target;
    _this._description = description;
    _this._title = title;

    _this._validate();

    return _this;
  }

  _createClass(XVIZSelectBuilder, [{
    key: "_validate",
    value: function _validate() {
      if (!this._stream) {
        this._validateError('Select should have `stream`.');
      }

      if (!this._target) {
        this._validateError('Select should have `target`.');
      }
    }
  }, {
    key: "getUI",
    value: function getUI() {
      var obj = _get(_getPrototypeOf(XVIZSelectBuilder.prototype), "getUI", this).call(this);

      obj.stream = this._stream;
      obj.onchange = {
        target: this._target
      };

      if (this._title) {
        obj.title = this._title;
      }

      if (this._description) {
        obj.description = this._description;
      }

      return obj;
    }
  }]);

  return XVIZSelectBuilder;
}(XVIZBaseUiBuilder);

export { XVIZSelectBuilder as default };
//# sourceMappingURL=xviz-select-builder.js.map