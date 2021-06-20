import BaseSynchronizer from './base-synchronizer';
export default class StreamSynchronizer extends BaseSynchronizer {
  constructor(streamBuffer, opts) {
    super(opts);
    this.streamBuffer = streamBuffer;
  }

  _empty() {
    return !this.streamBuffer || !this.streamBuffer.size;
  }

  _getTimeRangeInReverse(startTime, endTime) {
    const slices = this.streamBuffer.getTimeslices({
      start: startTime,
      end: endTime
    }).reverse();
    return {
      streams: slices.map(timeslice => timeslice.streams).filter(Boolean),
      links: slices.map(timeslice => timeslice.links).filter(Boolean)
    };
  }

}
//# sourceMappingURL=stream-synchronizer.js.map