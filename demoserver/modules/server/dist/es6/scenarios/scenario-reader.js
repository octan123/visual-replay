export class ScenarioReader {
  constructor(source, options = {}) {
    this.source = source;
    this.options = options;
    this.index = this._readIndex();
  }

  readMetadata() {
    return this.source.metadata;
  }

  readMessage(messageIndex) {
    return this.source.messages[messageIndex];
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

    let first = timing.findIndex(timeEntry => timeEntry >= timestamp);
    let last = -1;
    let i = lastMessage;

    while (i >= 0) {
      if (timing[i] <= timestamp) {
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

  close() {}

  _readIndex() {
    return {
      startTime: this.source.timing[0],
      endTime: this.source.timing[this.source.timing.length - 1],
      timing: this.source.timing
    };
  }

}
//# sourceMappingURL=scenario-reader.js.map