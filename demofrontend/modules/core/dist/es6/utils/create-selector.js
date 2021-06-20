import { createSelector } from 'reselect';
export default function createLogSelector(logLoader, ...args) {
  const selector = createSelector(...args);
  return () => selector(logLoader._version);
}
//# sourceMappingURL=create-selector.js.map