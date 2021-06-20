import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
export var MemorySourceSink = function () {
  function MemorySourceSink() {
    _classCallCheck(this, MemorySourceSink);

    this.data = new Map();
  }

  _createClass(MemorySourceSink, [{
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
//# sourceMappingURL=memory-source-sink.js.map