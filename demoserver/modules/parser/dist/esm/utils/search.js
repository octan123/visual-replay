import assert from '../utils/assert';
export var INSERT_POSITION = {
  LEFT: 0,
  RIGHT: 1
};

var defaultTimestampAccessor = function defaultTimestampAccessor(timeslice) {
  return timeslice.timestamp;
};

export function findInsertPos(timeslices, timestamp) {
  var insertPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : INSERT_POSITION.LEFT;
  var timestampAccessor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultTimestampAccessor;
  assert(Number.isFinite(timestamp), 'valid timeslice search timestamp');
  var lowerBound = 0;
  var upperBound = timeslices.length - 1;
  var currentIndex;
  var currentTimestamp;

  while (lowerBound <= upperBound) {
    currentIndex = (lowerBound + upperBound) / 2 | 0;
    currentTimestamp = timestampAccessor(timeslices[currentIndex]);

    if (currentTimestamp < timestamp) {
      lowerBound = currentIndex + 1;
    } else if (currentTimestamp > timestamp) {
      upperBound = currentIndex - 1;
    } else {
      return insertPosition === INSERT_POSITION.LEFT ? currentIndex : currentIndex + 1;
    }
  }

  return lowerBound;
}
//# sourceMappingURL=search.js.map