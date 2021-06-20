"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var XVIZBaseUiBuilder = function () {
  function XVIZBaseUiBuilder(_ref) {
    var type = _ref.type,
        validateError = _ref.validateError,
        validateWarn = _ref.validateWarn;
    (0, _classCallCheck2["default"])(this, XVIZBaseUiBuilder);
    this._type = type;
    this._children = null;
    this._validateError = validateError;
    this._validateWarn = validateWarn;
  }

  (0, _createClass2["default"])(XVIZBaseUiBuilder, [{
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

exports["default"] = XVIZBaseUiBuilder;
//# sourceMappingURL=xviz-base-ui-builder.js.map