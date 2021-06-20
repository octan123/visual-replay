"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFormData = createFormData;
exports.settingsToFormValues = settingsToFormValues;
exports.updateFormValues = updateFormValues;
exports.formValuesToSettings = formValuesToSettings;
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _monochrome = require("@streetscape.gl/monochrome");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _connect = _interopRequireDefault(require("./connect"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Badge = _styled["default"].div(function (props) {
  return _objectSpread({
    '&:before': {
      content: "\"".concat(props.type || '', "\"")
    }
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
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
      return _monochrome.CheckBox.INDETERMINATE;
    }
  }

  return parentValue;
}

function createFormData(metadata, opts) {
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
        badge: _react["default"].createElement(Badge, {
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
        badge: _react["default"].createElement(Badge, {
          userStyle: style.badge,
          type: metadata[streamName].primitive_type || metadata[streamName].scalar_type
        })
      };
    }
  }

  return root;
}

function settingsToFormValues(data, settings) {
  if (!data || !settings) {
    return null;
  }

  var values = {};

  for (var key in data) {
    var children = data[key].children;

    if (children) {
      for (var streamName in children) {
        values[streamName] = settings[streamName] ? _monochrome.CheckBox.ON : _monochrome.CheckBox.OFF;
      }

      values[key] = getParentValue(children, values);
    } else {
      values[key] = settings[key] ? _monochrome.CheckBox.ON : _monochrome.CheckBox.OFF;
    }
  }

  return values;
}

function updateFormValues(data, oldValues, newValues) {
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

function formValuesToSettings(metadata, values) {
  var settings = {};

  for (var streamName in metadata) {
    settings[streamName] = values[streamName] === _monochrome.CheckBox.ON;
  }

  return settings;
}

var StreamSettingsPanel = function (_PureComponent) {
  (0, _inherits2["default"])(StreamSettingsPanel, _PureComponent);

  var _super = _createSuper(StreamSettingsPanel);

  function StreamSettingsPanel(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, StreamSettingsPanel);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onValuesChange", function (newValues) {
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

  (0, _createClass2["default"])(StreamSettingsPanel, [{
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

      return _react["default"].createElement(_monochrome.Form, {
        style: style,
        data: data,
        values: values,
        onChange: this._onValuesChange
      });
    }
  }]);
  return StreamSettingsPanel;
}(_react.PureComponent);

(0, _defineProperty2["default"])(StreamSettingsPanel, "propTypes", {
  style: _propTypes["default"].object,
  streamsMetadata: _propTypes["default"].object,
  onSettingsChange: _propTypes["default"].func
});
(0, _defineProperty2["default"])(StreamSettingsPanel, "defaultProps", {
  style: {},
  onSettingsChange: function onSettingsChange() {}
});

var getLogState = function getLogState(log) {
  return {
    streamsMetadata: log.getStreamsMetadata(),
    streamSettings: log.getStreamSettings()
  };
};

var _default = (0, _connect["default"])({
  getLogState: getLogState,
  Component: StreamSettingsPanel
});

exports["default"] = _default;
//# sourceMappingURL=stream-settings-panel.js.map