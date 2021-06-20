import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findNearestValue } from './utils';
import Chart from './chart';
import memoize from '../utils/memoize';
export default class MetricChart extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_getCurrentValues", (highlightX, data) => {
      if (!Number.isFinite(highlightX) || !data) {
        return null;
      }

      const {
        getX
      } = this.props;
      const result = {};

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          result[key] = findNearestValue(data[key], highlightX, getX);
        }
      }

      return result;
    });

    _defineProperty(this, "_onClick", evt => {
      this.props.onClick(this.state.hoveredX, evt);
    });

    _defineProperty(this, "_onNearestX", (key, value, evt) => {
      const {
        hoveredValues
      } = this.state;
      hoveredValues[key] = value;
      this.setState({
        isHovered: true,
        hoveredX: this.props.getX(value),
        hoveredValues: _objectSpread({}, hoveredValues)
      });
      this.props.onNearestX(key, value, evt);
    });

    _defineProperty(this, "_onMouseLeave", evt => {
      this.setState({
        isHovered: false,
        hoveredX: null
      });
      this.props.onMouseLeave(evt);
    });

    this.state = {
      isHovered: false,
      hoveredX: null,
      hoveredValues: {}
    };
    this.getCurrentValues = memoize(this._getCurrentValues);
  }

  render() {
    const {
      highlightX,
      data
    } = this.props;
    const {
      isHovered,
      hoveredValues
    } = this.state;
    const currentValues = this.getCurrentValues(highlightX, data);
    return React.createElement(Chart, _extends({}, this.props, {
      onClick: this._onClick,
      onNearestX: this._onNearestX,
      onMouseLeave: this._onMouseLeave,
      highlightValues: isHovered ? hoveredValues : currentValues
    }));
  }

}

_defineProperty(MetricChart, "propTypes", Object.assign({
  highlightX: PropTypes.number
}, Chart.propTypes));

_defineProperty(MetricChart, "defaultProps", Chart.defaultProps);
//# sourceMappingURL=metric-chart.js.map