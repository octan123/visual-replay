export function snakeToCamel(s) {
  return s.replace(/_\w/g, function (m) {
    return m[1].toUpperCase();
  });
}
//# sourceMappingURL=utils.js.map