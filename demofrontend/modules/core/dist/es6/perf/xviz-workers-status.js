import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { STYLES } from './constants';

const ActivityTag = ({
  isActive,
  style
}) => isActive ? React.createElement("div", {
  style: _objectSpread(_objectSpread(_objectSpread({}, STYLES.TAG), STYLES.POSITIVE), style)
}, "ACTIVE") : React.createElement("div", {
  style: _objectSpread(_objectSpread(_objectSpread({}, STYLES.TAG), STYLES.NEGATIVE), style)
}, "INACTIVE");

const _formatLastUpdated = lastUpdated => "".concat(lastUpdated.toLocaleDateString(), " ").concat(lastUpdated.toLocaleTimeString());

export const XVIZWorkersStatus = ({
  workers,
  style = {}
}) => Object.entries(workers).map(([workerId, {
  lastUpdated,
  isActive
}]) => React.createElement("div", {
  key: workerId,
  style: _objectSpread(_objectSpread({}, STYLES.WORKERS.CONTAINER), style.container)
}, React.createElement("div", {
  style: _objectSpread(_objectSpread({}, STYLES.WORKERS.TITLE), style.title)
}, React.createElement("h3", null, "Worker ", workerId), React.createElement(ActivityTag, {
  isActive: isActive,
  style: style.tag
})), React.createElement("div", null, lastUpdated ? "Last active at ".concat(_formatLastUpdated(lastUpdated)) : 'This worker has never been active.')));
//# sourceMappingURL=xviz-workers-status.js.map