import { isEnvelope, unpackEnvelope } from './loaders';
import { XVIZ_MESSAGE_TYPE } from './xviz-message-type';
import { XVIZ_MESSAGE_NAMESPACE } from './constants';
export class XVIZMessage {
  constructor(message) {
    this.message = message;
    this._message = null;

    this._setupTypeData();
  }

  get type() {
    if (this._message) {
      return this._message.type;
    }

    return null;
  }

  get data() {
    if (this._message) {
      return this._message.data;
    }

    return null;
  }

  _setupTypeData() {
    if (isEnvelope(this.message)) {
      const msg = unpackEnvelope(this.message);

      if (msg.namespace === 'xviz') {
        this._message = msg;
      }

      return;
    }

    if (this.message.version) {
      this._message = {
        namespace: XVIZ_MESSAGE_NAMESPACE,
        type: XVIZ_MESSAGE_TYPE.METADATA,
        data: this.message
      };
    } else if (this.message.update_type && this.message.updates) {
      this._message = {
        namespace: XVIZ_MESSAGE_NAMESPACE,
        type: XVIZ_MESSAGE_TYPE.STATE_UPDATE,
        data: this.message
      };
    } else {
      this._message = {
        namespace: null,
        type: null,
        data: this.message
      };
    }
  }

}
//# sourceMappingURL=xviz-message.js.map