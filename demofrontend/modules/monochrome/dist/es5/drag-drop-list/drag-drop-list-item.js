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

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _draggable = _interopRequireDefault(require("../shared/draggable"));

var _styledComponents = require("./styled-components");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var noop = function noop() {};

var TRANSITION = 300;

var DragDropListItem = function (_React$PureComponent) {
  (0, _inherits2["default"])(DragDropListItem, _React$PureComponent);

  var _super = _createSuper(DragDropListItem);

  function DragDropListItem() {
    var _this;

    (0, _classCallCheck2["default"])(this, DragDropListItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_container", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_timer", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseEnter", function () {
      return _this.setState({
        isHovered: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseLeave", function () {
      return _this.setState({
        isHovered: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragStart", function (evt) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragMove", function (evt) {
      _this.setState({
        dragPos: evt
      });

      _this.props.onDragMove(evt);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragEnd", function (evt) {
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

  (0, _createClass2["default"])(DragDropListItem, [{
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
      return React.createElement(_draggable["default"], {
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
      return title ? React.createElement(_styledComponents.ListItemContainer, (0, _extends2["default"])({
        className: className
      }, styleProps, {
        userStyle: style.item,
        style: itemStyle
      }), this.renderMover(React.createElement(_styledComponents.ListItemTitle, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.title,
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave
      }), title)), this.props.children) : this.renderMover(React.createElement(_styledComponents.ListItemContainer, (0, _extends2["default"])({
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
      }, this.renderContent(), isActive && React.createElement(_styledComponents.ListItemPlaceholder, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.placeholder,
        style: placeholderStyle
      })));
    }
  }]);
  return DragDropListItem;
}(React.PureComponent);

exports["default"] = DragDropListItem;
(0, _defineProperty2["default"])(DragDropListItem, "propTypes", {
  className: _propTypes["default"].string,
  title: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  removed: _propTypes["default"].bool,
  style: _propTypes["default"].object.isRequired,
  onDragStart: _propTypes["default"].func,
  onDragMove: _propTypes["default"].func,
  onDragEnd: _propTypes["default"].func
});
(0, _defineProperty2["default"])(DragDropListItem, "defaultProps", {
  className: '',
  removed: false,
  onDragStart: noop,
  onDragMove: noop,
  onDragEnd: noop
});
//# sourceMappingURL=drag-drop-list-item.js.map