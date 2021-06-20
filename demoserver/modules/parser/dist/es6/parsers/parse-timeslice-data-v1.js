import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { getXVIZConfig } from '../config/xviz-config';
import { XVIZ_MESSAGE_TYPE } from '../constants';
import { parseStreamFutures, parseStreamPrimitive, parseStreamVariable } from './parse-xviz-stream';
export default function parseTimesliceData(data, convertPrimitive) {
  const {
    PRIMARY_POSE_STREAM
  } = getXVIZConfig();

  const {
    vehicle_pose: vehiclePose,
    state_updates: stateUpdates
  } = data,
        otherInfo = _objectWithoutProperties(data, ["vehicle_pose", "state_updates"]);

  let timestamp;

  if (vehiclePose) {
    timestamp = vehiclePose.time;
  } else if (stateUpdates) {
    timestamp = stateUpdates.reduce((t, stateUpdate) => {
      return Math.max(t, stateUpdate.timestamp);
    }, 0);
  }

  if (!timestamp) {
    return {
      type: XVIZ_MESSAGE_TYPE.INCOMPLETE
    };
  }

  const newStreams = {};

  const result = _objectSpread(_objectSpread({}, otherInfo), {}, {
    type: XVIZ_MESSAGE_TYPE.TIMESLICE,
    streams: newStreams,
    timestamp
  });

  if (stateUpdates) {
    const xvizStreams = parseStateUpdates(stateUpdates, timestamp, convertPrimitive);
    Object.assign(newStreams, xvizStreams);
  }

  if (vehiclePose) {
    newStreams[PRIMARY_POSE_STREAM] = vehiclePose;
  }

  return result;
}

function parseStateUpdates(stateUpdates, timestamp, convertPrimitive) {
  const {
    STREAM_BLACKLIST
  } = getXVIZConfig();
  const newStreams = {};
  const primitives = {};
  const variables = {};
  const futures = {};

  for (const stateUpdate of stateUpdates) {
    Object.assign(primitives, stateUpdate.primitives);
    Object.assign(variables, stateUpdate.variables);
    Object.assign(futures, stateUpdate.futures);
  }

  Object.keys(primitives).filter(streamName => !STREAM_BLACKLIST.has(streamName)).forEach(primitive => {
    newStreams[primitive] = parseStreamPrimitive(primitives[primitive], primitive, timestamp, convertPrimitive);
  });
  Object.keys(variables).filter(streamName => !STREAM_BLACKLIST.has(streamName)).forEach(variable => {
    newStreams[variable] = parseStreamVariable(variables[variable], variable, timestamp);
  });
  Object.keys(futures).filter(streamName => !STREAM_BLACKLIST.has(streamName)).forEach(future => {
    newStreams[future] = parseStreamFutures(futures[future], future, timestamp, convertPrimitive);
  });
  return newStreams;
}
//# sourceMappingURL=parse-timeslice-data-v1.js.map