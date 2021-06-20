import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from '../shared/autosizer';
import XYPlot from 'react-vis/dist/plot/xy-plot';
import AreaSeries from 'react-vis/dist/plot/series/area-series';
import LineSeries from 'react-vis/dist/plot/series/line-series';
import MarkSeries from 'react-vis/dist/plot/series/mark-series';
import HorizontalGridLines from 'react-vis/dist/plot/horizontal-grid-lines';
import VerticalGridLines from 'react-vis/dist/plot/vertical-grid-lines';
import XAxis from 'react-vis/dist/plot/axis/x-axis';
import YAxis from 'react-vis/dist/plot/axis/y-axis';
import Crosshair from 'react-vis/dist/plot/crosshair';
import { scaleLinear } from 'd3-scale';
import { withTheme } from '../shared/theme';
import { ChartContainer, CrosshairItemTitle, CrosshairItemLegend, CrosshairItemValue } from './styled-components';

const noop = () => {};

const DEFAULT_MARGIN = {
  left: 32,
  right: 20,
  top: 20,
  bottom: 32
};

class Chart extends PureComponent {
  _getScaleSettings() {
    const {
      data,
      dataFilter,
      xDomain,
      yDomain,
      getX,
      getY0,
      getY
    } = this.props;

    if (xDomain && yDomain) {
      return {
        xDomain,
        yDomain
      };
    }

    let x = xDomain || [Infinity, -Infinity];
    let y = yDomain || [0, 0];

    for (const key in data) {
      if (dataFilter(key)) {
        const values = data[key];

        if (Array.isArray(values) && values.length > 0) {
          x = xDomain || values.reduce((acc, d) => {
            const x0 = getX(d);
            acc[0] = Math.min(acc[0], x0);
            acc[1] = Math.max(acc[1], x0);
            return acc;
          }, x);
          y = yDomain || values.reduce((acc, d) => {
            const y1 = getY(d);
            const y0 = getY0(d);
            acc[0] = Math.min(acc[0], y1);
            acc[1] = Math.max(acc[1], y1);

            if (Number.isFinite(y0)) {
              acc[0] = Math.min(acc[0], y0);
              acc[1] = Math.max(acc[1], y0);
            }

            return acc;
          }, y);
        }
      }
    }

    if (!yDomain) {
      y = scaleLinear().domain(y).nice().domain();
    }

    return {
      xDomain: x,
      yDomain: y
    };
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

  _renderSeries() {
    const {
      data,
      dataFilter,
      highlightSeries,
      getX,
      getY0,
      getY,
      xDomain
    } = this.props;
    const areas = [];
    const lines = [];
    Object.keys(data).forEach(key => {
      if (!dataFilter(key)) {
        return;
      }

      const datums = xDomain ? data[key].filter(point => {
        const x = getX(point);
        return x >= xDomain[0] && x <= xDomain[1];
      }) : data[key];

      if (!datums.length) {
        return;
      }

      const isArea = Number.isFinite(getY0(datums[0]));
      const Type = isArea ? AreaSeries : LineSeries;

      const color = this._getColor(key);

      const series = React.createElement(Type, {
        key: "value-".concat(key, "-line"),
        data: datums,
        getX: getX,
        getY: getY,
        getY0: getY0,
        color: color,
        fill: color,
        strokeWidth: highlightSeries === key ? 4 : 2,
        onNearestX: this.props.onNearestX.bind(this, key),
        onSeriesMouseOver: () => this.props.onSeriesMouseOver(key),
        onSeriesMouseOut: () => this.props.onSeriesMouseOut(key)
      });

      if (isArea) {
        areas.push(series);
      } else {
        lines.push(series);
      }
    });
    return areas.concat(lines);
  }

  _renderCrosshair() {
    const {
      highlightValues
    } = this.props;

    if (!highlightValues) {
      return null;
    }

    const {
      theme,
      style,
      unit,
      dataFilter,
      formatTitle,
      formatValue,
      getX,
      getY,
      getY0,
      xDomain
    } = this.props;
    const keys = Object.keys(highlightValues).filter(key => {
      const value = highlightValues[key];
      const x = getX(value);
      return dataFilter(key) && (!xDomain || x >= xDomain[0] && x <= xDomain[1]);
    });
    const crosshairItems = keys.map((key, i) => {
      const value = highlightValues[key];

      const color = this._getColor(key);

      const x = getX(value);
      const y = getY(value);
      const y0 = getY0(value);
      const styleProps = {
        theme,
        name: key,
        displayName: formatTitle(key),
        color,
        isFirst: i === 0,
        isLast: i === keys.length - 1
      };
      return {
        x,
        y,
        title: React.createElement(CrosshairItemTitle, _extends({}, styleProps, {
          userStyle: style.crosshairTitle
        }), React.createElement(CrosshairItemLegend, _extends({}, styleProps, {
          userStyle: style.crosshairLegend
        })), styleProps.displayName),
        value: React.createElement(CrosshairItemValue, _extends({}, styleProps, {
          userStyle: style.crosshairValue
        }), Number.isFinite(y0) && "".concat(formatValue(y0), ", "), formatValue(y), unit && React.createElement("span", null, unit)),
        color
      };
    });
    return [React.createElement(Crosshair, {
      key: "crosshair",
      values: crosshairItems,
      titleFormat: () => null,
      itemsFormat: values => values
    }), React.createElement(MarkSeries, {
      key: "hovered-values",
      data: crosshairItems,
      stroke: "#fff",
      strokeWidth: 2,
      getFill: d => d.color,
      fillType: "literal"
    })];
  }

  render() {
    const {
      theme,
      width,
      height,
      style,
      formatYTick,
      formatXTick,
      xTicks,
      yTicks,
      horizontalGridLines,
      verticalGridLines,
      onMouseEnter,
      onMouseMove,
      onMouseLeave,
      onClick
    } = this.props;
    return React.createElement(ChartContainer, {
      theme: theme,
      userStyle: style.chart,
      tooltipStyle: style.crosshair,
      style: {
        width,
        height
      }
    }, React.createElement(AutoSizer, null, ({
      width: chartWidth,
      height: chartHeight
    }) => React.createElement(XYPlot, _extends({
      width: chartWidth,
      height: chartHeight,
      margin: style.margin || DEFAULT_MARGIN
    }, this._getScaleSettings(), {
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseMove: onMouseMove,
      onMouseLeave: onMouseLeave
    }), xTicks > 0 && React.createElement(XAxis, {
      title: "",
      tickFormat: formatXTick,
      tickTotal: xTicks
    }), yTicks > 0 && React.createElement(YAxis, {
      title: "",
      tickFormat: formatYTick,
      tickTotal: yTicks
    }), horizontalGridLines > 0 && React.createElement(HorizontalGridLines, {
      tickTotal: horizontalGridLines
    }), verticalGridLines > 0 && React.createElement(VerticalGridLines, {
      tickTotal: verticalGridLines
    }), this._renderSeries(), this._renderCrosshair())));
  }

}

_defineProperty(Chart, "propTypes", {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  unit: PropTypes.string,
  data: PropTypes.object,
  dataFilter: PropTypes.func,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onNearestX: PropTypes.func,
  onSeriesMouseOver: PropTypes.func,
  onSeriesMouseOut: PropTypes.func,
  getX: PropTypes.func,
  getY0: PropTypes.func,
  getY: PropTypes.func,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
  xTicks: PropTypes.number,
  yTicks: PropTypes.number,
  horizontalGridLines: PropTypes.number,
  verticalGridLines: PropTypes.number,
  highlightSeries: PropTypes.string,
  highlightValues: PropTypes.object,
  formatYTick: PropTypes.func,
  formatTitle: PropTypes.func,
  formatValue: PropTypes.func,
  formatXTick: PropTypes.func,
  getColor: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
});

_defineProperty(Chart, "defaultProps", {
  width: '100%',
  height: 300,
  style: {},
  data: {},
  dataFilter: key => true,
  unit: '',
  onClick: noop,
  onMouseEnter: noop,
  onMouseMove: noop,
  onMouseLeave: noop,
  onNearestX: noop,
  onSeriesMouseOver: noop,
  onSeriesMouseOut: noop,
  getX: d => d.x,
  getY0: d => null,
  getY: d => d.y,
  xTicks: 4,
  yTicks: 4,
  horizontalGridLines: 4,
  verticalGridLines: 4,
  formatTitle: value => String(value),
  formatValue: value => String(value),
  formatXTick: value => String(value),
  formatYTick: value => String(value),
  getColor: '#000'
});

export default withTheme(Chart);
//# sourceMappingURL=chart.js.map