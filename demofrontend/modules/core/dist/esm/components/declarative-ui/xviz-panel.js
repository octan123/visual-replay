import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XVIZContainer from './xviz-container';
import XVIZMetric from './xviz-metric';
import XVIZPlot from './xviz-plot';
import XVIZTable from './xviz-table';
import XVIZVideo from './xviz-video';
import connectToLog from '../connect';
var DEFAULT_COMPONENTS = {
  container: XVIZContainer,
  metric: XVIZMetric,
  plot: XVIZPlot,
  video: XVIZVideo,
  table: XVIZTable,
  treetable: XVIZTable
};

var XVIZPanelComponent = function (_PureComponent) {
  _inherits(XVIZPanelComponent, _PureComponent);

  var _super = _createSuper(XVIZPanelComponent);

  function XVIZPanelComponent() {
    var _this;

    _classCallCheck(this, XVIZPanelComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_renderItem", function (item, i) {
      var _this$props = _this.props,
          components = _this$props.components,
          componentProps = _this$props.componentProps,
          log = _this$props.log,
          style = _this$props.style;
      var type = item.type.toLowerCase();
      var XVIZComponent = components[type] || DEFAULT_COMPONENTS[type];
      var customProps = componentProps[type];

      if (!XVIZComponent) {
        return null;
      }

      return React.createElement(XVIZComponent, _extends({
        key: i
      }, customProps, item, {
        log: log,
        style: style[item.type]
      }), item.children && item.children.map(_this._renderItem));
    });

    return _this;
  }

  _createClass(XVIZPanelComponent, [{
    key: "render",
    value: function render() {
      var uiConfig = this.props.uiConfig;
      return uiConfig ? React.createElement("div", null, uiConfig.children && uiConfig.children.map(this._renderItem)) : null;
    }
  }]);

  return XVIZPanelComponent;
}(PureComponent);

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

var getLogState = function getLogState(log, ownProps) {
  var metadata = log.getMetadata();
  var panel = metadata && metadata.ui_config && metadata.ui_config[ownProps.name];
  return {
    uiConfig: panel && panel.config || panel
  };
};

export default connectToLog({
  getLogState: getLogState,
  Component: XVIZPanelComponent
});
//# sourceMappingURL=xviz-panel.js.map