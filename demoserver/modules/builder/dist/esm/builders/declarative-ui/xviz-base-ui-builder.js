import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

var XVIZBaseUiBuilder = function () {
  function XVIZBaseUiBuilder(_ref) {
    var type = _ref.type,
        validateError = _ref.validateError,
        validateWarn = _ref.validateWarn;

    _classCallCheck(this, XVIZBaseUiBuilder);

    this._type = type;
    this._children = null;
    this._validateError = validateError;
    this._validateWarn = validateWarn;
  }

  _createClass(XVIZBaseUiBuilder, [{
    key: "child",
    value: function child(_child) {
      if (!this._children) {
        this._children = [];
      }

      this._children.push(_child);

      return _child;
    }
  }, {
    key: "_validate",
    value: function _validate() {}
  }, {
    key: "getUI",
    value: function getUI() {
      var obj = {
        type: this._type
      };

      if (this._children && this._children.length) {
        obj.children = this._children.map(function (child) {
          return child.getUI();
        });
      }

      return obj;
    }
  }]);

  return XVIZBaseUiBuilder;
}();

export { XVIZBaseUiBuilder as default };
//# sourceMappingURL=xviz-base-ui-builder.js.map