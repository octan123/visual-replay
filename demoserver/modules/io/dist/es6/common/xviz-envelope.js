import { XVIZ_MESSAGE_NAMESPACE } from './constants';
import { XVIZ_MESSAGE_TYPE } from './xviz-message-type';

function makeMessage(messageType, data) {
  return {
    type: "".concat(XVIZ_MESSAGE_NAMESPACE, "/").concat(messageType),
    data
  };
}

export const XVIZEnvelope = {
  Metadata: data => makeMessage(XVIZ_MESSAGE_TYPE.METADATA, data),
  StateUpdate: data => makeMessage(XVIZ_MESSAGE_TYPE.STATE_UPDATE, data),
  Error: data => makeMessage(XVIZ_MESSAGE_TYPE.ERROR, data),
  TransformLogDone: data => makeMessage(XVIZ_MESSAGE_TYPE.TRANSFORM_LOG_DONE, data)
};
//# sourceMappingURL=xviz-envelope.js.map