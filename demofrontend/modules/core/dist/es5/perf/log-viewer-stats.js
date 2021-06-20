"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogViewerStats = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _monochrome = require("@streetscape.gl/monochrome");

var _constants = require("./constants");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Help = function Help() {
  var help = [];

  for (var _i = 0, _Object$entries = Object.entries(_constants.STATS_HELP); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
        statName = _Object$entries$_i[0],
        statHelp = _Object$entries$_i[1];

    help.push(_react["default"].createElement("div", {
      key: statName,
      style: {
        marginBottom: 10
      }
    }, _react["default"].createElement("strong", null, _constants.STATS_NAMES[statName]), _react["default"].createElement("div", null, statHelp)));
  }

  return _react["default"].createElement("div", {
    style: _constants.STYLES.LOG_VIEWER.STATS_HELP
  }, help);
};

var _updateStats = function _updateStats(stats, statsSnapshot) {
  stats.counter += 1;

  for (var _i2 = 0, _Object$values = Object.values(_constants.STATS_KEYS); _i2 < _Object$values.length; _i2++) {
    var statName = _Object$values[_i2];

    if (stats[statName].length >= _constants.HISTORY_SIZE) {
      stats[statName] = stats[statName].slice(1);
    }

    var newStatValue = {
      x: stats.counter,
      y: statsSnapshot && statsSnapshot[statName] || 0
    };
    stats[statName].push(newStatValue);
  }

  return stats;
};

var LogViewerStats = function (_React$Component) {
  (0, _inherits2["default"])(LogViewerStats, _React$Component);

  var _super = _createSuper(LogViewerStats);

  function LogViewerStats() {
    var _this;

    (0, _classCallCheck2["default"])(this, LogViewerStats);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      stats: _constants.INITIAL_STATS
    });
    return _this;
  }

  (0, _createClass2["default"])(LogViewerStats, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {
      if (nextProps.statsSnapshot !== this.props.statsSnapshot) {
        var stats = _updateStats(this.state.stats, nextProps.statsSnapshot);

        this.setState({
          stats: stats
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state$stats = this.state.stats,
          counter = _this$state$stats.counter,
          data = (0, _objectWithoutProperties2["default"])(_this$state$stats, ["counter"]);
      var title = this.props.title || _constants.DEFAULT_STATS_TITLE;
      return _react["default"].createElement("div", {
        id: "stats",
        style: _constants.STYLES.LOG_VIEWER.STATS
      }, _react["default"].createElement(_monochrome.MetricCard, {
        title: title,
        description: _react["default"].createElement(Help, null),
        style: _constants.STYLES.LOG_VIEWER.METRIC_CARD
      }, _react["default"].createElement(_monochrome.MetricChart, {
        width: 350,
        height: 200,
        data: data,
        highlightX: counter,
        getColor: function getColor(statKey) {
          return _constants.STATS_COLORS[statKey];
        },
        formatTitle: function formatTitle(statKey) {
          return _constants.STATS_NAMES[statKey];
        }
      })));
    }
  }]);
  return LogViewerStats;
}(_react["default"].Component);

exports.LogViewerStats = LogViewerStats;
//# sourceMappingURL=log-viewer-stats.js.map