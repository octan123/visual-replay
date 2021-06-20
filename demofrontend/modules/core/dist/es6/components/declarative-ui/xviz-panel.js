import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XVIZContainer from './xviz-container';
import XVIZMetric from './xviz-metric';
import XVIZPlot from './xviz-plot';
import XVIZTable from './xviz-table';
import XVIZVideo from './xviz-video';
import connectToLog from '../connect';
const DEFAULT_COMPONENTS = {
  container: XVIZContainer,
  metric: XVIZMetric,
  plot: XVIZPlot,
  video: XVIZVideo,
  table: XVIZTable,
  treetable: XVIZTable
};

class XVIZPanelComponent extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_renderItem", (item, i) => {
      const {
        components,
        componentProps,
        log,
        style
      } = this.props;
      const type = item.type.toLowerCase();
      const XVIZComponent = components[type] || DEFAULT_COMPONENTS[type];
      const customProps = componentProps[type];

      if (!XVIZComponent) {
        return null;
      }

      return React.createElement(XVIZComponent, _extends({
        key: i
      }, customProps, item, {
        log: log,
        style: style[item.type]
      }), item.children && item.children.map(this._renderItem));
    });
  }

  render() {
    const {
      uiConfig
    } = this.props;
    return uiConfig ? React.createElement("div", null, uiConfig.children && uiConfig.children.map(this._renderItem)) : null;
  }

}

_defineProperty(XVIZPanelComponent, "propTypes", {
  name: PropTypes.string.isRequired,
  components: PropTypes.object,
  componentProps: PropTypes.object,
  style: PropTypes.object,
  uiConfig: PropTypes.object
});

_defineProperty(XVIZPanelComponent, "defaultProps", {
  style: {},
  components: {},
  componentProps: {}
});

const getLogState = (log, ownProps) => {
  const metadata = log.getMetadata();
  const panel = metadata && metadata.ui_config && metadata.ui_config[ownProps.name];
  return {
    uiConfig: panel && panel.config || panel
  };
};

export default connectToLog({
  getLogState,
  Component: XVIZPanelComponent
});
//# sourceMappingURL=xviz-panel.js.map