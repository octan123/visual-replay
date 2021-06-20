"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZSessionContext = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var XVIZSessionContext = function () {
  function XVIZSessionContext() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, XVIZSessionContext);
    this.map = new Map(Object.entries(state));
    this.activeTransforms = new Map();
  }

  (0, _createClass2["default"])(XVIZSessionContext, [{
    key: "set",
    value: function set(name, val) {
      this.map.set(name, val);
    }
  }, {
    key: "get",
    value: function get(name) {
      return this.map.get(name);
    }
  }, {
    key: "startTransform",
    value: function startTransform(id, state) {
      this.activeTransforms.set(id, state);
    }
  }, {
    key: "transforms",
    value: function transforms() {
      return this.activeTransforms.keys();
    }
  }, {
    key: "transform",
    value: function transform(id) {
      return this.activeTransforms.get(id);
    }
  }, {
    key: "endTransform",
    value: function endTransform(id) {
      this.activeTransforms["delete"](id);
    }
  }]);
  return XVIZSessionContext;
}();

exports.XVIZSessionContext = XVIZSessionContext;
//# sourceMappingURL=xviz-session-context.js.map