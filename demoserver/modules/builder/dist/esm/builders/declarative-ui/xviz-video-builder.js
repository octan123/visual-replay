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

var XVIZVideoBuilder = function (_XVIZBaseUiBuilder) {
  _inherits(XVIZVideoBuilder, _XVIZBaseUiBuilder);

  var _super = _createSuper(XVIZVideoBuilder);

  function XVIZVideoBuilder(_ref) {
    var _this;

    var cameras = _ref.cameras,
        interactions = _ref.interactions,
        validateWarn = _ref.validateWarn,
        validateError = _ref.validateError;

    _classCallCheck(this, XVIZVideoBuilder);

    _this = _super.call(this, {
      type: UI_TYPES.VIDEO,
      validateWarn: validateWarn,
      validateError: validateError
    });
    _this._cameras = cameras;

    _this._validate();

    return _this;
  }

  _createClass(XVIZVideoBuilder, [{
    key: "_validate",
    value: function _validate() {
      if (!this._cameras) {
        this._validateError('Video component should have `cameras`.');
      }
    }
  }, {
    key: "getUI",
    value: function getUI() {
      var obj = _get(_getPrototypeOf(XVIZVideoBuilder.prototype), "getUI", this).call(this);

      obj.cameras = this._cameras;
      return obj;
    }
  }]);

  return XVIZVideoBuilder;
}(XVIZBaseUiBuilder);

export { XVIZVideoBuilder as default };
//# sourceMappingURL=xviz-video-builder.js.map