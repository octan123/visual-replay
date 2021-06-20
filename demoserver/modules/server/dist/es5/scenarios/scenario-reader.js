"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScenarioReader = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var ScenarioReader = function () {
  function ScenarioReader(source) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, ScenarioReader);
    this.source = source;
    this.options = options;
    this.index = this._readIndex();
  }

  (0, _createClass2["default"])(ScenarioReader, [{
    key: "readMetadata",
    value: function readMetadata() {
      return this.source.metadata;
    }
  }, {
    key: "readMessage",
    value: function readMessage(messageIndex) {
      return this.source.messages[messageIndex];
    }
  }, {
    key: "timeRange",
    value: function timeRange() {
      if (this.index) {
        var _this$index = this.index,
            startTime = _this$index.startTime,
            endTime = _this$index.endTime;
        return {
          startTime: startTime,
          endTime: endTime
        };
      }

      return {
        startTime: null,
        endTime: null
      };
    }
  }, {
    key: "messageCount",
    value: function messageCount() {
      if (this.index) {
        return this.index.timing.length;
      }

      return undefined;
    }
  }, {
    key: "findMessage",
    value: function findMessage(timestamp) {
      if (!this.index) {
        return undefined;
      }

      var _this$index2 = this.index,
          startTime = _this$index2.startTime,
          endTime = _this$index2.endTime,
          timing = _this$index2.timing;
      var messageCount = this.messageCount();
      var lastMessage = messageCount > 0 ? messageCount - 1 : 0;

      if (timestamp < startTime) {
        return {
          first: 0,
          last: 0
        };
      }

      if (timestamp > endTime) {
        return {
          first: lastMessage,
          last: lastMessage
        };
      }

      var first = timing.findIndex(function (timeEntry) {
        return timeEntry >= timestamp;
      });
      var last = -1;
      var i = lastMessage;

      while (i >= 0) {
        if (timing[i] <= timestamp) {
          last = i;
          break;
        }

        i--;
      }

      if (first === -1) {
        first = 0;
      }

      if (last === -1) {
        last = lastMessage;
      }

      return {
        first: first,
        last: last
      };
    }
  }, {
    key: "close",
    value: function close() {}
  }, {
    key: "_readIndex",
    value: function _readIndex() {
      return {
        startTime: this.source.timing[0],
        endTime: this.source.timing[this.source.timing.length - 1],
        timing: this.source.timing
      };
    }
  }]);
  return ScenarioReader;
}();

exports.ScenarioReader = ScenarioReader;
//# sourceMappingURL=scenario-reader.js.map