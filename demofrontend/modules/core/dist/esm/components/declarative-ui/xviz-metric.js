import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MetricCard, MetricChart, Spinner } from '@streetscape.gl/monochrome';
import { DEFAULT_COLOR_SERIES } from './constants';
import connectToLog from '../connect';
import { getTimeSeries } from '../../utils/metrics-helper';
import { MissingDataCard } from './missing-data-card';

var defaultFormatValue = function defaultFormatValue(x) {
  return Number.isFinite(x) ? x.toFixed(3) : String(x);
};

var XVIZMetricComponent = function (_PureComponent) {
  _inherits(XVIZMetricComponent, _PureComponent);

  var _super = _createSuper(XVIZMetricComponent);

  function XVIZMetricComponent(props) {
    var _this;

    _classCallCheck(this, XVIZMetricComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_onClick", function (x) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          log = _this$props.log;

      if (onClick) {
        onClick(x);
      } else if (log) {
        log.seek(x);
      }
    });

    _this.state = {
      timeSeries: _this._getTimeSeries(props)
    };
    return _this;
  }

  _createClass(XVIZMetricComponent, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.streams !== nextProps.streams || this.props.streamsMetadata !== nextProps.streamsMetadata || this.props.logStreams !== nextProps.logStreams) {
        this.setState({
          timeSeries: this._getTimeSeries(nextProps)
        });
      }
    }
  }, {
    key: "_getTimeSeries",
    value: function _getTimeSeries(props) {
      return getTimeSeries({
        streamNames: props.streams,
        streamsMetadata: props.streamsMetadata,
        streams: props.logStreams
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          title = _this$props2.title,
          description = _this$props2.description,
          startTime = _this$props2.startTime,
          endTime = _this$props2.endTime,
          currentTime = _this$props2.currentTime,
          width = _this$props2.width,
          height = _this$props2.height,
          style = _this$props2.style,
          xTicks = _this$props2.xTicks,
          yTicks = _this$props2.yTicks,
          formatXTick = _this$props2.formatXTick,
          formatYTick = _this$props2.formatYTick,
          formatValue = _this$props2.formatValue,
          horizontalGridLines = _this$props2.horizontalGridLines,
          verticalGridLines = _this$props2.verticalGridLines,
          getColor = _this$props2.getColor;
      var isLoading = currentTime == null;
      var timeDomain = Number.isFinite(startTime) ? [startTime, endTime] : null;
      var missingStreams = this.state.timeSeries.missingStreams;
      return React.createElement(MetricCard, {
        title: title,
        description: description,
        isLoading: false,
        style: style
      }, React.createElement(React.Fragment, null, missingStreams.length > 0 && React.createElement(MissingDataCard, {
        style: style,
        missingData: missingStreams
      }), isLoading ? React.createElement(Spinner, null) : React.createElement(MetricChart, _extends({}, this.state.timeSeries, {
        getColor: getColor,
        highlightX: currentTime,
        width: width,
        height: height,
        style: style,
        xTicks: xTicks,
        yTicks: yTicks,
        formatXTick: formatXTick,
        formatYTick: formatYTick,
        formatValue: formatValue,
        xDomain: timeDomain,
        onClick: this._onClick,
        horizontalGridLines: horizontalGridLines,
        verticalGridLines: verticalGridLines
      }))));
    }
  }]);

  return XVIZMetricComponent;
}(PureComponent);

_defineProperty(XVIZMetricComponent, "propTypes", {
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getColor: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
  xTicks: PropTypes.number,
  yTicks: PropTypes.number,
  formatXTick: PropTypes.func,
  formatYTick: PropTypes.func,
  formatValue: PropTypes.func,
  horizontalGridLines: PropTypes.number,
  verticalGridLines: PropTypes.number,
  onClick: PropTypes.func,
  streams: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  currentTime: PropTypes.number,
  streamsMetadata: PropTypes.object,
  logStreams: PropTypes.objectOf(PropTypes.array),
  startTime: PropTypes.number,
  endTime: PropTypes.number
});

_defineProperty(XVIZMetricComponent, "defaultProps", {
  timeSeries: {},
  width: '100%',
  height: 160,
  style: {
    margin: {
      left: 45,
      right: 10,
      top: 10,
      bottom: 20
    }
  },
  xTicks: 0,
  yTicks: 3,
  formatValue: defaultFormatValue,
  horizontalGridLines: 3,
  verticalGridLines: 0,
  getColor: DEFAULT_COLOR_SERIES
});

var getLogState = function getLogState(log) {
  return {
    currentTime: log.getCurrentTime(),
    streamsMetadata: log.getStreamsMetadata(),
    logStreams: log.getStreams(),
    startTime: log.getBufferStartTime(),
    endTime: log.getBufferEndTime()
  };
};

export default connectToLog({
  getLogState: getLogState,
  Component: XVIZMetricComponent
});
//# sourceMappingURL=xviz-metric.js.map