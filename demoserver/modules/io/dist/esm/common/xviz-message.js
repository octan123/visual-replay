import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { isEnvelope, unpackEnvelope } from './loaders';
import { XVIZ_MESSAGE_TYPE } from './xviz-message-type';
import { XVIZ_MESSAGE_NAMESPACE } from './constants';
export var XVIZMessage = function () {
  function XVIZMessage(message) {
    _classCallCheck(this, XVIZMessage);

    this.message = message;
    this._message = null;

    this._setupTypeData();
  }

  _createClass(XVIZMessage, [{
    key: "_setupTypeData",
    value: function _setupTypeData() {
      if (isEnvelope(this.message)) {
        var msg = unpackEnvelope(this.message);

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
  }, {
    key: "type",
    get: function get() {
      if (this._message) {
        return this._message.type;
      }

      return null;
    }
  }, {
    key: "data",
    get: function get() {
      if (this._message) {
        return this._message.data;
      }

      return null;
    }
  }]);

  return XVIZMessage;
}();
//# sourceMappingURL=xviz-message.js.map