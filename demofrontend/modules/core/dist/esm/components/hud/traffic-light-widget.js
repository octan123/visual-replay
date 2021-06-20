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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import BaseWidget from './base-widget';
var Container = styled.div(function (props) {
  return {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: props.layout === 'vertical' ? 'column' : 'row'
  };
});
var COLORS = {
  red: '#d42e22',
  yellow: '#f8ce46',
  green: '#57ad57'
};
var LightComponent = styled.div(function (props) {
  return _objectSpread({
    boxSizing: 'border-box',
    width: props.theme.controlSize,
    height: props.theme.controlSize,
    margin: props.theme.spacingTiny,
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: COLORS[props.color],
    background: props.isOn ? COLORS[props.color] : 'none'
  }, evaluateStyle(props.userStyle, props));
});

var TrafficLightWidget = function (_PureComponent) {
  _inherits(TrafficLightWidget, _PureComponent);

  var _super = _createSuper(TrafficLightWidget);

  function TrafficLightWidget() {
    var _this;

    _classCallCheck(this, TrafficLightWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_render", function (_ref) {
      var theme = _ref.theme,
          streams = _ref.streams;
      var _this$props = _this.props,
          transformValue = _this$props.transformValue,
          style = _this$props.style;
      var value = streams.light.data && transformValue(streams.light.data.variable);
      var styleProps = {
        theme: theme,
        userStyle: style.light
      };
      return React.createElement(Container, {
        theme: theme,
        layout: style.layout
      }, React.createElement(LightComponent, _extends({
        key: "red",
        color: "red",
        isOn: value === 'red'
      }, styleProps)), React.createElement(LightComponent, _extends({
        key: "yellow",
        color: "yellow",
        isOn: value === 'yellow'
      }, styleProps)), React.createElement(LightComponent, _extends({
        key: "green",
        color: "green",
        isOn: value === 'green'
      }, styleProps)));
    });

    return _this;
  }

  _createClass(TrafficLightWidget, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          log = _this$props2.log,
          style = _this$props2.style,
          streamName = _this$props2.streamName;
      return React.createElement(BaseWidget, {
        log: log,
        style: style,
        streamNames: {
          light: streamName
        }
      }, this._render);
    }
  }]);

  return TrafficLightWidget;
}(PureComponent);

_defineProperty(TrafficLightWidget, "propTypes", {
  log: PropTypes.object.isRequired,
  style: PropTypes.object,
  streamName: PropTypes.string.isRequired,
  transformValue: PropTypes.func
});

_defineProperty(TrafficLightWidget, "defaultProps", {
  style: {},
  transformValue: function transformValue(x) {
    return x;
  }
});

export { TrafficLightWidget as default };
//# sourceMappingURL=traffic-light-widget.js.map