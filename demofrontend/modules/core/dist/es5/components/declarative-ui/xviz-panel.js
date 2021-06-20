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

var _xvizContainer = _interopRequireDefault(require("./xviz-container"));

var _xvizMetric = _interopRequireDefault(require("./xviz-metric"));

var _xvizPlot = _interopRequireDefault(require("./xviz-plot"));

var _xvizTable = _interopRequireDefault(require("./xviz-table"));

var _xvizVideo = _interopRequireDefault(require("./xviz-video"));

var _connect = _interopRequireDefault(require("../connect"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DEFAULT_COMPONENTS = {
  container: _xvizContainer["default"],
  metric: _xvizMetric["default"],
  plot: _xvizPlot["default"],
  video: _xvizVideo["default"],
  table: _xvizTable["default"],
  treetable: _xvizTable["default"]
};

var XVIZPanelComponent = function (_PureComponent) {
  (0, _inherits2["default"])(XVIZPanelComponent, _PureComponent);

  var _super = _createSuper(XVIZPanelComponent);

  function XVIZPanelComponent() {
    var _this;

    (0, _classCallCheck2["default"])(this, XVIZPanelComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderItem", function (item, i) {
      var _this$props = _this.props,
          components = _this$props.components,
          componentProps = _this$props.componentProps,
          log = _this$props.log,
          style = _this$props.style;
      var type = item.type.toLowerCase();
      var XVIZComponent = components[type] || DEFAULT_COMPONENTS[type];
      var customProps = componentProps[type];

      if (!XVIZComponent) {
        return null;
      }

      return _react["default"].createElement(XVIZComponent, (0, _extends2["default"])({
        key: i
      }, customProps, item, {
        log: log,
        style: style[item.type]
      }), item.children && item.children.map(_this._renderItem));
    });
    return _this;
  }

  (0, _createClass2["default"])(XVIZPanelComponent, [{
    key: "render",
    value: function render() {
      var uiConfig = this.props.uiConfig;
      return uiConfig ? _react["default"].createElement("div", null, uiConfig.children && uiConfig.children.map(this._renderItem)) : null;
    }
  }]);
  return XVIZPanelComponent;
}(_react.PureComponent);

(0, _defineProperty2["default"])(XVIZPanelComponent, "propTypes", {
  name: _propTypes["default"].string.isRequired,
  components: _propTypes["default"].object,
  componentProps: _propTypes["default"].object,
  style: _propTypes["default"].object,
  uiConfig: _propTypes["default"].object
});
(0, _defineProperty2["default"])(XVIZPanelComponent, "defaultProps", {
  style: {},
  components: {},
  componentProps: {}
});

var getLogState = function getLogState(log, ownProps) {
  var metadata = log.getMetadata();
  var panel = metadata && metadata.ui_config && metadata.ui_config[ownProps.name];
  return {
    uiConfig: panel && panel.config || panel
  };
};

var _default = (0, _connect["default"])({
  getLogState: getLogState,
  Component: XVIZPanelComponent
});

exports["default"] = _default;
//# sourceMappingURL=xviz-panel.js.map