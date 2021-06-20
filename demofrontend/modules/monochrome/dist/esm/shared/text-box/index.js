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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../theme';
import { ClearIcon } from '../icons';

function getControlColor(props) {
  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  } else if (props.hasFocus) {
    return props.theme.controlColorActive;
  } else if (props.isHovered) {
    return props.theme.controlColorHovered;
  }

  return props.theme.controlColorPrimary;
}

var WrapperComponent = styled.div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    pointerEvents: props.isEnabled ? 'all' : 'none'
  }, evaluateStyle(props.userStyle, props));
});
var TextBoxBorder = styled.div(function (props) {
  return _objectSpread({
    position: 'relative',
    width: '100%',
    height: props.height,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: getControlColor(props)
  }, evaluateStyle(props.userStyle, props));
});
var TextBoxInput = styled.input(function (props) {
  return _objectSpread({
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    lineHeight: "".concat(props.height, "px"),
    background: props.theme.background,
    outline: 'none',
    paddingLeft: props.theme.spacingSmall,
    paddingRight: props.theme.spacingSmall,
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
    border: 'none'
  }, evaluateStyle(props.userStyle, props));
});
var TextBoxClearButton = styled.div(function (props) {
  return _objectSpread({
    cursor: 'pointer',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    color: props.theme.controlColorPrimary,
    padding: props.theme.spacingSmall,
    width: 16,
    height: 16,
    textAlign: 'center',
    lineHeight: '16px',
    path: {
      fill: 'currentColor'
    },
    '&:hover': {
      color: props.theme.controlColorHovered
    }
  }, evaluateStyle(props.userStyle, props));
});

var TextBox = function (_PureComponent) {
  _inherits(TextBox, _PureComponent);

  var _super = _createSuper(TextBox);

  function TextBox() {
    var _this;

    _classCallCheck(this, TextBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasFocus: false,
      isHovered: false
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseEnter", function () {
      return _this.setState({
        isHovered: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseLeave", function () {
      return _this.setState({
        isHovered: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onFocus", function () {
      return _this.setState({
        hasFocus: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onBlur", function () {
      return _this.setState({
        hasFocus: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onChange", function (event) {
      _this.props.onChange(event.target.value);
    });

    _defineProperty(_assertThisInitialized(_this), "_onClear", function (event) {
      _this.props.onChange('');
    });

    return _this;
  }

  _createClass(TextBox, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          value = _this$props.value,
          className = _this$props.className,
          theme = _this$props.theme,
          style = _this$props.style,
          showClearButton = _this$props.showClearButton,
          isEnabled = _this$props.isEnabled;
      var _style$height = style.height,
          height = _style$height === void 0 ? theme.controlSize + theme.spacingTiny * 2 : _style$height;
      var styleProps = {
        theme: theme,
        height: height,
        isEnabled: isEnabled,
        isHovered: this.state.isHovered,
        hasFocus: this.state.hasFocus
      };
      return React.createElement(WrapperComponent, _extends({
        className: className,
        userStyle: style.wrapper
      }, styleProps), React.createElement(TextBoxBorder, _extends({
        userStyle: style.border
      }, styleProps, {
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave
      }), React.createElement(TextBoxInput, _extends({
        userStyle: style.input
      }, styleProps, {
        ref: function ref(_ref) {
          _this2._input = _ref;
        },
        type: "text",
        tabIndex: isEnabled ? 0 : -1,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onChange: this._onChange,
        value: value
      })), Boolean(value && showClearButton && isEnabled) && React.createElement(TextBoxClearButton, _extends({
        userStyle: style.clear
      }, styleProps, {
        onClick: this._onClear
      }), style.iconClear || React.createElement(ClearIcon, null))));
    }
  }]);

  return TextBox;
}(PureComponent);

_defineProperty(TextBox, "propTypes", {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  showClearButton: PropTypes.bool,
  isEnabled: PropTypes.bool
});

_defineProperty(TextBox, "defaultProps", {
  className: '',
  style: {},
  showClearButton: true,
  isEnabled: true,
  onChange: function onChange() {}
});

export default withTheme(TextBox);
//# sourceMappingURL=index.js.map