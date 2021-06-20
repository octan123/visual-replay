"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _core = require("@emotion/core");

var _theme = require("../theme");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var spin = (0, _core.keyframes)(_templateObject());

var PreLoader = _styled["default"].div(function (props) {
  return _objectSpread({
    width: props.size,
    height: props.size,
    marginLeft: -props.size / 2,
    marginTop: props.theme.spacingNormal,
    marginBottom: props.theme.spacingNormal,
    left: '50%',
    borderRadius: '50%',
    position: 'absolute',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: props.theme.controlColorActive,
    clipPath: 'polygon(50% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
    animation: "".concat(spin, " 1s ease infinite")
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var Spinner = function (_PureComponent) {
  (0, _inherits2["default"])(Spinner, _PureComponent);

  var _super = _createSuper(Spinner);

  function Spinner() {
    (0, _classCallCheck2["default"])(this, Spinner);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Spinner, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style;
      var _style$size = style.size,
          size = _style$size === void 0 ? 32 : _style$size;
      return _react["default"].createElement(PreLoader, {
        size: size,
        theme: theme,
        userStyle: style
      });
    }
  }]);
  return Spinner;
}(_react.PureComponent);

(0, _defineProperty2["default"])(Spinner, "propTypes", {
  style: _propTypes["default"].object
});
(0, _defineProperty2["default"])(Spinner, "defaultProps", {
  style: {}
});

var _default = (0, _theme.withTheme)(Spinner);

exports["default"] = _default;
//# sourceMappingURL=index.js.map