export default function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'xviz: assertion failed.');
  }
}
//# sourceMappingURL=assert.js.map