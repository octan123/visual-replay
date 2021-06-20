import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default class XVIZContainer extends PureComponent {
  render() {
    const {
      layout
    } = this.props;
    const layoutStyle = {
      display: 'flex',
      width: '100%'
    };
    const childStyle = {};

    switch (layout.toUpperCase()) {
      case 'VERTICAL':
        layoutStyle.flexDirection = 'column';
        childStyle.flex = '0 0 auto';
        break;

      case 'HORIZONTAL':
        layoutStyle.flexDirection = 'row';
        childStyle.flex = '1 1 auto';
        break;

      default:
        return null;
    }

    return React.createElement("div", {
      className: "xviz-container",
      style: layoutStyle
    }, React.Children.map(this.props.children, child => React.createElement("div", {
      style: childStyle
    }, child)));
  }

}

_defineProperty(XVIZContainer, "propTypes", {
  layout: PropTypes.string
});

_defineProperty(XVIZContainer, "defaultProps", {
  layout: 'VERTICAL'
});
//# sourceMappingURL=xviz-container.js.map