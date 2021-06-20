import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { evaluateStyle } from '../theme';
import Popover from './popover';

class Tooltip extends React.Component {
  render() {
    const {
      style
    } = this.props;

    const tooltipStyle = _objectSpread(_objectSpread({}, style), {}, {
      body: props => _objectSpread({
        maxWidth: 300,
        paddingTop: props.theme.spacingSmall,
        paddingBottom: props.theme.spacingSmall,
        paddingLeft: props.theme.spacingNormal,
        paddingRight: props.theme.spacingNormal
      }, evaluateStyle(style.body, props))
    });

    return React.createElement(Popover, _extends({}, this.props, {
      style: tooltipStyle,
      trigger: Popover.HOVER
    }));
  }

}

_defineProperty(Tooltip, "propTypes", Popover.propTypes);

_defineProperty(Tooltip, "defaultProps", {
  style: {},
  position: Popover.AUTO
});

export default Tooltip;
//# sourceMappingURL=tooltip.js.map