import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { STYLES } from './constants';
export var XVIZWorkerFarmStatus = function XVIZWorkerFarmStatus(_ref) {
  var backlog = _ref.backlog,
      dropped = _ref.dropped,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
  return React.createElement("div", {
    style: _objectSpread(_objectSpread({}, STYLES.WORKER_FARM.CONTAINER), style.container)
  }, React.createElement("h3", {
    style: _objectSpread(_objectSpread({}, STYLES.WORKER_FARM.TITLE), style.title)
  }, "XVIZ Worker Farm"), React.createElement("div", null, "Queue backlog: ".concat(backlog)), React.createElement("div", null, "Dropped: ".concat(dropped)));
};
//# sourceMappingURL=xviz-worker-farm-status.js.map