import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

var XVIZContainer = function (_PureComponent) {
  _inherits(XVIZContainer, _PureComponent);

  var _super = _createSuper(XVIZContainer);

  function XVIZContainer() {
    _classCallCheck(this, XVIZContainer);

    return _super.apply(this, arguments);
  }

  _createClass(XVIZContainer, [{
    key: "render",
    value: function render() {
      var layout = this.props.layout;
      var layoutStyle = {
        display: 'flex',
        width: '100%'
      };
      var childStyle = {};

      switch (layout.toUpperCase()) {
        case 'VERTICAL':
          layoutStyle.flexDirection = 'column';
          childStyle.flex = '0 0 auto';
          break;

        case 'HORIZONTAL':
          layoutStyle.flexDirection = 'row';
          childStyle.flex = '1 1 auto';
          break;

        default:
          return null;
      }

      return React.createElement("div", {
        className: "xviz-container",
        style: layoutStyle
      }, React.Children.map(this.props.children, function (child) {
        return React.createElement("div", {
          style: childStyle
        }, child);
      }));
    }
  }]);

  return XVIZContainer;
}(PureComponent);

_defineProperty(XVIZContainer, "propTypes", {
  layout: PropTypes.string
});

_defineProperty(XVIZContainer, "defaultProps", {
  layout: 'VERTICAL'
});

export { XVIZContainer as default };
//# sourceMappingURL=xviz-container.js.map