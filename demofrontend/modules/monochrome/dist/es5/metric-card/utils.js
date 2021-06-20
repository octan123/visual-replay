"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findNearestValue = findNearestValue;

var DEFAULT_GET_X = function DEFAULT_GET_X(d) {
  return d.x;
};

function findNearestValue(array, x) {
  var getX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_GET_X;
  var lowerBound = 0;
  var upperBound = array.length - 1;
  var currentIndex;
  var currentX;

  while (lowerBound <= upperBound) {
    currentIndex = (lowerBound + upperBound) / 2 | 0;
    currentX = getX(array[currentIndex]);

    if (currentX < x) {
      lowerBound = currentIndex + 1;
    } else if (currentX > x) {
      upperBound = currentIndex - 1;
    } else {
      return array[currentIndex];
    }
  }

  var lowerValue = array[lowerBound];
  var upperValue = array[upperBound];

  if (!lowerValue) {
    return upperValue;
  }

  if (!upperValue) {
    return lowerValue;
  }

  return Math.abs(getX(lowerValue) - x) <= Math.abs(getX(upperValue) - x) ? lowerValue : upperValue;
}
//# sourceMappingURL=utils.js.map