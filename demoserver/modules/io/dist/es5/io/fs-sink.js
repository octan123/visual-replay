"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileSink = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var FileSink = function () {
  function FileSink(root) {
    (0, _classCallCheck2["default"])(this, FileSink);
    this.fs = module.require('fs');
    this.path = module.require('path');
    this.root = root;
  }

  (0, _createClass2["default"])(FileSink, [{
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

exports.FileSink = FileSink;
//# sourceMappingURL=fs-sink.js.map