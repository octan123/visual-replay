import { XVIZ_MESSAGE_TYPE } from '../constants';
import { getXVIZConfig } from '../config/xviz-config';
import XVIZObject from '../objects/xviz-object';
export function preSerialize(message) {
  return message;
}

function observeObjects(objects, timestamp) {
  if (objects) {
    objects.features.forEach(f => {
      XVIZObject.observe(f.id, timestamp);
    });
  }
}

export function postDeserialize(message) {
  if (message.type !== XVIZ_MESSAGE_TYPE.TIMESLICE) {
    return message;
  }

  const {
    OBJECT_STREAM
  } = getXVIZConfig();
  const {
    streams,
    timestamp
  } = message;

  if (OBJECT_STREAM) {
    observeObjects(streams[OBJECT_STREAM], timestamp);
    return message;
  }

  for (const streamName in streams) {
    const objects = streams[streamName];

    if (objects && objects.features && objects.features.length && objects.features[0].id) {
      observeObjects(objects, timestamp);
    }
  }

  return message;
}
//# sourceMappingURL=serialize.js.map