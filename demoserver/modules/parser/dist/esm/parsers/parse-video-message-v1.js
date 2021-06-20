import { XVIZ_MESSAGE_TYPE } from '../constants';
import { TextDecoder } from '../utils/text-encoding';
import { blobToArrayBuffer } from '../utils/binary';
import { parseLogMetadata } from './parse-log-metadata';
export function parseVideoMessageV1(message, onResult, onError) {
  if (message instanceof Blob) {
    blobToArrayBuffer(message).then(function (arrayBuffer) {
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
export function parseStreamVideoData(data) {
  if (data instanceof ArrayBuffer) {
    return parseVideoFrame(data);
  }

  if (data.type === 'metadata') {
    return parseVideoMetadata(data);
  }

  return {
    type: XVIZ_MESSAGE_TYPE.ERROR,
    message: 'Unknown stream data type',
    data: data
  };
}

function parseVideoMetadata(data) {
  var result = parseLogMetadata(data);
  result.type = XVIZ_MESSAGE_TYPE.VIDEO_METADATA;
  return result;
}

export function parseVideoFrame(arrayBuffer) {
  var view = new DataView(arrayBuffer);
  var result = {
    type: XVIZ_MESSAGE_TYPE.VIDEO_FRAME
  };
  var littleEndian = true;
  var utf8Decoder = new TextDecoder('utf-8');
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