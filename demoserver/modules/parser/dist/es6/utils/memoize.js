function isEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (Array.isArray(a)) {
    const len = a.length;

    if (!b || b.length !== len) {
      return false;
    }

    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export default function memoize(compute) {
  let cachedArgs = null;
  let cachedResult = null;
  return (...args) => {
    const needsRecompute = !cachedArgs || args.length !== cachedArgs.length || args.some((a, i) => !isEqual(a, cachedArgs[i]));

    if (needsRecompute) {
      cachedResult = compute(...args);
      cachedArgs = args;
    }

    return cachedResult;
  };
}
//# sourceMappingURL=memoize.js.map