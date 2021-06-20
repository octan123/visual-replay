import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MetricCard, MetricChart, Spinner } from '@streetscape.gl/monochrome';
import { DEFAULT_COLOR_SERIES } from './constants';
import connectToLog from '../connect';
import { MissingDataCard } from './missing-data-card';

const GET_X = d => d[0];

const GET_Y = d => d[1];

const DATA_LOADING = {
  isLoading: true
};

class XVIZPlotComponent extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      independentVariable: null,
      dependentVariables: {},
      missingStreams: this.props.dependentVariables
    });

    _defineProperty(this, "_onClick", x => {
      const {
        onClick,
        log
      } = this.props;

      if (onClick) {
        onClick(x);
      } else if (log) {}
    });

    _defineProperty(this, "_formatTitle", streamName => {
      return streamName;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.variables) {
      this.setState({
        independentVariable: null
      });
      return;
    }

    const independentVariable = nextProps.variables[nextProps.independentVariable];
    let independentVariableChanged = false;
    let dependentVariablesChanged = false;
    const updatedDependentVariable = {};

    if (independentVariable !== this.state.independentVariable) {
      independentVariableChanged = true;
    }

    for (const streamName of nextProps.dependentVariables) {
      const variable = nextProps.variables[streamName];

      if (independentVariableChanged || !this.props.variables || this.props.variables[streamName] !== variable) {
        updatedDependentVariable[streamName] = this._formatDependentVariable(independentVariable, variable);
        dependentVariablesChanged = true;
      }
    }

    if (independentVariableChanged || dependentVariablesChanged) {
      this.setState({
        independentVariable,
        dependentVariables: _objectSpread(_objectSpread({}, this.state.dependentVariables), updatedDependentVariable),
        missingStreams: Object.keys(updatedDependentVariable).filter(dv => !updatedDependentVariable[dv])
      });
    }
  }

  _formatDependentVariable(independentVariable, variable) {
    if (!variable || !independentVariable || independentVariable.length === 0) {
      return null;
    }

    const x = independentVariable[0].values;
    return variable.map(({
      id,
      values
    }) => {
      const valueTuple = new Array(values.length);
      values.forEach((v, k) => valueTuple[k] = [x[k], v]);
      return {
        id,
        values: valueTuple
      };
    });
  }

  _extractDataProps() {
    const {
      independentVariable,
      dependentVariables
    } = this.state;

    if (!independentVariable) {
      return DATA_LOADING;
    }

    const x = independentVariable[0].values;
    const data = {};

    for (const streamName in dependentVariables) {
      const variable = dependentVariables[streamName];

      if (variable) {
        variable.forEach(({
          id,
          values
        }, i) => {
          data["".concat(streamName, "-").concat(id || i)] = values;
        });
      }
    }

    return {
      getX: GET_X,
      getY: GET_Y,
      xDomain: [x[0], x[x.length - 1]],
      data
    };
  }

  render() {
    const {
      title,
      description,
      width,
      height,
      style,
      xTicks,
      yTicks,
      formatXTick,
      formatYTick,
      horizontalGridLines,
      verticalGridLines,
      getColor
    } = this.props;

    const dataProps = this._extractDataProps();

    const {
      missingStreams
    } = this.state;
    return React.createElement(MetricCard, {
      title: title,
      description: description,
      style: style,
      isLoading: false
    }, React.createElement(React.Fragment, null, missingStreams.length > 0 && React.createElement(MissingDataCard, {
      style: style,
      missingData: missingStreams
    }), dataProps.isLoading ? React.createElement(Spinner, null) : React.createElement(MetricChart, _extends({}, dataProps, {
      getColor: getColor,
      highlightX: 0,
      width: width,
      height: height,
      style: style,
      xTicks: xTicks,
      yTicks: yTicks,
      formatXTick: formatXTick,
      formatYTick: formatYTick,
      onClick: this._onClick,
      formatTitle: this._formatTitle,
      horizontalGridLines: horizontalGridLines,
      verticalGridLines: verticalGridLines
    }))));
  }

}

_defineProperty(XVIZPlotComponent, "propTypes", {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  getColor: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  xTicks: PropTypes.number,
  yTicks: PropTypes.number,
  formatXTick: PropTypes.func,
  formatYTick: PropTypes.func,
  horizontalGridLines: PropTypes.number,
  verticalGridLines: PropTypes.number,
  onClick: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  independentVariable: PropTypes.string,
  dependentVariables: PropTypes.arrayOf(PropTypes.string),
  streamsMetadata: PropTypes.object,
  variables: PropTypes.object
});

_defineProperty(XVIZPlotComponent, "defaultProps", {
  streamsMetadata: {},
  variables: {},
  width: '100%',
  height: 300,
  style: {
    margin: {
      left: 45,
      right: 10,
      top: 10,
      bottom: 32
    }
  },
  xTicks: 0,
  yTicks: 5,
  horizontalGridLines: 5,
  verticalGridLines: 0,
  getColor: DEFAULT_COLOR_SERIES
});

const getLogState = log => {
  const frame = log.getCurrentFrame();
  return {
    streamsMetadata: log.getStreamsMetadata(),
    variables: frame && frame.variables
  };
};

export default connectToLog({
  getLogState,
  Component: XVIZPlotComponent
});
//# sourceMappingURL=xviz-plot.js.map