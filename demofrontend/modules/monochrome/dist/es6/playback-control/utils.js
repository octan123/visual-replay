export function formatTimeCode(value, format = '{hh}:{mm}:{ss}.{SSS}') {
  const formatters = {
    h: (format.match(/\{(h+)\}/) || [])[1],
    m: (format.match(/\{(m+)\}/) || [])[1],
    s: (format.match(/\{(s+)\}/) || [])[1],
    S: (format.match(/\{(S+)\}/) || [])[1]
  };
  const parts = {
    h: x => Math.floor(x / 3600),
    m: x => Math.floor(x / 60) % 60,
    s: x => Math.floor(x % 60),
    S: (x, len) => Math.floor(x % 1 * Math.pow(10, len))
  };
  let result = format;

  for (const key in parts) {
    const f = formatters[key] || '';

    if (f) {
      const digits = f.length;
      result = result.replace("{".concat(f, "}"), String(parts[key](value, digits)).padStart(digits, '0'));
    }
  }

  return result;
}
export function getTimelineTicks(scale, spacing = 50, format) {
  const range = scale.range();
  const domain = scale.domain();
  const ticksCount = Math.floor((range[1] - range[0]) / spacing) + 1;
  scale.domain([0, domain[1] - domain[0]]);
  const ticks = scale.ticks(ticksCount);
  scale.domain(domain);
  return ticks.map(t => ({
    x: scale(t + domain[0]),
    label: format(t + domain[0])
  }));
}
//# sourceMappingURL=utils.js.map