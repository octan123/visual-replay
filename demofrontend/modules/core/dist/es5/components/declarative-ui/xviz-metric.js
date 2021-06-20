"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _monochrome = require("@streetscape.gl/monochrome");

var _constants = require("./constants");

var _connect = _interopRequireDefault(require("../connect"));

var _metricsHelper = require("../../utils/metrics-helper");

var _missingDataCard = require("./missing-data-card");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var defaultFormatValue = function defaultFormatValue(x) {
  return Number.isFinite(x) ? x.toFixed(3) : String(x);
};

var XVIZMetricComponent = function (_PureComponent) {
  (0, _inherits2["default"])(XVIZMetricComponent, _PureComponent);

  var _super = _createSuper(XVIZMetricComponent);

  function XVIZMetricComponent(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, XVIZMetricComponent);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function (x) {
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

  (0, _createClass2["default"])(XVIZMetricComponent, [{
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
      return (0, _metricsHelper.getTimeSeries)({
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
      return _react["default"].createElement(_monochrome.MetricCard, {
        title: title,
        description: description,
        isLoading: false,
        style: style
      }, _react["default"].createElement(_react["default"].Fragment, null, missingStreams.length > 0 && _react["default"].createElement(_missingDataCard.MissingDataCard, {
        style: style,
        missingData: missingStreams
      }), isLoading ? _react["default"].createElement(_monochrome.Spinner, null) : _react["default"].createElement(_monochrome.MetricChart, (0, _extends2["default"])({}, this.state.timeSeries, {
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
}(_react.PureComponent);

(0, _defineProperty2["default"])(XVIZMetricComponent, "propTypes", {
  style: _propTypes["default"].object,
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  getColor: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].string, _propTypes["default"].object]),
  xTicks: _propTypes["default"].number,
  yTicks: _propTypes["default"].number,
  formatXTick: _propTypes["default"].func,
  formatYTick: _propTypes["default"].func,
  formatValue: _propTypes["default"].func,
  horizontalGridLines: _propTypes["default"].number,
  verticalGridLines: _propTypes["default"].number,
  onClick: _propTypes["default"].func,
  streams: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired,
  title: _propTypes["default"].string,
  description: _propTypes["default"].string,
  currentTime: _propTypes["default"].number,
  streamsMetadata: _propTypes["default"].object,
  logStreams: _propTypes["default"].objectOf(_propTypes["default"].array),
  startTime: _propTypes["default"].number,
  endTime: _propTypes["default"].number
});
(0, _defineProperty2["default"])(XVIZMetricComponent, "defaultProps", {
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
  getColor: _constants.DEFAULT_COLOR_SERIES
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

var _default = (0, _connect["default"])({
  getLogState: getLogState,
  Component: XVIZMetricComponent
});

exports["default"] = _default;
//# sourceMappingURL=xviz-metric.js.map