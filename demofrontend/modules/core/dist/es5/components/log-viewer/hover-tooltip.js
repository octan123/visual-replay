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

var _monochrome = require("@streetscape.gl/monochrome");

var _styled = _interopRequireDefault(require("@emotion/styled"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TooltipContainer = _styled["default"].div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    position: 'absolute',
    pointerEvents: 'none',
    margin: props.theme.spacingNormal,
    padding: props.theme.spacingNormal,
    maxWidth: 320,
    overflow: 'hidden',
    background: props.theme.background,
    color: props.theme.textColorPrimary,
    zIndex: 100001
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var KEY_BLACKLIST = new Set(['vertices', 'base', 'style', 'state', 'index', 'id', 'object_id']);

var HoverTooltip = function (_PureComponent) {
  (0, _inherits2["default"])(HoverTooltip, _PureComponent);

  var _super = _createSuper(HoverTooltip);

  function HoverTooltip() {
    var _this;

    (0, _classCallCheck2["default"])(this, HoverTooltip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderContent", function (info) {
      var streamName = info.layer.props.streamName;

      if (!streamName) {
        return _react["default"].createElement("div", null, _react["default"].createElement("b", null, info.layer.id));
      }

      var objectId = info.object.base && info.object.base.object_id;
      return [_react["default"].createElement("div", {
        key: "-stream-"
      }, _react["default"].createElement("div", null, _react["default"].createElement("b", null, "stream")), streamName), objectId ? _react["default"].createElement("div", {
        key: "-id-"
      }, _react["default"].createElement("div", null, _react["default"].createElement("b", null, "id")), objectId) : null, _react["default"].createElement("hr", {
        key: "-separator-"
      })].concat(_this._renderEntries(info.object.base), _this._renderEntries(info.object));
    });
    return _this;
  }

  (0, _createClass2["default"])(HoverTooltip, [{
    key: "_renderEntries",
    value: function _renderEntries(object) {
      if (!object) {
        return null;
      }

      return Object.keys(object).filter(function (key) {
        return !KEY_BLACKLIST.has(key) && object[key] !== undefined;
      }).map(function (key) {
        return _react["default"].createElement("div", {
          key: key
        }, _react["default"].createElement("div", null, _react["default"].createElement("b", null, key)), String(object[key]));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          info = _this$props.info,
          style = _this$props.style,
          _this$props$renderCon = _this$props.renderContent,
          renderContent = _this$props$renderCon === void 0 ? this._renderContent : _this$props$renderCon;
      return _react["default"].createElement(TooltipContainer, {
        theme: theme,
        style: {
          left: info.x,
          top: info.y
        },
        userStyle: style
      }, renderContent(info));
    }
  }]);
  return HoverTooltip;
}(_react.PureComponent);

var _default = (0, _monochrome.withTheme)(HoverTooltip);

exports["default"] = _default;
//# sourceMappingURL=hover-tooltip.js.map