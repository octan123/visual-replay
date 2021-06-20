import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { _Pose as Pose } from 'math.gl';
import { addMetersToLngLat } from 'viewport-mercator-project';

function noop() {}

export function parseVehiclePose(vehiclePose, opts = {}) {
  const {
    onData = noop,
    onDone = noop,
    postProcessVehiclePose
  } = opts;
  const context = onData(opts) || opts.context;

  if (postProcessVehiclePose) {
    vehiclePose = vehiclePose.map(postProcessVehiclePose).filter(Boolean);
  }

  onDone(_objectSpread(_objectSpread({}, opts), {}, {
    context
  }));
  return vehiclePose;
}
export function getTransformsFromPose(vehiclePose) {
  const {
    longitude,
    latitude,
    altitude = 0
  } = vehiclePose;
  const origin = Number.isFinite(vehiclePose.longitude) && Number.isFinite(vehiclePose.latitude) ? [longitude, latitude, altitude] : null;
  const pose = new Pose(vehiclePose);
  const vehicleRelativeTransform = pose.getTransformationMatrix();
  const trackPosition = addMetersToLngLat(origin || [0, 0, 0], vehicleRelativeTransform.transformVector([0, 0, 0]));
  return {
    origin,
    vehicleRelativeTransform,
    trackPosition,
    heading: pose.yaw / Math.PI * 180
  };
}
//# sourceMappingURL=parse-vehicle-pose.js.map