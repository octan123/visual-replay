"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.padTo4Bytes = padTo4Bytes;
exports.copyArrayBuffer = copyArrayBuffer;
exports.toBuffer = toBuffer;

function padTo4Bytes(byteLength) {
  return byteLength + 3 & ~3;
}

function copyArrayBuffer(targetBuffer, sourceBuffer, byteOffset) {
  var byteLength = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : sourceBuffer.byteLength;
  var targetArray = new Uint8Array(targetBuffer, byteOffset, byteLength);
  var sourceArray = new Uint8Array(sourceBuffer);
  targetArray.set(sourceArray);
  return targetBuffer;
}

function toBuffer(arrayBuffer) {
  var buffer = new Buffer(arrayBuffer.byteLength);
  var view = new Uint8Array(arrayBuffer);

  for (var i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }

  return buffer;
}
//# sourceMappingURL=array-utils.js.map