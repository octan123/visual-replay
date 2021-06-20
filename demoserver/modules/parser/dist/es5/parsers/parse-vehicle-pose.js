"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseVehiclePose = parseVehiclePose;
exports.getTransformsFromPose = getTransformsFromPose;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _math = require("math.gl");

var _viewportMercatorProject = require("viewport-mercator-project");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function noop() {}

function parseVehiclePose(vehiclePose) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _opts$onData = opts.onData,
      onData = _opts$onData === void 0 ? noop : _opts$onData,
      _opts$onDone = opts.onDone,
      onDone = _opts$onDone === void 0 ? noop : _opts$onDone,
      postProcessVehiclePose = opts.postProcessVehiclePose;
  var context = onData(opts) || opts.context;

  if (postProcessVehiclePose) {
    vehiclePose = vehiclePose.map(postProcessVehiclePose).filter(Boolean);
  }

  onDone(_objectSpread(_objectSpread({}, opts), {}, {
    context: context
  }));
  return vehiclePose;
}

function getTransformsFromPose(vehiclePose) {
  var longitude = vehiclePose.longitude,
      latitude = vehiclePose.latitude,
      _vehiclePose$altitude = vehiclePose.altitude,
      altitude = _vehiclePose$altitude === void 0 ? 0 : _vehiclePose$altitude;
  var origin = Number.isFinite(vehiclePose.longitude) && Number.isFinite(vehiclePose.latitude) ? [longitude, latitude, altitude] : null;
  var pose = new _math._Pose(vehiclePose);
  var vehicleRelativeTransform = pose.getTransformationMatrix();
  var trackPosition = (0, _viewportMercatorProject.addMetersToLngLat)(origin || [0, 0, 0], vehicleRelativeTransform.transformVector([0, 0, 0]));
  return {
    origin: origin,
    vehicleRelativeTransform: vehicleRelativeTransform,
    trackPosition: trackPosition,
    heading: pose.yaw / Math.PI * 180
  };
}
//# sourceMappingURL=parse-vehicle-pose.js.map