"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _spinner = _interopRequireDefault(require("../shared/spinner"));

var _popover = require("../shared/popover");

var _theme = require("../shared/theme");

var _styledComponents = require("./styled-components");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MetricCard = function (_PureComponent) {
  (0, _inherits2["default"])(MetricCard, _PureComponent);

  var _super = _createSuper(MetricCard);

  function MetricCard() {
    (0, _classCallCheck2["default"])(this, MetricCard);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(MetricCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          error = _this$props.error,
          isLoading = _this$props.isLoading,
          className = _this$props.className,
          title = _this$props.title,
          description = _this$props.description;
      var styleProps = {
        theme: theme,
        hasError: Boolean(error),
        isLoading: isLoading
      };
      return _react["default"].createElement(_styledComponents.CardContainer, (0, _extends2["default"])({
        className: className
      }, styleProps, {
        userStyle: style.wrapper
      }), title && _react["default"].createElement(_styledComponents.CardTitle, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.title
      }), _react["default"].createElement(_popover.Tooltip, {
        style: style.tooltip,
        content: description
      }, title)), !isLoading && !error && this.props.children, isLoading && _react["default"].createElement(_spinner["default"], {
        style: style.spinner
      }), error && _react["default"].createElement(_styledComponents.ErrorMessage, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.error
      }), error));
    }
  }]);
  return MetricCard;
}(_react.PureComponent);

(0, _defineProperty2["default"])(MetricCard, "propTypes", {
  className: _propTypes["default"].string,
  title: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
  description: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
  style: _propTypes["default"].object,
  error: _propTypes["default"].string,
  isLoading: _propTypes["default"].bool,
  children: _propTypes["default"].element
});
(0, _defineProperty2["default"])(MetricCard, "defaultProps", {
  className: '',
  title: '',
  description: '',
  style: {},
  error: null,
  isLoading: false
});

var _default = (0, _theme.withTheme)(MetricCard);

exports["default"] = _default;
//# sourceMappingURL=metric-card.js.map