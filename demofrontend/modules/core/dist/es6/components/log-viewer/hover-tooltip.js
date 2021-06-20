import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import { withTheme, evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
const TooltipContainer = styled.div(props => _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
  position: 'absolute',
  pointerEvents: 'none',
  margin: props.theme.spacingNormal,
  padding: props.theme.spacingNormal,
  maxWidth: 320,
  overflow: 'hidden',
  background: props.theme.background,
  color: props.theme.textColorPrimary,
  zIndex: 100001
}, evaluateStyle(props.userStyle, props)));
const KEY_BLACKLIST = new Set(['vertices', 'base', 'style', 'state', 'index', 'id', 'object_id']);

class HoverTooltip extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_renderContent", info => {
      const {
        streamName
      } = info.layer.props;

      if (!streamName) {
        return React.createElement("div", null, React.createElement("b", null, info.layer.id));
      }

      const objectId = info.object.base && info.object.base.object_id;
      return [React.createElement("div", {
        key: "-stream-"
      }, React.createElement("div", null, React.createElement("b", null, "stream")), streamName), objectId ? React.createElement("div", {
        key: "-id-"
      }, React.createElement("div", null, React.createElement("b", null, "id")), objectId) : null, React.createElement("hr", {
        key: "-separator-"
      })].concat(this._renderEntries(info.object.base), this._renderEntries(info.object));
    });
  }

  _renderEntries(object) {
    if (!object) {
      return null;
    }

    return Object.keys(object).filter(key => !KEY_BLACKLIST.has(key) && object[key] !== undefined).map(key => React.createElement("div", {
      key: key
    }, React.createElement("div", null, React.createElement("b", null, key)), String(object[key])));
  }

  render() {
    const {
      theme,
      info,
      style,
      renderContent = this._renderContent
    } = this.props;
    return React.createElement(TooltipContainer, {
      theme: theme,
      style: {
        left: info.x,
        top: info.y
      },
      userStyle: style
    }, renderContent(info));
  }

}

export default withTheme(HoverTooltip);
//# sourceMappingURL=hover-tooltip.js.map