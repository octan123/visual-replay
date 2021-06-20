import { setXVIZConfig } from '../config/xviz-config';
import { parseXVIZMessageSync } from '../parsers/parse-xviz-message-sync';
import { preSerialize } from '../parsers/serialize';
import { getTransferList } from '../utils/worker-utils';
import { XVIZ_MESSAGE_TYPE } from '../constants';
export default (config => self => {
  setXVIZConfig(config);

  function onResult(message) {
    const transfers = new Set();

    switch (message.type) {
      case XVIZ_MESSAGE_TYPE.TIMESLICE:
        for (const streamName in message.streams) {
          const stream = message.streams[streamName];

          if (stream) {
            getTransferList(stream.pointCloud, true, transfers);
            getTransferList(stream.vertices, false, transfers);

            if (stream.images && stream.images.length) {
              stream.images.forEach(image => getTransferList(image, true, transfers));
            }
          }
        }

        break;

      case XVIZ_MESSAGE_TYPE.VIDEO_FRAME:
        getTransferList(message.imageData, false, transfers);
        break;

      default:
    }

    message = preSerialize(message);
    self.postMessage(message, Array.from(transfers));
  }

  function onError(error) {
    throw error;
  }

  self.onmessage = e => {
    if (e.data && e.data.xvizConfig) {
      setXVIZConfig(e.data.xvizConfig);
    } else if (e.data) {
      if (e.data.opts) {
        parseXVIZMessageSync(e.data.data, onResult, onError, e.data.opts);
      } else {
        parseXVIZMessageSync(e.data, onResult, onError);
      }
    }
  };
});
//# sourceMappingURL=stream-data-worker.js.map