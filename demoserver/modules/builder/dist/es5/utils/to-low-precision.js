"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toLowPrecision = toLowPrecision;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function toLowPrecision(input) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 11;

  if (typeof input === 'number') {
    input = Number(input.toPrecision(precision));
  } else if (Array.isArray(input) || ArrayBuffer.isView(input)) {
    input = Array.from(input).map(function (item) {
      return toLowPrecision(item, precision);
    });
  } else if ((0, _typeof2["default"])(input) === 'object') {
    for (var key in input) {
      input[key] = toLowPrecision(input[key], precision);
    }
  }

  return input;
}
//# sourceMappingURL=to-low-precision.js.map