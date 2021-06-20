"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theme = require("../shared/theme");

var _icons = require("../shared/icons");

var _input = _interopRequireDefault(require("./input"));

var _styledComponents = require("./styled-components");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SETTING_STYLES = {
  position: 'relative'
};

var Form = function (_PureComponent) {
  (0, _inherits2["default"])(Form, _PureComponent);

  var _super = _createSuper(Form);

  function Form() {
    var _this;

    (0, _classCallCheck2["default"])(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      collapsed: {}
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onChange", function (settingName, newValue) {
      _this.props.onChange((0, _defineProperty2["default"])({}, settingName, newValue));
    });
    return _this;
  }

  (0, _createClass2["default"])(Form, [{
    key: "toggleCollapsed",
    value: function toggleCollapsed(_ref) {
      var settingName = _ref.settingName,
          collapsed = _ref.collapsed;

      var newCollapsedState = _objectSpread(_objectSpread({}, this.state.collapsed), {}, (0, _defineProperty2["default"])({}, settingName, !collapsed));

      this.setState({
        collapsed: newCollapsedState
      });
    }
  }, {
    key: "_renderSetting",
    value: function _renderSetting(_ref2) {
      var _this2 = this;

      var settingName = _ref2.settingName,
          setting = _ref2.setting,
          value = _ref2.value,
          _ref2$isEnabled = _ref2.isEnabled,
          isEnabled = _ref2$isEnabled === void 0 ? true : _ref2$isEnabled,
          level = _ref2.level;
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style;
      var _setting$enabled = setting.enabled,
          enabled = _setting$enabled === void 0 ? true : _setting$enabled,
          _setting$visible = setting.visible,
          visible = _setting$visible === void 0 ? true : _setting$visible,
          children = setting.children;
      var isVisible;

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

      var collapsed = typeof this.state.collapsed[settingName] !== 'undefined' ? this.state.collapsed[settingName] : false;

      var input = _react["default"].createElement(_input["default"], (0, _extends2["default"])({
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

      return _react["default"].createElement("div", {
        key: settingName,
        style: SETTING_STYLES
      }, setting.collapsible && _react["default"].createElement(_styledComponents.Expander, {
        theme: theme,
        userStyle: style.expander,
        onClick: function onClick() {
          return _this2.toggleCollapsed({
            settingName: settingName,
            collapsed: collapsed
          });
        },
        isExpanded: !collapsed
      }, collapsed ? style.iconCollapsed || _react["default"].createElement(_icons.CollapsedIcon, null) : style.iconExpanded || _react["default"].createElement(_icons.ExpandedIcon, null)), input, !collapsed && this._renderSettings(children, {
        isEnabled: isEnabled,
        level: level + 1
      }));
    }
  }, {
    key: "_renderSettings",
    value: function _renderSettings(settings) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var values = this.props.values;
      var children = [];

      for (var _i = 0, _Object$keys = Object.keys(settings); _i < _Object$keys.length; _i++) {
        var settingName = _Object$keys[_i];
        var setting = settings[settingName];
        var value = values[settingName];
        var collapsed = this.state.collapsed[settingName];
        var level = opts.level || 0;

        var child = this._renderSetting(_objectSpread(_objectSpread({}, opts), {}, {
          settingName: settingName,
          setting: setting,
          value: value,
          collapsed: collapsed,
          level: level
        }));

        children.push(child);
      }

      return children;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          style = _this$props2.style,
          data = _this$props2.data;
      return _react["default"].createElement(_styledComponents.Container, {
        theme: theme,
        userStyle: style.wrapper
      }, this._renderSettings(data));
    }
  }]);
  return Form;
}(_react.PureComponent);

(0, _defineProperty2["default"])(Form, "propTypes", {
  data: _propTypes["default"].object.isRequired,
  style: _propTypes["default"].object,
  values: _propTypes["default"].object.isRequired,
  onChange: _propTypes["default"].func.isRequired
});
(0, _defineProperty2["default"])(Form, "defaultProps", {
  style: {}
});

var _default = (0, _theme.withTheme)(Form);

exports["default"] = _default;
//# sourceMappingURL=form.js.map