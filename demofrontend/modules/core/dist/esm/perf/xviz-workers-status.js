import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { STYLES } from './constants';

var ActivityTag = function ActivityTag(_ref) {
  var isActive = _ref.isActive,
      style = _ref.style;
  return isActive ? React.createElement("div", {
    style: _objectSpread(_objectSpread(_objectSpread({}, STYLES.TAG), STYLES.POSITIVE), style)
  }, "ACTIVE") : React.createElement("div", {
    style: _objectSpread(_objectSpread(_objectSpread({}, STYLES.TAG), STYLES.NEGATIVE), style)
  }, "INACTIVE");
};

var _formatLastUpdated = function _formatLastUpdated(lastUpdated) {
  return "".concat(lastUpdated.toLocaleDateString(), " ").concat(lastUpdated.toLocaleTimeString());
};

export var XVIZWorkersStatus = function XVIZWorkersStatus(_ref2) {
  var workers = _ref2.workers,
      _ref2$style = _ref2.style,
      style = _ref2$style === void 0 ? {} : _ref2$style;
  return Object.entries(workers).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        workerId = _ref4[0],
        _ref4$ = _ref4[1],
        lastUpdated = _ref4$.lastUpdated,
        isActive = _ref4$.isActive;

    return React.createElement("div", {
      key: workerId,
      style: _objectSpread(_objectSpread({}, STYLES.WORKERS.CONTAINER), style.container)
    }, React.createElement("div", {
      style: _objectSpread(_objectSpread({}, STYLES.WORKERS.TITLE), style.title)
    }, React.createElement("h3", null, "Worker ", workerId), React.createElement(ActivityTag, {
      isActive: isActive,
      style: style.tag
    })), React.createElement("div", null, lastUpdated ? "Last active at ".concat(_formatLastUpdated(lastUpdated)) : 'This worker has never been active.'));
  });
};
//# sourceMappingURL=xviz-workers-status.js.map