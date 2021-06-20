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
import { boolean as _boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import README from './README.md';
import Toggle from './index';

var ToggleExample = function (_Component) {
  _inherits(ToggleExample, _Component);

  var _super = _createSuper(ToggleExample);

  function ToggleExample() {
    var _this;

    _classCallCheck(this, ToggleExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: true
    });

    return _this;
  }

  _createClass(ToggleExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(Toggle, {
        isEnabled: _boolean('isEnabled', true),
        value: this.state.value,
        onChange: function onChange(value) {
          return _this2.setState({
            value: value
          });
        }
      });
    }
  }]);

  return ToggleExample;
}(Component);

storiesOf('Building Blocks', module).addDecorator(withReadme(README)).add('Toggle', function () {
  return React.createElement(ToggleExample, null);
});
//# sourceMappingURL=stories.js.map