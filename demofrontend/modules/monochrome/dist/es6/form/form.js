import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '../shared/theme';
import { ExpandedIcon, CollapsedIcon } from '../shared/icons';
import Input from './input';
import { Container, Expander } from './styled-components';
const SETTING_STYLES = {
  position: 'relative'
};

class Form extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      collapsed: {}
    });

    _defineProperty(this, "_onChange", (settingName, newValue) => {
      this.props.onChange({
        [settingName]: newValue
      });
    });
  }

  toggleCollapsed({
    settingName,
    collapsed
  }) {
    const newCollapsedState = _objectSpread(_objectSpread({}, this.state.collapsed), {}, {
      [settingName]: !collapsed
    });

    this.setState({
      collapsed: newCollapsedState
    });
  }

  _renderSetting({
    settingName,
    setting,
    value,
    isEnabled = true,
    level
  }) {
    const {
      theme,
      style
    } = this.props;
    const {
      enabled = true,
      visible = true,
      children
    } = setting;
    let isVisible;

    if (typeof enabled === 'function') {
      isEnabled = isEnabled && enabled(this.props.values);
    } else {
      isEnabled = isEnabled && Boolean(enabled);
    }

    if (typeof visible === 'function') {
      isVisible = visible(this.props.values);
    } else {
      isVisible = Boolean(visible);
    }

    if (!isVisible) {
      return null;
    }

    const collapsed = typeof this.state.collapsed[settingName] !== 'undefined' ? this.state.collapsed[settingName] : false;
    const input = React.createElement(Input, _extends({
      key: settingName
    }, setting, {
      label: setting.title || settingName,
      name: settingName,
      value: value,
      theme: theme,
      style: style,
      level: level,
      isEnabled: isEnabled,
      onChange: this._onChange
    }));

    if (!children) {
      return input;
    }

    return React.createElement("div", {
      key: settingName,
      style: SETTING_STYLES
    }, setting.collapsible && React.createElement(Expander, {
      theme: theme,
      userStyle: style.expander,
      onClick: () => this.toggleCollapsed({
        settingName,
        collapsed
      }),
      isExpanded: !collapsed
    }, collapsed ? style.iconCollapsed || React.createElement(CollapsedIcon, null) : style.iconExpanded || React.createElement(ExpandedIcon, null)), input, !collapsed && this._renderSettings(children, {
      isEnabled,
      level: level + 1
    }));
  }

  _renderSettings(settings, opts = {}) {
    const {
      values
    } = this.props;
    const children = [];

    for (const settingName of Object.keys(settings)) {
      const setting = settings[settingName];
      const value = values[settingName];
      const collapsed = this.state.collapsed[settingName];
      const level = opts.level || 0;

      const child = this._renderSetting(_objectSpread(_objectSpread({}, opts), {}, {
        settingName,
        setting,
        value,
        collapsed,
        level
      }));

      children.push(child);
    }

    return children;
  }

  render() {
    const {
      theme,
      style,
      data
    } = this.props;
    return React.createElement(Container, {
      theme: theme,
      userStyle: style.wrapper
    }, this._renderSettings(data));
  }

}

_defineProperty(Form, "propTypes", {
  data: PropTypes.object.isRequired,
  style: PropTypes.object,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
});

_defineProperty(Form, "defaultProps", {
  style: {}
});

export default withTheme(Form);
//# sourceMappingURL=form.js.map