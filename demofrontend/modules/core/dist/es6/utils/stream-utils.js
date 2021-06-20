export function normalizeStreamFilter(filter) {
  if (!filter) {
    return () => true;
  }

  if (Array.isArray(filter)) {
    return streamName => filter.includes(streamName);
  }

  switch (typeof filter) {
    case 'string':
      return streamName => streamName === filter;

    case 'function':
      return filter;

    default:
      return streamName => filter[streamName];
  }
}
//# sourceMappingURL=stream-utils.js.map