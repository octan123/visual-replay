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

var _utils = require("./utils");

var _chart = _interopRequireDefault(require("./chart"));

var _memoize = _interopRequireDefault(require("../utils/memoize"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MetricChart = function (_PureComponent) {
  (0, _inherits2["default"])(MetricChart, _PureComponent);

  var _super = _createSuper(MetricChart);

  function MetricChart(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, MetricChart);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getCurrentValues", function (highlightX, data) {
      if (!Number.isFinite(highlightX) || !data) {
        return null;
      }

      var getX = _this.props.getX;
      var result = {};

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          result[key] = (0, _utils.findNearestValue)(data[key], highlightX, getX);
        }
      }

      return result;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function (evt) {
      _this.props.onClick(_this.state.hoveredX, evt);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onNearestX", function (key, value, evt) {
      var hoveredValues = _this.state.hoveredValues;
      hoveredValues[key] = value;

      _this.setState({
        isHovered: true,
        hoveredX: _this.props.getX(value),
        hoveredValues: _objectSpread({}, hoveredValues)
      });

      _this.props.onNearestX(key, value, evt);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseLeave", function (evt) {
      _this.setState({
        isHovered: false,
        hoveredX: null
      });

      _this.props.onMouseLeave(evt);
    });
    _this.state = {
      isHovered: false,
      hoveredX: null,
      hoveredValues: {}
    };
    _this.getCurrentValues = (0, _memoize["default"])(_this._getCurrentValues);
    return _this;
  }

  (0, _createClass2["default"])(MetricChart, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          highlightX = _this$props.highlightX,
          data = _this$props.data;
      var _this$state = this.state,
          isHovered = _this$state.isHovered,
          hoveredValues = _this$state.hoveredValues;
      var currentValues = this.getCurrentValues(highlightX, data);
      return _react["default"].createElement(_chart["default"], (0, _extends2["default"])({}, this.props, {
        onClick: this._onClick,
        onNearestX: this._onNearestX,
        onMouseLeave: this._onMouseLeave,
        highlightValues: isHovered ? hoveredValues : currentValues
      }));
    }
  }]);
  return MetricChart;
}(_react.PureComponent);

exports["default"] = MetricChart;
(0, _defineProperty2["default"])(MetricChart, "propTypes", Object.assign({
  highlightX: _propTypes["default"].number
}, _chart["default"].propTypes));
(0, _defineProperty2["default"])(MetricChart, "defaultProps", _chart["default"].defaultProps);
//# sourceMappingURL=metric-chart.js.map