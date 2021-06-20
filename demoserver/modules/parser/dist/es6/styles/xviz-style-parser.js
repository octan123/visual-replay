import Stylesheet from './stylesheet';
const EMPTY_STYLESHEET = new Stylesheet();
export default class XVIZStyleParser {
  constructor(data) {
    this.stylesheets = {};

    for (const streamName in data) {
      this.stylesheets[streamName] = new Stylesheet(data[streamName]);
    }
  }

  getStylesheet(streamName) {
    return this.stylesheets[streamName] || EMPTY_STYLESHEET;
  }

}
//# sourceMappingURL=xviz-style-parser.js.map