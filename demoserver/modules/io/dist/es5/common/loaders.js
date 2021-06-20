"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataContainer = getDataContainer;
exports.isEnvelope = isEnvelope;
exports.unpackEnvelope = unpackEnvelope;
exports.isBinaryXVIZ = isBinaryXVIZ;
exports.parseBinaryXVIZ = parseBinaryXVIZ;
exports.isGLBXVIZ = isGLBXVIZ;
exports.isPBEXVIZ = isPBEXVIZ;
exports.parsePBEXVIZ = parsePBEXVIZ;
exports.isJSONString = isJSONString;
exports.getObjectXVIZType = getObjectXVIZType;
exports.getXVIZMessageType = getXVIZMessageType;
exports.isXVIZMessage = isXVIZMessage;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _gltfParser = require("../gltf/gltf-parser");

var _constants = require("./constants");

var _textEncoding = require("./text-encoding");

var _protobufSupport = require("./protobuf-support");

var _protobufjs = require("protobufjs");

var XVIZ_TYPE_PATTERN = /"type":\s*"(xviz\/\w*)"/;
var XVIZ_TYPE_VALUE_PATTERN = /xviz\/\w*/;
var MAGIC_XVIZ = 0x5856495a;
var MAGIC_GLTF = 0x676c5446;
var LE = true;
var BE = false;
var GLB_FILE_HEADER_SIZE = 12;
var GLB_CHUNK_HEADER_SIZE = 8;

function getDataContainer(data) {
  if (data === null || data === undefined) {
    return null;
  }

  if (data instanceof Buffer || data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
    return 'binary';
  }

  return (0, _typeof2["default"])(data);
}

function getXVIZType(firstChunk, lastChunk) {
  var result = firstChunk.match(XVIZ_TYPE_PATTERN);

  if (!result && lastChunk) {
    result = lastChunk.match(XVIZ_TYPE_PATTERN);
  }

  if (result) {
    return result[1];
  }

  return null;
}

function isEnvelope(data) {
  return data.type && data.data;
}

function unpackEnvelope(data) {
  var parts = data.type.split('/');
  return {
    namespace: parts[0],
    type: parts.slice(1).join('/'),
    data: data.data
  };
}

function checkMagic(glbArrayBuffer) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var magic = options.magic,
      magicAlt = options.magicAlt;
  var dataView = new DataView(glbArrayBuffer);
  var magic1 = dataView.getUint32(0, BE);
  return magic1 === magic || magicAlt && magicAlt === magic1;
}

function isBinaryXVIZ(arrayBuffer) {
  var isArrayBuffer = arrayBuffer instanceof ArrayBuffer;
  return isArrayBuffer && (checkMagic(arrayBuffer, {
    magic: MAGIC_XVIZ,
    magicAlt: MAGIC_GLTF
  }) || checkMagic(arrayBuffer, {
    magic: _protobufSupport.MAGIC_PBE1
  }));
}

function parseBinaryXVIZ(arrayBuffer, opts) {
  if (opts && opts.messageFormat === _constants.XVIZ_FORMAT.BINARY_PBE || checkMagic(arrayBuffer, {
    magic: _protobufSupport.MAGIC_PBE1
  })) {
    return parsePBEXVIZ(arrayBuffer, opts);
  }

  var gltfParser = new _gltfParser.GLTFParser();
  gltfParser.parse(arrayBuffer, {
    createImages: false
  });
  var xviz = gltfParser.getApplicationData('xviz');

  if (xviz === undefined) {
    xviz = gltfParser.getExtension(_constants.XVIZ_GLTF_EXTENSION);
  }

  return xviz;
}

function isGLBXVIZ(arrayBuffer) {
  var isArrayBuffer = arrayBuffer instanceof ArrayBuffer;
  return isArrayBuffer && checkMagic(arrayBuffer, {
    magic: MAGIC_XVIZ,
    magicAlt: MAGIC_GLTF
  });
}

function getGLBXVIZType(arraybuffer) {
  var jsonBuffer = getGLBXVIZJSONBuffer(arraybuffer);

  if (!jsonBuffer) {
    return null;
  }

  var textDecoder = new _textEncoding.TextDecoder('utf8');
  var jsonString = textDecoder.decode(jsonBuffer);
  return getXVIZType(jsonString);
}

function getGLBXVIZJSONBuffer(arrayBuffer) {
  var byteOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var dataView = new DataView(arrayBuffer);
  var glb = {};
  glb.byteOffset = byteOffset;
  glb.magic = dataView.getUint32(byteOffset + 0, BE);
  glb.version = dataView.getUint32(byteOffset + 4, LE);
  glb.byteLength = dataView.getUint32(byteOffset + 8, LE);

  if (glb.version !== 2 || glb.byteLength < 20) {
    return null;
  }

  glb.jsonChunkLength = dataView.getUint32(byteOffset + 12, LE);
  glb.jsonChunkFormat = dataView.getUint32(byteOffset + 16, LE);
  var GLB_CHUNK_TYPE_JSON = 0x4e4f534a;
  var isJSONChunk = glb.jsonChunkFormat === GLB_CHUNK_TYPE_JSON || glb.jsonChunkFormat === 0;

  if (!isJSONChunk) {
    return null;
  }

  glb.jsonChunkByteOffset = GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE;
  return new Uint8Array(arrayBuffer, byteOffset + glb.jsonChunkByteOffset, glb.jsonChunkLength);
}

function isPBEXVIZ(arrayBuffer) {
  var isArrayBuffer = arrayBuffer instanceof ArrayBuffer;
  return isArrayBuffer && checkMagic(arrayBuffer, {
    magic: _protobufSupport.MAGIC_PBE1
  });
}

function getPBEXVIZType(arrayBuffer) {
  var strippedBuffer = new Uint8Array(arrayBuffer, 4);

  var envelope = _protobufSupport.XVIZ_PROTOBUF_MESSAGE.Envelope.toObject(strippedBuffer, {
    "enum": String
  });

  return envelope.type;
}

function postProcessUIConfig(msg) {
  if (msg && msg.ui_config) {
    for (var _i = 0, _Object$keys = Object.keys(msg.ui_config); _i < _Object$keys.length; _i++) {
      var entry = _Object$keys[_i];
      msg.ui_config[entry] = _protobufSupport.XVIZ_PROTOBUF_TYPE.UIPanelInfo.toObject(msg.ui_config[entry]);
    }
  }
}

function postProcessProtobuf(msg, pbType) {
  var type = pbType || msg.$type;

  if (msg && type && type.fields) {
    var fields = type.fields;

    var _loop = function _loop(fieldName) {
      var field = fields[fieldName];

      if (field && msg[field.name]) {
        if (!field.resolvedType && field.repeated && msg[field.name].length === 0) {
          msg[field.name] = undefined;
          delete msg[field.name];
        } else if (field.resolvedType) {
          if (field.resolvedType instanceof _protobufjs.Enum) {
            if (field.repeated) {
              if (msg[field.name].length === 0) {
                msg[field.name] = undefined;
                delete msg[field.name];
              } else {
                msg[field.name] = msg[field.name].map(function (entry) {
                  return field.resolvedType.valuesById[entry];
                });
              }
            } else {
              msg[field.name] = field.resolvedType.valuesById[msg[field.name]];
            }
          } else if (field instanceof _protobufjs.MapField) {
            for (var _i2 = 0, _Object$keys2 = Object.keys(msg[field.name]); _i2 < _Object$keys2.length; _i2++) {
              var key = _Object$keys2[_i2];
              msg[field.name][key] = postProcessProtobuf(msg[field.name][key], field.resolvedType);
            }
          } else if (field.resolvedType instanceof _protobufjs.Type) {
            if (field.repeated) {
              if (msg[field.name].length === 0) {
                msg[field.name] = undefined;
                delete msg[field.name];
              } else {
                msg[field.name] = msg[field.name].map(function (entry) {
                  return postProcessProtobuf(entry, field.resolvedType);
                });
              }
            } else {
              msg[field.name] = postProcessProtobuf(msg[field.name], field.resolvedType);
            }
          }
        }
      }
    };

    for (var fieldName in fields) {
      _loop(fieldName);
    }
  }

  return msg;
}

function parsePBEXVIZ(arrayBuffer) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var messageType = opts.messageType;
  var xviz = {
    type: messageType,
    data: null
  };
  var data = arrayBuffer;

  if (!xviz.type) {
    var strippedBuffer = new Uint8Array(arrayBuffer, 4);

    var envelope = _protobufSupport.XVIZ_PROTOBUF_MESSAGE.Envelope.decode(strippedBuffer);

    xviz.type = envelope.type;
    data = envelope.data.value;
  }

  switch (xviz.type) {
    case 'xviz/metadata':
      var tmpMeta = _protobufSupport.XVIZ_PROTOBUF_MESSAGE.Metadata.decode(data);

      xviz.data = postProcessProtobuf(tmpMeta);
      postProcessUIConfig(xviz.data);
      break;

    case 'xviz/state_update':
      var tmpState = _protobufSupport.XVIZ_PROTOBUF_MESSAGE.StateUpdate.decode(data);

      xviz.data = postProcessProtobuf(tmpState);
      break;

    default:
      throw new Error("Unknown Message type ".concat(xviz.type));
  }

  return xviz;
}

function isJSONStringTypeArray(arr) {
  var firstChar = arr.slice(0, 5).find(function (entry) {
    return entry >= 0x20;
  });
  var lastChars = arr.slice(-5);

  if (lastChars instanceof Buffer) {
    lastChars = Buffer.from(lastChars);
  }

  var lastChar = lastChars.reverse().find(function (entry) {
    return entry >= 0x20;
  });
  firstChar = String.fromCharCode(firstChar);
  lastChar = String.fromCharCode(lastChar);
  return firstChar === '{' && lastChar === '}' || firstChar === '[' && lastChar === ']';
}

function isJSONString(str) {
  if (str instanceof Uint8Array) {
    return isJSONStringTypeArray(str);
  }

  if ((0, _typeof2["default"])(str) === 'object') {
    return false;
  }

  var beginning = str.slice(0, 5).trim();
  var end = str.slice(-5).trim();
  return beginning.startsWith('{') && end.endsWith('}') || beginning.startsWith('[') && end.endsWith(']');
}

function getJSONXVIZType(str) {
  var firstChunk = str.slice(0, 50);
  var lastChunk = str.slice(-50);

  if (Number.isFinite(firstChunk[0])) {
    firstChunk = String.fromCharCode.apply(null, firstChunk);
    lastChunk = String.fromCharCode.apply(null, lastChunk);
  }

  return getXVIZType(firstChunk, lastChunk);
}

function getObjectXVIZType(type) {
  var match = type.match(XVIZ_TYPE_VALUE_PATTERN);

  if (match) {
    return match[0];
  }

  return null;
}

function getXVIZMessageType(data) {
  switch (getDataContainer(data)) {
    case 'binary':
      if (isGLBXVIZ(data)) {
        return getGLBXVIZType(data);
      } else if (isPBEXVIZ(data)) {
        return getPBEXVIZType(data);
      }

      if (data instanceof ArrayBuffer) {
        data = new Uint8Array(data);
      }

      return getJSONXVIZType(data);

    case 'string':
      return getJSONXVIZType(data);

    case 'object':
      return data.type ? getObjectXVIZType(data.type) : null;

    default:
  }

  return null;
}

function isXVIZMessage(data) {
  switch (getDataContainer(data)) {
    case 'binary':
      if (isBinaryXVIZ(data)) {
        return true;
      }

      if (data instanceof ArrayBuffer) {
        data = new Uint8Array(data);
      }

      return getJSONXVIZType(data) !== null;

    case 'string':
      return getJSONXVIZType(data) !== null;

    case 'object':
      return data.type ? getObjectXVIZType(data.type) !== null : false;

    default:
  }

  return false;
}
//# sourceMappingURL=loaders.js.map