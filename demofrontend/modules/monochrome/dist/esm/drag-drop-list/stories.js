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
import DragDropList from './index';
import README from './README.md';
var SAMPLE_ITEMS = new Array(10).fill(0).map(function (d, i) {
  return {
    key: "item-".concat(i),
    className: 'sample-item',
    content: React.createElement("p", null, "ITEM ", i + 1)
  };
});
var SAMPLE_ITEMS_WITH_HEADER = new Array(8).fill(0).map(function (d, i) {
  return {
    key: "item-".concat(i),
    title: "ITEM ".concat(i + 1),
    className: 'sample-item',
    content: React.createElement("p", null, "This is the content")
  };
});
var EXAMPLE_STYLE = {
  item: {
    padding: 12,
    border: '1px solid #fff',
    background: '#f8f8f8'
  },
  title: {
    padding: '4px 12px',
    margin: '-12px -12px 12px -12px',
    background: '#ccc',
    color: '#fff'
  }
};

var DragDropListExample = function (_Component) {
  _inherits(DragDropListExample, _Component);

  var _super = _createSuper(DragDropListExample);

  function DragDropListExample() {
    var _this;

    _classCallCheck(this, DragDropListExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      items: null
    });

    return _this;
  }

  _createClass(DragDropListExample, [{
    key: "_onListChange",
    value: function _onListChange(_ref) {
      var items = _ref.items;
      this.setState({
        items: items
      });
    }
  }, {
    key: "render",
    value: function render() {
      var items = this.state.items || this.props.items;
      return React.createElement("div", {
        style: {
          width: 200,
          margin: 'auto'
        }
      }, React.createElement(DragDropList, {
        style: EXAMPLE_STYLE,
        items: items,
        canRemoveItem: _boolean('canRemoveItem', true),
        onListChange: this._onListChange.bind(this)
      }));
    }
  }]);

  return DragDropListExample;
}(Component);

storiesOf('DragDropList', module).addDecorator(withReadme(README)).add('Basic example', function () {
  return React.createElement(DragDropListExample, {
    items: SAMPLE_ITEMS
  });
}).add('With headers', function () {
  return React.createElement(DragDropListExample, {
    items: SAMPLE_ITEMS_WITH_HEADER
  });
});
//# sourceMappingURL=stories.js.map