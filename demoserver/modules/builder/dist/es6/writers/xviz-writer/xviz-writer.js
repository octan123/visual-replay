import { writeBinaryXVIZtoFile } from './xviz-binary-writer';
import { xvizConvertJson } from './xviz-json-encoder.js';
import { XVIZEnvelope } from '@xviz/io';

const frameName = index => "".concat(index + 2, "-frame");

class FileSink {
  constructor() {
    this.fs = module.require('fs');
    this.path = module.require('path');
  }

  writeSync(scope, name, data) {
    const xvizMetadataFilename = this.path.join(scope, name);
    const options = {
      flag: 'w'
    };
    this.fs.writeFileSync(xvizMetadataFilename, data, options);
  }

}

export default class XVIZWriter {
  constructor(options = {}) {
    const {
      dataSink = new FileSink(),
      envelope = true,
      binary = true,
      json = false,
      DracoWriter,
      DracoLoader
    } = options;
    this.sink = dataSink;
    this.frameTimings = {
      frames: new Map()
    };
    this.wroteFrameIndex = null;
    this.options = {
      envelope,
      binary,
      json,
      DracoWriter,
      DracoLoader
    };
  }

  writeMetadata(xvizDirectory, xvizMetadata) {
    this._saveTimestamp(xvizMetadata);

    if (this.options.envelope) {
      xvizMetadata = XVIZEnvelope.Metadata(xvizMetadata);
    }

    if (this.options.binary) {
      const options = {
        flattenArrays: true
      };
      writeBinaryXVIZtoFile(this.sink, xvizDirectory, '1-frame', xvizMetadata, options);
    }

    if (this.options.json) {
      this.sink.writeSync(xvizDirectory, '1-frame.json', JSON.stringify(xvizMetadata));
    }
  }

  writeFrame(xvizDirectory, frameIndex, xvizFrame) {
    if (this.wroteFrameIndex !== null) {
      throw new Error("writeFrame() was called after writeFrameIndex().  The index was written with last frame of ".concat(frameName(this.wroteFrameIndex - 1)));
    }

    this._saveTimestamp(xvizFrame, frameIndex);

    if (this.options.envelope) {
      xvizFrame = XVIZEnvelope.StateUpdate(xvizFrame);
    }

    if (this.options.binary) {
      const options = {
        flattenArrays: true
      };

      if (this.options.DracoWriter) {
        options.DracoWriter = this.options.DracoWriter;
      }

      if (this.options.DracoLoader) {
        options.DracoLoader = this.options.DracoLoader;
      }

      writeBinaryXVIZtoFile(this.sink, xvizDirectory, frameName(frameIndex), xvizFrame, options);
    }

    if (this.options.json) {
      const numberRounder = (k, value) => {
        if (typeof value === 'number') {
          return Number(value.toFixed(10));
        }

        return value;
      };

      const jsonXVIZFrame = xvizConvertJson(xvizFrame);
      this.sink.writeSync(xvizDirectory, "".concat(frameName(frameIndex), ".json"), JSON.stringify(jsonXVIZFrame, numberRounder));
    }
  }

  writeFrameIndex(xvizDirectory) {
    const {
      startTime,
      endTime,
      frames
    } = this.frameTimings;
    const frameTimings = {};

    if (startTime) {
      frameTimings.startTime = startTime;
    }

    if (endTime) {
      frameTimings.endTime = endTime;
    }

    const frameTimes = Array.from(frames.keys()).sort((a, b) => a - b);
    const timing = [];
    frameTimes.forEach((value, index) => {
      const limit = timing.length;

      if (value > limit) {
        throw new Error("Error writing time index file. Frames are missing between ".concat(limit + 2, " and ").concat(value + 2));
      }

      timing.push(frames.get(value));
    });
    frameTimings.timing = timing;
    this.sink.writeSync(xvizDirectory, '0-frame.json', JSON.stringify(frameTimings));
    this.wroteFrameIndex = timing.length;
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
          this.frameTimings.startTime = start_time;
        }

        if (end_time) {
          this.frameTimings.endTime = end_time;
        }
      }
    } else if (updates) {
      if (updates.length === 0 || !updates.every(update => typeof update.timestamp === 'number')) {
        throw new Error('XVIZ updates did not contain a valid timestamp');
      }

      const min = Math.min(updates.map(update => update.timestamp));
      const max = Math.max(updates.map(update => update.timestamp));
      this.frameTimings.frames.set(index, [min, max, index, frameName(index)]);
    } else {
      throw new Error('Cannot find timestamp');
    }
  }

}
//# sourceMappingURL=xviz-writer.js.map