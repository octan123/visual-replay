import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { XVIZ_MESSAGE_TYPE } from '../constants';
import { XVIZData } from '@xviz/io';
import { parseLogMetadata } from './parse-log-metadata';
import { parseVideoMessageV1 } from './parse-video-message-v1';
import parseTimesliceDataV1 from './parse-timeslice-data-v1';
import parseTimesliceDataV2 from './parse-timeslice-data-v2';
import { getXVIZConfig } from '../config/xviz-config';
export function parseXVIZMessageSync(message, onResult, onError, opts) {
  if (typeof Blob !== 'undefined' && message instanceof Blob) {
    parseVideoMessageV1(message, onResult, onError);
    return;
  }

  const {
    messageType,
    messageFormat
  } = opts;

  try {
    const xvizData = new XVIZData(message, {
      messageType,
      messageFormat
    });
    const xvizMsg = xvizData.message();

    if (xvizMsg) {
      const data = xvizMsg.data;
      const v2Type = xvizMsg.type || undefined;
      const result = parseXVIZData(data, _objectSpread(_objectSpread({}, opts), {}, {
        v2Type
      }));
      onResult(result);
    }
  } catch (error) {
    onError(error);
  }
}
export function parseXVIZData(data, opts = {}) {
  const typeKey = opts.v2Type || data.type || data.message || data.update_type;

  switch (typeKey) {
    case 'state_update':
      return parseTimesliceData(data, opts.convertPrimitive);

    case 'metadata':
      return _objectSpread(_objectSpread({}, parseLogMetadata(data)), {}, {
        type: XVIZ_MESSAGE_TYPE.METADATA
      });

    case 'transform_log_done':
      return _objectSpread(_objectSpread({}, data), {}, {
        type: XVIZ_MESSAGE_TYPE.DONE
      });

    case 'error':
      return _objectSpread(_objectSpread({}, data), {}, {
        message: 'Stream server error',
        type: XVIZ_MESSAGE_TYPE.ERROR
      });

    case 'done':
      return _objectSpread(_objectSpread({}, data), {}, {
        type: XVIZ_MESSAGE_TYPE.DONE
      });

    default:
      return parseTimesliceData(data, opts.convertPrimitive);
  }
}

function parseTimesliceData(data, convertPrimitive) {
  const {
    currentMajorVersion
  } = getXVIZConfig();
  return currentMajorVersion === 1 ? parseTimesliceDataV1(data, convertPrimitive) : parseTimesliceDataV2(data, convertPrimitive);
}
//# sourceMappingURL=parse-xviz-message-sync.js.map