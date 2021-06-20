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

var XVIZTableBuilder = function (_XVIZBaseUiBuilder) {
  (0, _inherits2["default"])(XVIZTableBuilder, _XVIZBaseUiBuilder);

  var _super = _createSuper(XVIZTableBuilder);

  function XVIZTableBuilder(_ref) {
    var _this;

    var stream = _ref.stream,
        description = _ref.description,
        title = _ref.title,
        displayObjectId = _ref.displayObjectId,
        validateWarn = _ref.validateWarn,
        validateError = _ref.validateError;
    (0, _classCallCheck2["default"])(this, XVIZTableBuilder);
    _this = _super.call(this, {
      type: _constants.UI_TYPES.TABLE,
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

  (0, _createClass2["default"])(XVIZTableBuilder, [{
    key: "_validate",
    value: function _validate() {
      if (!this._stream) {
        this._validateError('Table component should have `stream`.');
      }
    }
  }, {
    key: "getUI",
    value: function getUI() {
      var obj = (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZTableBuilder.prototype), "getUI", this).call(this);
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
}(_xvizBaseUiBuilder["default"]);

exports["default"] = XVIZTableBuilder;
//# sourceMappingURL=xviz-table-builder.js.map