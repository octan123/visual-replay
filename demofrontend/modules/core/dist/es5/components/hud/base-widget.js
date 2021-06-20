"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _monochrome = require("@streetscape.gl/monochrome");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _connect = _interopRequireDefault(require("../connect"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var WrapperComponent = _styled["default"].div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    padding: props.theme.spacingSmall,
    display: 'inline-block'
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var BaseWidget = function (_PureComponent) {
  (0, _inherits2["default"])(BaseWidget, _PureComponent);

  var _super = _createSuper(BaseWidget);

  function BaseWidget(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, BaseWidget);
    _this = _super.call(this, props);
    _this.state = {
      streams: _this._extractStreams(props)
    };
    return _this;
  }

  (0, _createClass2["default"])(BaseWidget, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.streamNames !== this.props.streamNames || nextProps.streamsMetadata !== this.props.streamsMetadata || nextProps.frame !== this.props.frame) {
        this.setState({
          streams: this._extractStreams(nextProps)
        });
      }
    }
  }, {
    key: "_extractStreams",
    value: function _extractStreams(_ref) {
      var streamNames = _ref.streamNames,
          streamsMetadata = _ref.streamsMetadata,
          frame = _ref.frame;
      var result = {};

      for (var key in streamNames) {
        var streamName = streamNames[key];

        if (streamName) {
          result[key] = _objectSpread(_objectSpread({}, streamsMetadata[streamName]), {}, {
            data: frame && frame.streams[streamName]
          });
        }
      }

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          children = _this$props.children;
      var streams = this.state.streams;
      return _react["default"].createElement(WrapperComponent, {
        theme: theme,
        userStyle: style.wrapper
      }, children({
        theme: theme,
        streams: streams
      }));
    }
  }]);
  return BaseWidget;
}(_react.PureComponent);

(0, _defineProperty2["default"])(BaseWidget, "propTypes", {
  style: _propTypes["default"].object,
  streamNames: _propTypes["default"].object.isRequired,
  children: _propTypes["default"].func.isRequired,
  streamsMetadata: _propTypes["default"].object,
  frame: _propTypes["default"].object
});
(0, _defineProperty2["default"])(BaseWidget, "defaultProps", {
  style: {}
});

var getLogState = function getLogState(log) {
  return {
    streamsMetadata: log.getStreamsMetadata(),
    frame: log.getCurrentFrame()
  };
};

var _default = (0, _connect["default"])({
  getLogState: getLogState,
  Component: (0, _monochrome.withTheme)(BaseWidget)
});

exports["default"] = _default;
//# sourceMappingURL=base-widget.js.map