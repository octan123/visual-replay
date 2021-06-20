"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZEnvelope = void 0;

var _constants = require("./constants");

var _xvizMessageType = require("./xviz-message-type");

function makeMessage(messageType, data) {
  return {
    type: "".concat(_constants.XVIZ_MESSAGE_NAMESPACE, "/").concat(messageType),
    data: data
  };
}

var XVIZEnvelope = {
  Metadata: function Metadata(data) {
    return makeMessage(_xvizMessageType.XVIZ_MESSAGE_TYPE.METADATA, data);
  },
  StateUpdate: function StateUpdate(data) {
    return makeMessage(_xvizMessageType.XVIZ_MESSAGE_TYPE.STATE_UPDATE, data);
  },
  Error: function Error(data) {
    return makeMessage(_xvizMessageType.XVIZ_MESSAGE_TYPE.ERROR, data);
  },
  TransformLogDone: function TransformLogDone(data) {
    return makeMessage(_xvizMessageType.XVIZ_MESSAGE_TYPE.TRANSFORM_LOG_DONE, data);
  }
};
exports.XVIZEnvelope = XVIZEnvelope;
//# sourceMappingURL=xviz-envelope.js.map