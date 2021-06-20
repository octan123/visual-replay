import { XVIZ_MESSAGE_NAMESPACE } from './constants';
import { XVIZ_MESSAGE_TYPE } from './xviz-message-type';

function makeMessage(messageType, data) {
  return {
    type: "".concat(XVIZ_MESSAGE_NAMESPACE, "/").concat(messageType),
    data: data
  };
}

export var XVIZEnvelope = {
  Metadata: function Metadata(data) {
    return makeMessage(XVIZ_MESSAGE_TYPE.METADATA, data);
  },
  StateUpdate: function StateUpdate(data) {
    return makeMessage(XVIZ_MESSAGE_TYPE.STATE_UPDATE, data);
  },
  Error: function Error(data) {
    return makeMessage(XVIZ_MESSAGE_TYPE.ERROR, data);
  },
  TransformLogDone: function TransformLogDone(data) {
    return makeMessage(XVIZ_MESSAGE_TYPE.TRANSFORM_LOG_DONE, data);
  }
};
//# sourceMappingURL=xviz-envelope.js.map