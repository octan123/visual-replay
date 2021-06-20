import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { XVIZBinaryWriter } from '../writers/xviz-binary-writer';
import { XVIZProtobufWriter } from '../writers/xviz-protobuf-writer';
import { XVIZJSONWriter } from '../writers/xviz-json-writer';
import { XVIZ_FORMAT } from '../common/constants';

class XVIZJSONBufferWriter extends XVIZJSONWriter {
  constructor(sink, options) {
    super(sink, _objectSpread(_objectSpread({}, options), {}, {
      asArrayBuffer: true
    }));
  }

}

function determineWriter(sink, format, options) {
  let writer = null;

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

export class XVIZFormatWriter {
  constructor(sink, _ref) {
    let {
      format
    } = _ref,
        options = _objectWithoutProperties(_ref, ["format"]);

    this.format = format;
    this.options = _objectSpread({
      flattenArrays: true
    }, options);

    if (!format || format === XVIZ_FORMAT.OBJECT) {
      throw new Error("Format ".concat(format, " is not supported by XVIZFormatter."));
    }

    this.writer = determineWriter(sink, format, this.options);
  }

  writeMetadata(xvizMetadata) {
    const msg = xvizMetadata.message();
    this.writer.writeMetadata(msg.data);
  }

  writeMessage(messageIndex, xvizData) {
    const msg = xvizData.message();
    this.writer.writeMessage(messageIndex, msg.data);
  }

  close() {
    this.writer.close();
  }

}
//# sourceMappingURL=xviz-format-writer.js.map