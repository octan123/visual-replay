import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import assert from 'assert';

var XVIZControllerV2 = function () {
  function XVIZControllerV2(socket) {
    _classCallCheck(this, XVIZControllerV2);

    assert(socket, 'XVIZ socket');
    this.socket = socket;
    this.transformCounter = 0;
  }

  _createClass(XVIZControllerV2, [{
    key: "_send",
    value: function _send(type, message) {
      var msg = {
        type: "xviz/".concat(type),
        data: message
      };
      this.socket.send(JSON.stringify(msg));
    }
  }, {
    key: "transformLog",
    value: function transformLog() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          startTimestamp = _ref.startTimestamp,
          endTimestamp = _ref.endTimestamp;

      var msg = {};

      if (startTimestamp) {
        msg.start_timestamp = startTimestamp;
      }

      if (endTimestamp) {
        msg.end_timestamp = endTimestamp;
      }

      msg.id = "".concat(this.transformCounter);
      this.transformCounter++;

      this._send('transform_log', msg);
    }
  }]);

  return XVIZControllerV2;
}();

export { XVIZControllerV2 as default };
//# sourceMappingURL=xviz-controller-v2.js.map