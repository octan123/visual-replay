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
import { evaluateStyle } from '../theme';
var ContainerComponent = styled.div(function (props) {
  return _objectSpread({
    margin: -props.tolerance,
    padding: props.tolerance,
    cursor: props.isActive ? 'grabbing' : props.isEnabled ? 'grab' : 'inherit'
  }, evaluateStyle(props.userStyle, props));
});
var BACKDROP_STYLES = {
  position: 'fixed',
  zIndex: 999,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
};

function noop() {}

var Draggable = function (_PureComponent) {
  _inherits(Draggable, _PureComponent);

  var _super = _createSuper(Draggable);

  function Draggable(props) {
    var _this;

    _classCallCheck(this, Draggable);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_getEventData", function (evt) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.offset;
      var _this$state = _this.state,
          dragStartPos = _this$state.dragStartPos,
          hasDragged = _this$state.hasDragged;
      var result = {
        srcEvent: evt,
        x: evt.clientX,
        y: evt.clientY,
        offsetX: evt.clientX - offset.left,
        offsetY: evt.clientY - offset.top,
        hasDragged: hasDragged
      };

      if (dragStartPos) {
        result.deltaX = result.x - dragStartPos.x;
        result.deltaY = result.y - dragStartPos.y;
      } else {
        result.deltaX = 0;
        result.deltaY = 0;
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseDown", function (evt) {
      if (!_this.props.isEnabled) {
        return;
      }

      evt.stopPropagation();

      var offset = _this._element.getBoundingClientRect();

      var eventData = _this._getEventData(evt, offset);

      _this.setState({
        isMouseDown: true,
        hasDragged: false,
        offset: offset,
        dragStartPos: {
          x: eventData.x,
          y: eventData.y
        }
      });

      _this.props.onDragStart(eventData);
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseMove", function (evt) {
      if (!_this.props.isEnabled) {
        return;
      }

      evt.stopPropagation();

      if (_this.state.isMouseDown) {
        var eventData = _this._getEventData(evt);

        var deltaX = eventData.deltaX,
            deltaY = eventData.deltaY;

        if (!_this.state.hasDragged) {
          if (deltaX || deltaY) {
            _this.setState({
              hasDragged: true
            });
          } else {
            return;
          }
        }

        _this.props.onDrag(eventData);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseUp", function (evt) {
      if (_this.state.isMouseDown) {
        _this.setState({
          isMouseDown: false,
          dragStartPos: null
        });

        _this.props.onDragEnd(_this._getEventData(evt));
      }
    });

    _this.state = {
      isMouseDown: false,
      dragStartPos: null,
      hasDragged: false
    };
    return _this;
  }

  _createClass(Draggable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          style = _this$props.style,
          isEnabled = _this$props.isEnabled,
          className = _this$props.className,
          tolerance = _this$props.tolerance;
      var isMouseDown = this.state.isMouseDown;
      return React.createElement(ContainerComponent, {
        className: className,
        ref: function ref(_ref) {
          _this2._element = _ref;
        },
        tolerance: tolerance,
        isEnabled: isEnabled,
        isActive: isMouseDown,
        userStyle: style,
        onMouseDown: this._onMouseDown,
        onMouseMove: this._onMouseMove,
        onMouseLeave: this._onMouseUp,
        onMouseUp: this._onMouseUp
      }, isMouseDown && React.createElement("div", {
        style: BACKDROP_STYLES
      }), this.props.children);
    }
  }]);

  return Draggable;
}(PureComponent);

_defineProperty(Draggable, "propTypes", {
  className: PropTypes.string,
  style: PropTypes.object,
  tolerance: PropTypes.number,
  isEnabled: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func
});

_defineProperty(Draggable, "defaultProps", {
  className: '',
  isEnabled: true,
  tolerance: 0,
  onDragStart: noop,
  onDrag: noop,
  onDragEnd: noop
});

export { Draggable as default };
//# sourceMappingURL=index.js.map