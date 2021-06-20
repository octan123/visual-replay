"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookReadme = require("storybook-readme");

var _README = _interopRequireDefault(require("./README.md"));

var _index = require("./index");

(0, _react2.storiesOf)('Building Blocks', module).addDecorator((0, _storybookReadme.withReadme)(_README["default"])).add('Popover', function () {
  return _react["default"].createElement(_index.Popover, {
    content: function content() {
      return _react["default"].createElement("div", {
        style: {
          padding: '10px'
        }
      }, _react["default"].createElement("div", null, _react["default"].createElement("button", null, "One fish")), _react["default"].createElement("div", {
        style: {
          marginTop: '5px'
        }
      }, _react["default"].createElement("button", null, "Two fish")), _react["default"].createElement("div", {
        style: {
          marginTop: '5px'
        }
      }, _react["default"].createElement("button", null, "Red fish")), _react["default"].createElement("div", {
        style: {
          marginTop: '5px'
        }
      }, _react["default"].createElement("button", null, "Blue fish")));
    }
  }, _react["default"].createElement("button", null, "Click for popover"));
}).add('Tooltip', function () {
  return _react["default"].createElement("div", {
    style: {
      fontFamily: 'Helvetica, sans-serif',
      margin: 100,
      fontSize: 13
    }
  }, _react["default"].createElement("p", null, _react["default"].createElement(_index.Tooltip, {
    position: _index.Popover.RIGHT,
    content: "Tooltip"
  }, "Right")), _react["default"].createElement("p", null, _react["default"].createElement(_index.Tooltip, {
    position: _index.Popover.BOTTOM,
    content: "Tooltip"
  }, "Bottom")), _react["default"].createElement("p", null, _react["default"].createElement(_index.Tooltip, {
    position: _index.Popover.LEFT,
    content: "Tooltip"
  }, "Left")), _react["default"].createElement("p", null, _react["default"].createElement(_index.Tooltip, {
    position: _index.Popover.TOP,
    content: "Tooltip"
  }, "Top")), _react["default"].createElement("p", null, _react["default"].createElement(_index.Tooltip, {
    position: _index.Popover.RIGHT,
    arrowPosition: _index.Popover.BOTTOM,
    content: function content() {
      return _react["default"].createElement("span", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt et enim vel pellentesque. Aliquam nisl est, dapibus et leo sit amet, venenatis placerat sem.");
    }
  }, _react["default"].createElement("span", null, "Custom positioning"))));
});
//# sourceMappingURL=stories.js.map