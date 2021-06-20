import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import BaseWidget from './base-widget';
const Container = styled.div(props => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: props.layout === 'vertical' ? 'column' : 'row'
}));
const COLORS = {
  red: '#d42e22',
  yellow: '#f8ce46',
  green: '#57ad57'
};
const LightComponent = styled.div(props => _objectSpread({
  boxSizing: 'border-box',
  width: props.theme.controlSize,
  height: props.theme.controlSize,
  margin: props.theme.spacingTiny,
  borderRadius: '50%',
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: COLORS[props.color],
  background: props.isOn ? COLORS[props.color] : 'none'
}, evaluateStyle(props.userStyle, props)));
export default class TrafficLightWidget extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_render", ({
      theme,
      streams
    }) => {
      const {
        transformValue,
        style
      } = this.props;
      const value = streams.light.data && transformValue(streams.light.data.variable);
      const styleProps = {
        theme,
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
  }

  render() {
    const {
      log,
      style,
      streamName
    } = this.props;
    return React.createElement(BaseWidget, {
      log: log,
      style: style,
      streamNames: {
        light: streamName
      }
    }, this._render);
  }

}

_defineProperty(TrafficLightWidget, "propTypes", {
  log: PropTypes.object.isRequired,
  style: PropTypes.object,
  streamName: PropTypes.string.isRequired,
  transformValue: PropTypes.func
});

_defineProperty(TrafficLightWidget, "defaultProps", {
  style: {},
  transformValue: x => x
});
//# sourceMappingURL=traffic-light-widget.js.map