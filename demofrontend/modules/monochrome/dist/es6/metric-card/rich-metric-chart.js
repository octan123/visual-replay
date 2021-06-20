import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '../shared/theme';
import { ExpandedIcon, CollapsedIcon, CheckAltIcon } from '../shared/icons';
import MetricChart from './metric-chart';
import { FilterContainer, FilterToggle, FilterItem, FilterLegend } from './styled-components';
import memoize from '../utils/memoize';
import { scaleOrdinal } from 'd3-scale';
import { extent } from 'd3-array';
const DEFAULT_COLORS = scaleOrdinal().range(['#12939A', '#DDB27C', '#88572C', '#FF991F', '#F15C17', '#223F9A', '#DA70BF', '#125C77', '#4DC19C', '#776E57', '#17B8BE', '#F6D18A', '#B7885E', '#FFCB99', '#F89570', '#829AE3', '#E79FD5', '#1E96BE', '#89DAC1', '#B3AD9E']);

class MetricChartWithLegends extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_extractDataSeries", data => {
      const {
        formatTitle,
        getY
      } = this.props;
      const series = [];

      for (const key in data) {
        const value = data[key];

        if (Array.isArray(value)) {
          const displayName = formatTitle(key);
          const yExtent = extent(value, getY);
          series.push({
            key,
            displayName,
            color: this._getColor(key),
            data: value,
            extent: yExtent,
            max: Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]))
          });
        }
      }

      series.sort((s1, s2) => s2.max - s1.max);
      return series;
    });

    _defineProperty(this, "_isDataVisible", key => {
      const {
        showTopSeriesOnly,
        dataVisibility
      } = this.state;
      const dataSeries = this.extractDataSeries(this.props.data);

      if (dataVisibility[key] === false) {
        return false;
      }

      if (showTopSeriesOnly) {
        const {
          topSeriesCount
        } = this.props;
        return dataSeries.findIndex(s => s.key === key) < topSeriesCount;
      }

      return true;
    });

    _defineProperty(this, "_setHoveredDataName", key => {
      this.setState({
        hoveredSeriesName: key
      });
    });

    _defineProperty(this, "_toggleDataVisibility", key => {
      const {
        dataVisibility
      } = this.state;
      this.setState({
        dataVisibility: _objectSpread(_objectSpread({}, dataVisibility), {}, {
          [key]: dataVisibility[key] === false
        })
      });
    });

    this.state = {
      dataVisibility: {},
      showTopSeriesOnly: true,
      hoveredSeriesName: null
    };
    this.extractDataSeries = memoize(this._extractDataSeries);
  }

  _getColor(key) {
    const {
      getColor
    } = this.props;

    switch (typeof getColor) {
      case 'object':
        return getColor[key];

      case 'function':
        return getColor(key);

      default:
        return getColor;
    }
  }

  _renderDataFilters() {
    const {
      showTopSeriesOnly,
      hoveredSeriesName
    } = this.state;
    const {
      theme,
      style,
      topSeriesCount
    } = this.props;
    const dataSeries = this.extractDataSeries(this.props.data);
    const series = showTopSeriesOnly ? dataSeries.slice(0, topSeriesCount) : dataSeries;
    return React.createElement(FilterContainer, {
      theme: theme,
      userStyle: style.filter,
      isExpanded: !showTopSeriesOnly
    }, dataSeries.length > topSeriesCount && React.createElement(FilterToggle, {
      theme: theme,
      userStyle: style.filterToggle,
      isExpanded: !showTopSeriesOnly,
      onClick: () => this.setState({
        showTopSeriesOnly: !showTopSeriesOnly
      })
    }, showTopSeriesOnly ? style.iconCollapsed || React.createElement(CollapsedIcon, null) : style.iconExpanded || React.createElement(ExpandedIcon, null)), series.map(s => {
      const styleProps = {
        theme,
        name: s.key,
        displayName: s.displayName,
        color: s.color,
        isHovered: hoveredSeriesName === s.key,
        isActive: this._isDataVisible(s.key)
      };
      return React.createElement(FilterItem, _extends({
        userStyle: style.filterItem
      }, styleProps, {
        key: "multiplot-".concat(s.key),
        onMouseOver: () => this._setHoveredDataName(s.key),
        onMouseOut: () => this._setHoveredDataName(null),
        onClick: () => this._toggleDataVisibility(s.key)
      }), React.createElement(FilterLegend, _extends({}, styleProps, {
        userStyle: style.filterLegend
      }), styleProps.isActive ? style.iconOn || React.createElement(CheckAltIcon, null) : style.iconOff), React.createElement("span", null, s.displayName));
    }));
  }

  render() {
    return React.createElement("div", null, React.createElement(MetricChart, _extends({}, this.props, {
      highlightSeries: this.state.hoveredSeriesName,
      onSeriesMouseOver: key => this._setHoveredDataName(key),
      onMouseLeave: () => this._setHoveredDataName(null),
      dataFilter: this._isDataVisible
    })), this._renderDataFilters());
  }

}

_defineProperty(MetricChartWithLegends, "propTypes", Object.assign({}, MetricChart.propTypes, {
  topSeriesCount: PropTypes.number
}));

_defineProperty(MetricChartWithLegends, "defaultProps", Object.assign({}, MetricChart.defaultProps, {
  topSeriesCount: 5,
  getColor: DEFAULT_COLORS
}));

export default withTheme(MetricChartWithLegends);
//# sourceMappingURL=rich-metric-chart.js.map