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

var XVIZTableBuilder = function (_XVIZBaseUiBuilder) {
  _inherits(XVIZTableBuilder, _XVIZBaseUiBuilder);

  var _super = _createSuper(XVIZTableBuilder);

  function XVIZTableBuilder(_ref) {
    var _this;

    var stream = _ref.stream,
        description = _ref.description,
        title = _ref.title,
        displayObjectId = _ref.displayObjectId,
        validateWarn = _ref.validateWarn,
        validateError = _ref.validateError;

    _classCallCheck(this, XVIZTableBuilder);

    _this = _super.call(this, {
      type: UI_TYPES.TABLE,
      validateWarn: validateWarn,
      validateError: validateError
    });
    _this._stream = stream;
    _this._description = description;
    _this._title = title;
    _this._displayObjectId = displayObjectId;

    _this._validate();

    return _this;
  }

  _createClass(XVIZTableBuilder, [{
    key: "_validate",
    value: function _validate() {
      if (!this._stream) {
        this._validateError('Table component should have `stream`.');
      }
    }
  }, {
    key: "getUI",
    value: function getUI() {
      var obj = _get(_getPrototypeOf(XVIZTableBuilder.prototype), "getUI", this).call(this);

      obj.stream = this._stream;

      if (this._title) {
        obj.title = this._title;
      }

      if (this._description) {
        obj.description = this._description;
      }

      if (this._displayObjectId) {
        obj.displayObjectId = this._displayObjectId;
      }

      return obj;
    }
  }]);

  return XVIZTableBuilder;
}(XVIZBaseUiBuilder);

export { XVIZTableBuilder as default };
//# sourceMappingURL=xviz-table-builder.js.map