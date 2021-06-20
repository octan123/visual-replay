"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZBaseWriter = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var XVIZBaseWriter = function () {
  function XVIZBaseWriter(sink) {
    (0, _classCallCheck2["default"])(this, XVIZBaseWriter);

    if (!sink) {
      throw new Error('Writer must be provided a sink');
    }

    this.sink = sink;
  }

  (0, _createClass2["default"])(XVIZBaseWriter, [{
    key: "_checkValid",
    value: function _checkValid() {
      if (!this.sink) {
        throw new Error('Cannot use this Writer after "close()" has been called.');
      }
    }
  }, {
    key: "close",
    value: function close() {
      if (this.sink) {
        this.sink.close();
        this.sink = null;
      }
    }
  }]);
  return XVIZBaseWriter;
}();

exports.XVIZBaseWriter = XVIZBaseWriter;
//# sourceMappingURL=xviz-base-writer.js.map