import { _Pose as Pose } from 'math.gl';
import * as turf from '@turf/turf';
export function getRelativeCoordinates(vertices, basePose) {
  if (!(basePose instanceof Pose)) {
    basePose = new Pose(basePose);
  }

  var transformMatrix = basePose.getTransformationMatrix();
  return vertices.map(function (p) {
    return transformMatrix.transform(p);
  });
}
export function getPoseTrajectory(_ref) {
  var poses = _ref.poses,
      startFrame = _ref.startFrame,
      endFrame = _ref.endFrame;
  var positions = [];
  var iterationLimit = Math.min(endFrame, poses.length);

  for (var i = startFrame; i < iterationLimit; i++) {
    positions.push(poses[i].pose);
  }

  var startPose = poses[startFrame].pose;
  var worldToStartPoseTransformMatrix = new Pose(startPose).getTransformationMatrix().invert();
  return positions.map(function (currPose) {
    var offset = getGeospatialVector(startPose, currPose);
    var relativeOffset = worldToStartPoseTransformMatrix.transform(offset);
    return relativeOffset;
  });
}
export function getGeospatialToPoseTransform(from, to) {
  var offset = getGeospatialVector(from, to);
  var fromPose = new Pose({
    x: 0,
    y: 0,
    z: 0,
    pitch: from.pitch,
    roll: from.roll,
    yaw: from.yaw
  });
  var worldToFromPoseTransformMatrix = fromPose.getTransformationMatrix().invert();
  offset = worldToFromPoseTransformMatrix.transform(offset);
  var toPose = new Pose({
    x: offset[0],
    y: offset[1],
    z: offset[2],
    pitch: to.pitch,
    roll: to.roll,
    yaw: to.yaw
  });
  return fromPose.getTransformationMatrixFromPose(toPose);
}
export function getObjectTrajectory(_ref2) {
  var targetObject = _ref2.targetObject,
      objectFrames = _ref2.objectFrames,
      poseFrames = _ref2.poseFrames,
      startFrame = _ref2.startFrame,
      endFrame = _ref2.endFrame;
  var vertices = [];
  var startVehiclePose = poseFrames[startFrame].pose;
  var limit = Math.min(endFrame, targetObject.lastFrame);
  var motions = getObjectMotions(targetObject, objectFrames, startFrame, limit);

  for (var i = 0; i < motions.length; i++) {
    var step = motions[i];
    var currVehiclePose = poseFrames[startFrame + i].pose;
    var transformMatrix = getGeospatialToPoseTransform(currVehiclePose, startVehiclePose);
    var p = transformMatrix.transform([step.x, step.y, step.z]);
    vertices.push(p);
  }

  return vertices;
}
export function getGeospatialVector(from, to) {
  from = {
    longitude: from.longitude || 0,
    latitude: from.latitude || 0,
    altitude: from.altitude || 0,
    x: from.x || 0,
    y: from.y || 0,
    z: from.z || 0,
    yaw: from.yaw || 0
  };
  to = {
    longitude: to.longitude || 0,
    latitude: to.latitude || 0,
    altitude: to.altitude || 0,
    x: to.x || 0,
    y: to.y || 0,
    z: to.z || 0,
    yaw: to.yaw || 0
  };
  var fromPoint = turf.destination([from.longitude, from.latitude, from.altitude], Math.sqrt(from.x * from.x + from.y * from.y), Math.PI / 2 - from.yaw, {
    units: 'meters'
  });
  var toPoint = turf.destination([to.longitude, to.latitude, to.altitude], Math.sqrt(to.x * to.x + to.y * to.y), Math.PI / 2 - to.yaw, {
    units: 'meters'
  });
  var distInMeters = turf.distance(fromPoint, toPoint, {
    units: 'meters'
  });
  var bearing = turf.bearing(fromPoint, toPoint);
  var bearingInRadians = turf.degreesToRadians(bearing);
  var diffZ = to.altitude + to.z - from.altitude - from.z;
  return [distInMeters * Math.sin(bearingInRadians), distInMeters * Math.cos(bearingInRadians), diffZ];
}

function getFrameObjects(frames, frameNumber) {
  if (frames instanceof Map) {
    return frames.get(frameNumber);
  }

  if (frames instanceof Array) {
    return frames[frameNumber];
  }

  return null;
}

function getObjectMotions(targetObject, objectFrames, startFrame, endFrame) {
  startFrame = Math.max(targetObject.firstFrame, startFrame);
  endFrame = Math.min(targetObject.lastFrame, endFrame);
  var motions = [];

  for (var i = startFrame; i < endFrame; i++) {
    var objects = getFrameObjects(objectFrames, i);
    var object = objects.find(function (obj) {
      return obj.id === targetObject.id;
    });
    motions.push(object);
  }

  return motions;
}
//# sourceMappingURL=xviz-trajectory-helper.js.map