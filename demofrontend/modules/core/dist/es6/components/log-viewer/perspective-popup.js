import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { Popup } from 'react-map-gl';
import { withTheme, evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
const ANCHOR_POSITION = {
  top: {
    x: 0.5,
    y: 0
  },
  'top-left': {
    x: 0,
    y: 0
  },
  'top-right': {
    x: 1,
    y: 0
  },
  bottom: {
    x: 0.5,
    y: 1
  },
  'bottom-left': {
    x: 0,
    y: 1
  },
  'bottom-right': {
    x: 1,
    y: 1
  },
  left: {
    x: 0,
    y: 0.5
  },
  right: {
    x: 1,
    y: 0.5
  }
};
const PopupTip = styled.div(props => _objectSpread({
  position: 'absolute',
  width: 4,
  height: 4,
  margin: -2,
  borderRadius: 2,
  background: props.color
}, evaluateStyle(props.userStyle, props)));
const PopupLine = styled.div(props => _objectSpread({
  position: 'absolute',
  borderLeftStyle: 'solid',
  borderLeftWidth: 1,
  borderColor: props.color
}, evaluateStyle(props.userStyle, props)));
const PopupContent = styled.div(props => _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
  background: props.color
}, evaluateStyle(props.userStyle, props)));

class PerspectivePopup extends Popup {
  _renderTip(positionType) {
    const anchorPosition = ANCHOR_POSITION[positionType];
    const {
      theme,
      style
    } = this.props;
    const {
      objectLabelTipSize = 30,
      objectLabelColor = theme.background
    } = style;

    const styleProps = _objectSpread(_objectSpread({}, this.props.styleProps), {}, {
      theme,
      color: objectLabelColor,
      position: positionType
    });

    const tipSize = evaluateStyle(objectLabelTipSize, styleProps);
    const tipStyle = {
      width: tipSize,
      height: tipSize,
      position: 'relative',
      border: 'none'
    };
    const tipCircleStyle = {};
    const tipLineStyle = {};

    switch (anchorPosition.x) {
      case 0.5:
        tipCircleStyle.left = '50%';
        tipLineStyle.left = '50%';
        break;

      case 1:
        tipCircleStyle.right = 0;
        tipLineStyle.right = 0;
        break;

      case 0:
      default:
    }

    switch (anchorPosition.y) {
      case 0.5:
        tipLineStyle.width = '100%';
        tipCircleStyle.top = '50%';
        tipLineStyle.top = '50%';
        break;

      case 1:
        tipCircleStyle.bottom = 0;
        tipLineStyle.height = '100%';
        break;

      case 0:
      default:
        tipLineStyle.height = '100%';
    }

    return React.createElement("div", {
      key: "tip",
      className: "mapboxgl-popup-tip",
      style: tipStyle
    }, React.createElement(PopupTip, _extends({
      style: tipCircleStyle
    }, styleProps, {
      userStyle: style.objectLabelTip
    })), React.createElement(PopupLine, _extends({
      style: tipLineStyle
    }, styleProps, {
      userStyle: style.objectLabelLine
    })));
  }

  _renderContent() {
    const {
      theme,
      styleProps,
      style
    } = this.props;
    return React.createElement(PopupContent, _extends({
      key: "content",
      ref: this._contentLoaded,
      className: "mapboxgl-popup-content",
      theme: theme
    }, styleProps, {
      color: style.objectLabelColor,
      userStyle: style.objectLabelBody
    }), this.props.children);
  }

}

export default withTheme(PerspectivePopup);
//# sourceMappingURL=perspective-popup.js.map