import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../shared/spinner';
import { Tooltip } from '../shared/popover';
import { withTheme } from '../shared/theme';
import { CardContainer, CardTitle, ErrorMessage } from './styled-components';

class MetricCard extends PureComponent {
  render() {
    const {
      theme,
      style,
      error,
      isLoading,
      className,
      title,
      description
    } = this.props;
    const styleProps = {
      theme,
      hasError: Boolean(error),
      isLoading
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

}

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