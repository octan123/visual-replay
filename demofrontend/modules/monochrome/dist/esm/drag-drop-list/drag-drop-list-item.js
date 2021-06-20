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

import * as React from 'react';
import PropTypes from 'prop-types';
import Draggable from '../shared/draggable';
import { ListItemContainer, ListItemTitle, ListItemPlaceholder } from './styled-components';

var noop = function noop() {};

var TRANSITION = 300;

var DragDropListItem = function (_React$PureComponent) {
  _inherits(DragDropListItem, _React$PureComponent);

  var _super = _createSuper(DragDropListItem);

  function DragDropListItem() {
    var _this;

    _classCallCheck(this, DragDropListItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isHovered: false,
      isDragging: false,
      isActive: false,
      width: 0,
      height: 0,
      dragStartOffset: {
        left: 0,
        top: 0
      },
      dragPos: {
        deltaX: 0,
        deltaY: 0
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_container", void 0);

    _defineProperty(_assertThisInitialized(_this), "_timer", null);

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

    _defineProperty(_assertThisInitialized(_this), "_onDragStart", function (evt) {
      var container = _this._container;

      _this.setState({
        isDragging: true,
        isActive: true,
        width: container.offsetWidth,
        height: container.offsetHeight,
        dragStartOffset: container.getBoundingClientRect(),
        dragPos: evt
      });

      _this.props.onDragStart(evt);
    });

    _defineProperty(_assertThisInitialized(_this), "_onDragMove", function (evt) {
      _this.setState({
        dragPos: evt
      });

      _this.props.onDragMove(evt);
    });

    _defineProperty(_assertThisInitialized(_this), "_onDragEnd", function (evt) {
      _this.setState({
        isDragging: false,
        dragStartOffset: _this._container.getBoundingClientRect(),
        dragPos: {
          deltaX: 0,
          deltaY: 0
        }
      });

      if (_this.props.removed) {
        _this.props.onDragEnd(evt);
      } else {
        _this._timer = window.setTimeout(function () {
          _this.setState({
            isActive: false
          });

          _this.props.onDragEnd(evt);
        }, TRANSITION);
      }
    });

    return _this;
  }

  _createClass(DragDropListItem, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.clearTimeout(this._timer);
    }
  }, {
    key: "getBoundingBox",
    value: function getBoundingBox() {
      return this._container.getBoundingClientRect();
    }
  }, {
    key: "renderTitle",
    value: function renderTitle() {
      var title = this.props.title;
      return typeof title === 'function' ? title() : title;
    }
  }, {
    key: "renderMover",
    value: function renderMover(children) {
      return React.createElement(Draggable, {
        onDragStart: this._onDragStart,
        onDrag: this._onDragMove,
        onDragEnd: this._onDragEnd
      }, children);
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props = this.props,
          className = _this$props.className,
          removed = _this$props.removed,
          theme = _this$props.theme,
          style = _this$props.style;
      var _this$state = this.state,
          isHovered = _this$state.isHovered,
          isDragging = _this$state.isDragging,
          isActive = _this$state.isActive,
          width = _this$state.width,
          height = _this$state.height,
          dragPos = _this$state.dragPos,
          dragStartOffset = _this$state.dragStartOffset;
      var styleProps = {
        theme: theme,
        isRemoved: removed,
        isHovered: isHovered,
        isDragging: isDragging,
        isActive: isActive
      };
      var title = this.renderTitle();
      var itemStyle = isActive ? {
        left: dragStartOffset.left + dragPos.deltaX,
        top: dragStartOffset.top + dragPos.deltaY,
        width: width,
        height: height
      } : null;
      return title ? React.createElement(ListItemContainer, _extends({
        className: className
      }, styleProps, {
        userStyle: style.item,
        style: itemStyle
      }), this.renderMover(React.createElement(ListItemTitle, _extends({}, styleProps, {
        userStyle: style.title,
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave
      }), title)), this.props.children) : this.renderMover(React.createElement(ListItemContainer, _extends({
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave,
        className: className
      }, styleProps, {
        userStyle: style.item,
        style: itemStyle
      }), this.props.children));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          theme = _this$props2.theme,
          removed = _this$props2.removed,
          style = _this$props2.style;
      var _this$state2 = this.state,
          isHovered = _this$state2.isHovered,
          isDragging = _this$state2.isDragging,
          isActive = _this$state2.isActive,
          width = _this$state2.width,
          height = _this$state2.height;
      var styleProps = {
        theme: theme,
        isRemoved: removed,
        isHovered: isHovered,
        isDragging: isDragging,
        isActive: isActive
      };
      var placeholderStyle = {
        width: width,
        height: removed ? 0 : height
      };
      return React.createElement("div", {
        ref: function ref(_ref) {
          _this2._container = _ref;
        }
      }, this.renderContent(), isActive && React.createElement(ListItemPlaceholder, _extends({}, styleProps, {
        userStyle: style.placeholder,
        style: placeholderStyle
      })));
    }
  }]);

  return DragDropListItem;
}(React.PureComponent);

_defineProperty(DragDropListItem, "propTypes", {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  removed: PropTypes.bool,
  style: PropTypes.object.isRequired,
  onDragStart: PropTypes.func,
  onDragMove: PropTypes.func,
  onDragEnd: PropTypes.func
});

_defineProperty(DragDropListItem, "defaultProps", {
  className: '',
  removed: false,
  onDragStart: noop,
  onDragMove: noop,
  onDragEnd: noop
});

export { DragDropListItem as default };
//# sourceMappingURL=drag-drop-list-item.js.map