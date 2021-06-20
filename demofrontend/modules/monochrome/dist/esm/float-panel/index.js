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
import Draggable from '../shared/draggable';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../shared/theme';
export var Container = styled.div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    position: 'absolute',
    boxSizing: 'content-box',
    boxShadow: props.theme.shadow,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: props.isMoving || props.isResizing ? props.theme.controlColorActive : props.theme.backgroundAlt
  }, evaluateStyle(props.userStyle, props));
});
export var ContentComponent = styled.div(function (props) {
  return _objectSpread({
    overflow: 'hidden',
    lineHeight: 0,
    boxSizing: 'content-box',
    position: 'relative'
  }, evaluateStyle(props.userStyle, props));
});
export var TitleComponent = styled.div(function (props) {
  return _objectSpread({
    background: props.isMoving || props.isResizing ? props.theme.controlColorActive : props.theme.backgroundAlt,
    color: props.isMoving || props.isResizing ? props.theme.textColorInvert : props.theme.textColorPrimary,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 2
  }, evaluateStyle(props.userStyle, props));
});
export var Resizer = styled.div(function (props) {
  return {
    position: 'absolute',
    width: 12,
    height: 12,
    right: 0,
    bottom: 0,
    zIndex: 1
  };
});

var FloatPanel = function (_PureComponent) {
  _inherits(FloatPanel, _PureComponent);

  var _super = _createSuper(FloatPanel);

  function FloatPanel(props) {
    var _this;

    _classCallCheck(this, FloatPanel);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_onMoveStart", function () {
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

    _defineProperty(_assertThisInitialized(_this), "_onMoveDrag", function (_ref) {
      var deltaX = _ref.deltaX,
          deltaY = _ref.deltaY;
      var startProps = _this.state.startProps;

      _this.props.onUpdate(_objectSpread(_objectSpread({}, startProps), {}, {
        x: Math.max(0, startProps.x + deltaX),
        y: Math.max(0, startProps.y + deltaY)
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_onMoveEnd", function (_ref2) {
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

    _defineProperty(_assertThisInitialized(_this), "_onResizeStart", function () {
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

    _defineProperty(_assertThisInitialized(_this), "_onResizeDrag", function (_ref3) {
      var deltaX = _ref3.deltaX,
          deltaY = _ref3.deltaY;
      var startProps = _this.state.startProps;

      _this.props.onUpdate(_objectSpread(_objectSpread({}, startProps), {}, {
        width: Math.max(0, startProps.width + deltaX),
        height: Math.max(0, startProps.height + deltaY)
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_onResizeEnd", function () {
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

  _createClass(FloatPanel, [{
    key: "renderMover",
    value: function renderMover(children) {
      var movable = this.props.movable;

      if (movable) {
        return React.createElement(Draggable, {
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

      return React.createElement(ContentComponent, _extends({}, styleProps, {
        userStyle: style.content,
        style: {
          height: height
        }
      }), this.props.children, resizable && React.createElement(Draggable, {
        onDragStart: this._onResizeStart,
        onDrag: this._onResizeDrag,
        onDragEnd: this._onResizeEnd,
        style: {
          cursor: 'nwse-resize'
        }
      }, React.createElement(Resizer, _extends({}, styleProps, {
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
      return React.createElement(Container, _extends({
        className: className
      }, styleProps, {
        userStyle: style.wrapper,
        style: wrapperStyle
      }), title ? this.renderMover(React.createElement(TitleComponent, _extends({}, styleProps, {
        userStyle: style.title
      }), title)) : this.renderMover(this.renderContent(styleProps)), title && this.renderContent(styleProps));
    }
  }]);

  return FloatPanel;
}(PureComponent);

_defineProperty(FloatPanel, "propTypes", {
  className: PropTypes.string,
  style: PropTypes.object,
  parentWidth: PropTypes.number,
  parentHeight: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  minimized: PropTypes.bool,
  movable: PropTypes.bool,
  resizable: PropTypes.bool,
  minimizable: PropTypes.bool,
  onUpdate: PropTypes.func,
  onMoveEnd: PropTypes.func,
  onResizeEnd: PropTypes.func
});

_defineProperty(FloatPanel, "defaultProps", {
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

export default withTheme(FloatPanel);
//# sourceMappingURL=index.js.map