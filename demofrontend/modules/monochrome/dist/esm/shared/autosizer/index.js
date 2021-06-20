import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import debounce from 'debounce';

var noop = function noop() {
  return null;
};

var SizeSensor = function (_Component) {
  _inherits(SizeSensor, _Component);

  var _super = _createSuper(SizeSensor);

  function SizeSensor() {
    var _this;

    _classCallCheck(this, SizeSensor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_onResize", function (size) {
      if (_this.resize) {
        _this.resize(size);
      } else if (_this.props.onResize) {
        var _this$props = _this.props,
            onResize = _this$props.onResize,
            debounceTime = _this$props.debounceTime;
        onResize(size);
        _this.resize = debounceTime > 0 ? debounce(onResize, debounceTime) : onResize;
      }
    });

    return _this;
  }

  _createClass(SizeSensor, [{
    key: "render",
    value: function render() {
      return React.createElement(AutoSizer, {
        onResize: this._onResize
      }, this.props.children || noop);
    }
  }]);

  return SizeSensor;
}(Component);

_defineProperty(SizeSensor, "propTypes", {
  debounceTime: PropTypes.number
});

export { SizeSensor as default };
//# sourceMappingURL=index.js.map