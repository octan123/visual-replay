import '../common/text-encoding';
import { padTo4Bytes, assert } from '@loaders.gl/loader-utils';
var MAGIC_glTF = 0x676c5446;
var GLB_FILE_HEADER_SIZE = 12;
var GLB_CHUNK_HEADER_SIZE = 8;
var GLB_CHUNK_TYPE_JSON = 0x4e4f534a;
var GLB_CHUNK_TYPE_BIN = 0x004e4942;
var LE = true;

function getMagicString(dataView) {
  var byteOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return "".concat(String.fromCharCode(dataView.getUint8(byteOffset + 0))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 1))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 2))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 3)));
}

export function isGLB(arrayBuffer) {
  var byteOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var dataView = new DataView(arrayBuffer);
  var _options$magic = options.magic,
      magic = _options$magic === void 0 ? MAGIC_glTF : _options$magic;
  var magic1 = dataView.getUint32(byteOffset, false);
  return magic1 === magic || magic1 === MAGIC_glTF;
}
export default function parseGLBSync(glb, arrayBuffer) {
  var byteOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var dataView = new DataView(arrayBuffer);
  glb.type = getMagicString(dataView, byteOffset + 0);
  glb.version = dataView.getUint32(byteOffset + 4, LE);
  var byteLength = dataView.getUint32(byteOffset + 8, LE);
  glb.header = {
    byteOffset: byteOffset,
    byteLength: byteLength
  };

  if (glb.type !== 'glTF') {
    console.warn("Invalid GLB magic string ".concat(glb.type));
  }

  assert(glb.version === 2, "Invalid GLB version ".concat(glb.version, ". Only .glb v2 supported"));
  assert(glb.header.byteLength > GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE);
  glb.json = {};
  glb.hasBinChunk = false;
  glb.binChunks = [];
  parseGLBChunksSync(glb, dataView, byteOffset + 12, options);
  addDeprecatedFields(glb);
  return byteOffset + glb.header.byteLength;
}

function parseGLBChunksSync(glb, dataView, byteOffset, options) {
  while (byteOffset + 8 <= glb.header.byteLength) {
    var chunkLength = dataView.getUint32(byteOffset + 0, LE);
    var chunkFormat = dataView.getUint32(byteOffset + 4, LE);
    byteOffset += GLB_CHUNK_HEADER_SIZE;

    switch (chunkFormat) {
      case GLB_CHUNK_TYPE_JSON:
        parseJSONChunk(glb, dataView, byteOffset, chunkLength, options);
        break;

      case GLB_CHUNK_TYPE_BIN:
        parseBINChunk(glb, dataView, byteOffset, chunkLength, options);
        break;

      default:
        break;
    }

    switch (chunkFormat) {
      case 0:
        if (!options.strict) {
          parseJSONChunk(glb, dataView, byteOffset, chunkLength, options);
        }

        break;

      case 1:
        if (!options.strict) {
          parseBINChunk(glb, dataView, byteOffset, chunkLength, options);
        }

        break;

      default:
    }

    byteOffset += padTo4Bytes(chunkLength);
  }

  return byteOffset;
}

function parseJSONChunk(glb, dataView, byteOffset, chunkLength, options) {
  var jsonChunk = new Uint8Array(dataView.buffer, byteOffset, chunkLength);
  var textDecoder = new TextDecoder('utf8');
  var jsonText = textDecoder.decode(jsonChunk);
  glb.json = JSON.parse(jsonText);
}

function parseBINChunk(glb, dataView, byteOffset, chunkLength, options) {
  glb.header.hasBinChunk = true;
  glb.binChunks.push({
    byteOffset: byteOffset,
    byteLength: chunkLength,
    arrayBuffer: dataView.buffer
  });
}

function addDeprecatedFields(glb) {
  glb.byteOffset = glb.header.byteOffset;
  glb.magic = glb.header.magic;
  glb.version = glb.header.version;
  glb.byteLength = glb.header.byteLength;
  glb.hasBinChunk = glb.binChunks.length >= 1;
  glb.binChunkByteOffset = glb.header.hasBinChunk ? glb.binChunks[0].byteOffset : 0;
  glb.binChunkLength = glb.header.hasBinChunk ? glb.binChunks[0].byteLength : 0;
}
//# sourceMappingURL=parse-glb.js.map