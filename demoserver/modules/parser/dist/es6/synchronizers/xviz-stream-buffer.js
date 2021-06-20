import XVIZObject from '../objects/xviz-object';
import assert from '../utils/assert';
import { findInsertPos, INSERT_POSITION } from '../utils/search';
const LEFT = INSERT_POSITION.LEFT;
const RIGHT = INSERT_POSITION.RIGHT;
const UNLIMITED = 0;
const OFFSET = 1;
const FIXED = 2;
export default class XVIZStreamBuffer {
  constructor({
    startOffset = null,
    endOffset = null,
    maxLength = null
  } = {}) {
    if (Number.isFinite(startOffset) && Number.isFinite(endOffset)) {
      assert(startOffset <= 0 && endOffset >= 0, 'Steam buffer offset');
      this.bufferType = OFFSET;
    } else {
      this.bufferType = UNLIMITED;
    }

    this.options = {
      startOffset,
      endOffset,
      maxLength
    };
    this.bufferStart = null;
    this.bufferEnd = null;
    this.timeslices = [];
    this.persistent = [];
    this.streams = {};
    this.videos = {};
    this.persistentStreams = {};
    this.lastUpdate = 0;
    this.streamCount = 0;
    this.hasBuffer = this.hasBuffer.bind(this);
  }

  get size() {
    return this.timeslices.length + this.persistent.length;
  }

  updateFixedBuffer(start, end) {
    const {
      bufferStart,
      bufferEnd,
      options: {
        maxLength
      }
    } = this;
    assert(start < end, 'updateFixedBuffer start / end');
    assert(this.bufferType === UNLIMITED || this.bufferType === FIXED, 'updateFixedBuffer multiple buffer types');
    this.bufferType = FIXED;

    if (!maxLength) {
      this.bufferStart = start;
      this.bufferEnd = end;
    } else if (!Number.isFinite(bufferStart) || start > bufferEnd + maxLength || start < bufferStart - maxLength) {
      this.bufferStart = start;
      this.bufferEnd = Math.min(end, start + maxLength);
    } else if (start < bufferStart) {
      this.bufferStart = start;
      this.bufferEnd = Math.min(bufferEnd, start + maxLength);
    } else {
      this.bufferStart = Math.min(bufferEnd, end - maxLength);
      this.bufferEnd = Math.min(this.bufferStart + maxLength, end);
    }

    this._pruneBuffer();

    return {
      start: this.bufferStart,
      end: this.bufferEnd,
      oldStart: bufferStart,
      oldEnd: bufferEnd
    };
  }

  getBufferRange() {
    if (this.bufferType !== UNLIMITED) {
      const {
        bufferStart,
        bufferEnd
      } = this;

      if (Number.isFinite(bufferStart)) {
        return {
          start: bufferStart,
          end: bufferEnd
        };
      }
    }

    return {
      start: null,
      end: null
    };
  }

  getLoadedTimeRange() {
    const {
      timeslices
    } = this;
    const len = timeslices.length;

    if (len > 0) {
      return {
        start: timeslices[0].timestamp,
        end: timeslices[len - 1].timestamp
      };
    }

    return null;
  }

  getTimeslices({
    start,
    end
  } = {}) {
    const {
      timeslices,
      persistent
    } = this;
    const startIndex = Number.isFinite(start) ? this._indexOf(start, LEFT) : 0;
    const endIndex = Number.isFinite(end) ? this._indexOf(end, RIGHT) : timeslices.length;
    const persistentEndIndex = Number.isFinite(end) ? findInsertPos(persistent, end, RIGHT) : persistent.length;
    return persistent.slice(0, persistentEndIndex).concat(timeslices.slice(startIndex, endIndex));
  }

  getStreams() {
    const {
      streams
    } = this;
    const result = {};

    for (const streamName in streams) {
      result[streamName] = streams[streamName].filter(value => value !== undefined);
    }

    return result;
  }

  getVideos() {
    const {
      videos
    } = this;
    const result = {};

    for (const streamName in videos) {
      result[streamName] = videos[streamName].filter(value => value !== undefined);
    }

    return result;
  }

  getVehiclePoses() {
    return this.timeslices.map(t => t.vehiclePose).filter(Boolean);
  }

  insert(timeslice) {
    const {
      timestamp,
      updateType
    } = timeslice;

    if (!this.isInBufferRange(timestamp)) {
      return false;
    }

    timeslice.streams = timeslice.streams || {};
    timeslice.videos = timeslice.videos || {};
    timeslice.links = timeslice.links || {};
    const {
      timeslices,
      streams,
      videos
    } = this;

    if (updateType === 'PERSISTENT') {
      this._insertPersistentSlice(timeslice);

      this.lastUpdate++;
      return true;
    }

    for (const streamName in timeslice.streams) {
      if (!streams[streamName]) {
        streams[streamName] = new Array(timeslices.length);
        this.streamCount++;
      }
    }

    for (const streamName in timeslice.videos) {
      if (!videos[streamName]) {
        videos[streamName] = new Array(timeslices.length);
      }
    }

    const insertPosition = this._indexOf(timestamp, LEFT);

    const timesliceAtInsertPosition = timeslices[insertPosition];

    if (timesliceAtInsertPosition && timesliceAtInsertPosition.timestamp === timestamp) {
      if (updateType === 'COMPLETE') {
        this._insertTimesliceAt(insertPosition, 1, timeslice);
      } else {
        this._mergeTimesliceAt(insertPosition, timeslice);
      }
    } else {
      this._insertTimesliceAt(insertPosition, 0, timeslice);
    }

    this.lastUpdate++;
    return true;
  }

  setCurrentTime(timestamp) {
    if (this.bufferType === OFFSET) {
      const {
        options: {
          startOffset,
          endOffset
        }
      } = this;
      this.bufferStart = timestamp + startOffset;
      this.bufferEnd = timestamp + endOffset;

      this._pruneBuffer();
    }
  }

  valueOf() {
    return this.lastUpdate;
  }

  hasBuffer(fromTime, toTime) {
    if (!this.timeslices.length) {
      return true;
    }

    const {
      start,
      end
    } = this.getLoadedTimeRange();
    return fromTime >= start && toTime <= end;
  }

  isInBufferRange(timestamp) {
    const {
      bufferStart,
      bufferEnd,
      bufferType
    } = this;

    if (bufferType !== UNLIMITED && Number.isFinite(bufferStart)) {
      return timestamp >= bufferStart && timestamp <= bufferEnd;
    }

    return true;
  }

  _pruneBuffer() {
    const {
      timeslices,
      streams,
      videos
    } = this;

    if (timeslices.length) {
      const startIndex = this._indexOf(this.bufferStart, LEFT);

      const endIndex = this._indexOf(this.bufferEnd, RIGHT);

      XVIZObject.prune(this.bufferStart, this.bufferEnd);
      const trimStart = startIndex > 0;
      const trimEnd = endIndex < timeslices.length;

      if (trimStart || trimEnd) {
        trimEnd && timeslices.splice(endIndex);
        trimStart && timeslices.splice(0, startIndex);

        for (const streamName in streams) {
          const stream = streams[streamName];
          trimEnd && stream.splice(endIndex);
          trimStart && stream.splice(0, startIndex);
        }

        for (const streamName in videos) {
          const stream = videos[streamName];
          trimEnd && stream.splice(endIndex);
          trimStart && stream.splice(0, startIndex);
        }

        this.lastUpdate++;
      }
    }
  }

  _insertPersistentSlice(persistentSlice) {
    const {
      persistent,
      persistentStreams
    } = this;
    const {
      timestamp,
      streams,
      links
    } = persistentSlice;
    const index = findInsertPos(persistent, timestamp, LEFT);
    const timesliceAtInsertPosition = persistent[index];

    if (timesliceAtInsertPosition && timesliceAtInsertPosition.timestamp === timestamp) {
      Object.assign(timesliceAtInsertPosition, persistentSlice, {
        streams: Object.assign(timesliceAtInsertPosition.streams, streams),
        links: Object.assign(timesliceAtInsertPosition.links, links)
      });
    } else {
      persistent.splice(index, 0, persistentSlice);
    }

    for (const streamName in streams) {
      if (!(streamName in persistentStreams)) {
        persistentStreams[streamName] = true;
        this.streamCount++;
      }
    }
  }

  _mergeTimesliceAt(index, timeslice) {
    const {
      timeslices,
      streams,
      videos
    } = this;
    const timesliceAtInsertPosition = timeslices[index];
    Object.assign(timesliceAtInsertPosition, timeslice, {
      streams: Object.assign(timesliceAtInsertPosition.streams, timeslice.streams),
      links: Object.assign(timesliceAtInsertPosition.links, timeslice.links),
      videos: Object.assign(timesliceAtInsertPosition.videos, timeslice.videos)
    });

    for (const streamName in timeslice.streams) {
      const value = timeslice.streams[streamName];
      streams[streamName][index] = value;
    }

    for (const streamName in timeslice.videos) {
      videos[streamName][index] = timeslice.videos[streamName];
    }
  }

  _insertTimesliceAt(index, deleteCount, timeslice) {
    const {
      timeslices,
      streams,
      videos
    } = this;
    timeslices.splice(index, deleteCount, timeslice);

    for (const streamName in streams) {
      streams[streamName].splice(index, deleteCount, timeslice.streams[streamName]);
    }

    for (const streamName in videos) {
      videos[streamName].splice(index, deleteCount, timeslice.videos[streamName]);
    }
  }

  _indexOf(timestamp, insertPosition = LEFT) {
    const {
      timeslices
    } = this;
    return findInsertPos(timeslices, timestamp, insertPosition);
  }

}
//# sourceMappingURL=xviz-stream-buffer.js.map