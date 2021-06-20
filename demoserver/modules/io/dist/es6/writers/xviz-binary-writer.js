import { XVIZBaseWriter } from './xviz-base-writer';
import { GLTFBuilder } from '../gltf/gltf-builder';
import { packBinaryJson } from './xviz-pack-binary';
import { XVIZEnvelope, XVIZ_GLTF_EXTENSION } from '@xviz/io';

function toBuffer(binaryData) {
  if (ArrayBuffer.isView(binaryData)) {
    binaryData = binaryData.buffer;
  }

  if (typeof Buffer !== 'undefined' && binaryData instanceof ArrayBuffer) {
    const buffer = new Buffer(binaryData.byteLength);
    const view = new Uint8Array(binaryData);

    for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
    }

    return buffer;
  }

  throw new Error('Failed to convert to buffer');
}

const messageName = index => "".concat(index + 2, "-frame");

export function encodeBinaryXVIZ(xvizJson, options) {
  const gltfBuilder = new GLTFBuilder(options);
  const packedData = packBinaryJson(xvizJson, gltfBuilder, null, options);
  const {
    useAVSXVIZExtension
  } = options;

  if (useAVSXVIZExtension === true) {
    gltfBuilder.addExtension(XVIZ_GLTF_EXTENSION, packedData, {
      nopack: true
    });
  } else {
    gltfBuilder.addApplicationData('xviz', packedData, {
      nopack: true
    });
  }

  return gltfBuilder.encodeAsGLB(options);
}
export class XVIZBinaryWriter extends XVIZBaseWriter {
  constructor(sink, options = {}) {
    super(sink);
    const {
      envelope = true,
      flattenArrays = true,
      DracoWriter,
      DracoLoader
    } = options;
    this.messageTimings = {
      messages: new Map()
    };
    this.wroteMessageIndex = null;
    this.options = {
      envelope,
      flattenArrays,
      DracoWriter,
      DracoLoader
    };
    this.encodingOptions = {
      flattenArrays: this.options.flattenArrays
    };

    if (this.options.DracoWriter) {
      this.encodingOptions.DracoWriter = DracoWriter;
    }

    if (this.options.DracoLoader) {
      this.encodingOptions.DracoLoader = DracoLoader;
    }
  }

  writeMetadata(xvizMetadata) {
    this._checkValid();

    this._saveTimestamp(xvizMetadata);

    if (this.options.envelope) {
      xvizMetadata = XVIZEnvelope.Metadata(xvizMetadata);
    }

    const glbFileBuffer = encodeBinaryXVIZ(xvizMetadata, this.encodingOptions);
    this.sink.writeSync("1-frame.glb", toBuffer(glbFileBuffer), {
      flag: 'w'
    });
  }

  writeMessage(messageIndex, xvizMessage) {
    this._checkValid();

    this._saveTimestamp(xvizMessage, messageIndex);

    if (this.options.envelope) {
      xvizMessage = XVIZEnvelope.StateUpdate(xvizMessage);
    }

    const glbFileBuffer = encodeBinaryXVIZ(xvizMessage, this.encodingOptions);
    this.sink.writeSync("".concat(messageName(messageIndex), ".glb"), toBuffer(glbFileBuffer), {
      flag: 'w'
    });
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
    this.sink.writeSync('0-frame.json', JSON.stringify(messageTimings));
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

}
//# sourceMappingURL=xviz-binary-writer.js.map