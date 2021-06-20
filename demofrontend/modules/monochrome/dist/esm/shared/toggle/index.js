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
var WrapperComponent = styled.div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    pointerEvents: props.isEnabled ? 'all' : 'none',
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled
  }, evaluateStyle(props.userStyle, props));
});
var ToggleComponent = styled.div(function (props) {
  return _objectSpread({
    outline: 'none',
    position: 'relative',
    height: props.knobSize,
    width: props.knobSize * 2,
    flexShrink: 0
  }, evaluateStyle(props.userStyle, props));
});
var ToggleTrack = styled.div(function (props) {
  return _objectSpread({
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    height: 2,
    background: props.isEnabled ? props.value ? props.theme.controlColorActive : props.theme.controlColorPrimary : props.theme.controlColorDisabled,
    top: '50%',
    transform: 'translateY(-50%)'
  }, evaluateStyle(props.userStyle, props));
});
var ToggleKnob = styled.div(function (props) {
  return _objectSpread({
    boxSizing: 'border-box',
    position: 'absolute',
    width: props.knobSize,
    height: props.knobSize,
    background: props.theme.background,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: props.isEnabled ? props.isHovered ? props.theme.controlColorHovered : props.hasFocus ? props.theme.controlColorActive : props.theme.controlColorPrimary : props.theme.controlColorDisabled,
    borderRadius: '50%',
    left: props.value ? "calc(100% - ".concat(props.knobSize, "px)") : 0,
    transitionProperty: 'left',
    transitionDuration: props.theme.transitionDuration,
    transitionTimingFunction: props.theme.transitionTimingFunction
  }, evaluateStyle(props.userStyle, props));
});

var Toggle = function (_PureComponent) {
  _inherits(Toggle, _PureComponent);

  var _super = _createSuper(Toggle);

  function Toggle() {
    var _this;

    _classCallCheck(this, Toggle);

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

    _defineProperty(_assertThisInitialized(_this), "_onKeyDown", function (evt) {
      if (evt.keyCode === 32) {
        _this.props.onChange(!_this.props.value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onClick", function () {
      _this.props.onChange(!_this.props.value);
    });

    return _this;
  }

  _createClass(Toggle, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          className = _this$props.className,
          style = _this$props.style,
          value = _this$props.value,
          label = _this$props.label,
          isEnabled = _this$props.isEnabled;
      var _style$knobSize = style.knobSize,
          knobSize = _style$knobSize === void 0 ? theme.controlSize : _style$knobSize;
      var styleProps = {
        theme: theme,
        knobSize: knobSize,
        value: value,
        isHovered: this.state.isHovered,
        hasFocus: this.state.hasFocus,
        isEnabled: isEnabled
      };
      return React.createElement(WrapperComponent, _extends({
        className: className,
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave,
        onClick: this._onClick,
        userStyle: style.wrapper
      }, styleProps), label, React.createElement(ToggleComponent, _extends({
        userStyle: style.toggle
      }, styleProps, {
        tabIndex: isEnabled ? 0 : -1,
        onKeyDown: this._onKeyDown,
        onFocus: this._onFocus,
        onBlur: this._onBlur
      }), React.createElement(ToggleTrack, _extends({
        userStyle: style.track
      }, styleProps)), React.createElement(ToggleKnob, _extends({
        userStyle: style.knob
      }, styleProps))));
    }
  }]);

  return Toggle;
}(PureComponent);

_defineProperty(Toggle, "propTypes", {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.node,
  style: PropTypes.object,
  isEnabled: PropTypes.bool
});

_defineProperty(Toggle, "defaultProps", {
  className: '',
  value: true,
  style: {},
  isEnabled: true,
  onChange: function onChange() {}
});

export default withTheme(Toggle);
//# sourceMappingURL=index.js.map