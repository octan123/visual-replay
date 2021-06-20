"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemorySourceSink = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var MemorySourceSink = function () {
  function MemorySourceSink() {
    (0, _classCallCheck2["default"])(this, MemorySourceSink);
    this.data = new Map();
  }

  (0, _createClass2["default"])(MemorySourceSink, [{
    key: "readSync",
    value: function readSync(name) {
      return this.data.get(name);
    }
  }, {
    key: "writeSync",
    value: function writeSync(name, data) {
      if (ArrayBuffer.isView(data) && data.length && data.buffer) {
        this.data.set(name, data.buffer);
      } else {
        this.data.set(name, data);
      }
    }
  }, {
    key: "existsSync",
    value: function existsSync(name) {
      return this.data.has(name);
    }
  }, {
    key: "close",
    value: function close() {}
  }, {
    key: "entries",
    value: function entries() {
      return this.data.entries();
    }
  }, {
    key: "has",
    value: function has(name) {
      return this.data.has(name);
    }
  }]);
  return MemorySourceSink;
}();

exports.MemorySourceSink = MemorySourceSink;
//# sourceMappingURL=memory-source-sink.js.map