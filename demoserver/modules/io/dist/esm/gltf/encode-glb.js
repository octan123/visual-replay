import { copyPaddedStringToDataView, copyPaddedArrayBufferToDataView } from '@loaders.gl/loader-utils';
var MAGIC_glTF = 0x46546c67;
var MAGIC_JSON = 0x4e4f534a;
var MAGIC_BIN = 0x004e4942;
var LE = true;
export default function encodeGLBSync(glb, dataView) {
  var byteOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _glb$magic = glb.magic,
      magic = _glb$magic === void 0 ? MAGIC_glTF : _glb$magic,
      _glb$version = glb.version,
      version = _glb$version === void 0 ? 2 : _glb$version,
      _glb$json = glb.json,
      json = _glb$json === void 0 ? {} : _glb$json,
      binary = glb.binary;
  var byteOffsetStart = byteOffset;

  if (dataView) {
    dataView.setUint32(byteOffset + 0, magic, LE);
    dataView.setUint32(byteOffset + 4, version, LE);
    dataView.setUint32(byteOffset + 8, 0, LE);
  }

  var byteOffsetFileLength = byteOffset + 8;
  byteOffset += 12;
  var byteOffsetJsonHeader = byteOffset;

  if (dataView) {
    dataView.setUint32(byteOffset + 0, 0, LE);
    dataView.setUint32(byteOffset + 4, MAGIC_JSON, LE);
  }

  byteOffset += 8;
  var jsonString = JSON.stringify(json);
  byteOffset = copyPaddedStringToDataView(dataView, byteOffset, jsonString, 4);

  if (dataView) {
    var jsonByteLength = byteOffset - byteOffsetJsonHeader - 8;
    dataView.setUint32(byteOffsetJsonHeader + 0, jsonByteLength, LE);
  }

  if (binary) {
    var byteOffsetBinHeader = byteOffset;

    if (dataView) {
      dataView.setUint32(byteOffset + 0, 0, LE);
      dataView.setUint32(byteOffset + 4, MAGIC_BIN, LE);
    }

    byteOffset += 8;
    byteOffset = copyPaddedArrayBufferToDataView(dataView, byteOffset, binary, 4);

    if (dataView) {
      var binByteLength = byteOffset - byteOffsetBinHeader - 8;
      dataView.setUint32(byteOffsetBinHeader + 0, binByteLength, LE);
    }
  }

  if (dataView) {
    var fileByteLength = byteOffset - byteOffsetStart;
    dataView.setUint32(byteOffsetFileLength, fileByteLength, LE);
  }

  return byteOffset;
}
//# sourceMappingURL=encode-glb.js.map