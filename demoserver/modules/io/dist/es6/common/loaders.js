import { GLTFParser } from '../gltf/gltf-parser';
import { XVIZ_FORMAT, XVIZ_GLTF_EXTENSION } from './constants';
import { TextDecoder } from './text-encoding';
import { MAGIC_PBE1, XVIZ_PROTOBUF_MESSAGE, XVIZ_PROTOBUF_TYPE } from './protobuf-support';
import { Enum, Type, MapField } from 'protobufjs';
const XVIZ_TYPE_PATTERN = /"type":\s*"(xviz\/\w*)"/;
const XVIZ_TYPE_VALUE_PATTERN = /xviz\/\w*/;
const MAGIC_XVIZ = 0x5856495a;
const MAGIC_GLTF = 0x676c5446;
const LE = true;
const BE = false;
const GLB_FILE_HEADER_SIZE = 12;
const GLB_CHUNK_HEADER_SIZE = 8;
export function getDataContainer(data) {
  if (data === null || data === undefined) {
    return null;
  }

  if (data instanceof Buffer || data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
    return 'binary';
  }

  return typeof data;
}

function getXVIZType(firstChunk, lastChunk) {
  let result = firstChunk.match(XVIZ_TYPE_PATTERN);

  if (!result && lastChunk) {
    result = lastChunk.match(XVIZ_TYPE_PATTERN);
  }

  if (result) {
    return result[1];
  }

  return null;
}

export function isEnvelope(data) {
  return data.type && data.data;
}
export function unpackEnvelope(data) {
  const parts = data.type.split('/');
  return {
    namespace: parts[0],
    type: parts.slice(1).join('/'),
    data: data.data
  };
}

function checkMagic(glbArrayBuffer, options = {}) {
  const {
    magic,
    magicAlt
  } = options;
  const dataView = new DataView(glbArrayBuffer);
  const magic1 = dataView.getUint32(0, BE);
  return magic1 === magic || magicAlt && magicAlt === magic1;
}

export function isBinaryXVIZ(arrayBuffer) {
  const isArrayBuffer = arrayBuffer instanceof ArrayBuffer;
  return isArrayBuffer && (checkMagic(arrayBuffer, {
    magic: MAGIC_XVIZ,
    magicAlt: MAGIC_GLTF
  }) || checkMagic(arrayBuffer, {
    magic: MAGIC_PBE1
  }));
}
export function parseBinaryXVIZ(arrayBuffer, opts) {
  if (opts && opts.messageFormat === XVIZ_FORMAT.BINARY_PBE || checkMagic(arrayBuffer, {
    magic: MAGIC_PBE1
  })) {
    return parsePBEXVIZ(arrayBuffer, opts);
  }

  const gltfParser = new GLTFParser();
  gltfParser.parse(arrayBuffer, {
    createImages: false
  });
  let xviz = gltfParser.getApplicationData('xviz');

  if (xviz === undefined) {
    xviz = gltfParser.getExtension(XVIZ_GLTF_EXTENSION);
  }

  return xviz;
}
export function isGLBXVIZ(arrayBuffer) {
  const isArrayBuffer = arrayBuffer instanceof ArrayBuffer;
  return isArrayBuffer && checkMagic(arrayBuffer, {
    magic: MAGIC_XVIZ,
    magicAlt: MAGIC_GLTF
  });
}

function getGLBXVIZType(arraybuffer) {
  const jsonBuffer = getGLBXVIZJSONBuffer(arraybuffer);

  if (!jsonBuffer) {
    return null;
  }

  const textDecoder = new TextDecoder('utf8');
  const jsonString = textDecoder.decode(jsonBuffer);
  return getXVIZType(jsonString);
}

function getGLBXVIZJSONBuffer(arrayBuffer, byteOffset = 0) {
  const dataView = new DataView(arrayBuffer);
  const glb = {};
  glb.byteOffset = byteOffset;
  glb.magic = dataView.getUint32(byteOffset + 0, BE);
  glb.version = dataView.getUint32(byteOffset + 4, LE);
  glb.byteLength = dataView.getUint32(byteOffset + 8, LE);

  if (glb.version !== 2 || glb.byteLength < 20) {
    return null;
  }

  glb.jsonChunkLength = dataView.getUint32(byteOffset + 12, LE);
  glb.jsonChunkFormat = dataView.getUint32(byteOffset + 16, LE);
  const GLB_CHUNK_TYPE_JSON = 0x4e4f534a;
  const isJSONChunk = glb.jsonChunkFormat === GLB_CHUNK_TYPE_JSON || glb.jsonChunkFormat === 0;

  if (!isJSONChunk) {
    return null;
  }

  glb.jsonChunkByteOffset = GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE;
  return new Uint8Array(arrayBuffer, byteOffset + glb.jsonChunkByteOffset, glb.jsonChunkLength);
}

export function isPBEXVIZ(arrayBuffer) {
  const isArrayBuffer = arrayBuffer instanceof ArrayBuffer;
  return isArrayBuffer && checkMagic(arrayBuffer, {
    magic: MAGIC_PBE1
  });
}

function getPBEXVIZType(arrayBuffer) {
  const strippedBuffer = new Uint8Array(arrayBuffer, 4);
  const envelope = XVIZ_PROTOBUF_MESSAGE.Envelope.toObject(strippedBuffer, {
    enum: String
  });
  return envelope.type;
}

function postProcessUIConfig(msg) {
  if (msg && msg.ui_config) {
    for (const entry of Object.keys(msg.ui_config)) {
      msg.ui_config[entry] = XVIZ_PROTOBUF_TYPE.UIPanelInfo.toObject(msg.ui_config[entry]);
    }
  }
}

function postProcessProtobuf(msg, pbType) {
  const type = pbType || msg.$type;

  if (msg && type && type.fields) {
    const fields = type.fields;

    for (const fieldName in fields) {
      const field = fields[fieldName];

      if (field && msg[field.name]) {
        if (!field.resolvedType && field.repeated && msg[field.name].length === 0) {
          msg[field.name] = undefined;
          delete msg[field.name];
        } else if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) {
            if (field.repeated) {
              if (msg[field.name].length === 0) {
                msg[field.name] = undefined;
                delete msg[field.name];
              } else {
                msg[field.name] = msg[field.name].map(entry => field.resolvedType.valuesById[entry]);
              }
            } else {
              msg[field.name] = field.resolvedType.valuesById[msg[field.name]];
            }
          } else if (field instanceof MapField) {
            for (const key of Object.keys(msg[field.name])) {
              msg[field.name][key] = postProcessProtobuf(msg[field.name][key], field.resolvedType);
            }
          } else if (field.resolvedType instanceof Type) {
            if (field.repeated) {
              if (msg[field.name].length === 0) {
                msg[field.name] = undefined;
                delete msg[field.name];
              } else {
                msg[field.name] = msg[field.name].map(entry => postProcessProtobuf(entry, field.resolvedType));
              }
            } else {
              msg[field.name] = postProcessProtobuf(msg[field.name], field.resolvedType);
            }
          }
        }
      }
    }
  }

  return msg;
}

export function parsePBEXVIZ(arrayBuffer, opts = {}) {
  const {
    messageType
  } = opts;
  const xviz = {
    type: messageType,
    data: null
  };
  let data = arrayBuffer;

  if (!xviz.type) {
    const strippedBuffer = new Uint8Array(arrayBuffer, 4);
    const envelope = XVIZ_PROTOBUF_MESSAGE.Envelope.decode(strippedBuffer);
    xviz.type = envelope.type;
    data = envelope.data.value;
  }

  switch (xviz.type) {
    case 'xviz/metadata':
      const tmpMeta = XVIZ_PROTOBUF_MESSAGE.Metadata.decode(data);
      xviz.data = postProcessProtobuf(tmpMeta);
      postProcessUIConfig(xviz.data);
      break;

    case 'xviz/state_update':
      const tmpState = XVIZ_PROTOBUF_MESSAGE.StateUpdate.decode(data);
      xviz.data = postProcessProtobuf(tmpState);
      break;

    default:
      throw new Error("Unknown Message type ".concat(xviz.type));
  }

  return xviz;
}

function isJSONStringTypeArray(arr) {
  let firstChar = arr.slice(0, 5).find(entry => entry >= 0x20);
  let lastChars = arr.slice(-5);

  if (lastChars instanceof Buffer) {
    lastChars = Buffer.from(lastChars);
  }

  let lastChar = lastChars.reverse().find(entry => entry >= 0x20);
  firstChar = String.fromCharCode(firstChar);
  lastChar = String.fromCharCode(lastChar);
  return firstChar === '{' && lastChar === '}' || firstChar === '[' && lastChar === ']';
}

export function isJSONString(str) {
  if (str instanceof Uint8Array) {
    return isJSONStringTypeArray(str);
  }

  if (typeof str === 'object') {
    return false;
  }

  const beginning = str.slice(0, 5).trim();
  const end = str.slice(-5).trim();
  return beginning.startsWith('{') && end.endsWith('}') || beginning.startsWith('[') && end.endsWith(']');
}

function getJSONXVIZType(str) {
  let firstChunk = str.slice(0, 50);
  let lastChunk = str.slice(-50);

  if (Number.isFinite(firstChunk[0])) {
    firstChunk = String.fromCharCode.apply(null, firstChunk);
    lastChunk = String.fromCharCode.apply(null, lastChunk);
  }

  return getXVIZType(firstChunk, lastChunk);
}

export function getObjectXVIZType(type) {
  const match = type.match(XVIZ_TYPE_VALUE_PATTERN);

  if (match) {
    return match[0];
  }

  return null;
}
export function getXVIZMessageType(data) {
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
export function isXVIZMessage(data) {
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