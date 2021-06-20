import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
export var XVIZBaseWriter = function () {
  function XVIZBaseWriter(sink) {
    _classCallCheck(this, XVIZBaseWriter);

    if (!sink) {
      throw new Error('Writer must be provided a sink');
    }

    this.sink = sink;
  }

  _createClass(XVIZBaseWriter, [{
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
//# sourceMappingURL=xviz-base-writer.js.map