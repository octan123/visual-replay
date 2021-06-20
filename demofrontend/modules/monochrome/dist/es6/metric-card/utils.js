const DEFAULT_GET_X = d => d.x;

export function findNearestValue(array, x, getX = DEFAULT_GET_X) {
  let lowerBound = 0;
  let upperBound = array.length - 1;
  let currentIndex;
  let currentX;

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

  const lowerValue = array[lowerBound];
  const upperValue = array[upperBound];

  if (!lowerValue) {
    return upperValue;
  }

  if (!upperValue) {
    return lowerValue;
  }

  return Math.abs(getX(lowerValue) - x) <= Math.abs(getX(upperValue) - x) ? lowerValue : upperValue;
}
//# sourceMappingURL=utils.js.map