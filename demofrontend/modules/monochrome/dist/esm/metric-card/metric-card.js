import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../shared/spinner';
import { Tooltip } from '../shared/popover';
import { withTheme } from '../shared/theme';
import { CardContainer, CardTitle, ErrorMessage } from './styled-components';

var MetricCard = function (_PureComponent) {
  _inherits(MetricCard, _PureComponent);

  var _super = _createSuper(MetricCard);

  function MetricCard() {
    _classCallCheck(this, MetricCard);

    return _super.apply(this, arguments);
  }

  _createClass(MetricCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          error = _this$props.error,
          isLoading = _this$props.isLoading,
          className = _this$props.className,
          title = _this$props.title,
          description = _this$props.description;
      var styleProps = {
        theme: theme,
        hasError: Boolean(error),
        isLoading: isLoading
      };
      return React.createElement(CardContainer, _extends({
        className: className
      }, styleProps, {
        userStyle: style.wrapper
      }), title && React.createElement(CardTitle, _extends({}, styleProps, {
        userStyle: style.title
      }), React.createElement(Tooltip, {
        style: style.tooltip,
        content: description
      }, title)), !isLoading && !error && this.props.children, isLoading && React.createElement(Spinner, {
        style: style.spinner
      }), error && React.createElement(ErrorMessage, _extends({}, styleProps, {
        userStyle: style.error
      }), error));
    }
  }]);

  return MetricCard;
}(PureComponent);

_defineProperty(MetricCard, "propTypes", {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  style: PropTypes.object,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.element
});

_defineProperty(MetricCard, "defaultProps", {
  className: '',
  title: '',
  description: '',
  style: {},
  error: null,
  isLoading: false
});

export default withTheme(MetricCard);
//# sourceMappingURL=metric-card.js.map