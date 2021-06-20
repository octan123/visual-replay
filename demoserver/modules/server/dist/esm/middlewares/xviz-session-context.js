import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
export var XVIZSessionContext = function () {
  function XVIZSessionContext() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, XVIZSessionContext);

    this.map = new Map(Object.entries(state));
    this.activeTransforms = new Map();
  }

  _createClass(XVIZSessionContext, [{
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
//# sourceMappingURL=xviz-session-context.js.map