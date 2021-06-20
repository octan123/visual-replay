import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findNearestValue } from './utils';
import Chart from './chart';
import memoize from '../utils/memoize';

var MetricChart = function (_PureComponent) {
  _inherits(MetricChart, _PureComponent);

  var _super = _createSuper(MetricChart);

  function MetricChart(props) {
    var _this;

    _classCallCheck(this, MetricChart);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_getCurrentValues", function (highlightX, data) {
      if (!Number.isFinite(highlightX) || !data) {
        return null;
      }

      var getX = _this.props.getX;
      var result = {};

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          result[key] = findNearestValue(data[key], highlightX, getX);
        }
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "_onClick", function (evt) {
      _this.props.onClick(_this.state.hoveredX, evt);
    });

    _defineProperty(_assertThisInitialized(_this), "_onNearestX", function (key, value, evt) {
      var hoveredValues = _this.state.hoveredValues;
      hoveredValues[key] = value;

      _this.setState({
        isHovered: true,
        hoveredX: _this.props.getX(value),
        hoveredValues: _objectSpread({}, hoveredValues)
      });

      _this.props.onNearestX(key, value, evt);
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseLeave", function (evt) {
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
    _this.getCurrentValues = memoize(_this._getCurrentValues);
    return _this;
  }

  _createClass(MetricChart, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          highlightX = _this$props.highlightX,
          data = _this$props.data;
      var _this$state = this.state,
          isHovered = _this$state.isHovered,
          hoveredValues = _this$state.hoveredValues;
      var currentValues = this.getCurrentValues(highlightX, data);
      return React.createElement(Chart, _extends({}, this.props, {
        onClick: this._onClick,
        onNearestX: this._onNearestX,
        onMouseLeave: this._onMouseLeave,
        highlightValues: isHovered ? hoveredValues : currentValues
      }));
    }
  }]);

  return MetricChart;
}(PureComponent);

_defineProperty(MetricChart, "propTypes", Object.assign({
  highlightX: PropTypes.number
}, Chart.propTypes));

_defineProperty(MetricChart, "defaultProps", Chart.defaultProps);

export { MetricChart as default };
//# sourceMappingURL=metric-chart.js.map