"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlyMetadata = exports.TransformLogFlow = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var TransformLogFlow = function () {
  function TransformLogFlow(client) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, TransformLogFlow);
    this.client = client;
    this.options = options;
    this.id = 'f8b38a41-59fa-44b9-9311-cd612886bb37';
    this.sent = false;
  }

  (0, _createClass2["default"])(TransformLogFlow, [{
    key: "onMetadata",
    value: function onMetadata(msg) {
      if (!this.sent && !this.options.metadata) {
        var outMsg = {
          id: this.id
        };

        if (this.options.start) {
          outMsg.start_timestamp = this.options.start;
        }

        if (this.options.end) {
          outMsg.end_timestamp = this.options.end;
        }

        this.client.sendMessage('transform_log', outMsg);
        this.sent = true;
      }
    }
  }, {
    key: "onTransformLogDone",
    value: function onTransformLogDone(msg) {
      this.client.close();
    }
  }]);
  return TransformLogFlow;
}();

exports.TransformLogFlow = TransformLogFlow;

var OnlyMetadata = function () {
  function OnlyMetadata(client) {
    (0, _classCallCheck2["default"])(this, OnlyMetadata);
    this.client = client;
  }

  (0, _createClass2["default"])(OnlyMetadata, [{
    key: "onMetadata",
    value: function onMetadata(msg) {
      this.client.close();
    }
  }]);
  return OnlyMetadata;
}();

exports.OnlyMetadata = OnlyMetadata;
//# sourceMappingURL=core.js.map