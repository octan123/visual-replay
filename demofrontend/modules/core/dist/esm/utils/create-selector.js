import { createSelector } from 'reselect';
export default function createLogSelector(logLoader) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var selector = createSelector.apply(void 0, args);
  return function () {
    return selector(logLoader._version);
  };
}
//# sourceMappingURL=create-selector.js.map