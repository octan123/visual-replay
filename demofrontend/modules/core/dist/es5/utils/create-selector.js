"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createLogSelector;

var _reselect = require("reselect");

function createLogSelector(logLoader) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var selector = _reselect.createSelector.apply(void 0, args);

  return function () {
    return selector(logLoader._version);
  };
}
//# sourceMappingURL=create-selector.js.map