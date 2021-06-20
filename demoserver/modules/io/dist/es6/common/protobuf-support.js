import { loadProtos } from '@xviz/schema';
export const XVIZ_PROTOBUF_MESSAGE_NAME = {
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
export const XVIZ_PROTOBUF_TYPE_NAME = {
  UI_PANEL_INFO: 'xviz.v2.UIPanelInfo'
};
export const MAGIC_PBE1 = 0x50424531;
export const XVIZ_PROTOBUF_MAGIC = Uint8Array.from([0x50, 0x42, 0x45, 0x31]);
export const XVIZ_PROTOBUF_ROOT = loadProtos();
export const XVIZ_PROTOBUF_MESSAGE = {
  Envelope: XVIZ_PROTOBUF_ROOT.lookupType(XVIZ_PROTOBUF_MESSAGE_NAME.ENVELOPE),
  Metadata: XVIZ_PROTOBUF_ROOT.lookupType(XVIZ_PROTOBUF_MESSAGE_NAME.METADATA),
  StateUpdate: XVIZ_PROTOBUF_ROOT.lookupType(XVIZ_PROTOBUF_MESSAGE_NAME.STATE_UPDATE)
};
export const XVIZ_PROTOBUF_TYPE = {
  UIPanelInfo: XVIZ_PROTOBUF_ROOT.lookupType(XVIZ_PROTOBUF_TYPE_NAME.UI_PANEL_INFO)
};
//# sourceMappingURL=protobuf-support.js.map