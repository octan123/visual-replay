"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.empty = empty;
exports.add = add;
exports.intersect = intersect;
exports.subtract = subtract;

function empty() {
  return [];
}

function add(simpleRange, complexRange) {
  if (!isValid(simpleRange)) {
    return complexRange;
  }

  var result = [];
  var r1 = simpleRange;

  for (var j = 0; j < complexRange.length; j++) {
    var r2 = complexRange[j];

    if (r2[0] > r1[1]) {
      result.push(r1);
      r1 = r2;
    } else if (r1[0] > r2[1]) {
      result.push(r2);
    } else {
      r1 = [Math.min(r1[0], r2[0]), Math.max(r1[1], r2[1])];
    }
  }

  result.push(r1);
  return result;
}

function intersect(simpleRange, complexRange) {
  if (!isValid(simpleRange)) {
    return empty();
  }

  var result = [];
  var r1 = simpleRange;

  for (var j = 0; j < complexRange.length; j++) {
    var r2 = complexRange[j];

    if (r2[0] < r1[1] && r1[0] < r2[1]) {
      result.push([Math.max(r1[0], r2[0]), Math.min(r1[1], r2[1])]);
    }
  }

  return result;
}

function subtract(simpleRange, complexRange) {
  if (!isValid(simpleRange)) {
    return empty();
  }

  var result = [];
  var r1 = simpleRange;

  for (var j = 0; j < complexRange.length; j++) {
    var r2 = complexRange[j];

    if (r1[0] >= r2[1]) {
      continue;
    }

    if (r2[0] >= r1[1]) {
      break;
    }

    if (r2[0] > r1[0]) {
      result.push([r1[0], r2[0]]);
    }

    if (r2[1] < r1[1]) {
      r1 = [r2[1], r1[1]];
    } else {
      r1 = null;
      break;
    }
  }

  if (r1) {
    result.push(r1);
  }

  return result;
}

function isValid(simpleRange) {
  return simpleRange[0] < simpleRange[1];
}
//# sourceMappingURL=buffer-range.js.map