import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PerspectivePopup from './perspective-popup';
import { resolveCoordinateTransform, positionToLngLat } from '../../utils/transform';

const renderDefaultObjectLabel = ({
  id,
  isSelected
}) => isSelected && React.createElement("div", null, "ID: ", id);

export default class ObjectLabelsOverlay extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_renderPerspectivePopup", object => {
      const {
        objectSelection,
        xvizStyleParser,
        style,
        renderObjectLabel
      } = this.props;
      const isSelected = Boolean(objectSelection[object.id]);
      const styleProps = {
        id: object.id,
        isSelected,
        object,
        xvizStyles: xvizStyleParser
      };
      const labelContent = renderObjectLabel(styleProps);

      if (!labelContent) {
        return null;
      }

      let trackingPoint;
      let objectHeight;

      for (const streamName of object.streamNames) {
        const feature = object.getFeature(streamName);

        if (!trackingPoint && (feature.center || feature.vertices)) {
          trackingPoint = positionToLngLat(object.position, this._getCoordinateProps(streamName));
        }

        if (!objectHeight && feature.vertices) {
          objectHeight = xvizStyleParser.getStylesheet(streamName).getProperty('height', feature);
        }
      }

      trackingPoint[2] += objectHeight || 0;
      return React.createElement(PerspectivePopup, {
        key: object.id,
        longitude: trackingPoint[0],
        latitude: trackingPoint[1],
        altitude: trackingPoint[2],
        anchor: "bottom-left",
        dynamicPosition: true,
        styleProps: styleProps,
        style: style,
        sortByDepth: true,
        closeButton: false,
        closeOnClick: false
      }, labelContent);
    });

    this.state = {
      coordinateProps: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      frame
    } = nextProps;

    if (frame && frame !== this.props.frame) {
      this.setState({
        coordinateProps: {}
      });
    }
  }

  _getCoordinateProps(streamName) {
    const {
      coordinateProps
    } = this.state;
    let result = coordinateProps[streamName];

    if (result) {
      return result;
    }

    const {
      frame,
      streamsMetadata,
      getTransformMatrix
    } = this.props;
    result = resolveCoordinateTransform(frame, streamName, streamsMetadata[streamName], getTransformMatrix);
    coordinateProps[streamName] = result;
    return result;
  }

  render() {
    const {
      frame,
      renderObjectLabel
    } = this.props;

    if (!frame || !renderObjectLabel) {
      return null;
    }

    return Object.values(frame.objects).map(this._renderPerspectivePopup);
  }

}

_defineProperty(ObjectLabelsOverlay, "propTypes", {
  objectSelection: PropTypes.object,
  frame: PropTypes.object,
  streamsMetadata: PropTypes.object,
  xvizStyleParser: PropTypes.object,
  renderObjectLabel: PropTypes.func,
  style: PropTypes.object,
  getTransformMatrix: PropTypes.func
});

_defineProperty(ObjectLabelsOverlay, "defaultProps", {
  objectSelection: {},
  renderObjectLabel: renderDefaultObjectLabel,
  style: {}
});
//# sourceMappingURL=object-labels-overlay.js.map