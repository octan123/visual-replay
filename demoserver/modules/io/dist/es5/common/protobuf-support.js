"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZ_PROTOBUF_TYPE = exports.XVIZ_PROTOBUF_MESSAGE = exports.XVIZ_PROTOBUF_ROOT = exports.XVIZ_PROTOBUF_MAGIC = exports.MAGIC_PBE1 = exports.XVIZ_PROTOBUF_TYPE_NAME = exports.XVIZ_PROTOBUF_MESSAGE_NAME = void 0;

var _schema = require("@xviz/schema");

var XVIZ_PROTOBUF_MESSAGE_NAME = {
  ENVELOPE: 'xviz.v2.Envelope',
  START: 'xviz.v2.Start',
  TRANSFORM_LOG: 'xviz.v2.TransformLog',
  TRANSFORM_LOG_POINT_IN_TIME: 'xviz.v2.TransformPointInTime',
  TRANSFORM_LOG_DONE: 'xviz.v2.TransformLogDone',
  STATE_UPDATE: 'xviz.v2.StateUpdate',
  RECONFIGURE: 'xviz.v2.Reconfigure',
  METADATA: 'xviz.v2.Metadata',
  ERROR: 'xviz.v2.Error'
};
exports.XVIZ_PROTOBUF_MESSAGE_NAME = XVIZ_PROTOBUF_MESSAGE_NAME;
var XVIZ_PROTOBUF_TYPE_NAME = {
  UI_PANEL_INFO: 'xviz.v2.UIPanelInfo'
};
exports.XVIZ_PROTOBUF_TYPE_NAME = XVIZ_PROTOBUF_TYPE_NAME;
var MAGIC_PBE1 = 0x50424531;
exports.MAGIC_PBE1 = MAGIC_PBE1;
var XVIZ_PROTOBUF_MAGIC = Uint8Array.from([0x50, 0x42, 0x45, 0x31]);
exports.XVIZ_PROTOBUF_MAGIC = XVIZ_PROTOBUF_MAGIC;
var XVIZ_PROTOBUF_ROOT = (0, _schema.loadProtos)();
exports.XVIZ_PROTOBUF_ROOT = XVIZ_PROTOBUF_ROOT;
var XVIZ_PROTOBUF_MESSAGE = {
  Envelope: XVIZ_PROTOBUF_ROOT.lookupType(XVIZ_PROTOBUF_MESSAGE_NAME.ENVELOPE),
  Metadata: XVIZ_PROTOBUF_ROOT.lookupType(XVIZ_PROTOBUF_MESSAGE_NAME.METADATA),
  StateUpdate: XVIZ_PROTOBUF_ROOT.lookupType(XVIZ_PROTOBUF_MESSAGE_NAME.STATE_UPDATE)
};
exports.XVIZ_PROTOBUF_MESSAGE = XVIZ_PROTOBUF_MESSAGE;
var XVIZ_PROTOBUF_TYPE = {
  UIPanelInfo: XVIZ_PROTOBUF_ROOT.lookupType(XVIZ_PROTOBUF_TYPE_NAME.UI_PANEL_INFO)
};
exports.XVIZ_PROTOBUF_TYPE = XVIZ_PROTOBUF_TYPE;
//# sourceMappingURL=protobuf-support.js.map