import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
export var FileSource = function () {
  function FileSource(root) {
    _classCallCheck(this, FileSource);

    this.fs = module.require('fs');
    this.path = module.require('path');
    this.root = root;
  }

  _createClass(FileSource, [{
    key: "readSync",
    value: function readSync(name) {
      var path = this.path.join(this.root, name);

      if (this.fs.existsSync(path)) {
        return this.fs.readFileSync(path);
      }

      return undefined;
    }
  }, {
    key: "existsSync",
    value: function existsSync(name) {
      var path = this.path.join(this.root, name);
      return this.fs.existsSync(path);
    }
  }, {
    key: "close",
    value: function close() {}
  }]);

  return FileSource;
}();
//# sourceMappingURL=fs-source.js.map