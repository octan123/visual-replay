import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { getXVIZConfig } from '../config/xviz-config';
export function parseXVIZPose(pose) {
  var mapOrigin = pose.mapOrigin,
      map_origin = pose.map_origin,
      position = pose.position,
      orientation = pose.orientation,
      timestamp = pose.timestamp;
  var origin = map_origin || mapOrigin;
  var result = {
    timestamp: timestamp
  };

  if (origin) {
    var longitude = origin.longitude,
        latitude = origin.latitude,
        altitude = origin.altitude;
    Object.assign(result, {
      longitude: longitude,
      latitude: latitude,
      altitude: altitude
    });
  }

  if (position) {
    var _position = _slicedToArray(position, 3),
        x = _position[0],
        y = _position[1],
        z = _position[2];

    Object.assign(result, {
      x: x,
      y: y,
      z: z
    });
  }

  if (orientation) {
    var _orientation = _slicedToArray(orientation, 3),
        roll = _orientation[0],
        pitch = _orientation[1],
        yaw = _orientation[2];

    Object.assign(result, {
      roll: roll,
      pitch: pitch,
      yaw: yaw
    });
  }

  if (getXVIZConfig().DYNAMIC_STREAM_METADATA) {
    result.__metadata = {
      category: 'POSE'
    };
  }

  return _objectSpread(_objectSpread({}, pose), result);
}
//# sourceMappingURL=parse-xviz-pose.js.map