"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZWorkersStatus = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ActivityTag = function ActivityTag(_ref) {
  var isActive = _ref.isActive,
      style = _ref.style;
  return isActive ? _react["default"].createElement("div", {
    style: _objectSpread(_objectSpread(_objectSpread({}, _constants.STYLES.TAG), _constants.STYLES.POSITIVE), style)
  }, "ACTIVE") : _react["default"].createElement("div", {
    style: _objectSpread(_objectSpread(_objectSpread({}, _constants.STYLES.TAG), _constants.STYLES.NEGATIVE), style)
  }, "INACTIVE");
};

var _formatLastUpdated = function _formatLastUpdated(lastUpdated) {
  return "".concat(lastUpdated.toLocaleDateString(), " ").concat(lastUpdated.toLocaleTimeString());
};

var XVIZWorkersStatus = function XVIZWorkersStatus(_ref2) {
  var workers = _ref2.workers,
      _ref2$style = _ref2.style,
      style = _ref2$style === void 0 ? {} : _ref2$style;
  return Object.entries(workers).map(function (_ref3) {
    var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
        workerId = _ref4[0],
        _ref4$ = _ref4[1],
        lastUpdated = _ref4$.lastUpdated,
        isActive = _ref4$.isActive;

    return _react["default"].createElement("div", {
      key: workerId,
      style: _objectSpread(_objectSpread({}, _constants.STYLES.WORKERS.CONTAINER), style.container)
    }, _react["default"].createElement("div", {
      style: _objectSpread(_objectSpread({}, _constants.STYLES.WORKERS.TITLE), style.title)
    }, _react["default"].createElement("h3", null, "Worker ", workerId), _react["default"].createElement(ActivityTag, {
      isActive: isActive,
      style: style.tag
    })), _react["default"].createElement("div", null, lastUpdated ? "Last active at ".concat(_formatLastUpdated(lastUpdated)) : 'This worker has never been active.'));
  });
};

exports.XVIZWorkersStatus = XVIZWorkersStatus;
//# sourceMappingURL=xviz-workers-status.js.map