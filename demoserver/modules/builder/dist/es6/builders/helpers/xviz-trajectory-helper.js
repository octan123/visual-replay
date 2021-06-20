import { _Pose as Pose } from 'math.gl';
import * as turf from '@turf/turf';
export function getRelativeCoordinates(vertices, basePose) {
  if (!(basePose instanceof Pose)) {
    basePose = new Pose(basePose);
  }

  const transformMatrix = basePose.getTransformationMatrix();
  return vertices.map(p => transformMatrix.transform(p));
}
export function getPoseTrajectory({
  poses,
  startFrame,
  endFrame
}) {
  const positions = [];
  const iterationLimit = Math.min(endFrame, poses.length);

  for (let i = startFrame; i < iterationLimit; i++) {
    positions.push(poses[i].pose);
  }

  const startPose = poses[startFrame].pose;
  const worldToStartPoseTransformMatrix = new Pose(startPose).getTransformationMatrix().invert();
  return positions.map(currPose => {
    const offset = getGeospatialVector(startPose, currPose);
    const relativeOffset = worldToStartPoseTransformMatrix.transform(offset);
    return relativeOffset;
  });
}
export function getGeospatialToPoseTransform(from, to) {
  let offset = getGeospatialVector(from, to);
  const fromPose = new Pose({
    x: 0,
    y: 0,
    z: 0,
    pitch: from.pitch,
    roll: from.roll,
    yaw: from.yaw
  });
  const worldToFromPoseTransformMatrix = fromPose.getTransformationMatrix().invert();
  offset = worldToFromPoseTransformMatrix.transform(offset);
  const toPose = new Pose({
    x: offset[0],
    y: offset[1],
    z: offset[2],
    pitch: to.pitch,
    roll: to.roll,
    yaw: to.yaw
  });
  return fromPose.getTransformationMatrixFromPose(toPose);
}
export function getObjectTrajectory({
  targetObject,
  objectFrames,
  poseFrames,
  startFrame,
  endFrame
}) {
  const vertices = [];
  const startVehiclePose = poseFrames[startFrame].pose;
  const limit = Math.min(endFrame, targetObject.lastFrame);
  const motions = getObjectMotions(targetObject, objectFrames, startFrame, limit);

  for (let i = 0; i < motions.length; i++) {
    const step = motions[i];
    const currVehiclePose = poseFrames[startFrame + i].pose;
    const transformMatrix = getGeospatialToPoseTransform(currVehiclePose, startVehiclePose);
    const p = transformMatrix.transform([step.x, step.y, step.z]);
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
  const fromPoint = turf.destination([from.longitude, from.latitude, from.altitude], Math.sqrt(from.x * from.x + from.y * from.y), Math.PI / 2 - from.yaw, {
    units: 'meters'
  });
  const toPoint = turf.destination([to.longitude, to.latitude, to.altitude], Math.sqrt(to.x * to.x + to.y * to.y), Math.PI / 2 - to.yaw, {
    units: 'meters'
  });
  const distInMeters = turf.distance(fromPoint, toPoint, {
    units: 'meters'
  });
  const bearing = turf.bearing(fromPoint, toPoint);
  const bearingInRadians = turf.degreesToRadians(bearing);
  const diffZ = to.altitude + to.z - from.altitude - from.z;
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
  const motions = [];

  for (let i = startFrame; i < endFrame; i++) {
    const objects = getFrameObjects(objectFrames, i);
    const object = objects.find(obj => obj.id === targetObject.id);
    motions.push(object);
  }

  return motions;
}
//# sourceMappingURL=xviz-trajectory-helper.js.map