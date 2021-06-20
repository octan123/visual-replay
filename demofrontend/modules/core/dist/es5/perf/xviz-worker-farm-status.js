"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZWorkerFarmStatus = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var XVIZWorkerFarmStatus = function XVIZWorkerFarmStatus(_ref) {
  var backlog = _ref.backlog,
      dropped = _ref.dropped,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
  return _react["default"].createElement("div", {
    style: _objectSpread(_objectSpread({}, _constants.STYLES.WORKER_FARM.CONTAINER), style.container)
  }, _react["default"].createElement("h3", {
    style: _objectSpread(_objectSpread({}, _constants.STYLES.WORKER_FARM.TITLE), style.title)
  }, "XVIZ Worker Farm"), _react["default"].createElement("div", null, "Queue backlog: ".concat(backlog)), _react["default"].createElement("div", null, "Dropped: ".concat(dropped)));
};

exports.XVIZWorkerFarmStatus = XVIZWorkerFarmStatus;
//# sourceMappingURL=xviz-worker-farm-status.js.map