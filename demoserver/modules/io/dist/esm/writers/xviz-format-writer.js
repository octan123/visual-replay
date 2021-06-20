import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { XVIZBinaryWriter } from '../writers/xviz-binary-writer';
import { XVIZProtobufWriter } from '../writers/xviz-protobuf-writer';
import { XVIZJSONWriter } from '../writers/xviz-json-writer';
import { XVIZ_FORMAT } from '../common/constants';

var XVIZJSONBufferWriter = function (_XVIZJSONWriter) {
  _inherits(XVIZJSONBufferWriter, _XVIZJSONWriter);

  var _super = _createSuper(XVIZJSONBufferWriter);

  function XVIZJSONBufferWriter(sink, options) {
    _classCallCheck(this, XVIZJSONBufferWriter);

    return _super.call(this, sink, _objectSpread(_objectSpread({}, options), {}, {
      asArrayBuffer: true
    }));
  }

  return XVIZJSONBufferWriter;
}(XVIZJSONWriter);

function determineWriter(sink, format, options) {
  var writer = null;

  switch (format) {
    case XVIZ_FORMAT.BINARY_GLB:
      writer = new XVIZBinaryWriter(sink, options);
      break;

    case XVIZ_FORMAT.BINARY_PBE:
      writer = new XVIZProtobufWriter(sink, options);
      break;

    case XVIZ_FORMAT.JSON_BUFFER:
      writer = new XVIZJSONBufferWriter(sink, options);
      break;

    case XVIZ_FORMAT.JSON_STRING:
      writer = new XVIZJSONWriter(sink, options);
      break;

    default:
      throw new Error("Cannot convert XVIZData to format ".concat(format));
  }

  return writer;
}

export var XVIZFormatWriter = function () {
  function XVIZFormatWriter(sink, _ref) {
    var format = _ref.format,
        options = _objectWithoutProperties(_ref, ["format"]);

    _classCallCheck(this, XVIZFormatWriter);

    this.format = format;
    this.options = _objectSpread({
      flattenArrays: true
    }, options);

    if (!format || format === XVIZ_FORMAT.OBJECT) {
      throw new Error("Format ".concat(format, " is not supported by XVIZFormatter."));
    }

    this.writer = determineWriter(sink, format, this.options);
  }

  _createClass(XVIZFormatWriter, [{
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
//# sourceMappingURL=xviz-format-writer.js.map