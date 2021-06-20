import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import Stylesheet from './stylesheet';
var EMPTY_STYLESHEET = new Stylesheet();

var XVIZStyleParser = function () {
  function XVIZStyleParser(data) {
    _classCallCheck(this, XVIZStyleParser);

    this.stylesheets = {};

    for (var streamName in data) {
      this.stylesheets[streamName] = new Stylesheet(data[streamName]);
    }
  }

  _createClass(XVIZStyleParser, [{
    key: "getStylesheet",
    value: function getStylesheet(streamName) {
      return this.stylesheets[streamName] || EMPTY_STYLESHEET;
    }
  }]);

  return XVIZStyleParser;
}();

export { XVIZStyleParser as default };
//# sourceMappingURL=xviz-style-parser.js.map