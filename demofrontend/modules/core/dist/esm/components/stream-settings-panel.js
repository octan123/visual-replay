import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
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
import { Form, CheckBox, evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import connectToLog from './connect';
var Badge = styled.div(function (props) {
  return _objectSpread({
    '&:before': {
      content: "\"".concat(props.type || '', "\"")
    }
  }, evaluateStyle(props.userStyle, props));
});

function getParentKey(streamName) {
  var i = streamName.indexOf('/', 1);

  if (i > 1) {
    return streamName.slice(0, i);
  }

  return '';
}

function getParentValue(children, values) {
  var parentValue = null;

  for (var key in children) {
    var value = values[key];

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

  var root = {};
  var _opts$style = opts.style,
      style = _opts$style === void 0 ? {} : _opts$style,
      _opts$collapsible = opts.collapsible,
      collapsible = _opts$collapsible === void 0 ? false : _opts$collapsible;

  for (var streamName in metadata) {
    var parentKey = getParentKey(streamName);
    var siblings = root;

    if (parentKey) {
      root[parentKey] = root[parentKey] || {
        type: 'checkbox',
        children: {},
        collapsible: collapsible,
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

  var values = {};

  for (var key in data) {
    var children = data[key].children;

    if (children) {
      for (var streamName in children) {
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
  var values = _objectSpread(_objectSpread({}, oldValues), newValues);

  for (var key in newValues) {
    if (data[key] && data[key].children) {
      for (var streamName in data[key].children) {
        values[streamName] = newValues[key];
      }
    } else {
      var parentKey = getParentKey(key);

      if (parentKey) {
        values[parentKey] = getParentValue(data[parentKey].children, values);
      }
    }
  }

  return values;
}
export function formValuesToSettings(metadata, values) {
  var settings = {};

  for (var streamName in metadata) {
    settings[streamName] = values[streamName] === CheckBox.ON;
  }

  return settings;
}

var StreamSettingsPanel = function (_PureComponent) {
  _inherits(StreamSettingsPanel, _PureComponent);

  var _super = _createSuper(StreamSettingsPanel);

  function StreamSettingsPanel(props) {
    var _this;

    _classCallCheck(this, StreamSettingsPanel);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_onValuesChange", function (newValues) {
      var _this$props = _this.props,
          streamsMetadata = _this$props.streamsMetadata,
          log = _this$props.log,
          onSettingsChange = _this$props.onSettingsChange;
      var data = _this.state.data;
      var values = updateFormValues(data, _this.state.values, newValues);
      var settings = formValuesToSettings(streamsMetadata, values);

      if (!onSettingsChange(settings) && log) {
        log.updateStreamSettings(settings);
      }
    });

    var _data = createFormData(props.streamsMetadata, props);

    var _values = settingsToFormValues(_data, props.streamSettings);

    _this.state = {
      data: _data,
      values: _values
    };
    return _this;
  }

  _createClass(StreamSettingsPanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$state = this.state,
          data = _this$state.data,
          values = _this$state.values;

      if (nextProps.streamsMetadata !== this.props.streamsMetadata) {
        data = createFormData(nextProps.streamsMetadata, nextProps);
        values = null;
      }

      if (nextProps.streamSettings !== this.props.streamSettings) {
        values = settingsToFormValues(data, nextProps.streamSettings);
      }

      this.setState({
        data: data,
        values: values
      });
    }
  }, {
    key: "render",
    value: function render() {
      var style = this.props.style;
      var _this$state2 = this.state,
          data = _this$state2.data,
          values = _this$state2.values;

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
  }]);

  return StreamSettingsPanel;
}(PureComponent);

_defineProperty(StreamSettingsPanel, "propTypes", {
  style: PropTypes.object,
  streamsMetadata: PropTypes.object,
  onSettingsChange: PropTypes.func
});

_defineProperty(StreamSettingsPanel, "defaultProps", {
  style: {},
  onSettingsChange: function onSettingsChange() {}
});

var getLogState = function getLogState(log) {
  return {
    streamsMetadata: log.getStreamsMetadata(),
    streamSettings: log.getStreamSettings()
  };
};

export default connectToLog({
  getLogState: getLogState,
  Component: StreamSettingsPanel
});
//# sourceMappingURL=stream-settings-panel.js.map