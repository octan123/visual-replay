"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = connectToLog;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _xvizLoaderInterface = _interopRequireDefault(require("../loaders/xviz-loader-interface"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function connectToLog(_ref) {
  var getLogState = _ref.getLogState,
      Component = _ref.Component;

  var WrappedComponent = function (_PureComponent) {
    (0, _inherits2["default"])(WrappedComponent, _PureComponent);

    var _super = _createSuper(WrappedComponent);

    function WrappedComponent() {
      var _this;

      (0, _classCallCheck2["default"])(this, WrappedComponent);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
        logVersion: -1
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_update", function (logVersion) {
        _this.setState({
          logVersion: logVersion
        });
      });
      return _this;
    }

    (0, _createClass2["default"])(WrappedComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var log = this.props.log;

        if (log) {
          log.subscribe(this._update);
        }
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var log = this.props.log;
        var nextLog = nextProps.log;

        if (log !== nextLog) {
          if (log) {
            log.unsubscribe(this._update);
          }

          if (nextLog) {
            nextLog.subscribe(this._update);
          }
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var log = this.props.log;

        if (log) {
          log.unsubscribe(this._update);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            log = _this$props.log,
            otherProps = (0, _objectWithoutProperties2["default"])(_this$props, ["log"]);
        var logState = log && getLogState(log, otherProps);
        return _react["default"].createElement(Component, (0, _extends2["default"])({}, otherProps, logState, {
          log: log
        }));
      }
    }]);
    return WrappedComponent;
  }(_react.PureComponent);

  (0, _defineProperty2["default"])(WrappedComponent, "propTypes", {
    log: _propTypes["default"].instanceOf(_xvizLoaderInterface["default"])
  });
  return WrappedComponent;
}
//# sourceMappingURL=connect.js.map