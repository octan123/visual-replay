"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZBaseReader = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _loaders = require("../common/loaders");

var XVIZBaseReader = function () {
  function XVIZBaseReader(source) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, XVIZBaseReader);
    this.source = source;
    this.options = options;
    this.suffix = options.suffix || '-frame.json';
    this.index = this._readIndex();
  }

  (0, _createClass2["default"])(XVIZBaseReader, [{
    key: "readMetadata",
    value: function readMetadata() {
      if (this.source) {
        var data = this.source.readSync(this._xvizMessage(1));

        if (!data) {
          data = this.source.readSync(this._xvizMessage(1, {
            forceJson: true
          }));
        }

        return data;
      }

      return undefined;
    }
  }, {
    key: "readMessage",
    value: function readMessage(messageIndex) {
      if (this.source) {
        return this.source.readSync(this._xvizMessage(2 + messageIndex));
      }

      return undefined;
    }
  }, {
    key: "checkMessage",
    value: function checkMessage(messageIndex) {
      if (this.source) {
        return this.source.existsSync(this._xvizMessage(2 + messageIndex));
      }

      return false;
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
        return timeEntry[0] >= timestamp;
      });
      var last = -1;
      var i = lastMessage;

      while (i >= 0) {
        var timeEntry = timing[i];

        if (timeEntry[1] <= timestamp) {
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
    value: function close() {
      this.source.close();
    }
  }, {
    key: "_xvizMessage",
    value: function _xvizMessage(index) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$forceJson = _ref.forceJson,
          forceJson = _ref$forceJson === void 0 ? false : _ref$forceJson;

      if (index === 0 || forceJson) {
        return "".concat(index, "-frame.json");
      }

      return "".concat(index).concat(this.suffix);
    }
  }, {
    key: "_readIndex",
    value: function _readIndex() {
      if (this.source) {
        var indexData = this.source.readSync(this._xvizMessage(0));

        if (indexData) {
          if ((0, _loaders.isJSONString)(indexData)) {
            return JSON.parse(indexData);
          } else if ((0, _typeof2["default"])(indexData) === 'object') {
            return indexData;
          }
        }
      }

      return undefined;
    }
  }]);
  return XVIZBaseReader;
}();

exports.XVIZBaseReader = XVIZBaseReader;
//# sourceMappingURL=xviz-base-reader.js.map