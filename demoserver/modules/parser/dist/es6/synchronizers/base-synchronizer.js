import { getXVIZConfig } from '../config/xviz-config';
import xvizStats from '../utils/stats';
import LogSlice from './log-slice';
import memoize from '../utils/memoize';
import assert from '../utils/assert';
const getCurrentLogSliceMemoized = memoize((streamFilter, lookAheadMs, linksByReverseTime, ...streamsByReverseTime) => {
  xvizStats.get('getCurrentLogSliceMemoized').incrementCount();
  return new LogSlice(streamFilter, lookAheadMs, linksByReverseTime, streamsByReverseTime);
});
const getCurrentFrameMemoized = memoize((logSlice, vehiclePose, trackedObjectId, postProcessFrame) => {
  return logSlice.getCurrentFrame({
    vehiclePose,
    trackedObjectId
  }, postProcessFrame);
});
const EMPTY_VEHICLE_POSE = {
  longitude: 0,
  latitude: 0,
  x: 0,
  y: 0,
  z: 0
};
export default class BaseSynchronizer {
  constructor(opts = {}) {
    this.opts = opts;
    this.time = 0;
    this.lookAheadMs = 0;
  }

  getCurrentFrame(streamFilter, trackedObjectId) {
    xvizStats.get('getCurrentFrame').incrementCount();
    const logSlice = this.getLogSlice(streamFilter);

    if (!logSlice) {
      return null;
    }

    const {
      PRIMARY_POSE_STREAM,
      ALLOW_MISSING_PRIMARY_POSE
    } = getXVIZConfig();
    const defaultPose = ALLOW_MISSING_PRIMARY_POSE ? EMPTY_VEHICLE_POSE : null;
    const vehiclePose = logSlice.getStream(PRIMARY_POSE_STREAM, defaultPose);

    if (vehiclePose !== this._lastVehiclePose) {
      xvizStats.get('vehiclePose').incrementCount();
      this._lastVehiclePose = vehiclePose;
    }

    return getCurrentFrameMemoized(logSlice, vehiclePose, trackedObjectId, this.opts.postProcessFrame);
  }

  getTime() {
    return this.time;
  }

  setTime(time) {
    this.time = time;
    assert(Number.isFinite(this.time), 'Invalid time');
    return this;
  }

  setLookAheadTimeOffset(offset) {
    this.lookAheadMs = offset;
    return this;
  }

  getLogSlice(streamFilter) {
    if (this._empty()) {
      return null;
    }

    const {
      TIME_WINDOW
    } = getXVIZConfig();

    const {
      streams,
      links
    } = this._getTimeRangeInReverse(this.time - TIME_WINDOW, this.time);

    this._streamsByReverseTime = streams;
    this._linksByReverseTime = links;
    xvizStats.get('geometry-refresh').incrementCount();
    return getCurrentLogSliceMemoized(streamFilter, this.lookAheadMs, this._linksByReverseTime, ...this._streamsByReverseTime);
  }

  empty() {
    assert(false);
  }

  _getTimeRangeInReverse(startTime, endTime) {
    assert(false);
  }

}
//# sourceMappingURL=base-synchronizer.js.map