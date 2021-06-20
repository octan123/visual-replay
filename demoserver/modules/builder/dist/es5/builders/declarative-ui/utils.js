"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snakeToCamel = snakeToCamel;

function snakeToCamel(s) {
  return s.replace(/_\w/g, function (m) {
    return m[1].toUpperCase();
  });
}
//# sourceMappingURL=utils.js.map