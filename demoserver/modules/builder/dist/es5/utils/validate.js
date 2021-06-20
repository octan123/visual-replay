"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateStreamId = validateStreamId;
var REGEX = /^\/[a-zA-Z0-9_.:/\-]+[^\/]$/;

function validateStreamId(streamId) {
  return REGEX.test(streamId);
}
//# sourceMappingURL=validate.js.map