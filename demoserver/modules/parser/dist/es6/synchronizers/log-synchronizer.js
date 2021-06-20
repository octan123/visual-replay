import BaseSynchronizer from './base-synchronizer';
import assert from '../utils/assert';
export default class LogSynchronizer extends BaseSynchronizer {
  constructor(logs = {}, opts) {
    super(opts);
    this.logs = {};

    for (const logName in logs) {
      const data = logs[logName];
      assert(Array.isArray(data) && data.length > 0, 'Invalid log data');

      const logStartTime = this._getTimeFromObject(data[0]);

      this.logs[logName] = {
        data,
        index: null,
        time: logStartTime
      };
    }
  }

  _empty() {
    return !this.logs || Object.keys(this.logs).length === 0;
  }

  _getTimeRangeInReverse(startTime, endTime) {
    const streams = {};

    for (const logName in this.logs) {
      const datum = this._lookupStreamDatum(logName, startTime, endTime);

      if (datum) {
        streams[logName] = datum;
      }
    }

    return {
      streams: [streams],
      links: []
    };
  }

  _lookupStreamDatum(logName, startTime, endTime) {
    const log = this.logs[logName];
    assert(log, 'Invalid log');

    if (endTime < log.time) {
      log.time = 0;
      log.index = null;
    }

    const startIndex = log.index || 0;
    let endIndex = null;
    let endTimestamp;
    log.index = null;

    for (let i = startIndex; i < log.data.length; ++i) {
      const timestamp = this._getTimeFromObject(log.data[i]);

      if (timestamp > startTime && timestamp <= endTime) {
        endIndex = i;
        endTimestamp = timestamp;
      } else if (timestamp > endTime) {
        break;
      }
    }

    if (endIndex === null) {
      return null;
    }

    log.index = endIndex;
    log.time = endTimestamp;
    return log.data[endIndex];
  }

  _getTimeFromObject(object) {
    return object.time || object.attributes && object.attributes.transmission_time;
  }

}
//# sourceMappingURL=log-synchronizer.js.map