export function toLowPrecision(input, precision = 11) {
  if (typeof input === 'number') {
    input = Number(input.toPrecision(precision));
  } else if (Array.isArray(input) || ArrayBuffer.isView(input)) {
    input = Array.from(input).map(item => toLowPrecision(item, precision));
  } else if (typeof input === 'object') {
    for (const key in input) {
      input[key] = toLowPrecision(input[key], precision);
    }
  }

  return input;
}
//# sourceMappingURL=to-low-precision.js.map