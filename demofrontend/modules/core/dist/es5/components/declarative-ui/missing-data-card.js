"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissingDataCard = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _monochrome = require("@streetscape.gl/monochrome");

var _styled = _interopRequireDefault(require("@emotion/styled"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Container = _styled["default"].div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    color: props.theme.warning400,
    padding: props.theme.spacingNormal,
    overflow: 'hidden'
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var MissingDataCardBase = function MissingDataCardBase(props) {
  var missingData = props.missingData,
      theme = props.theme,
      style = props.style;
  var missingDataAsString = missingData.join(', ');
  return _react["default"].createElement(Container, {
    theme: theme,
    userStyle: style.missingData
  }, _react["default"].createElement(_monochrome.Tooltip, {
    style: props.style.tooltip,
    content: missingDataAsString
  }, "Missing Data: ", missingDataAsString));
};

var MissingDataCard = (0, _monochrome.withTheme)(MissingDataCardBase);
exports.MissingDataCard = MissingDataCard;
//# sourceMappingURL=missing-data-card.js.map