import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { evaluateStyle, withTheme } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import connectToLog from '../connect';
const WrapperComponent = styled.div(props => _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
  padding: props.theme.spacingSmall,
  display: 'inline-block'
}, evaluateStyle(props.userStyle, props)));

class BaseWidget extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      streams: this._extractStreams(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.streamNames !== this.props.streamNames || nextProps.streamsMetadata !== this.props.streamsMetadata || nextProps.frame !== this.props.frame) {
      this.setState({
        streams: this._extractStreams(nextProps)
      });
    }
  }

  _extractStreams({
    streamNames,
    streamsMetadata,
    frame
  }) {
    const result = {};

    for (const key in streamNames) {
      const streamName = streamNames[key];

      if (streamName) {
        result[key] = _objectSpread(_objectSpread({}, streamsMetadata[streamName]), {}, {
          data: frame && frame.streams[streamName]
        });
      }
    }

    return result;
  }

  render() {
    const {
      theme,
      style,
      children
    } = this.props;
    const {
      streams
    } = this.state;
    return React.createElement(WrapperComponent, {
      theme: theme,
      userStyle: style.wrapper
    }, children({
      theme,
      streams
    }));
  }

}

_defineProperty(BaseWidget, "propTypes", {
  style: PropTypes.object,
  streamNames: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  streamsMetadata: PropTypes.object,
  frame: PropTypes.object
});

_defineProperty(BaseWidget, "defaultProps", {
  style: {}
});

const getLogState = log => ({
  streamsMetadata: log.getStreamsMetadata(),
  frame: log.getCurrentFrame()
});

export default connectToLog({
  getLogState,
  Component: withTheme(BaseWidget)
});
//# sourceMappingURL=base-widget.js.map