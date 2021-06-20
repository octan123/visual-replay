import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, CheckBox, evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import connectToLog from './connect';
const Badge = styled.div(props => _objectSpread({
  '&:before': {
    content: "\"".concat(props.type || '', "\"")
  }
}, evaluateStyle(props.userStyle, props)));

function getParentKey(streamName) {
  const i = streamName.indexOf('/', 1);

  if (i > 1) {
    return streamName.slice(0, i);
  }

  return '';
}

function getParentValue(children, values) {
  let parentValue = null;

  for (const key in children) {
    const value = values[key];

    if (parentValue === null) {
      parentValue = value;
    } else if (parentValue !== value) {
      return CheckBox.INDETERMINATE;
    }
  }

  return parentValue;
}

export function createFormData(metadata, opts) {
  if (!metadata) {
    return null;
  }

  const root = {};
  const {
    style = {},
    collapsible = false
  } = opts;

  for (const streamName in metadata) {
    const parentKey = getParentKey(streamName);
    let siblings = root;

    if (parentKey) {
      root[parentKey] = root[parentKey] || {
        type: 'checkbox',
        children: {},
        collapsible,
        badge: React.createElement(Badge, {
          userStyle: style.badge,
          type: metadata[streamName] && metadata[streamName].primitive_type || metadata[streamName].scalar_type
        })
      };
      siblings = root[parentKey].children;
    }

    if (!siblings[streamName]) {
      siblings[streamName] = {
        type: 'checkbox',
        title: streamName.replace(parentKey, ''),
        badge: React.createElement(Badge, {
          userStyle: style.badge,
          type: metadata[streamName].primitive_type || metadata[streamName].scalar_type
        })
      };
    }
  }

  return root;
}
export function settingsToFormValues(data, settings) {
  if (!data || !settings) {
    return null;
  }

  const values = {};

  for (const key in data) {
    const {
      children
    } = data[key];

    if (children) {
      for (const streamName in children) {
        values[streamName] = settings[streamName] ? CheckBox.ON : CheckBox.OFF;
      }

      values[key] = getParentValue(children, values);
    } else {
      values[key] = settings[key] ? CheckBox.ON : CheckBox.OFF;
    }
  }

  return values;
}
export function updateFormValues(data, oldValues, newValues) {
  const values = _objectSpread(_objectSpread({}, oldValues), newValues);

  for (const key in newValues) {
    if (data[key] && data[key].children) {
      for (const streamName in data[key].children) {
        values[streamName] = newValues[key];
      }
    } else {
      const parentKey = getParentKey(key);

      if (parentKey) {
        values[parentKey] = getParentValue(data[parentKey].children, values);
      }
    }
  }

  return values;
}
export function formValuesToSettings(metadata, values) {
  const settings = {};

  for (const streamName in metadata) {
    settings[streamName] = values[streamName] === CheckBox.ON;
  }

  return settings;
}

class StreamSettingsPanel extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onValuesChange", newValues => {
      const {
        streamsMetadata,
        log,
        onSettingsChange
      } = this.props;
      const {
        data
      } = this.state;
      const values = updateFormValues(data, this.state.values, newValues);
      const settings = formValuesToSettings(streamsMetadata, values);

      if (!onSettingsChange(settings) && log) {
        log.updateStreamSettings(settings);
      }
    });

    const _data = createFormData(props.streamsMetadata, props);

    const _values = settingsToFormValues(_data, props.streamSettings);

    this.state = {
      data: _data,
      values: _values
    };
  }

  componentWillReceiveProps(nextProps) {
    let {
      data,
      values
    } = this.state;

    if (nextProps.streamsMetadata !== this.props.streamsMetadata) {
      data = createFormData(nextProps.streamsMetadata, nextProps);
      values = null;
    }

    if (nextProps.streamSettings !== this.props.streamSettings) {
      values = settingsToFormValues(data, nextProps.streamSettings);
    }

    this.setState({
      data,
      values
    });
  }

  render() {
    const {
      style
    } = this.props;
    const {
      data,
      values
    } = this.state;

    if (!data || !values) {
      return null;
    }

    return React.createElement(Form, {
      style: style,
      data: data,
      values: values,
      onChange: this._onValuesChange
    });
  }

}

_defineProperty(StreamSettingsPanel, "propTypes", {
  style: PropTypes.object,
  streamsMetadata: PropTypes.object,
  onSettingsChange: PropTypes.func
});

_defineProperty(StreamSettingsPanel, "defaultProps", {
  style: {},
  onSettingsChange: () => {}
});

const getLogState = log => ({
  streamsMetadata: log.getStreamsMetadata(),
  streamSettings: log.getStreamSettings()
});

export default connectToLog({
  getLogState,
  Component: StreamSettingsPanel
});
//# sourceMappingURL=stream-settings-panel.js.map