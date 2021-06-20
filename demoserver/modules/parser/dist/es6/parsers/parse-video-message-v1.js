import { XVIZ_MESSAGE_TYPE } from '../constants';
import { TextDecoder } from '../utils/text-encoding';
import { blobToArrayBuffer } from '../utils/binary';
import { parseLogMetadata } from './parse-log-metadata';
export function parseVideoMessageV1(message, onResult, onError) {
  if (message instanceof Blob) {
    blobToArrayBuffer(message).then(arrayBuffer => {
      parseVideoMessageV1(arrayBuffer, onResult, onError);
    }).catch(onError);
    return;
  }

  try {
    let data = message;

    if (typeof message === 'string') {
      data = JSON.parse(message);
    }

    const result = parseStreamVideoData(data);
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
    data
  };
}

function parseVideoMetadata(data) {
  const result = parseLogMetadata(data);
  result.type = XVIZ_MESSAGE_TYPE.VIDEO_METADATA;
  return result;
}

export function parseVideoFrame(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  const result = {
    type: XVIZ_MESSAGE_TYPE.VIDEO_FRAME
  };
  const littleEndian = true;
  const utf8Decoder = new TextDecoder('utf-8');
  let offset = 0;
  result.version = view.getUint32(offset, littleEndian);
  offset += 4;
  result.versionFlags = view.getUint32(offset, littleEndian);
  offset += 4;
  const streamLength = view.getUint32(offset, littleEndian);
  const stringStart = offset + 4;
  offset += 4 + streamLength;
  result.stream = utf8Decoder.decode(arrayBuffer.slice(stringStart, offset));
  result.timestamp = view.getFloat64(offset, littleEndian);
  offset += 8;
  const imageSize = view.getUint32(offset, littleEndian);
  offset += 4;
  result.imageData = arrayBuffer.slice(offset, offset + imageSize);
  result.imageType = 'image/jpeg';
  return result;
}
//# sourceMappingURL=parse-video-message-v1.js.map