"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseEtlStream = parseEtlStream;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _parseXvizStream = require("./parse-xviz-stream");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function noop() {}

function parseEtlStream(data) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _opts$onData = opts.onData,
      onData = _opts$onData === void 0 ? noop : _opts$onData,
      _opts$onDone = opts.onDone,
      onDone = _opts$onDone === void 0 ? noop : _opts$onDone;
  var context = onData(opts) || opts.context;
  var stream = (0, _parseXvizStream.parseXVIZStream)(data, opts.convertPrimitive);
  onDone(_objectSpread(_objectSpread({}, opts), {}, {
    context: context
  }));
  return stream;
}
//# sourceMappingURL=parse-etl-stream.js.map