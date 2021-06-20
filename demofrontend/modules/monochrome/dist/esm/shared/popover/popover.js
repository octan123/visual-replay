import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
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

import React from 'react';
import PropTypes from 'prop-types';
import Popper from 'popper.js';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../theme';
import { capitalize, getOppositePosition, generateTriangleStyles, nodeHasParent, positionsToPopperPlacement } from './utils';
var isBrowser = typeof document !== 'undefined' && Boolean(document.createElement);
export var POSITIONS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  AUTO: 'auto'
};
export var TRIGGERS = {
  CLICK: 'click',
  HOVER: 'hover'
};
var DEFAULT_ARROW_SIZE = 6;
var DEFAULT_BORDER_WIDTH = 1;
var PopoverComponent = styled.div(function (props) {
  return _objectSpread({
    display: 'inline-flex'
  }, evaluateStyle(props.userStyle, props));
});
var PopoverTarget = styled.div(function (props) {
  return _objectSpread({}, evaluateStyle(props.userStyle, props));
});
var PopoverContent = styled.div(function (props) {
  return _objectSpread({}, evaluateStyle(props.userStyle, props));
});
var PopoverBody = styled.div(function (props) {
  var style = null;

  if (props.position && props.position !== POSITIONS.AUTO && props.arrowSize) {
    style = _defineProperty({}, "margin".concat(capitalize(getOppositePosition(props.position))), props.arrowSize);
  }

  return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, props.theme.__reset__), style), {}, {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    background: props.background || props.theme.background,
    borderStyle: 'solid',
    borderWidth: props.borderWidth,
    borderColor: props.borderColor || props.theme.controlColorPrimary,
    boxShadow: props.theme.shadow,
    fontFamily: props.theme.fontFamily,
    fontSize: props.theme.fontSize,
    fontWeight: 'normal'
  }, props.popperStyles), evaluateStyle(props.userStyle, props));
});
var OuterArrow = styled.div(function (props) {
  var position = props.position,
      arrowSize = props.arrowSize,
      popperOffsets = props.popperOffsets;

  if (!arrowSize) {
    return null;
  }

  var arrowOffsets = popperOffsets.arrow || {};

  var style = _defineProperty({
    borderColor: props.borderColor || props.theme.controlColorPrimary
  }, getOppositePosition(position), -arrowSize);

  if (arrowOffsets.top) {
    style.top = arrowOffsets.top;
  }

  if (arrowOffsets.left) {
    style.left = arrowOffsets.left;
  }

  return Object.assign(style, evaluateStyle(props.userStyle, props), generateTriangleStyles(position, arrowSize));
});
var InnerArrow = styled.div(function (props) {
  var position = props.position,
      arrowSize = props.arrowSize;

  if (!arrowSize) {
    return null;
  }

  var isVertical = position === POSITIONS.TOP || position === POSITIONS.BOTTOM;
  var style = {
    borderColor: props.background || props.theme.background
  };

  if (isVertical) {
    style.left = -arrowSize;
    style.top = position === POSITIONS.TOP ? -arrowSize : 0;
    style.marginTop = (position === POSITIONS.TOP ? -1 : 1) * props.borderWidth;
  } else {
    style.top = -arrowSize;
    style.left = position === POSITIONS.LEFT ? -arrowSize : 0;
    style.marginLeft = (position === POSITIONS.LEFT ? -1 : 1) * props.borderWidth;
  }

  return Object.assign(style, evaluateStyle(props.userStyle, props), generateTriangleStyles(position, arrowSize));
});
var POSITIONS_PROP_TYPE = PropTypes.oneOf([POSITIONS.TOP, POSITIONS.RIGHT, POSITIONS.BOTTOM, POSITIONS.LEFT, POSITIONS.AUTO]);

var Popover = function (_React$Component) {
  _inherits(Popover, _React$Component);

  var _super = _createSuper(Popover);

  function Popover(props) {
    var _this;

    _classCallCheck(this, Popover);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_handleTargetClick", function () {
      _this._togglePopover();
    });

    _defineProperty(_assertThisInitialized(_this), "_handleTargetMouseEnter", function () {
      clearTimeout(_this.hideTimer);

      _this._showPopover();
    });

    _defineProperty(_assertThisInitialized(_this), "_handleTargetMouseLeave", function () {
      _this._hidePopoverWithDelay();
    });

    _defineProperty(_assertThisInitialized(_this), "_handlePopoverMouseEnter", function () {
      clearTimeout(_this.hideTimer);
    });

    _defineProperty(_assertThisInitialized(_this), "_handlePopoverMouseLeave", function () {
      _this._hidePopoverWithDelay();
    });

    _defineProperty(_assertThisInitialized(_this), "_handleKeyPress", function (evt) {
      if (evt.key === 'Escape') {
        _this._hidePopover();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handlePopperUpdate", function (data) {
      _this.setState({
        popperOffsets: data.offsets,
        popperPlacement: data.placement,
        popperStyles: data.styles
      });

      return data;
    });

    _defineProperty(_assertThisInitialized(_this), "_hidePopover", function () {
      _this.setState(_this._getDefaultState(_this.props));

      _this._destroyPopover();
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDocumentClick", function (evt) {
      if (!_this.$popper || nodeHasParent(evt.target, _this.$popper) || nodeHasParent(evt.target, _this.$target)) {
        return;
      }

      _this._hidePopover();
    });

    _this.state = _this._getDefaultState(props);
    return _this;
  }

  _createClass(Popover, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.isVisible && !prevState.isVisible) {
        var PopperClass = this.props.popperClass;
        this.popper = new PopperClass(this.$target, this.$popper, {
          placement: this.state.popperPlacement,
          modifiers: {
            arrow: {
              element: this.$arrow,
              enabled: true
            },
            applyStyle: {
              enabled: false
            },
            applyReactStyle: {
              enabled: true,
              fn: this._handlePopperUpdate,
              order: 900
            }
          }
        });

        if (this.props.trigger === TRIGGERS.CLICK) {
          this._addClickEvents();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._destroyPopover();

      this._removeClickEvents();
    }
  }, {
    key: "_getDefaultState",
    value: function _getDefaultState(props) {
      return {
        isVisible: false,
        popperOffsets: {},
        popperPlacement: positionsToPopperPlacement(props.position, props.arrowPosition),
        popperStyles: {}
      };
    }
  }, {
    key: "_showPopover",
    value: function _showPopover() {
      this.setState({
        isVisible: true
      });
    }
  }, {
    key: "_hidePopoverWithDelay",
    value: function _hidePopoverWithDelay() {
      var onMouseOutDelay = this.props.onMouseOutDelay;

      if (onMouseOutDelay) {
        this.hideTimer = setTimeout(this._hidePopover, onMouseOutDelay);
        return;
      }

      this._hidePopover();
    }
  }, {
    key: "_addClickEvents",
    value: function _addClickEvents() {
      if (!isBrowser) {
        return;
      }

      document.addEventListener('mousedown', this._handleDocumentClick);
      document.addEventListener('keyup', this._handleKeyPress);
    }
  }, {
    key: "_removeClickEvents",
    value: function _removeClickEvents() {
      if (!isBrowser) {
        return;
      }

      document.removeEventListener('mousedown', this._handleDocumentClick);
      document.removeEventListener('keyup', this._handleKeyPress);
    }
  }, {
    key: "_togglePopover",
    value: function _togglePopover() {
      var isVisible = !this.state.isVisible;
      this.setState({
        isVisible: isVisible
      });

      if (!isVisible) {
        this._destroyPopover();
      }
    }
  }, {
    key: "_destroyPopover",
    value: function _destroyPopover() {
      if (this.popper) {
        this.popper.destroy();
        delete this.popper;
      }

      if (this.props.trigger === TRIGGERS.CLICK) {
        this._removeClickEvents();
      }
    }
  }, {
    key: "_renderTarget",
    value: function _renderTarget(styleProps) {
      var _this2 = this;

      var _this$props = this.props,
          trigger = _this$props.trigger,
          style = _this$props.style;
      var interactionProps = {};

      if (trigger === TRIGGERS.HOVER) {
        interactionProps.onMouseEnter = this._handleTargetMouseEnter;
        interactionProps.onMouseLeave = this._handleTargetMouseLeave;
      } else if (trigger === TRIGGERS.CLICK) {
        interactionProps.onClick = this._handleTargetClick;
      }

      return React.createElement(PopoverTarget, _extends({}, interactionProps, {
        userStyle: style.target
      }, styleProps, {
        ref: function ref(el) {
          _this2.$target = el;
        }
      }), this.props.children);
    }
  }, {
    key: "_renderArrow",
    value: function _renderArrow(styleProps) {
      var _this3 = this;

      var style = this.props.style;
      return React.createElement(OuterArrow, _extends({
        userStyle: style.arrowBorder
      }, styleProps, {
        ref: function ref(el) {
          _this3.$arrow = el;
        }
      }), React.createElement(InnerArrow, _extends({
        userStyle: style.arrow
      }, styleProps)));
    }
  }, {
    key: "_renderBody",
    value: function _renderBody(styleProps) {
      var _this4 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          style = _this$props2.style,
          trigger = _this$props2.trigger;
      var interactionProps = {};

      if (trigger === TRIGGERS.HOVER) {
        interactionProps.onMouseEnter = this._handlePopoverMouseEnter;
        interactionProps.onMouseLeave = this._handlePopoverMouseLeave;
      }

      return React.createElement(PopoverBody, _extends({
        className: className
      }, interactionProps, {
        userStyle: style.body
      }, styleProps, {
        ref: function ref(el) {
          _this4.$popper = el;
        }
      }), this._renderContent(styleProps), this._renderArrow(styleProps));
    }
  }, {
    key: "_renderContent",
    value: function _renderContent(styleProps) {
      var content = typeof this.props.content === 'function' ? this.props.content() : this.props.content;
      return React.createElement(PopoverContent, _extends({
        userStyle: this.props.style.content
      }, styleProps), content);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          theme = _this$props3.theme,
          style = _this$props3.style;
      var _this$state = this.state,
          isVisible = _this$state.isVisible,
          popperPlacement = _this$state.popperPlacement,
          popperStyles = _this$state.popperStyles,
          popperOffsets = _this$state.popperOffsets;

      var _popperPlacement$spli = popperPlacement.split('-'),
          _popperPlacement$spli2 = _slicedToArray(_popperPlacement$spli, 1),
          position = _popperPlacement$spli2[0];

      var arrowPosition = position === POSITIONS.AUTO ? POSITIONS.TOP : position;
      var styleProps = {
        theme: theme,
        arrowSize: 'arrowSize' in style ? style.arrowSize : DEFAULT_ARROW_SIZE,
        background: style.background,
        borderWidth: 'borderWidth' in style ? style.borderWidth : DEFAULT_BORDER_WIDTH,
        borderColor: style.borderColor,
        position: position,
        arrowPosition: arrowPosition,
        popperStyles: popperStyles,
        popperOffsets: popperOffsets,
        isActive: isVisible
      };
      return React.createElement(PopoverComponent, _extends({
        userStyle: style.popover
      }, styleProps), this._renderTarget(styleProps), isVisible && this._renderBody(styleProps));
    }
  }]);

  return Popover;
}(React.Component);

_defineProperty(Popover, "propTypes", {
  className: PropTypes.string,
  style: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  position: POSITIONS_PROP_TYPE,
  arrowPosition: POSITIONS_PROP_TYPE,
  onMouseOutDelay: PropTypes.number,
  trigger: PropTypes.oneOf([TRIGGERS.HOVER, TRIGGERS.CLICK]),
  popperClass: PropTypes.func
});

_defineProperty(Popover, "defaultProps", {
  className: '',
  style: {},
  trigger: TRIGGERS.CLICK,
  onMouseOutDelay: 0,
  popperClass: Popper
});

var ThemedPopover = withTheme(Popover);
Object.assign(ThemedPopover, POSITIONS);
Object.assign(ThemedPopover, TRIGGERS);
export default ThemedPopover;
//# sourceMappingURL=popover.js.map