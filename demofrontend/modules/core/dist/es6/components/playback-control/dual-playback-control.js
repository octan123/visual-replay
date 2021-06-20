import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PlaybackControl, Slider, withTheme, evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
const LookAheadContainer = styled.div(props => _objectSpread({
  display: 'flex',
  alignItems: 'center',
  width: 200,
  '>div': {
    flexGrow: 1
  }
}, evaluateStyle(props.userStyle, props)));
const LookAheadTimestamp = styled.span(props => _objectSpread({
  marginLeft: props.theme.spacingNormal,
  marginRight: props.theme.spacingNormal
}, evaluateStyle(props.userStyle, props)));

const lookAheadMarkerStyle = props => _objectSpread({
  position: 'absolute',
  boxSizing: 'content-box',
  borderStyle: 'solid',
  marginTop: 6,
  marginLeft: -6,
  borderWidth: 6,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderTopColor: '#888',
  borderBottomStyle: 'none',
  transitionProperty: 'left',
  transitionDuration: props.isPlaying ? '0s' : props.theme.transitionDuration
}, evaluateStyle(props.userStyle, props));

class DualPlaybackControl extends PureComponent {
  _renderLookAheadSlider() {
    const {
      theme,
      style,
      isPlaying,
      lookAhead,
      formatLookAhead,
      maxLookAhead,
      step
    } = this.props;
    return React.createElement(LookAheadContainer, {
      theme: theme,
      isPlaying: isPlaying,
      userStyle: style.lookAhead
    }, React.createElement(LookAheadTimestamp, {
      theme: theme,
      isPlaying: isPlaying,
      userStyle: style.lookAheadTimestamp
    }, "Look ahead: ", formatLookAhead(lookAhead)), React.createElement(Slider, {
      style: style.lookAheadSlider,
      value: lookAhead,
      min: 0,
      max: maxLookAhead,
      step: step,
      size: 16,
      onChange: this.props.onLookAheadChange
    }));
  }

  render() {
    const {
      theme,
      isPlaying,
      markers: userMarkers,
      style,
      children,
      currentTime,
      lookAhead,
      endTime
    } = this.props;
    const lookAheadTime = Math.min(endTime, currentTime + lookAhead);
    const markers = userMarkers.concat({
      time: lookAheadTime,
      style: lookAheadMarkerStyle({
        theme,
        isPlaying,
        userStyle: style.lookAheadMarker
      })
    });
    return React.createElement(PlaybackControl, _extends({}, this.props, {
      markers: markers
    }), children, React.createElement("div", {
      style: {
        flexGrow: 1
      }
    }), this._renderLookAheadSlider());
  }

}

_defineProperty(DualPlaybackControl, "propTypes", _objectSpread(_objectSpread({}, PlaybackControl.propTypes), {}, {
  lookAhead: PropTypes.number,
  maxLookAhead: PropTypes.number,
  formatLookAhead: PropTypes.func,
  onLookAheadChange: PropTypes.func
}));

_defineProperty(DualPlaybackControl, "defaultProps", _objectSpread(_objectSpread({}, PlaybackControl.defaultProps), {}, {
  step: 0,
  markers: [],
  lookAhead: 0,
  maxLookAhead: 10,
  formatTick: null,
  formatTimestamp: null,
  formatLookAhead: x => PlaybackControl.formatTimeCode(x, '{ss}.{S}'),
  onLookAheadChange: () => {}
}));

const ThemedDualPlaybackControl = withTheme(DualPlaybackControl);
ThemedDualPlaybackControl.formatTimeCode = PlaybackControl.formatTimeCode;
export default ThemedDualPlaybackControl;
//# sourceMappingURL=dual-playback-control.js.map