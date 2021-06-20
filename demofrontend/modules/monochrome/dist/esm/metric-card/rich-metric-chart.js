import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
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
import { withTheme } from '../shared/theme';
import { ExpandedIcon, CollapsedIcon, CheckAltIcon } from '../shared/icons';
import MetricChart from './metric-chart';
import { FilterContainer, FilterToggle, FilterItem, FilterLegend } from './styled-components';
import memoize from '../utils/memoize';
import { scaleOrdinal } from 'd3-scale';
import { extent } from 'd3-array';
var DEFAULT_COLORS = scaleOrdinal().range(['#12939A', '#DDB27C', '#88572C', '#FF991F', '#F15C17', '#223F9A', '#DA70BF', '#125C77', '#4DC19C', '#776E57', '#17B8BE', '#F6D18A', '#B7885E', '#FFCB99', '#F89570', '#829AE3', '#E79FD5', '#1E96BE', '#89DAC1', '#B3AD9E']);

var MetricChartWithLegends = function (_PureComponent) {
  _inherits(MetricChartWithLegends, _PureComponent);

  var _super = _createSuper(MetricChartWithLegends);

  function MetricChartWithLegends(props) {
    var _this;

    _classCallCheck(this, MetricChartWithLegends);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_extractDataSeries", function (data) {
      var _this$props = _this.props,
          formatTitle = _this$props.formatTitle,
          getY = _this$props.getY;
      var series = [];

      for (var key in data) {
        var value = data[key];

        if (Array.isArray(value)) {
          var displayName = formatTitle(key);
          var yExtent = extent(value, getY);
          series.push({
            key: key,
            displayName: displayName,
            color: _this._getColor(key),
            data: value,
            extent: yExtent,
            max: Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]))
          });
        }
      }

      series.sort(function (s1, s2) {
        return s2.max - s1.max;
      });
      return series;
    });

    _defineProperty(_assertThisInitialized(_this), "_isDataVisible", function (key) {
      var _this$state = _this.state,
          showTopSeriesOnly = _this$state.showTopSeriesOnly,
          dataVisibility = _this$state.dataVisibility;

      var dataSeries = _this.extractDataSeries(_this.props.data);

      if (dataVisibility[key] === false) {
        return false;
      }

      if (showTopSeriesOnly) {
        var topSeriesCount = _this.props.topSeriesCount;
        return dataSeries.findIndex(function (s) {
          return s.key === key;
        }) < topSeriesCount;
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "_setHoveredDataName", function (key) {
      _this.setState({
        hoveredSeriesName: key
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_toggleDataVisibility", function (key) {
      var dataVisibility = _this.state.dataVisibility;

      _this.setState({
        dataVisibility: _objectSpread(_objectSpread({}, dataVisibility), {}, _defineProperty({}, key, dataVisibility[key] === false))
      });
    });

    _this.state = {
      dataVisibility: {},
      showTopSeriesOnly: true,
      hoveredSeriesName: null
    };
    _this.extractDataSeries = memoize(_this._extractDataSeries);
    return _this;
  }

  _createClass(MetricChartWithLegends, [{
    key: "_getColor",
    value: function _getColor(key) {
      var getColor = this.props.getColor;

      switch (_typeof(getColor)) {
        case 'object':
          return getColor[key];

        case 'function':
          return getColor(key);

        default:
          return getColor;
      }
    }
  }, {
    key: "_renderDataFilters",
    value: function _renderDataFilters() {
      var _this2 = this;

      var _this$state2 = this.state,
          showTopSeriesOnly = _this$state2.showTopSeriesOnly,
          hoveredSeriesName = _this$state2.hoveredSeriesName;
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          style = _this$props2.style,
          topSeriesCount = _this$props2.topSeriesCount;
      var dataSeries = this.extractDataSeries(this.props.data);
      var series = showTopSeriesOnly ? dataSeries.slice(0, topSeriesCount) : dataSeries;
      return React.createElement(FilterContainer, {
        theme: theme,
        userStyle: style.filter,
        isExpanded: !showTopSeriesOnly
      }, dataSeries.length > topSeriesCount && React.createElement(FilterToggle, {
        theme: theme,
        userStyle: style.filterToggle,
        isExpanded: !showTopSeriesOnly,
        onClick: function onClick() {
          return _this2.setState({
            showTopSeriesOnly: !showTopSeriesOnly
          });
        }
      }, showTopSeriesOnly ? style.iconCollapsed || React.createElement(CollapsedIcon, null) : style.iconExpanded || React.createElement(ExpandedIcon, null)), series.map(function (s) {
        var styleProps = {
          theme: theme,
          name: s.key,
          displayName: s.displayName,
          color: s.color,
          isHovered: hoveredSeriesName === s.key,
          isActive: _this2._isDataVisible(s.key)
        };
        return React.createElement(FilterItem, _extends({
          userStyle: style.filterItem
        }, styleProps, {
          key: "multiplot-".concat(s.key),
          onMouseOver: function onMouseOver() {
            return _this2._setHoveredDataName(s.key);
          },
          onMouseOut: function onMouseOut() {
            return _this2._setHoveredDataName(null);
          },
          onClick: function onClick() {
            return _this2._toggleDataVisibility(s.key);
          }
        }), React.createElement(FilterLegend, _extends({}, styleProps, {
          userStyle: style.filterLegend
        }), styleProps.isActive ? style.iconOn || React.createElement(CheckAltIcon, null) : style.iconOff), React.createElement("span", null, s.displayName));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement("div", null, React.createElement(MetricChart, _extends({}, this.props, {
        highlightSeries: this.state.hoveredSeriesName,
        onSeriesMouseOver: function onSeriesMouseOver(key) {
          return _this3._setHoveredDataName(key);
        },
        onMouseLeave: function onMouseLeave() {
          return _this3._setHoveredDataName(null);
        },
        dataFilter: this._isDataVisible
      })), this._renderDataFilters());
    }
  }]);

  return MetricChartWithLegends;
}(PureComponent);

_defineProperty(MetricChartWithLegends, "propTypes", Object.assign({}, MetricChart.propTypes, {
  topSeriesCount: PropTypes.number
}));

_defineProperty(MetricChartWithLegends, "defaultProps", Object.assign({}, MetricChart.defaultProps, {
  topSeriesCount: 5,
  getColor: DEFAULT_COLORS
}));

export default withTheme(MetricChartWithLegends);
//# sourceMappingURL=rich-metric-chart.js.map