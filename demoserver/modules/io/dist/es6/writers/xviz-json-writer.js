import { XVIZBaseWriter } from './xviz-base-writer';
import { xvizConvertJson } from './xviz-json-encoder';
import { TextEncoder } from '../common/text-encoding';
import { XVIZEnvelope } from '@xviz/io';

const messageName = index => "".concat(index + 2, "-frame");

export class XVIZJSONWriter extends XVIZBaseWriter {
  constructor(sink, options = {}) {
    super(sink);
    const {
      envelope = true,
      precision = 10,
      asArrayBuffer = false
    } = options;
    this.messageTimings = {
      messages: new Map()
    };
    this.wroteMessageIndex = null;
    this.options = {
      envelope,
      precision,
      asArrayBuffer
    };
  }

  writeMetadata(xvizMetadata) {
    this._checkValid();

    this._saveTimestamp(xvizMetadata);

    if (this.options.envelope) {
      xvizMetadata = XVIZEnvelope.Metadata(xvizMetadata);
    }

    const msg = JSON.stringify(xvizMetadata);
    this.writeToSink('1-frame.json', msg);
  }

  writeMessage(messageIndex, xvizMessage) {
    this._checkValid();

    this._saveTimestamp(xvizMessage, messageIndex);

    if (this.options.envelope) {
      xvizMessage = XVIZEnvelope.StateUpdate(xvizMessage);
    }

    const numberRounder = (k, value) => {
      if (typeof value === 'number') {
        return Number(value.toFixed(this.options.precision));
      }

      return value;
    };

    const jsonXVIZMessage = xvizConvertJson(xvizMessage);
    const msg = JSON.stringify(jsonXVIZMessage, numberRounder);
    this.writeToSink("".concat(messageName(messageIndex), ".json"), msg);
  }

  _writeMessageIndex() {
    this._checkValid();

    const {
      startTime,
      endTime,
      messages
    } = this.messageTimings;
    const messageTimings = {};

    if (startTime) {
      messageTimings.startTime = startTime;
    }

    if (endTime) {
      messageTimings.endTime = endTime;
    }

    const messageTimes = Array.from(messages.keys()).sort((a, b) => a - b);
    const timing = [];
    messageTimes.forEach((value, index) => {
      const limit = timing.length;

      if (value > limit) {
        throw new Error("Error writing time index file. Messages are missing between ".concat(limit + 2, " and ").concat(value + 2));
      }

      timing.push(messages.get(value));
    });
    messageTimings.timing = timing;
    const msg = JSON.stringify(messageTimings);
    this.writeToSink('0-frame.json', msg);
    this.wroteMessageIndex = timing.length;
  }

  close() {
    if (this.sink) {
      if (!this.wroteMessageIndex) {
        this._writeMessageIndex();
      }

      super.close();
    }
  }

  _saveTimestamp(xviz_data, index) {
    const {
      log_info,
      updates
    } = xviz_data;

    if (index === undefined) {
      if (log_info) {
        const {
          start_time,
          end_time
        } = log_info || {};

        if (start_time) {
          this.messageTimings.startTime = start_time;
        }

        if (end_time) {
          this.messageTimings.endTime = end_time;
        }
      }
    } else if (updates) {
      if (updates.length === 0 || !updates.every(update => typeof update.timestamp === 'number')) {
        throw new Error('XVIZ updates did not contain a valid timestamp');
      }

      const min = Math.min(updates.map(update => update.timestamp));
      const max = Math.max(updates.map(update => update.timestamp));
      this.messageTimings.messages.set(index, [min, max, index, messageName(index)]);
    } else {
      throw new Error('Cannot find timestamp');
    }
  }

  writeToSink(name, msg) {
    if (this.options.asArrayBuffer) {
      const encoder = new TextEncoder();
      msg = encoder.encode(msg);
    }

    this.sink.writeSync(name, msg);
  }

}
//# sourceMappingURL=xviz-json-writer.js.map