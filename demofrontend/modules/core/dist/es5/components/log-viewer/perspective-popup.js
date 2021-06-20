"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactMapGl = require("react-map-gl");

var _monochrome = require("@streetscape.gl/monochrome");

var _styled = _interopRequireDefault(require("@emotion/styled"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ANCHOR_POSITION = {
  top: {
    x: 0.5,
    y: 0
  },
  'top-left': {
    x: 0,
    y: 0
  },
  'top-right': {
    x: 1,
    y: 0
  },
  bottom: {
    x: 0.5,
    y: 1
  },
  'bottom-left': {
    x: 0,
    y: 1
  },
  'bottom-right': {
    x: 1,
    y: 1
  },
  left: {
    x: 0,
    y: 0.5
  },
  right: {
    x: 1,
    y: 0.5
  }
};

var PopupTip = _styled["default"].div(function (props) {
  return _objectSpread({
    position: 'absolute',
    width: 4,
    height: 4,
    margin: -2,
    borderRadius: 2,
    background: props.color
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var PopupLine = _styled["default"].div(function (props) {
  return _objectSpread({
    position: 'absolute',
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    borderColor: props.color
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var PopupContent = _styled["default"].div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    background: props.color
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var PerspectivePopup = function (_Popup) {
  (0, _inherits2["default"])(PerspectivePopup, _Popup);

  var _super = _createSuper(PerspectivePopup);

  function PerspectivePopup() {
    (0, _classCallCheck2["default"])(this, PerspectivePopup);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(PerspectivePopup, [{
    key: "_renderTip",
    value: function _renderTip(positionType) {
      var anchorPosition = ANCHOR_POSITION[positionType];
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style;
      var _style$objectLabelTip = style.objectLabelTipSize,
          objectLabelTipSize = _style$objectLabelTip === void 0 ? 30 : _style$objectLabelTip,
          _style$objectLabelCol = style.objectLabelColor,
          objectLabelColor = _style$objectLabelCol === void 0 ? theme.background : _style$objectLabelCol;

      var styleProps = _objectSpread(_objectSpread({}, this.props.styleProps), {}, {
        theme: theme,
        color: objectLabelColor,
        position: positionType
      });

      var tipSize = (0, _monochrome.evaluateStyle)(objectLabelTipSize, styleProps);
      var tipStyle = {
        width: tipSize,
        height: tipSize,
        position: 'relative',
        border: 'none'
      };
      var tipCircleStyle = {};
      var tipLineStyle = {};

      switch (anchorPosition.x) {
        case 0.5:
          tipCircleStyle.left = '50%';
          tipLineStyle.left = '50%';
          break;

        case 1:
          tipCircleStyle.right = 0;
          tipLineStyle.right = 0;
          break;

        case 0:
        default:
      }

      switch (anchorPosition.y) {
        case 0.5:
          tipLineStyle.width = '100%';
          tipCircleStyle.top = '50%';
          tipLineStyle.top = '50%';
          break;

        case 1:
          tipCircleStyle.bottom = 0;
          tipLineStyle.height = '100%';
          break;

        case 0:
        default:
          tipLineStyle.height = '100%';
      }

      return _react["default"].createElement("div", {
        key: "tip",
        className: "mapboxgl-popup-tip",
        style: tipStyle
      }, _react["default"].createElement(PopupTip, (0, _extends2["default"])({
        style: tipCircleStyle
      }, styleProps, {
        userStyle: style.objectLabelTip
      })), _react["default"].createElement(PopupLine, (0, _extends2["default"])({
        style: tipLineStyle
      }, styleProps, {
        userStyle: style.objectLabelLine
      })));
    }
  }, {
    key: "_renderContent",
    value: function _renderContent() {
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          styleProps = _this$props2.styleProps,
          style = _this$props2.style;
      return _react["default"].createElement(PopupContent, (0, _extends2["default"])({
        key: "content",
        ref: this._contentLoaded,
        className: "mapboxgl-popup-content",
        theme: theme
      }, styleProps, {
        color: style.objectLabelColor,
        userStyle: style.objectLabelBody
      }), this.props.children);
    }
  }]);
  return PerspectivePopup;
}(_reactMapGl.Popup);

var _default = (0, _monochrome.withTheme)(PerspectivePopup);

exports["default"] = _default;
//# sourceMappingURL=perspective-popup.js.map