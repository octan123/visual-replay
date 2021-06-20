import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import LoaderInterface from './loader-interface';
export default class PlayableLoaderInterface extends LoaderInterface {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "getCurrentTime", () => this.get('timestamp'));

    _defineProperty(this, "getLookAhead", () => this.get('lookAhead'));
  }

  seek(timestamp) {
    throw new Error('Not implemented');
  }

  isOpen() {
    return false;
  }

  connect() {
    throw new Error('not implemented');
  }

  close() {
    throw new Error('Not implemented');
  }

  setLookAhead(lookAhead) {
    this.set('lookAhead', lookAhead);
  }

  getLogStartTime() {
    throw new Error('Not implemented');
  }

  getLogEndTime() {
    throw new Error('Not implemented');
  }

  getBufferedTimeRanges() {
    throw new Error('Not implemented');
  }

}
//# sourceMappingURL=playable-loader-interface.js.map