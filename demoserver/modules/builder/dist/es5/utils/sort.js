"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertTimestamp = insertTimestamp;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function insertTimestamp(timestamps, values, ts, key, value) {
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

    var _primitives = (0, _defineProperty2["default"])({}, key, [value]);

    values.splice(insertIndex, 0, _primitives);
  }
}
//# sourceMappingURL=sort.js.map