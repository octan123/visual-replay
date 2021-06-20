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
import { withTheme, evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
var TooltipContainer = styled.div(function (props) {
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
  }, evaluateStyle(props.userStyle, props));
});
var KEY_BLACKLIST = new Set(['vertices', 'base', 'style', 'state', 'index', 'id', 'object_id']);

var HoverTooltip = function (_PureComponent) {
  _inherits(HoverTooltip, _PureComponent);

  var _super = _createSuper(HoverTooltip);

  function HoverTooltip() {
    var _this;

    _classCallCheck(this, HoverTooltip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_renderContent", function (info) {
      var streamName = info.layer.props.streamName;

      if (!streamName) {
        return React.createElement("div", null, React.createElement("b", null, info.layer.id));
      }

      var objectId = info.object.base && info.object.base.object_id;
      return [React.createElement("div", {
        key: "-stream-"
      }, React.createElement("div", null, React.createElement("b", null, "stream")), streamName), objectId ? React.createElement("div", {
        key: "-id-"
      }, React.createElement("div", null, React.createElement("b", null, "id")), objectId) : null, React.createElement("hr", {
        key: "-separator-"
      })].concat(_this._renderEntries(info.object.base), _this._renderEntries(info.object));
    });

    return _this;
  }

  _createClass(HoverTooltip, [{
    key: "_renderEntries",
    value: function _renderEntries(object) {
      if (!object) {
        return null;
      }

      return Object.keys(object).filter(function (key) {
        return !KEY_BLACKLIST.has(key) && object[key] !== undefined;
      }).map(function (key) {
        return React.createElement("div", {
          key: key
        }, React.createElement("div", null, React.createElement("b", null, key)), String(object[key]));
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
      return React.createElement(TooltipContainer, {
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
}(PureComponent);

export default withTheme(HoverTooltip);
//# sourceMappingURL=hover-tooltip.js.map