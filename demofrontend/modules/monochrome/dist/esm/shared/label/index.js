import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../theme';
import { InfoIcon } from '../icons';
import { Tooltip } from '../popover';
var LabelComponent = styled.label(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    display: 'flex',
    alignItems: 'center',
    cursor: 'inherit',
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
    '>*': {
      marginLeft: props.theme.spacingNormal
    }
  }, evaluateStyle(props.userStyle, props));
});
var LabelInfo = styled.div(function (props) {
  return _objectSpread({
    display: 'inline-block',
    color: props.isEnabled ? props.theme.controlColorPrimary : props.theme.controlColorDisabled,
    cursor: 'default',
    verticalAlign: 'middle',
    width: 16,
    height: 16,
    lineHeight: '16px',
    textAlign: 'center',
    path: {
      fill: 'currentColor'
    }
  }, evaluateStyle(props.userStyle, props));
});

var Label = function (_PureComponent) {
  _inherits(Label, _PureComponent);

  var _super = _createSuper(Label);

  function Label() {
    _classCallCheck(this, Label);

    return _super.apply(this, arguments);
  }

  _createClass(Label, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          isEnabled = _this$props.isEnabled,
          htmlFor = _this$props["for"],
          style = _this$props.style,
          children = _this$props.children,
          tooltip = _this$props.tooltip,
          badge = _this$props.badge;
      var labelProps = {};

      if (htmlFor) {
        labelProps.htmlFor = htmlFor;
      }

      var styleProps = {
        theme: theme,
        isEnabled: isEnabled
      };
      return React.createElement(LabelComponent, _extends({}, styleProps, {
        userStyle: style.label
      }), children, tooltip && React.createElement(Tooltip, {
        style: style.tooltip,
        content: tooltip
      }, React.createElement(LabelInfo, _extends({}, styleProps, {
        userStyle: style.tooltipTarget
      }), style.iconInfo || React.createElement(InfoIcon, null))), badge);
    }
  }]);

  return Label;
}(PureComponent);

_defineProperty(Label, "propTypes", {
  "for": PropTypes.string,
  style: PropTypes.object,
  tooltip: PropTypes.string,
  badge: PropTypes.element,
  isEnabled: PropTypes.bool
});

_defineProperty(Label, "defaultProps", {
  style: {},
  isEnabled: true
});

export default withTheme(Label);
//# sourceMappingURL=index.js.map