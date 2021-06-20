import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { getXVIZConfig, StreamSynchronizer, LOG_STREAM_MESSAGE } from '@xviz/parser';
import { clamp } from 'math.gl';
import PlayableLoaderInterface from './playable-loader-interface';
import createSelector from '../utils/create-selector';
import stats from '../utils/stats';
export default class XVIZLoaderInterface extends PlayableLoaderInterface {
  constructor(options = {}) {
    super();

    _defineProperty(this, "onXVIZMessage", message => {
      switch (message.type) {
        case LOG_STREAM_MESSAGE.METADATA:
          this._onXVIZMetadata(message);

          this.emit('ready', message);
          break;

        case LOG_STREAM_MESSAGE.TIMESLICE:
          this._onXVIZTimeslice(message);

          this.emit('update', message);
          break;

        case LOG_STREAM_MESSAGE.DONE:
          this.emit('finish', message);
          break;

        default:
          this.emit('error', message);
      }
    });

    _defineProperty(this, "onError", error => {
      this.emit('error', error);
    });

    _defineProperty(this, "getMetadata", () => this.get('metadata'));

    _defineProperty(this, "getStreamSettings", () => this.get('streamSettings'));

    _defineProperty(this, "_getStreamsMetadata", () => this.get('streamsMetadata'));

    _defineProperty(this, "_getStreams", createSelector(this, this._getDataVersion, () => this._getDataByStream()));

    _defineProperty(this, "getBufferedTimeRanges", createSelector(this, this._getDataVersion, () => this._getBufferedTimeRanges()));

    _defineProperty(this, "getStreams", createSelector(this, [this.getStreamSettings, this._getStreams, this._getDataVersion], (streamSettings, streams) => {
      if (!streamSettings || !streams) {
        return streams;
      }

      const result = {};

      for (const streamName in streams) {
        if (streamSettings[streamName]) {
          result[streamName] = streams[streamName];
        }
      }

      return result;
    }));

    _defineProperty(this, "getStreamsMetadata", getXVIZConfig().DYNAMIC_STREAM_METADATA ? createSelector(this, [this.getMetadata, this._getStreamsMetadata], (metadata, streamsMetadata) => {
      return Object.assign({}, streamsMetadata, metadata && metadata.streams);
    }) : createSelector(this, this.getMetadata, metadata => metadata && metadata.streams || {}));

    _defineProperty(this, "getBufferStartTime", createSelector(this, this.getCurrentTime, () => this._getBufferStartTime()));

    _defineProperty(this, "getBufferEndTime", createSelector(this, this.getCurrentTime, () => this._getBufferEndTime()));

    _defineProperty(this, "getLogStartTime", createSelector(this, this.getMetadata, metadata => this._getLogStartTime(metadata)));

    _defineProperty(this, "getLogEndTime", createSelector(this, this.getMetadata, metadata => this._getLogEndTime(metadata)));

    _defineProperty(this, "getCurrentFrame", createSelector(this, [this.getStreamSettings, this.getCurrentTime, this.getLookAhead, this._getDataVersion], (streamSettings, timestamp, lookAhead) => {
      const {
        logSynchronizer
      } = this;

      if (logSynchronizer && Number.isFinite(timestamp)) {
        logSynchronizer.setTime(timestamp);
        logSynchronizer.setLookAheadTimeOffset(lookAhead);
        return logSynchronizer.getCurrentFrame(streamSettings);
      }

      return null;
    }));

    this.options = options;

    this._debug = options.debug || (() => {});

    this.callbacks = {};
  }

  on(eventType, cb) {
    this.callbacks[eventType] = this.callbacks[eventType] || [];
    this.callbacks[eventType].push(cb);
    return this;
  }

  off(eventType, cb) {
    const callbacks = this.callbacks[eventType];

    if (callbacks) {
      const index = callbacks.indexOf(cb);

      if (index >= 0) {
        callbacks.splice(index, 1);
      }
    }

    return this;
  }

  emit(eventType, eventArgs) {
    const callbacks = this.callbacks[eventType];

    if (callbacks) {
      for (const cb of callbacks) {
        cb(eventType, eventArgs);
      }
    }

    stats.get("loader-".concat(eventType)).incrementCount();
  }

  seek(timestamp) {
    const metadata = this.getMetadata();

    if (metadata) {
      const startTime = this.getLogStartTime();
      const endTime = this.getLogEndTime();

      if (Number.isFinite(startTime) && Number.isFinite(endTime)) {
        timestamp = clamp(timestamp, startTime, endTime);
      }
    }

    this.set('timestamp', timestamp);
    this.streamBuffer.setCurrentTime(timestamp);
  }

  updateStreamSettings(settings) {
    const streamSettings = this.get('streamSettings');
    this.set('streamSettings', _objectSpread(_objectSpread({}, streamSettings), settings));
  }

  _onXVIZMetadata(metadata) {
    this.set('metadata', metadata);

    if (metadata.streams && Object.keys(metadata.streams).length > 0) {
      this.set('streamSettings', metadata.streams);
    }

    if (!this.streamBuffer) {
      throw new Error('streamBuffer is missing');
    }

    this.logSynchronizer = this.logSynchronizer || new StreamSynchronizer(this.streamBuffer);
    const timestamp = this.get('timestamp');
    const newTimestamp = Number.isFinite(timestamp) ? timestamp : metadata.start_time;

    if (Number.isFinite(newTimestamp)) {
      this.seek(newTimestamp);
    }
  }

  _onXVIZTimeslice(timeslice) {
    const oldStreamCount = this.streamBuffer.streamCount;
    const bufferUpdated = this.streamBuffer.insert(timeslice);

    if (bufferUpdated) {
      this._bumpDataVersion();
    }

    if (getXVIZConfig().DYNAMIC_STREAM_METADATA && this.streamBuffer.streamCount > oldStreamCount) {
      const streamsMetadata = {};
      const streamSettings = this.get('streamSettings');

      for (const streamName in timeslice.streams) {
        streamsMetadata[streamName] = timeslice.streams[streamName].__metadata;

        if (!(streamName in streamSettings)) {
          streamSettings[streamName] = true;
        }
      }

      this.set('streamsMetadata', streamsMetadata);
    }

    return bufferUpdated;
  }

  _getDataByStream() {
    return this.streamBuffer.streams;
  }

  _getBufferedTimeRanges() {
    const range = this.streamBuffer.getLoadedTimeRange();

    if (range) {
      return [[range.start, range.end]];
    }

    return [];
  }

  _getLogStartTime(metadata) {
    return metadata && metadata.start_time && metadata.start_time + getXVIZConfig().TIME_WINDOW;
  }

  _getLogEndTime(metadata) {
    return metadata && metadata.end_time;
  }

  _getBufferStartTime() {
    return this.getLogStartTime();
  }

  _getBufferEndTime() {
    return this.getLogEndTime();
  }

}
//# sourceMappingURL=xviz-loader-interface.js.map