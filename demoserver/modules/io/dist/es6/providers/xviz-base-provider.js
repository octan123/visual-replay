import { XVIZData } from '../common/xviz-data';

class MessageIterator {
  constructor(start, end, increment = 1) {
    this.start = start;
    this.end = end;
    this.increment = increment;
    this.current = start;
  }

  valid() {
    return this.current <= this.end;
  }

  value() {
    return this.current;
  }

  next() {
    const valid = this.valid();

    if (!valid) {
      return {
        valid
      };
    }

    const data = this.current;
    this.current += this.increment;
    return {
      valid,
      data
    };
  }

}

export class XVIZBaseProvider {
  constructor({
    reader,
    options
  }) {
    this.reader = reader;
    this.options = options;
    this.metadata = null;
    this._valid = false;
  }

  async init() {
    if (!this.reader) {
      return;
    }

    const {
      startTime,
      endTime
    } = this.reader.timeRange();
    this.metadata = this._readMetadata();

    if (this.metadata && Number.isFinite(startTime) && Number.isFinite(endTime) && this.reader.checkMessage(0)) {
        this._valid = true;
      }

    if (this.metadata && (!Number.isFinite(startTime) || !Number.isFinite(endTime))) {
      throw new Error('The data source is missing the data index');
    }
  }

  valid() {
    return this._valid;
  }

  xvizMetadata() {
    return this.metadata;
  }

  async xvizMessage(iterator) {
    const {
      valid,
      data
    } = iterator.next();

    if (!valid) {
      return null;
    }

    const message = this._readMessage(data);

    return message;
  }

  getMessageIterator({
    startTime,
    endTime
  } = {}, options = {}) {
    const {
      startTime: start,
      endTime: end
    } = this.reader.timeRange();

    if (!Number.isFinite(startTime)) {
      startTime = start;
    }

    if (!Number.isFinite(endTime)) {
      endTime = end;
    }

    if (startTime > endTime) {
      return null;
    }

    const startMessages = this.reader.findMessage(startTime);
    const endMessages = this.reader.findMessage(endTime);

    if (startMessages !== undefined && endMessages !== undefined) {
      return new MessageIterator(startMessages.first, endMessages.last);
    }

    return null;
  }

  _readMessage(message) {
    const data = this.reader.readMessage(message);

    if (data) {
      return new XVIZData(data);
    }

    return undefined;
  }

  _readMetadata() {
    const data = this.reader.readMetadata();

    if (data) {
      return new XVIZData(data);
    }

    return undefined;
  }

}
//# sourceMappingURL=xviz-base-provider.js.map