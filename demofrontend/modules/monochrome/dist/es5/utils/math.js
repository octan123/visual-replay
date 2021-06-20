"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clamp = clamp;

function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}
//# sourceMappingURL=math.js.map