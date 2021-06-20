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

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MetricCard, MetricChart, Spinner } from '@streetscape.gl/monochrome';
import { DEFAULT_COLOR_SERIES } from './constants';
import connectToLog from '../connect';
import { MissingDataCard } from './missing-data-card';

var GET_X = function GET_X(d) {
  return d[0];
};

var GET_Y = function GET_Y(d) {
  return d[1];
};

var DATA_LOADING = {
  isLoading: true
};

var XVIZPlotComponent = function (_PureComponent) {
  _inherits(XVIZPlotComponent, _PureComponent);

  var _super = _createSuper(XVIZPlotComponent);

  function XVIZPlotComponent() {
    var _this;

    _classCallCheck(this, XVIZPlotComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      independentVariable: null,
      dependentVariables: {},
      missingStreams: _this.props.dependentVariables
    });

    _defineProperty(_assertThisInitialized(_this), "_onClick", function (x) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          log = _this$props.log;

      if (onClick) {
        onClick(x);
      } else if (log) {}
    });

    _defineProperty(_assertThisInitialized(_this), "_formatTitle", function (streamName) {
      return streamName;
    });

    return _this;
  }

  _createClass(XVIZPlotComponent, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.variables) {
        this.setState({
          independentVariable: null
        });
        return;
      }

      var independentVariable = nextProps.variables[nextProps.independentVariable];
      var independentVariableChanged = false;
      var dependentVariablesChanged = false;
      var updatedDependentVariable = {};

      if (independentVariable !== this.state.independentVariable) {
        independentVariableChanged = true;
      }

      var _iterator = _createForOfIteratorHelper(nextProps.dependentVariables),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var streamName = _step.value;
          var variable = nextProps.variables[streamName];

          if (independentVariableChanged || !this.props.variables || this.props.variables[streamName] !== variable) {
            updatedDependentVariable[streamName] = this._formatDependentVariable(independentVariable, variable);
            dependentVariablesChanged = true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (independentVariableChanged || dependentVariablesChanged) {
        this.setState({
          independentVariable: independentVariable,
          dependentVariables: _objectSpread(_objectSpread({}, this.state.dependentVariables), updatedDependentVariable),
          missingStreams: Object.keys(updatedDependentVariable).filter(function (dv) {
            return !updatedDependentVariable[dv];
          })
        });
      }
    }
  }, {
    key: "_formatDependentVariable",
    value: function _formatDependentVariable(independentVariable, variable) {
      if (!variable || !independentVariable || independentVariable.length === 0) {
        return null;
      }

      var x = independentVariable[0].values;
      return variable.map(function (_ref) {
        var id = _ref.id,
            values = _ref.values;
        var valueTuple = new Array(values.length);
        values.forEach(function (v, k) {
          return valueTuple[k] = [x[k], v];
        });
        return {
          id: id,
          values: valueTuple
        };
      });
    }
  }, {
    key: "_extractDataProps",
    value: function _extractDataProps() {
      var _this$state = this.state,
          independentVariable = _this$state.independentVariable,
          dependentVariables = _this$state.dependentVariables;

      if (!independentVariable) {
        return DATA_LOADING;
      }

      var x = independentVariable[0].values;
      var data = {};

      var _loop = function _loop(streamName) {
        var variable = dependentVariables[streamName];

        if (variable) {
          variable.forEach(function (_ref2, i) {
            var id = _ref2.id,
                values = _ref2.values;
            data["".concat(streamName, "-").concat(id || i)] = values;
          });
        }
      };

      for (var streamName in dependentVariables) {
        _loop(streamName);
      }

      return {
        getX: GET_X,
        getY: GET_Y,
        xDomain: [x[0], x[x.length - 1]],
        data: data
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          title = _this$props2.title,
          description = _this$props2.description,
          width = _this$props2.width,
          height = _this$props2.height,
          style = _this$props2.style,
          xTicks = _this$props2.xTicks,
          yTicks = _this$props2.yTicks,
          formatXTick = _this$props2.formatXTick,
          formatYTick = _this$props2.formatYTick,
          horizontalGridLines = _this$props2.horizontalGridLines,
          verticalGridLines = _this$props2.verticalGridLines,
          getColor = _this$props2.getColor;

      var dataProps = this._extractDataProps();

      var missingStreams = this.state.missingStreams;
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
  }]);

  return XVIZPlotComponent;
}(PureComponent);

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

var getLogState = function getLogState(log) {
  var frame = log.getCurrentFrame();
  return {
    streamsMetadata: log.getStreamsMetadata(),
    variables: frame && frame.variables
  };
};

export default connectToLog({
  getLogState: getLogState,
  Component: XVIZPlotComponent
});
//# sourceMappingURL=xviz-plot.js.map