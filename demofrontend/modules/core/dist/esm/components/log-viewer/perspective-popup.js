import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { Popup } from 'react-map-gl';
import { withTheme, evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
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
var PopupTip = styled.div(function (props) {
  return _objectSpread({
    position: 'absolute',
    width: 4,
    height: 4,
    margin: -2,
    borderRadius: 2,
    background: props.color
  }, evaluateStyle(props.userStyle, props));
});
var PopupLine = styled.div(function (props) {
  return _objectSpread({
    position: 'absolute',
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    borderColor: props.color
  }, evaluateStyle(props.userStyle, props));
});
var PopupContent = styled.div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    background: props.color
  }, evaluateStyle(props.userStyle, props));
});

var PerspectivePopup = function (_Popup) {
  _inherits(PerspectivePopup, _Popup);

  var _super = _createSuper(PerspectivePopup);

  function PerspectivePopup() {
    _classCallCheck(this, PerspectivePopup);

    return _super.apply(this, arguments);
  }

  _createClass(PerspectivePopup, [{
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

      var tipSize = evaluateStyle(objectLabelTipSize, styleProps);
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

      return React.createElement("div", {
        key: "tip",
        className: "mapboxgl-popup-tip",
        style: tipStyle
      }, React.createElement(PopupTip, _extends({
        style: tipCircleStyle
      }, styleProps, {
        userStyle: style.objectLabelTip
      })), React.createElement(PopupLine, _extends({
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
      return React.createElement(PopupContent, _extends({
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
}(Popup);

export default withTheme(PerspectivePopup);
//# sourceMappingURL=perspective-popup.js.map