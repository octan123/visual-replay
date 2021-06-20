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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var XVIZContainer = function (_PureComponent) {
  (0, _inherits2["default"])(XVIZContainer, _PureComponent);

  var _super = _createSuper(XVIZContainer);

  function XVIZContainer() {
    (0, _classCallCheck2["default"])(this, XVIZContainer);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(XVIZContainer, [{
    key: "render",
    value: function render() {
      var layout = this.props.layout;
      var layoutStyle = {
        display: 'flex',
        width: '100%'
      };
      var childStyle = {};

      switch (layout.toUpperCase()) {
        case 'VERTICAL':
          layoutStyle.flexDirection = 'column';
          childStyle.flex = '0 0 auto';
          break;

        case 'HORIZONTAL':
          layoutStyle.flexDirection = 'row';
          childStyle.flex = '1 1 auto';
          break;

        default:
          return null;
      }

      return _react["default"].createElement("div", {
        className: "xviz-container",
        style: layoutStyle
      }, _react["default"].Children.map(this.props.children, function (child) {
        return _react["default"].createElement("div", {
          style: childStyle
        }, child);
      }));
    }
  }]);
  return XVIZContainer;
}(_react.PureComponent);

exports["default"] = XVIZContainer;
(0, _defineProperty2["default"])(XVIZContainer, "propTypes", {
  layout: _propTypes["default"].string
});
(0, _defineProperty2["default"])(XVIZContainer, "defaultProps", {
  layout: 'VERTICAL'
});
//# sourceMappingURL=xviz-container.js.map