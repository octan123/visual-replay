"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZMessage = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _loaders = require("./loaders");

var _xvizMessageType = require("./xviz-message-type");

var _constants = require("./constants");

var XVIZMessage = function () {
  function XVIZMessage(message) {
    (0, _classCallCheck2["default"])(this, XVIZMessage);
    this.message = message;
    this._message = null;

    this._setupTypeData();
  }

  (0, _createClass2["default"])(XVIZMessage, [{
    key: "_setupTypeData",
    value: function _setupTypeData() {
      if ((0, _loaders.isEnvelope)(this.message)) {
        var msg = (0, _loaders.unpackEnvelope)(this.message);

        if (msg.namespace === 'xviz') {
          this._message = msg;
        }

        return;
      }

      if (this.message.version) {
        this._message = {
          namespace: _constants.XVIZ_MESSAGE_NAMESPACE,
          type: _xvizMessageType.XVIZ_MESSAGE_TYPE.METADATA,
          data: this.message
        };
      } else if (this.message.update_type && this.message.updates) {
        this._message = {
          namespace: _constants.XVIZ_MESSAGE_NAMESPACE,
          type: _xvizMessageType.XVIZ_MESSAGE_TYPE.STATE_UPDATE,
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

exports.XVIZMessage = XVIZMessage;
//# sourceMappingURL=xviz-message.js.map