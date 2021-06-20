import _typeof from "@babel/runtime/helpers/esm/typeof";
export function normalizeStreamFilter(filter) {
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

  switch (_typeof(filter)) {
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