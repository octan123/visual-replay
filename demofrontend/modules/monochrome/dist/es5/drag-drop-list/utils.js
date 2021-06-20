"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overlap = overlap;
exports.offsetRect = offsetRect;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function overlap(rect1, rect2) {
  var overlapX = Math.min(rect1.right - rect2.left, rect2.right - rect1.left);
  var overlapY = Math.min(rect1.bottom - rect2.top, rect2.bottom - rect1.top);

  if (overlapX < 0 || overlapY < 0) {
    return 0;
  }

  return overlapX * overlapY;
}

function offsetRect(rect, _ref) {
  var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      _ref2$ = _ref2[0],
      dx = _ref2$ === void 0 ? 0 : _ref2$,
      _ref2$2 = _ref2[1],
      dy = _ref2$2 === void 0 ? 0 : _ref2$2;

  return {
    left: rect.left + dx,
    top: rect.top + dy,
    right: rect.right + dx,
    bottom: rect.bottom + dy,
    width: rect.width,
    height: rect.height
  };
}
//# sourceMappingURL=utils.js.map