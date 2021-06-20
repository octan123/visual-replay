"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var BaseObject = function () {
  function BaseObject() {
    (0, _classCallCheck2["default"])(this, BaseObject);
  }

  (0, _createClass2["default"])(BaseObject, [{
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

exports["default"] = BaseObject;
//# sourceMappingURL=base-object.js.map