import { XVIZBaseWriter } from './xviz-base-writer';
import { XVIZ_PROTOBUF_MAGIC, XVIZ_PROTOBUF_MESSAGE } from '../common/protobuf-support';

const messageName = index => "".concat(index + 2, "-frame");

export class XVIZProtobufWriter extends XVIZBaseWriter {
  constructor(sink, options = {}) {
    super(sink);
    const {
      envelope = true
    } = options;
    this.messageTimings = {
      messages: new Map()
    };
    this.wroteMessageIndex = null;
    this.options = {
      envelope
    };
  }

  writeMetadata(xvizMetadata) {
    this._checkValid();

    this._saveTimestamp(xvizMetadata);

    const pbJSON = xvizConvertProtobuf(xvizMetadata);
    let pbInfo = {
      type: XVIZ_PROTOBUF_MESSAGE.Metadata,
      msg: XVIZ_PROTOBUF_MESSAGE.Metadata.fromObject(pbJSON)
    };

    if (this.options.envelope) {
      this._applyEnvelope(pbInfo);
    }

    const pbBuffer = pbInfo.type.encode(pbInfo.msg).finish();
    const buffer = new Uint8Array(pbBuffer.byteLength + 4);
    buffer.set(XVIZ_PROTOBUF_MAGIC, 0);
    buffer.set(pbBuffer, 4);
    this.writeToSink('1-frame.pbe', buffer);
  }

  writeMessage(messageIndex, xvizMessage) {
    this._checkValid();

    this._saveTimestamp(xvizMessage, messageIndex);

    const pbJSON = xvizConvertProtobuf(xvizMessage);
    let pbInfo = {
      type: XVIZ_PROTOBUF_MESSAGE.StateUpdate,
      msg: XVIZ_PROTOBUF_MESSAGE.StateUpdate.fromObject(pbJSON)
    };

    if (this.options.envelope) {
      this._applyEnvelope(pbInfo);
    }

    const pbBuffer = pbInfo.type.encode(pbInfo.msg).finish();
    const buffer = new Uint8Array(pbBuffer.byteLength + 4);
    buffer.set(XVIZ_PROTOBUF_MAGIC, 0);
    buffer.set(pbBuffer, 4);
    this.writeToSink("".concat(messageName(messageIndex), ".pbe"), buffer);
  }

  _applyEnvelope(info) {
    if (info.type === XVIZ_PROTOBUF_MESSAGE.Metadata) {
      const value = info.type.encode(info.msg).finish();
      info.type = XVIZ_PROTOBUF_MESSAGE.Envelope;
      info.msg = info.type.fromObject({
        type: 'xviz/metadata',
        data: {
          type_url: 'xviz.v2.Metadata',
          value
        }
      });
    } else if (info.type === XVIZ_PROTOBUF_MESSAGE.StateUpdate) {
      const value = info.type.encode(info.msg).finish();
      info.type = XVIZ_PROTOBUF_MESSAGE.Envelope;
      info.msg = info.type.fromObject({
        type: 'xviz/state_update',
        data: {
          type_url: 'xviz.v2.StateUpdate',
          value
        }
      });
    }
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
    this.sink.writeSync(name, msg);
  }

}
const COLOR_KEYS = ['stroke_color', 'fill_color'];

function toColorArray(object) {
  const clrs = object.substring(1);
  const len = clrs.length;

  if (!(len === 3 || len === 4 || len === 6 || len === 8)) {
    return null;
  }

  const color = [];
  const step = clrs.length === 3 || clrs.length === 4 ? 1 : 2;

  for (let i = 0; i < clrs.length; i += step) {
    color.push(parseInt(clrs.substr(i, step), 16));
  }

  return color;
}

export function xvizConvertProtobuf(object, keyName) {
  if (Array.isArray(object)) {
    if (!(keyName === 'vertices' || keyName === 'points' || keyName === 'colors')) {
      return object.map(element => xvizConvertProtobuf(element, keyName));
    }

    if (Array.isArray(object[0])) {
      const flat = [];
      object.forEach(el => flat.push(...el));
      return flat;
    } else if (ArrayBuffer.isView(object[0])) {
      const flat = [];
      object.forEach(el => flat.push(...Array.from(el)));
      return flat;
    } else if (Number.isFinite(object[0])) {
      return object;
    } else if (typeof object[0] === 'object') {
      return object.map(element => xvizConvertProtobuf(element, keyName));
    }
  }

  if (ArrayBuffer.isView(object)) {
    return Array.from(object);
  }

  if (COLOR_KEYS.includes(keyName)) {
    if (typeof object === 'string' && object.match(/^#([0-9a-f]{3,4})|([0-9a-f]{6,8})$/i)) {
      return toColorArray(object);
    }
  }

  if (object !== null && typeof object === 'object') {
    const properties = Object.keys(object);

    if (properties.includes('data') && keyName === 'images') {
      return object;
    }

    const newObject = {};
    const objectKeys = Object.keys(object);

    for (const key of objectKeys) {
      newObject[key] = xvizConvertProtobuf(object[key], key);
    }

    return newObject;
  }

  return object;
}
//# sourceMappingURL=xviz-protobuf-writer.js.map