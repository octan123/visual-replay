"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeStreamFilter = normalizeStreamFilter;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function normalizeStreamFilter(filter) {
  if (!filter) {
    return function () {
      return true;
    };
  }

  if (Array.isArray(filter)) {
    return function (streamName) {
      return filter.includes(streamName);
    };
  }

  switch ((0, _typeof2["default"])(filter)) {
    case 'string':
      return function (streamName) {
        return streamName === filter;
      };

    case 'function':
      return filter;

    default:
      return function (streamName) {
        return filter[streamName];
      };
  }
}
//# sourceMappingURL=stream-utils.js.map