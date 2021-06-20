export function padTo4Bytes(byteLength) {
  return byteLength + 3 & ~3;
}
export function copyArrayBuffer(targetBuffer, sourceBuffer, byteOffset, byteLength = sourceBuffer.byteLength) {
  const targetArray = new Uint8Array(targetBuffer, byteOffset, byteLength);
  const sourceArray = new Uint8Array(sourceBuffer);
  targetArray.set(sourceArray);
  return targetBuffer;
}
export function toBuffer(arrayBuffer) {
  const buffer = new Buffer(arrayBuffer.byteLength);
  const view = new Uint8Array(arrayBuffer);

  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }

  return buffer;
}
//# sourceMappingURL=array-utils.js.map