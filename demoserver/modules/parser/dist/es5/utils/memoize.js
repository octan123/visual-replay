"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = memoize;

function isEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (Array.isArray(a)) {
    var len = a.length;

    if (!b || b.length !== len) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  return false;
}

function memoize(compute) {
  var cachedArgs = null;
  var cachedResult = null;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var needsRecompute = !cachedArgs || args.length !== cachedArgs.length || args.some(function (a, i) {
      return !isEqual(a, cachedArgs[i]);
    });

    if (needsRecompute) {
      cachedResult = compute.apply(void 0, args);
      cachedArgs = args;
    }

    return cachedResult;
  };
}
//# sourceMappingURL=memoize.js.map