"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _stylesheet = _interopRequireDefault(require("./stylesheet"));

var EMPTY_STYLESHEET = new _stylesheet["default"]();

var XVIZStyleParser = function () {
  function XVIZStyleParser(data) {
    (0, _classCallCheck2["default"])(this, XVIZStyleParser);
    this.stylesheets = {};

    for (var streamName in data) {
      this.stylesheets[streamName] = new _stylesheet["default"](data[streamName]);
    }
  }

  (0, _createClass2["default"])(XVIZStyleParser, [{
    key: "getStylesheet",
    value: function getStylesheet(streamName) {
      return this.stylesheets[streamName] || EMPTY_STYLESHEET;
    }
  }]);
  return XVIZStyleParser;
}();

exports["default"] = XVIZStyleParser;
//# sourceMappingURL=xviz-style-parser.js.map