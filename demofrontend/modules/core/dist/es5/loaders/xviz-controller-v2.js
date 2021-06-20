"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assert = _interopRequireDefault(require("assert"));

var XVIZControllerV2 = function () {
  function XVIZControllerV2(socket) {
    (0, _classCallCheck2["default"])(this, XVIZControllerV2);
    (0, _assert["default"])(socket, 'XVIZ socket');
    this.socket = socket;
    this.transformCounter = 0;
  }

  (0, _createClass2["default"])(XVIZControllerV2, [{
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

exports["default"] = XVIZControllerV2;
//# sourceMappingURL=xviz-controller-v2.js.map