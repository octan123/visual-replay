import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
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
import XVIZLoaderInterface from '../loaders/xviz-loader-interface';
export default function connectToLog(_ref) {
  var getLogState = _ref.getLogState,
      Component = _ref.Component;

  var WrappedComponent = function (_PureComponent) {
    _inherits(WrappedComponent, _PureComponent);

    var _super = _createSuper(WrappedComponent);

    function WrappedComponent() {
      var _this;

      _classCallCheck(this, WrappedComponent);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "state", {
        logVersion: -1
      });

      _defineProperty(_assertThisInitialized(_this), "_update", function (logVersion) {
        _this.setState({
          logVersion: logVersion
        });
      });

      return _this;
    }

    _createClass(WrappedComponent, [{
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
            otherProps = _objectWithoutProperties(_this$props, ["log"]);

        var logState = log && getLogState(log, otherProps);
        return React.createElement(Component, _extends({}, otherProps, logState, {
          log: log
        }));
      }
    }]);

    return WrappedComponent;
  }(PureComponent);

  _defineProperty(WrappedComponent, "propTypes", {
    log: PropTypes.instanceOf(XVIZLoaderInterface)
  });

  return WrappedComponent;
}
//# sourceMappingURL=connect.js.map