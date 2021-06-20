"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveLinksTransform = resolveLinksTransform;
exports.resolveCoordinateTransform = resolveCoordinateTransform;
exports.positionToLngLat = positionToLngLat;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _core = require("@deck.gl/core");

var _math = require("math.gl");

var _viewportMercatorProject = require("viewport-mercator-project");

var _constants = require("../constants");

var DEFAULT_ORIGIN = [0, 0, 0];

function resolveLinksTransform(links, streams, streamName) {
  var transforms = [];
  var parentPose = links[streamName] && links[streamName].target_pose;
  var missingPose = false;

  while (parentPose) {
    if (!streams[parentPose]) {
      missingPose = true;
      break;
    }

    transforms.push(streams[parentPose]);
    parentPose = links[parentPose] && links[parentPose].target_pose;
  }

  if (!missingPose && transforms.length) {
    return transforms.reduceRight(function (acc, val) {
      return acc.multiplyRight(new _math._Pose(val).getTransformationMatrix());
    }, new _math.Matrix4());
  }

  return null;
}

function resolveCoordinateTransform(frame, streamName) {
  var streamMetadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var getTransformMatrix = arguments.length > 3 ? arguments[3] : undefined;
  var origin = frame.origin,
      _frame$links = frame.links,
      links = _frame$links === void 0 ? {} : _frame$links,
      streams = frame.streams,
      _frame$transforms = frame.transforms,
      transforms = _frame$transforms === void 0 ? {} : _frame$transforms,
      vehicleRelativeTransform = frame.vehicleRelativeTransform;
  var coordinate = streamMetadata.coordinate,
      transform = streamMetadata.transform,
      pose = streamMetadata.pose;
  var coordinateSystem = _core.COORDINATE_SYSTEM.METER_OFFSETS;
  var modelMatrix = null;
  var streamTransform = transform;

  switch (coordinate) {
    case _constants.COORDINATE.GEOGRAPHIC:
      coordinateSystem = _core.COORDINATE_SYSTEM.LNGLAT;
      break;

    case _constants.COORDINATE.DYNAMIC:
      transforms[transform] = transforms[transform] || getTransformMatrix(transform, frame);
      modelMatrix = transforms[transform];
      frame.transforms = transforms;
      streamTransform = null;
      break;

    case _constants.COORDINATE.VEHICLE_RELATIVE:
      modelMatrix = vehicleRelativeTransform;
      break;

    default:
    case _constants.COORDINATE.IDENTITY:
      modelMatrix = resolveLinksTransform(links, streams, streamName);
      break;
  }

  if (pose) {
    streamTransform = new _math._Pose(pose).getTransformationMatrix();
  }

  if (streamTransform && streamTransform.length > 0) {
    modelMatrix = modelMatrix ? new _math.Matrix4(modelMatrix).multiplyRight(streamTransform) : streamTransform;
  }

  return {
    coordinateSystem: coordinateSystem,
    coordinateOrigin: origin || DEFAULT_ORIGIN,
    modelMatrix: modelMatrix
  };
}

function positionToLngLat(_ref, _ref2) {
  var _ref3 = (0, _slicedToArray2["default"])(_ref, 3),
      x = _ref3[0],
      y = _ref3[1],
      z = _ref3[2];

  var coordinateSystem = _ref2.coordinateSystem,
      coordinateOrigin = _ref2.coordinateOrigin,
      modelMatrix = _ref2.modelMatrix;

  if (modelMatrix) {
    var _Matrix4$transformAsP = new _math.Matrix4(modelMatrix).transformAsPoint([x, y, z]);

    var _Matrix4$transformAsP2 = (0, _slicedToArray2["default"])(_Matrix4$transformAsP, 3);

    x = _Matrix4$transformAsP2[0];
    y = _Matrix4$transformAsP2[1];
    z = _Matrix4$transformAsP2[2];
  }

  switch (coordinateSystem) {
    case _core.COORDINATE_SYSTEM.METER_OFFSETS:
      return (0, _viewportMercatorProject.addMetersToLngLat)(coordinateOrigin, [x, y, z]);

    case _core.COORDINATE_SYSTEM.LNGLAT:
    default:
      return [x, y, z];
  }
}
//# sourceMappingURL=transform.js.map