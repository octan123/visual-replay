"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = assert;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'gltf/glb assertion failed.');
  }
}
//# sourceMappingURL=assert.js.map