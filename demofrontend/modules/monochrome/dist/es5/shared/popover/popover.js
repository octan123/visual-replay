"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TRIGGERS = exports.POSITIONS = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _popper = _interopRequireDefault(require("popper.js"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../theme");

var _utils = require("./utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var isBrowser = typeof document !== 'undefined' && Boolean(document.createElement);
var POSITIONS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  AUTO: 'auto'
};
exports.POSITIONS = POSITIONS;
var TRIGGERS = {
  CLICK: 'click',
  HOVER: 'hover'
};
exports.TRIGGERS = TRIGGERS;
var DEFAULT_ARROW_SIZE = 6;
var DEFAULT_BORDER_WIDTH = 1;

var PopoverComponent = _styled["default"].div(function (props) {
  return _objectSpread({
    display: 'inline-flex'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var PopoverTarget = _styled["default"].div(function (props) {
  return _objectSpread({}, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var PopoverContent = _styled["default"].div(function (props) {
  return _objectSpread({}, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var PopoverBody = _styled["default"].div(function (props) {
  var style = null;

  if (props.position && props.position !== POSITIONS.AUTO && props.arrowSize) {
    style = (0, _defineProperty2["default"])({}, "margin".concat((0, _utils.capitalize)((0, _utils.getOppositePosition)(props.position))), props.arrowSize);
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
  }, props.popperStyles), (0, _theme.evaluateStyle)(props.userStyle, props));
});

var OuterArrow = _styled["default"].div(function (props) {
  var position = props.position,
      arrowSize = props.arrowSize,
      popperOffsets = props.popperOffsets;

  if (!arrowSize) {
    return null;
  }

  var arrowOffsets = popperOffsets.arrow || {};
  var style = (0, _defineProperty2["default"])({
    borderColor: props.borderColor || props.theme.controlColorPrimary
  }, (0, _utils.getOppositePosition)(position), -arrowSize);

  if (arrowOffsets.top) {
    style.top = arrowOffsets.top;
  }

  if (arrowOffsets.left) {
    style.left = arrowOffsets.left;
  }

  return Object.assign(style, (0, _theme.evaluateStyle)(props.userStyle, props), (0, _utils.generateTriangleStyles)(position, arrowSize));
});

var InnerArrow = _styled["default"].div(function (props) {
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

  return Object.assign(style, (0, _theme.evaluateStyle)(props.userStyle, props), (0, _utils.generateTriangleStyles)(position, arrowSize));
});

var POSITIONS_PROP_TYPE = _propTypes["default"].oneOf([POSITIONS.TOP, POSITIONS.RIGHT, POSITIONS.BOTTOM, POSITIONS.LEFT, POSITIONS.AUTO]);

var Popover = function (_React$Component) {
  (0, _inherits2["default"])(Popover, _React$Component);

  var _super = _createSuper(Popover);

  function Popover(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Popover);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleTargetClick", function () {
      _this._togglePopover();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleTargetMouseEnter", function () {
      clearTimeout(_this.hideTimer);

      _this._showPopover();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleTargetMouseLeave", function () {
      _this._hidePopoverWithDelay();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handlePopoverMouseEnter", function () {
      clearTimeout(_this.hideTimer);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handlePopoverMouseLeave", function () {
      _this._hidePopoverWithDelay();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleKeyPress", function (evt) {
      if (evt.key === 'Escape') {
        _this._hidePopover();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handlePopperUpdate", function (data) {
      _this.setState({
        popperOffsets: data.offsets,
        popperPlacement: data.placement,
        popperStyles: data.styles
      });

      return data;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_hidePopover", function () {
      _this.setState(_this._getDefaultState(_this.props));

      _this._destroyPopover();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleDocumentClick", function (evt) {
      if (!_this.$popper || (0, _utils.nodeHasParent)(evt.target, _this.$popper) || (0, _utils.nodeHasParent)(evt.target, _this.$target)) {
        return;
      }

      _this._hidePopover();
    });
    _this.state = _this._getDefaultState(props);
    return _this;
  }

  (0, _createClass2["default"])(Popover, [{
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
        popperPlacement: (0, _utils.positionsToPopperPlacement)(props.position, props.arrowPosition),
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

      return _react["default"].createElement(PopoverTarget, (0, _extends2["default"])({}, interactionProps, {
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
      return _react["default"].createElement(OuterArrow, (0, _extends2["default"])({
        userStyle: style.arrowBorder
      }, styleProps, {
        ref: function ref(el) {
          _this3.$arrow = el;
        }
      }), _react["default"].createElement(InnerArrow, (0, _extends2["default"])({
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

      return _react["default"].createElement(PopoverBody, (0, _extends2["default"])({
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
      return _react["default"].createElement(PopoverContent, (0, _extends2["default"])({
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
          _popperPlacement$spli2 = (0, _slicedToArray2["default"])(_popperPlacement$spli, 1),
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
      return _react["default"].createElement(PopoverComponent, (0, _extends2["default"])({
        userStyle: style.popover
      }, styleProps), this._renderTarget(styleProps), isVisible && this._renderBody(styleProps));
    }
  }]);
  return Popover;
}(_react["default"].Component);

(0, _defineProperty2["default"])(Popover, "propTypes", {
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  content: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]).isRequired,
  position: POSITIONS_PROP_TYPE,
  arrowPosition: POSITIONS_PROP_TYPE,
  onMouseOutDelay: _propTypes["default"].number,
  trigger: _propTypes["default"].oneOf([TRIGGERS.HOVER, TRIGGERS.CLICK]),
  popperClass: _propTypes["default"].func
});
(0, _defineProperty2["default"])(Popover, "defaultProps", {
  className: '',
  style: {},
  trigger: TRIGGERS.CLICK,
  onMouseOutDelay: 0,
  popperClass: _popper["default"]
});
var ThemedPopover = (0, _theme.withTheme)(Popover);
Object.assign(ThemedPopover, POSITIONS);
Object.assign(ThemedPopover, TRIGGERS);
var _default = ThemedPopover;
exports["default"] = _default;
//# sourceMappingURL=popover.js.map