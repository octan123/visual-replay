import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { parseXVIZStream } from './parse-xviz-stream';

function noop() {}

export function parseEtlStream(data, opts = {}) {
  const {
    onData = noop,
    onDone = noop
  } = opts;
  const context = onData(opts) || opts.context;
  const stream = parseXVIZStream(data, opts.convertPrimitive);
  onDone(_objectSpread(_objectSpread({}, opts), {}, {
    context
  }));
  return stream;
}
//# sourceMappingURL=parse-etl-stream.js.map