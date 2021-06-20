import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MetricCard, MetricChart, Spinner } from '@streetscape.gl/monochrome';
import { DEFAULT_COLOR_SERIES } from './constants';
import connectToLog from '../connect';
import { getTimeSeries } from '../../utils/metrics-helper';
import { MissingDataCard } from './missing-data-card';

const defaultFormatValue = x => Number.isFinite(x) ? x.toFixed(3) : String(x);

class XVIZMetricComponent extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onClick", x => {
      const {
        onClick,
        log
      } = this.props;

      if (onClick) {
        onClick(x);
      } else if (log) {
        log.seek(x);
      }
    });

    this.state = {
      timeSeries: this._getTimeSeries(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.streams !== nextProps.streams || this.props.streamsMetadata !== nextProps.streamsMetadata || this.props.logStreams !== nextProps.logStreams) {
      this.setState({
        timeSeries: this._getTimeSeries(nextProps)
      });
    }
  }

  _getTimeSeries(props) {
    return getTimeSeries({
      streamNames: props.streams,
      streamsMetadata: props.streamsMetadata,
      streams: props.logStreams
    });
  }

  render() {
    const {
      title,
      description,
      startTime,
      endTime,
      currentTime,
      width,
      height,
      style,
      xTicks,
      yTicks,
      formatXTick,
      formatYTick,
      formatValue,
      horizontalGridLines,
      verticalGridLines,
      getColor
    } = this.props;
    const isLoading = currentTime == null;
    const timeDomain = Number.isFinite(startTime) ? [startTime, endTime] : null;
    const {
      missingStreams
    } = this.state.timeSeries;
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

}

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

const getLogState = log => ({
  currentTime: log.getCurrentTime(),
  streamsMetadata: log.getStreamsMetadata(),
  logStreams: log.getStreams(),
  startTime: log.getBufferStartTime(),
  endTime: log.getBufferEndTime()
});

export default connectToLog({
  getLogState,
  Component: XVIZMetricComponent
});
//# sourceMappingURL=xviz-metric.js.map