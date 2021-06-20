import assert from 'assert';
import { parseStreamMessage, XVIZStreamBuffer } from '@xviz/parser';
import XVIZLoaderInterface from './xviz-loader-interface';
const DEFAULT_BATCH_SIZE = 4;
export default class XVIZFileLoader extends XVIZLoaderInterface {
  constructor(options) {
    super(options);
    assert(options.timingsFilePath && options.getFilePath);
    this._timingsFilePath = options.timingsFilePath;
    this._getFilePath = options.getFilePath;
    this._batchSize = options.maxConcurrency || DEFAULT_BATCH_SIZE;
    this.streamBuffer = new XVIZStreamBuffer();
    this._isOpen = false;
    this._lastLoadFrame = -1;
  }

  isOpen() {
    return this._isOpen;
  }

  connect() {
    this._isOpen = true;

    this._loadTimings().then(data => {
      this._numberOfFrames = data.timing.length + 1;

      this._loadMetadata().then(() => this._startLoad());
    });
  }

  seek(timestamp) {
    super.seek(timestamp);
  }

  close() {
    this._isOpen = false;
  }

  _loadTimings() {
    return fetch(this._timingsFilePath).then(resp => resp.json());
  }

  _loadMetadata() {
    const metadataPath = this._getFilePath(0);

    assert(metadataPath);
    return this._loadFile(metadataPath, {
      worker: false
    });
  }

  _startLoad() {
    this._lastLoadFrame = 0;

    for (let i = 0; i < this._batchSize && i < this._numberOfFrames; i++) {
      this._loadNextFrame();
    }
  }

  _loadNextFrame() {
    if (!this.isOpen()) {
      return;
    }

    this._lastLoadFrame = this._lastLoadFrame + 1;

    if (this._lastLoadFrame >= this._numberOfFrames) {
      this.emit('done');
      return;
    }

    const filePath = this._getFilePath(this._lastLoadFrame);

    assert(filePath);
    Promise.resolve(this._loadFile(filePath, this.options)).then(() => {
      this._loadNextFrame();
    });
  }

  _loadFile(filePath, options) {
    const fileFormat = filePath.toLowerCase().match(/[^\.]*$/)[0];
    let file;

    switch (fileFormat) {
      case 'glb':
        file = fetch(filePath).then(resp => resp.arrayBuffer());
        break;

      case 'json':
        file = fetch(filePath).then(resp => resp.json());
        break;

      default:
        return Promise.reject('Unknown file format');
    }

    return file.then(data => {
      if (this._isOpen) {
        parseStreamMessage({
          message: data,
          onResult: this.onXVIZMessage,
          onError: this.onError,
          worker: options.worker,
          maxConcurrency: options.maxConcurrency,
          debug: this._debug.bind(this, 'parse_message')
        });
      }
    });
  }

}
//# sourceMappingURL=xviz-file-loader.js.map