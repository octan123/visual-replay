import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
export var FileSink = function () {
  function FileSink(root) {
    _classCallCheck(this, FileSink);

    this.fs = module.require('fs');
    this.path = module.require('path');
    this.root = root;
  }

  _createClass(FileSink, [{
    key: "writeSync",
    value: function writeSync(name, data) {
      var path = this.path.join(this.root, name);
      this.fs.writeFileSync(path, data);
    }
  }, {
    key: "close",
    value: function close() {}
  }]);

  return FileSink;
}();
//# sourceMappingURL=fs-sink.js.map