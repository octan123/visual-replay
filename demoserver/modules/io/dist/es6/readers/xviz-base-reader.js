import { isJSONString } from '../common/loaders';
export class XVIZBaseReader {
  constructor(source, options = {}) {
    this.source = source;
    this.options = options;
    this.suffix = options.suffix || '-frame.json';
    this.index = this._readIndex();
  }

  readMetadata() {
    if (this.source) {
      let data = this.source.readSync(this._xvizMessage(1));

      if (!data) {
        data = this.source.readSync(this._xvizMessage(1, {
          forceJson: true
        }));
      }

      return data;
    }

    return undefined;
  }

  readMessage(messageIndex) {
    if (this.source) {
      return this.source.readSync(this._xvizMessage(2 + messageIndex));
    }

    return undefined;
  }

  checkMessage(messageIndex) {
    if (this.source) {
      return this.source.existsSync(this._xvizMessage(2 + messageIndex));
    }

    return false;
  }

  timeRange() {
    if (this.index) {
      const {
        startTime,
        endTime
      } = this.index;
      return {
        startTime,
        endTime
      };
    }

    return {
      startTime: null,
      endTime: null
    };
  }

  messageCount() {
    if (this.index) {
      return this.index.timing.length;
    }

    return undefined;
  }

  findMessage(timestamp) {
    if (!this.index) {
      return undefined;
    }

    const {
      startTime,
      endTime,
      timing
    } = this.index;
    const messageCount = this.messageCount();
    const lastMessage = messageCount > 0 ? messageCount - 1 : 0;

    if (timestamp < startTime) {
      return {
        first: 0,
        last: 0
      };
    }

    if (timestamp > endTime) {
      return {
        first: lastMessage,
        last: lastMessage
      };
    }

    let first = timing.findIndex(timeEntry => timeEntry[0] >= timestamp);
    let last = -1;
    let i = lastMessage;

    while (i >= 0) {
      const timeEntry = timing[i];

      if (timeEntry[1] <= timestamp) {
        last = i;
        break;
      }

      i--;
    }

    if (first === -1) {
      first = 0;
    }

    if (last === -1) {
      last = lastMessage;
    }

    return {
      first,
      last
    };
  }

  close() {
    this.source.close();
  }

  _xvizMessage(index, {
    forceJson = false
  } = {}) {
    if (index === 0 || forceJson) {
      return "".concat(index, "-frame.json");
    }

    return "".concat(index).concat(this.suffix);
  }

  _readIndex() {
    if (this.source) {
      const indexData = this.source.readSync(this._xvizMessage(0));

      if (indexData) {
        if (isJSONString(indexData)) {
          return JSON.parse(indexData);
        } else if (typeof indexData === 'object') {
          return indexData;
        }
      }
    }

    return undefined;
  }

}
//# sourceMappingURL=xviz-base-reader.js.map