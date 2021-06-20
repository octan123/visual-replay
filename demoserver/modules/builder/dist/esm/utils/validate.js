var REGEX = /^\/[a-zA-Z0-9_.:/\-]+[^\/]$/;
export function validateStreamId(streamId) {
  return REGEX.test(streamId);
}
//# sourceMappingURL=validate.js.map