"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Resizer = exports.TitleComponent = exports.ContentComponent = exports.Container = void 0;

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

var _draggable = _interopRequireDefault(require("../shared/draggable"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../shared/theme");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Container = _styled["default"].div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    position: 'absolute',
    boxSizing: 'content-box',
    boxShadow: props.theme.shadow,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: props.isMoving || props.isResizing ? props.theme.controlColorActive : props.theme.backgroundAlt
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Container = Container;

var ContentComponent = _styled["default"].div(function (props) {
  return _objectSpread({
    overflow: 'hidden',
    lineHeight: 0,
    boxSizing: 'content-box',
    position: 'relative'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ContentComponent = ContentComponent;

var TitleComponent = _styled["default"].div(function (props) {
  return _objectSpread({
    background: props.isMoving || props.isResizing ? props.theme.controlColorActive : props.theme.backgroundAlt,
    color: props.isMoving || props.isResizing ? props.theme.textColorInvert : props.theme.textColorPrimary,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 2
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.TitleComponent = TitleComponent;

var Resizer = _styled["default"].div(function (props) {
  return {
    position: 'absolute',
    width: 12,
    height: 12,
    right: 0,
    bottom: 0,
    zIndex: 1
  };
});

exports.Resizer = Resizer;

var FloatPanel = function (_PureComponent) {
  (0, _inherits2["default"])(FloatPanel, _PureComponent);

  var _super = _createSuper(FloatPanel);

  function FloatPanel(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, FloatPanel);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMoveStart", function () {
      var _this$props = _this.props,
          x = _this$props.x,
          y = _this$props.y,
          width = _this$props.width,
          height = _this$props.height,
          minimized = _this$props.minimized;

      _this.setState({
        isMoving: true,
        startProps: {
          x: x,
          y: y,
          width: width,
          height: height,
          minimized: minimized
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMoveDrag", function (_ref) {
      var deltaX = _ref.deltaX,
          deltaY = _ref.deltaY;
      var startProps = _this.state.startProps;

      _this.props.onUpdate(_objectSpread(_objectSpread({}, startProps), {}, {
        x: Math.max(0, startProps.x + deltaX),
        y: Math.max(0, startProps.y + deltaY)
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMoveEnd", function (_ref2) {
      var hasDragged = _ref2.hasDragged;

      if (_this.props.minimizable && _this.props.title && !hasDragged) {
        var startProps = _this.state.startProps;

        _this.props.onUpdate(_objectSpread(_objectSpread({}, startProps), {}, {
          minimized: !startProps.minimized
        }));
      }

      _this.setState({
        isMoving: false
      });

      _this.props.onMoveEnd();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onResizeStart", function () {
      var _this$props2 = _this.props,
          x = _this$props2.x,
          y = _this$props2.y,
          width = _this$props2.width,
          height = _this$props2.height,
          minimized = _this$props2.minimized;

      _this.setState({
        isResizing: true,
        startProps: {
          x: x,
          y: y,
          width: width,
          height: height,
          minimized: minimized
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onResizeDrag", function (_ref3) {
      var deltaX = _ref3.deltaX,
          deltaY = _ref3.deltaY;
      var startProps = _this.state.startProps;

      _this.props.onUpdate(_objectSpread(_objectSpread({}, startProps), {}, {
        width: Math.max(0, startProps.width + deltaX),
        height: Math.max(0, startProps.height + deltaY)
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onResizeEnd", function () {
      _this.setState({
        isResizing: false
      });

      _this.props.onResizeEnd();
    });
    _this.state = {
      isMoving: false,
      isResizing: false,
      startProps: null
    };
    return _this;
  }

  (0, _createClass2["default"])(FloatPanel, [{
    key: "renderMover",
    value: function renderMover(children) {
      var movable = this.props.movable;

      if (movable) {
        return _react["default"].createElement(_draggable["default"], {
          onDragStart: this._onMoveStart,
          onDrag: this._onMoveDrag,
          onDragEnd: this._onMoveEnd
        }, children);
      }

      return children;
    }
  }, {
    key: "renderContent",
    value: function renderContent(styleProps) {
      var _this$props3 = this.props,
          style = _this$props3.style,
          height = _this$props3.height,
          minimized = _this$props3.minimized,
          minimizable = _this$props3.minimizable,
          resizable = _this$props3.resizable;

      if (minimizable && minimized) {
        return null;
      }

      return _react["default"].createElement(ContentComponent, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.content,
        style: {
          height: height
        }
      }), this.props.children, resizable && _react["default"].createElement(_draggable["default"], {
        onDragStart: this._onResizeStart,
        onDrag: this._onResizeDrag,
        onDragEnd: this._onResizeEnd,
        style: {
          cursor: 'nwse-resize'
        }
      }, _react["default"].createElement(Resizer, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.resizer
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          theme = _this$props4.theme,
          style = _this$props4.style,
          title = _this$props4.title,
          x = _this$props4.x,
          y = _this$props4.y,
          width = _this$props4.width,
          height = _this$props4.height,
          className = _this$props4.className,
          parentWidth = _this$props4.parentWidth,
          parentHeight = _this$props4.parentHeight;
      var _this$state = this.state,
          isMoving = _this$state.isMoving,
          isResizing = _this$state.isResizing;
      var styleProps = {
        theme: theme,
        isMoving: isMoving,
        isResizing: isResizing
      };
      var wrapperStyle = {
        left: Math.min(x, Math.max(0, parentWidth - width)),
        top: Math.min(y, Math.max(0, parentHeight - height)),
        width: width
      };
      return _react["default"].createElement(Container, (0, _extends2["default"])({
        className: className
      }, styleProps, {
        userStyle: style.wrapper,
        style: wrapperStyle
      }), title ? this.renderMover(_react["default"].createElement(TitleComponent, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.title
      }), title)) : this.renderMover(this.renderContent(styleProps)), title && this.renderContent(styleProps));
    }
  }]);
  return FloatPanel;
}(_react.PureComponent);

(0, _defineProperty2["default"])(FloatPanel, "propTypes", {
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  parentWidth: _propTypes["default"].number,
  parentHeight: _propTypes["default"].number,
  title: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
  x: _propTypes["default"].number.isRequired,
  y: _propTypes["default"].number.isRequired,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  minimized: _propTypes["default"].bool,
  movable: _propTypes["default"].bool,
  resizable: _propTypes["default"].bool,
  minimizable: _propTypes["default"].bool,
  onUpdate: _propTypes["default"].func,
  onMoveEnd: _propTypes["default"].func,
  onResizeEnd: _propTypes["default"].func
});
(0, _defineProperty2["default"])(FloatPanel, "defaultProps", {
  style: {},
  parentWidth: Infinity,
  parentHeight: Infinity,
  className: '',
  title: '',
  minimized: false,
  movable: true,
  resizable: false,
  minimizable: true,
  onUpdate: function onUpdate() {},
  onMoveEnd: function onMoveEnd() {},
  onResizeEnd: function onResizeEnd() {}
});

var _default = (0, _theme.withTheme)(FloatPanel);

exports["default"] = _default;
//# sourceMappingURL=index.js.map