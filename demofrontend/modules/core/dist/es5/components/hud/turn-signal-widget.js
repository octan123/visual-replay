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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _monochrome = require("@streetscape.gl/monochrome");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _baseWidget = _interopRequireDefault(require("./base-widget"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CONTAINER_STYLE = {
  lineHeight: 0,
  textAlign: 'center'
};

var ArrowComponent = _styled["default"].svg(function (props) {
  return _objectSpread({
    height: props.theme.controlSize,
    margin: props.theme.spacingTiny,
    fill: props.isOn ? props.theme.textColorPrimary : props.theme.controlColorDisabled
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var TurnSignalWidget = function (_PureComponent) {
  (0, _inherits2["default"])(TurnSignalWidget, _PureComponent);

  var _super = _createSuper(TurnSignalWidget);

  function TurnSignalWidget() {
    var _this;

    (0, _classCallCheck2["default"])(this, TurnSignalWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_render", function (_ref) {
      var theme = _ref.theme,
          streams = _ref.streams;
      var _this$props = _this.props,
          transformValue = _this$props.transformValue,
          style = _this$props.style;
      var value = streams.signal.data && transformValue(streams.signal.data.variable);
      var styleProps = {
        theme: theme,
        userStyle: style.arrow
      };
      return _react["default"].createElement("div", {
        style: CONTAINER_STYLE
      }, _react["default"].createElement(ArrowComponent, (0, _extends2["default"])({
        viewBox: "0 0 18 16",
        isOn: value === 'left' || value === 'both'
      }, styleProps), _react["default"].createElement("path", {
        d: "M0,8 L8,16 L8,11 L18,11 L18,5 L8,5 L8,0z"
      })), _react["default"].createElement(ArrowComponent, (0, _extends2["default"])({
        viewBox: "0 0 18 16",
        isOn: value === 'right' || value === 'both'
      }, styleProps), _react["default"].createElement("path", {
        d: "M18,8 L10,16 L10,11 L0,11 L0,5 L10,5 L10,0z"
      })));
    });
    return _this;
  }

  (0, _createClass2["default"])(TurnSignalWidget, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          log = _this$props2.log,
          style = _this$props2.style,
          streamName = _this$props2.streamName;
      return _react["default"].createElement(_baseWidget["default"], {
        log: log,
        style: style,
        streamNames: {
          signal: streamName
        }
      }, this._render);
    }
  }]);
  return TurnSignalWidget;
}(_react.PureComponent);

exports["default"] = TurnSignalWidget;
(0, _defineProperty2["default"])(TurnSignalWidget, "propTypes", {
  log: _propTypes["default"].object.isRequired,
  style: _propTypes["default"].object,
  streamName: _propTypes["default"].string.isRequired,
  transformValue: _propTypes["default"].func
});
(0, _defineProperty2["default"])(TurnSignalWidget, "defaultProps", {
  style: {},
  transformValue: function transformValue(x) {
    return x;
  }
});
//# sourceMappingURL=turn-signal-widget.js.map