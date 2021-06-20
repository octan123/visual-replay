"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileSource = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var FileSource = function () {
  function FileSource(root) {
    (0, _classCallCheck2["default"])(this, FileSource);
    this.fs = module.require('fs');
    this.path = module.require('path');
    this.root = root;
  }

  (0, _createClass2["default"])(FileSource, [{
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

exports.FileSource = FileSource;
//# sourceMappingURL=fs-source.js.map