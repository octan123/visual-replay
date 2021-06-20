import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
export function insertTimestamp(timestamps, values, ts, key, value) {
  var targetIndex = timestamps.findIndex(function (x) {
    return Math.abs(x - ts) < Number.EPSILON;
  });

  if (targetIndex !== -1) {
    var primitives = values[targetIndex];

    if (!primitives[key]) {
      primitives[key] = [];
    }

    primitives[key].push(value);
  } else {
    var insertIndex = timestamps.findIndex(function (x) {
      return x > ts;
    });

    if (insertIndex === -1) {
      insertIndex = timestamps.length;
    }

    timestamps.splice(insertIndex, 0, ts);

    var _primitives = _defineProperty({}, key, [value]);

    values.splice(insertIndex, 0, _primitives);
  }
}
//# sourceMappingURL=sort.js.map