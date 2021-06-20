"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _react2 = require("@storybook/react");

var _storybookReadme = require("storybook-readme");

var _README = _interopRequireDefault(require("./README.md"));

var _index = _interopRequireDefault(require("./index"));

var typeOptions = {
  Normal: _index["default"].NORMAL,
  Primary: _index["default"].PRIMARY,
  Waring: _index["default"].WARNING,
  Muted: _index["default"].MUTED
};
(0, _react2.storiesOf)('Building Blocks', module).addDecorator((0, _storybookReadme.withReadme)(_README["default"])).add('Button', function () {
  return _react["default"].createElement(_index["default"], {
    type: (0, _addonKnobs.select)('Type', typeOptions),
    isEnabled: (0, _addonKnobs["boolean"])('isEnabled', true)
  }, "Click me!");
});
//# sourceMappingURL=stories.js.map