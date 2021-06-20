"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _autosizer = _interopRequireDefault(require("../shared/autosizer"));

var _xyPlot = _interopRequireDefault(require("react-vis/dist/plot/xy-plot"));

var _areaSeries = _interopRequireDefault(require("react-vis/dist/plot/series/area-series"));

var _lineSeries = _interopRequireDefault(require("react-vis/dist/plot/series/line-series"));

var _markSeries = _interopRequireDefault(require("react-vis/dist/plot/series/mark-series"));

var _horizontalGridLines = _interopRequireDefault(require("react-vis/dist/plot/horizontal-grid-lines"));

var _verticalGridLines = _interopRequireDefault(require("react-vis/dist/plot/vertical-grid-lines"));

var _xAxis = _interopRequireDefault(require("react-vis/dist/plot/axis/x-axis"));

var _yAxis = _interopRequireDefault(require("react-vis/dist/plot/axis/y-axis"));

var _crosshair = _interopRequireDefault(require("react-vis/dist/plot/crosshair"));

var _d3Scale = require("d3-scale");

var _theme = require("../shared/theme");

var _styledComponents = require("./styled-components");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var noop = function noop() {};

var DEFAULT_MARGIN = {
  left: 32,
  right: 20,
  top: 20,
  bottom: 32
};

var Chart = function (_PureComponent) {
  (0, _inherits2["default"])(Chart, _PureComponent);

  var _super = _createSuper(Chart);

  function Chart() {
    (0, _classCallCheck2["default"])(this, Chart);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Chart, [{
    key: "_getScaleSettings",
    value: function _getScaleSettings() {
      var _this$props = this.props,
          data = _this$props.data,
          dataFilter = _this$props.dataFilter,
          xDomain = _this$props.xDomain,
          yDomain = _this$props.yDomain,
          getX = _this$props.getX,
          getY0 = _this$props.getY0,
          getY = _this$props.getY;

      if (xDomain && yDomain) {
        return {
          xDomain: xDomain,
          yDomain: yDomain
        };
      }

      var x = xDomain || [Infinity, -Infinity];
      var y = yDomain || [0, 0];

      for (var key in data) {
        if (dataFilter(key)) {
          var values = data[key];

          if (Array.isArray(values) && values.length > 0) {
            x = xDomain || values.reduce(function (acc, d) {
              var x0 = getX(d);
              acc[0] = Math.min(acc[0], x0);
              acc[1] = Math.max(acc[1], x0);
              return acc;
            }, x);
            y = yDomain || values.reduce(function (acc, d) {
              var y1 = getY(d);
              var y0 = getY0(d);
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
        y = (0, _d3Scale.scaleLinear)().domain(y).nice().domain();
      }

      return {
        xDomain: x,
        yDomain: y
      };
    }
  }, {
    key: "_getColor",
    value: function _getColor(key) {
      var getColor = this.props.getColor;

      switch ((0, _typeof2["default"])(getColor)) {
        case 'object':
          return getColor[key];

        case 'function':
          return getColor(key);

        default:
          return getColor;
      }
    }
  }, {
    key: "_renderSeries",
    value: function _renderSeries() {
      var _this = this;

      var _this$props2 = this.props,
          data = _this$props2.data,
          dataFilter = _this$props2.dataFilter,
          highlightSeries = _this$props2.highlightSeries,
          getX = _this$props2.getX,
          getY0 = _this$props2.getY0,
          getY = _this$props2.getY,
          xDomain = _this$props2.xDomain;
      var areas = [];
      var lines = [];
      Object.keys(data).forEach(function (key) {
        if (!dataFilter(key)) {
          return;
        }

        var datums = xDomain ? data[key].filter(function (point) {
          var x = getX(point);
          return x >= xDomain[0] && x <= xDomain[1];
        }) : data[key];

        if (!datums.length) {
          return;
        }

        var isArea = Number.isFinite(getY0(datums[0]));
        var Type = isArea ? _areaSeries["default"] : _lineSeries["default"];

        var color = _this._getColor(key);

        var series = _react["default"].createElement(Type, {
          key: "value-".concat(key, "-line"),
          data: datums,
          getX: getX,
          getY: getY,
          getY0: getY0,
          color: color,
          fill: color,
          strokeWidth: highlightSeries === key ? 4 : 2,
          onNearestX: _this.props.onNearestX.bind(_this, key),
          onSeriesMouseOver: function onSeriesMouseOver() {
            return _this.props.onSeriesMouseOver(key);
          },
          onSeriesMouseOut: function onSeriesMouseOut() {
            return _this.props.onSeriesMouseOut(key);
          }
        });

        if (isArea) {
          areas.push(series);
        } else {
          lines.push(series);
        }
      });
      return areas.concat(lines);
    }
  }, {
    key: "_renderCrosshair",
    value: function _renderCrosshair() {
      var _this2 = this;

      var highlightValues = this.props.highlightValues;

      if (!highlightValues) {
        return null;
      }

      var _this$props3 = this.props,
          theme = _this$props3.theme,
          style = _this$props3.style,
          unit = _this$props3.unit,
          dataFilter = _this$props3.dataFilter,
          formatTitle = _this$props3.formatTitle,
          formatValue = _this$props3.formatValue,
          getX = _this$props3.getX,
          getY = _this$props3.getY,
          getY0 = _this$props3.getY0,
          xDomain = _this$props3.xDomain;
      var keys = Object.keys(highlightValues).filter(function (key) {
        var value = highlightValues[key];
        var x = getX(value);
        return dataFilter(key) && (!xDomain || x >= xDomain[0] && x <= xDomain[1]);
      });
      var crosshairItems = keys.map(function (key, i) {
        var value = highlightValues[key];

        var color = _this2._getColor(key);

        var x = getX(value);
        var y = getY(value);
        var y0 = getY0(value);
        var styleProps = {
          theme: theme,
          name: key,
          displayName: formatTitle(key),
          color: color,
          isFirst: i === 0,
          isLast: i === keys.length - 1
        };
        return {
          x: x,
          y: y,
          title: _react["default"].createElement(_styledComponents.CrosshairItemTitle, (0, _extends2["default"])({}, styleProps, {
            userStyle: style.crosshairTitle
          }), _react["default"].createElement(_styledComponents.CrosshairItemLegend, (0, _extends2["default"])({}, styleProps, {
            userStyle: style.crosshairLegend
          })), styleProps.displayName),
          value: _react["default"].createElement(_styledComponents.CrosshairItemValue, (0, _extends2["default"])({}, styleProps, {
            userStyle: style.crosshairValue
          }), Number.isFinite(y0) && "".concat(formatValue(y0), ", "), formatValue(y), unit && _react["default"].createElement("span", null, unit)),
          color: color
        };
      });
      return [_react["default"].createElement(_crosshair["default"], {
        key: "crosshair",
        values: crosshairItems,
        titleFormat: function titleFormat() {
          return null;
        },
        itemsFormat: function itemsFormat(values) {
          return values;
        }
      }), _react["default"].createElement(_markSeries["default"], {
        key: "hovered-values",
        data: crosshairItems,
        stroke: "#fff",
        strokeWidth: 2,
        getFill: function getFill(d) {
          return d.color;
        },
        fillType: "literal"
      })];
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props4 = this.props,
          theme = _this$props4.theme,
          width = _this$props4.width,
          height = _this$props4.height,
          style = _this$props4.style,
          formatYTick = _this$props4.formatYTick,
          formatXTick = _this$props4.formatXTick,
          xTicks = _this$props4.xTicks,
          yTicks = _this$props4.yTicks,
          horizontalGridLines = _this$props4.horizontalGridLines,
          verticalGridLines = _this$props4.verticalGridLines,
          onMouseEnter = _this$props4.onMouseEnter,
          onMouseMove = _this$props4.onMouseMove,
          onMouseLeave = _this$props4.onMouseLeave,
          onClick = _this$props4.onClick;
      return _react["default"].createElement(_styledComponents.ChartContainer, {
        theme: theme,
        userStyle: style.chart,
        tooltipStyle: style.crosshair,
        style: {
          width: width,
          height: height
        }
      }, _react["default"].createElement(_autosizer["default"], null, function (_ref) {
        var chartWidth = _ref.width,
            chartHeight = _ref.height;
        return _react["default"].createElement(_xyPlot["default"], (0, _extends2["default"])({
          width: chartWidth,
          height: chartHeight,
          margin: style.margin || DEFAULT_MARGIN
        }, _this3._getScaleSettings(), {
          onClick: onClick,
          onMouseEnter: onMouseEnter,
          onMouseMove: onMouseMove,
          onMouseLeave: onMouseLeave
        }), xTicks > 0 && _react["default"].createElement(_xAxis["default"], {
          title: "",
          tickFormat: formatXTick,
          tickTotal: xTicks
        }), yTicks > 0 && _react["default"].createElement(_yAxis["default"], {
          title: "",
          tickFormat: formatYTick,
          tickTotal: yTicks
        }), horizontalGridLines > 0 && _react["default"].createElement(_horizontalGridLines["default"], {
          tickTotal: horizontalGridLines
        }), verticalGridLines > 0 && _react["default"].createElement(_verticalGridLines["default"], {
          tickTotal: verticalGridLines
        }), _this3._renderSeries(), _this3._renderCrosshair());
      }));
    }
  }]);
  return Chart;
}(_react.PureComponent);

(0, _defineProperty2["default"])(Chart, "propTypes", {
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  style: _propTypes["default"].object,
  unit: _propTypes["default"].string,
  data: _propTypes["default"].object,
  dataFilter: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  onMouseEnter: _propTypes["default"].func,
  onMouseMove: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  onNearestX: _propTypes["default"].func,
  onSeriesMouseOver: _propTypes["default"].func,
  onSeriesMouseOut: _propTypes["default"].func,
  getX: _propTypes["default"].func,
  getY0: _propTypes["default"].func,
  getY: _propTypes["default"].func,
  xDomain: _propTypes["default"].array,
  yDomain: _propTypes["default"].array,
  xTicks: _propTypes["default"].number,
  yTicks: _propTypes["default"].number,
  horizontalGridLines: _propTypes["default"].number,
  verticalGridLines: _propTypes["default"].number,
  highlightSeries: _propTypes["default"].string,
  highlightValues: _propTypes["default"].object,
  formatYTick: _propTypes["default"].func,
  formatTitle: _propTypes["default"].func,
  formatValue: _propTypes["default"].func,
  formatXTick: _propTypes["default"].func,
  getColor: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].string, _propTypes["default"].func])
});
(0, _defineProperty2["default"])(Chart, "defaultProps", {
  width: '100%',
  height: 300,
  style: {},
  data: {},
  dataFilter: function dataFilter(key) {
    return true;
  },
  unit: '',
  onClick: noop,
  onMouseEnter: noop,
  onMouseMove: noop,
  onMouseLeave: noop,
  onNearestX: noop,
  onSeriesMouseOver: noop,
  onSeriesMouseOut: noop,
  getX: function getX(d) {
    return d.x;
  },
  getY0: function getY0(d) {
    return null;
  },
  getY: function getY(d) {
    return d.y;
  },
  xTicks: 4,
  yTicks: 4,
  horizontalGridLines: 4,
  verticalGridLines: 4,
  formatTitle: function formatTitle(value) {
    return String(value);
  },
  formatValue: function formatValue(value) {
    return String(value);
  },
  formatXTick: function formatXTick(value) {
    return String(value);
  },
  formatYTick: function formatYTick(value) {
    return String(value);
  },
  getColor: '#000'
});

var _default = (0, _theme.withTheme)(Chart);

exports["default"] = _default;
//# sourceMappingURL=chart.js.map