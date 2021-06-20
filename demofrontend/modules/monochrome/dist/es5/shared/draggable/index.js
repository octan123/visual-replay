"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../theme");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ContainerComponent = _styled["default"].div(function (props) {
  return _objectSpread({
    margin: -props.tolerance,
    padding: props.tolerance,
    cursor: props.isActive ? 'grabbing' : props.isEnabled ? 'grab' : 'inherit'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
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
  (0, _inherits2["default"])(Draggable, _PureComponent);

  var _super = _createSuper(Draggable);

  function Draggable(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Draggable);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getEventData", function (evt) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseDown", function (evt) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseMove", function (evt) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseUp", function (evt) {
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

  (0, _createClass2["default"])(Draggable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          style = _this$props.style,
          isEnabled = _this$props.isEnabled,
          className = _this$props.className,
          tolerance = _this$props.tolerance;
      var isMouseDown = this.state.isMouseDown;
      return _react["default"].createElement(ContainerComponent, {
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
      }, isMouseDown && _react["default"].createElement("div", {
        style: BACKDROP_STYLES
      }), this.props.children);
    }
  }]);
  return Draggable;
}(_react.PureComponent);

exports["default"] = Draggable;
(0, _defineProperty2["default"])(Draggable, "propTypes", {
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  tolerance: _propTypes["default"].number,
  isEnabled: _propTypes["default"].bool,
  onDragStart: _propTypes["default"].func,
  onDrag: _propTypes["default"].func,
  onDragEnd: _propTypes["default"].func
});
(0, _defineProperty2["default"])(Draggable, "defaultProps", {
  className: '',
  isEnabled: true,
  tolerance: 0,
  onDragStart: noop,
  onDrag: noop,
  onDragEnd: noop
});
//# sourceMappingURL=index.js.map