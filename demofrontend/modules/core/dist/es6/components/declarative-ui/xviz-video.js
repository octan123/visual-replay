import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Dropdown, withTheme, evaluateStyle } from '@streetscape.gl/monochrome';
import ImageSequence from './image-sequence';
import connectToLog from '../connect';
import { normalizeStreamFilter } from '../../utils/stream-utils';
const WrapperComponent = styled.span(props => _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
  position: 'relative'
}, evaluateStyle(props.userStyle, props)));

class BaseComponent extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onSelectVideo", streamName => {
      this.setState({
        selectedStreamName: streamName
      });
    });

    this.state = _objectSpread({}, this._getStreamNames(props));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.streamsMetadata !== nextProps.streamsMetadata || this.props.cameras !== nextProps.cameras) {
      this.setState(this._getStreamNames(nextProps));
    }
  }

  _getStreamNames({
    streamsMetadata,
    cameras
  }) {
    const streamNames = Object.keys(streamsMetadata).filter(streamName => {
      const type = streamsMetadata[streamName] && streamsMetadata[streamName].primitive_type;
      return type === 'IMAGE' || type === 'image';
    }).filter(normalizeStreamFilter(cameras)).sort();
    let {
      selectedStreamName
    } = this.state || {};

    if (!streamNames.includes(selectedStreamName)) {
      selectedStreamName = streamNames[0] || null;
    }

    return {
      selectedStreamName,
      streamNames
    };
  }

  _renderVideoSelector() {
    const {
      style
    } = this.props;
    const {
      streamNames,
      selectedStreamName
    } = this.state;

    if (streamNames.length <= 1) {
      return null;
    }

    const data = {};
    streamNames.forEach(name => {
      data[name] = name;
    });
    return React.createElement(Dropdown, {
      style: style.selector,
      value: selectedStreamName,
      data: data,
      onChange: this._onSelectVideo
    });
  }

  render() {
    const {
      currentTime,
      streams,
      width,
      height,
      style,
      theme
    } = this.props;
    const {
      selectedStreamName
    } = this.state;

    if (!streams || !currentTime || !selectedStreamName) {
      return null;
    }

    let images = streams[selectedStreamName];

    if (images) {
      images = images.filter(Boolean);
    }

    return React.createElement(WrapperComponent, {
      theme: theme,
      userStyle: style.wrapper
    }, React.createElement(ImageSequence, {
      width: width,
      height: height,
      src: images,
      currentTime: currentTime
    }), this._renderVideoSelector());
  }

}

_defineProperty(BaseComponent, "propTypes", {
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cameras: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.func]),
  currentTime: PropTypes.number,
  streamsMetadata: PropTypes.object,
  streams: PropTypes.object
});

_defineProperty(BaseComponent, "defaultProps", {
  style: {},
  width: '100%',
  height: 'auto'
});

const getLogState = log => ({
  currentTime: log.getCurrentTime(),
  streamsMetadata: log.getStreamsMetadata(),
  streams: log.getStreams()
});

const XVIZVideoComponent = withTheme(BaseComponent);
export default connectToLog({
  getLogState,
  Component: XVIZVideoComponent
});
//# sourceMappingURL=xviz-video.js.map