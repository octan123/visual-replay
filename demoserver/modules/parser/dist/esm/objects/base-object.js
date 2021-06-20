import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

var BaseObject = function () {
  function BaseObject() {
    _classCallCheck(this, BaseObject);
  }

  _createClass(BaseObject, [{
    key: "isValid",
    get: function get() {
      return false;
    }
  }, {
    key: "position",
    get: function get() {
      return null;
    }
  }, {
    key: "bearing",
    get: function get() {
      return null;
    }
  }]);

  return BaseObject;
}();

export { BaseObject as default };
//# sourceMappingURL=base-object.js.map