import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
export var TransformLogFlow = function () {
  function TransformLogFlow(client) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TransformLogFlow);

    this.client = client;
    this.options = options;
    this.id = 'f8b38a41-59fa-44b9-9311-cd612886bb37';
    this.sent = false;
  }

  _createClass(TransformLogFlow, [{
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
export var OnlyMetadata = function () {
  function OnlyMetadata(client) {
    _classCallCheck(this, OnlyMetadata);

    this.client = client;
  }

  _createClass(OnlyMetadata, [{
    key: "onMetadata",
    value: function onMetadata(msg) {
      this.client.close();
    }
  }]);

  return OnlyMetadata;
}();
//# sourceMappingURL=core.js.map