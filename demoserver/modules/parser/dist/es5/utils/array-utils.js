"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.padTo4Bytes = padTo4Bytes;

function padTo4Bytes(byteLength) {
  return byteLength + 3 & ~3;
}
//# sourceMappingURL=array-utils.js.map