"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseVideoMessageV1 = parseVideoMessageV1;
exports.parseStreamVideoData = parseStreamVideoData;
exports.parseVideoFrame = parseVideoFrame;

var _constants = require("../constants");

var _textEncoding = require("../utils/text-encoding");

var _binary = require("../utils/binary");

var _parseLogMetadata = require("./parse-log-metadata");

function parseVideoMessageV1(message, onResult, onError) {
  if (message instanceof Blob) {
    (0, _binary.blobToArrayBuffer)(message).then(function (arrayBuffer) {
      parseVideoMessageV1(arrayBuffer, onResult, onError);
    })["catch"](onError);
    return;
  }

  try {
    var data = message;

    if (typeof message === 'string') {
      data = JSON.parse(message);
    }

    var result = parseStreamVideoData(data);
    onResult(result);
  } catch (error) {
    onError(error);
  }
}

function parseStreamVideoData(data) {
  if (data instanceof ArrayBuffer) {
    return parseVideoFrame(data);
  }

  if (data.type === 'metadata') {
    return parseVideoMetadata(data);
  }

  return {
    type: _constants.XVIZ_MESSAGE_TYPE.ERROR,
    message: 'Unknown stream data type',
    data: data
  };
}

function parseVideoMetadata(data) {
  var result = (0, _parseLogMetadata.parseLogMetadata)(data);
  result.type = _constants.XVIZ_MESSAGE_TYPE.VIDEO_METADATA;
  return result;
}

function parseVideoFrame(arrayBuffer) {
  var view = new DataView(arrayBuffer);
  var result = {
    type: _constants.XVIZ_MESSAGE_TYPE.VIDEO_FRAME
  };
  var littleEndian = true;
  var utf8Decoder = new _textEncoding.TextDecoder('utf-8');
  var offset = 0;
  result.version = view.getUint32(offset, littleEndian);
  offset += 4;
  result.versionFlags = view.getUint32(offset, littleEndian);
  offset += 4;
  var streamLength = view.getUint32(offset, littleEndian);
  var stringStart = offset + 4;
  offset += 4 + streamLength;
  result.stream = utf8Decoder.decode(arrayBuffer.slice(stringStart, offset));
  result.timestamp = view.getFloat64(offset, littleEndian);
  offset += 8;
  var imageSize = view.getUint32(offset, littleEndian);
  offset += 4;
  result.imageData = arrayBuffer.slice(offset, offset + imageSize);
  result.imageType = 'image/jpeg';
  return result;
}
//# sourceMappingURL=parse-video-message-v1.js.map