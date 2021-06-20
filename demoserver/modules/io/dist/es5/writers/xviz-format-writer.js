"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZFormatWriter = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _xvizBinaryWriter = require("../writers/xviz-binary-writer");

var _xvizProtobufWriter = require("../writers/xviz-protobuf-writer");

var _xvizJsonWriter = require("../writers/xviz-json-writer");

var _constants = require("../common/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var XVIZJSONBufferWriter = function (_XVIZJSONWriter) {
  (0, _inherits2["default"])(XVIZJSONBufferWriter, _XVIZJSONWriter);

  var _super = _createSuper(XVIZJSONBufferWriter);

  function XVIZJSONBufferWriter(sink, options) {
    (0, _classCallCheck2["default"])(this, XVIZJSONBufferWriter);
    return _super.call(this, sink, _objectSpread(_objectSpread({}, options), {}, {
      asArrayBuffer: true
    }));
  }

  return XVIZJSONBufferWriter;
}(_xvizJsonWriter.XVIZJSONWriter);

function determineWriter(sink, format, options) {
  var writer = null;

  switch (format) {
    case _constants.XVIZ_FORMAT.BINARY_GLB:
      writer = new _xvizBinaryWriter.XVIZBinaryWriter(sink, options);
      break;

    case _constants.XVIZ_FORMAT.BINARY_PBE:
      writer = new _xvizProtobufWriter.XVIZProtobufWriter(sink, options);
      break;

    case _constants.XVIZ_FORMAT.JSON_BUFFER:
      writer = new XVIZJSONBufferWriter(sink, options);
      break;

    case _constants.XVIZ_FORMAT.JSON_STRING:
      writer = new _xvizJsonWriter.XVIZJSONWriter(sink, options);
      break;

    default:
      throw new Error("Cannot convert XVIZData to format ".concat(format));
  }

  return writer;
}

var XVIZFormatWriter = function () {
  function XVIZFormatWriter(sink, _ref) {
    var format = _ref.format,
        options = (0, _objectWithoutProperties2["default"])(_ref, ["format"]);
    (0, _classCallCheck2["default"])(this, XVIZFormatWriter);
    this.format = format;
    this.options = _objectSpread({
      flattenArrays: true
    }, options);

    if (!format || format === _constants.XVIZ_FORMAT.OBJECT) {
      throw new Error("Format ".concat(format, " is not supported by XVIZFormatter."));
    }

    this.writer = determineWriter(sink, format, this.options);
  }

  (0, _createClass2["default"])(XVIZFormatWriter, [{
    key: "writeMetadata",
    value: function writeMetadata(xvizMetadata) {
      var msg = xvizMetadata.message();
      this.writer.writeMetadata(msg.data);
    }
  }, {
    key: "writeMessage",
    value: function writeMessage(messageIndex, xvizData) {
      var msg = xvizData.message();
      this.writer.writeMessage(messageIndex, msg.data);
    }
  }, {
    key: "close",
    value: function close() {
      this.writer.close();
    }
  }]);
  return XVIZFormatWriter;
}();

exports.XVIZFormatWriter = XVIZFormatWriter;
//# sourceMappingURL=xviz-format-writer.js.map