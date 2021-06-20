"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _react2 = require("@storybook/react");

var _storybookReadme = require("storybook-readme");

var _README = _interopRequireDefault(require("./README.md"));

var _index = _interopRequireDefault(require("./index"));

(0, _react2.storiesOf)('Building Blocks', module).addDecorator((0, _storybookReadme.withReadme)(_README["default"])).add('Label', function () {
  return _react["default"].createElement(_index["default"], {
    tooltip: "Last, First",
    isEnabled: (0, _addonKnobs["boolean"])('isEnabled', true)
  }, "Your name");
});
//# sourceMappingURL=stories.js.map