"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "XVIZ_GLTF_EXTENSION", {
  enumerable: true,
  get: function get() {
    return _io.XVIZ_GLTF_EXTENSION;
  }
});
exports.STATE_UPDATE_TYPE = exports.XVIZ_MESSAGE_TYPE = void 0;

var _io = require("@xviz/io");

var XVIZ_MESSAGE_TYPE = {
  METADATA: 'METADATA',
  TIMESLICE: 'TIMESLICE',
  DONE: 'DONE',
  VIDEO_METADATA: 'VIDEO_METADATA',
  VIDEO_FRAME: 'VIDEO_FRAME',
  ERROR: 'ERROR',
  INCOMPLETE: 'INCOMPLETE'
};
exports.XVIZ_MESSAGE_TYPE = XVIZ_MESSAGE_TYPE;
var STATE_UPDATE_TYPE = {
  COMPLETE_STATE: 'COMPLETE',
  INCREMENTAL: 'INCREMENTAL',
  PERSISTENT: 'PERSISTENT',
  SNAPSHOT: 'INCREMENTAL'
};
exports.STATE_UPDATE_TYPE = STATE_UPDATE_TYPE;
//# sourceMappingURL=constants.js.map