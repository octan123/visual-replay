"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _react2 = require("@storybook/react");

var _storybookReadme = require("storybook-readme");

var _index = _interopRequireDefault(require("./index"));

var _README = _interopRequireDefault(require("./README.md"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SAMPLE_ITEMS = new Array(10).fill(0).map(function (d, i) {
  return {
    key: "item-".concat(i),
    className: 'sample-item',
    content: _react["default"].createElement("p", null, "ITEM ", i + 1)
  };
});
var SAMPLE_ITEMS_WITH_HEADER = new Array(8).fill(0).map(function (d, i) {
  return {
    key: "item-".concat(i),
    title: "ITEM ".concat(i + 1),
    className: 'sample-item',
    content: _react["default"].createElement("p", null, "This is the content")
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
  (0, _inherits2["default"])(DragDropListExample, _Component);

  var _super = _createSuper(DragDropListExample);

  function DragDropListExample() {
    var _this;

    (0, _classCallCheck2["default"])(this, DragDropListExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      items: null
    });
    return _this;
  }

  (0, _createClass2["default"])(DragDropListExample, [{
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
      return _react["default"].createElement("div", {
        style: {
          width: 200,
          margin: 'auto'
        }
      }, _react["default"].createElement(_index["default"], {
        style: EXAMPLE_STYLE,
        items: items,
        canRemoveItem: (0, _addonKnobs["boolean"])('canRemoveItem', true),
        onListChange: this._onListChange.bind(this)
      }));
    }
  }]);
  return DragDropListExample;
}(_react.Component);

(0, _react2.storiesOf)('DragDropList', module).addDecorator((0, _storybookReadme.withReadme)(_README["default"])).add('Basic example', function () {
  return _react["default"].createElement(DragDropListExample, {
    items: SAMPLE_ITEMS
  });
}).add('With headers', function () {
  return _react["default"].createElement(DragDropListExample, {
    items: SAMPLE_ITEMS_WITH_HEADER
  });
});
//# sourceMappingURL=stories.js.map