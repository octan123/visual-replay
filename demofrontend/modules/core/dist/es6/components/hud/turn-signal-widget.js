import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import BaseWidget from './base-widget';
const CONTAINER_STYLE = {
  lineHeight: 0,
  textAlign: 'center'
};
const ArrowComponent = styled.svg(props => _objectSpread({
  height: props.theme.controlSize,
  margin: props.theme.spacingTiny,
  fill: props.isOn ? props.theme.textColorPrimary : props.theme.controlColorDisabled
}, evaluateStyle(props.userStyle, props)));
export default class TurnSignalWidget extends PureComponent {
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
      const value = streams.signal.data && transformValue(streams.signal.data.variable);
      const styleProps = {
        theme,
        userStyle: style.arrow
      };
      return React.createElement("div", {
        style: CONTAINER_STYLE
      }, React.createElement(ArrowComponent, _extends({
        viewBox: "0 0 18 16",
        isOn: value === 'left' || value === 'both'
      }, styleProps), React.createElement("path", {
        d: "M0,8 L8,16 L8,11 L18,11 L18,5 L8,5 L8,0z"
      })), React.createElement(ArrowComponent, _extends({
        viewBox: "0 0 18 16",
        isOn: value === 'right' || value === 'both'
      }, styleProps), React.createElement("path", {
        d: "M18,8 L10,16 L10,11 L0,11 L0,5 L10,5 L10,0z"
      })));
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
        signal: streamName
      }
    }, this._render);
  }

}

_defineProperty(TurnSignalWidget, "propTypes", {
  log: PropTypes.object.isRequired,
  style: PropTypes.object,
  streamName: PropTypes.string.isRequired,
  transformValue: PropTypes.func
});

_defineProperty(TurnSignalWidget, "defaultProps", {
  style: {},
  transformValue: x => x
});
//# sourceMappingURL=turn-signal-widget.js.map