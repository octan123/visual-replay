import XVIZObjectCollection from '../objects/xviz-object-collection';
import XVIZObject from '../objects/xviz-object';
const DEFAULT_XVIZ_CONFIG = {
  supportedVersions: [1, 2],
  currentMajorVersion: 1,
  pathDistanceThreshold: 0.1,
  TIME_WINDOW: 0.4,
  PLAYBACK_FRAME_RATE: 10,
  STREAM_BLACKLIST: new Set(),
  preProcessPrimitive: primitive => primitive,
  ALLOW_MISSING_PRIMARY_POSE: false,
  DYNAMIC_STREAM_METADATA: false,
  TIMESTAMP_FORMAT: 'seconds',
  PRIMARY_POSE_STREAM: '/vehicle_pose'
};
const xvizConfig = Object.assign({}, DEFAULT_XVIZ_CONFIG);
XVIZObject.setDefaultCollection(new XVIZObjectCollection());
const subscribers = [];
export function subscribeXVIZConfigChange(func) {
  subscribers.push(func);
}

function notifySubscribers() {
  subscribers.forEach(sub => sub());
}

export function setXVIZConfig(config) {
  Object.assign(xvizConfig, config);

  if (Array.isArray(xvizConfig.STREAM_BLACKLIST)) {
    xvizConfig.STREAM_BLACKLIST = new Set(xvizConfig.STREAM_BLACKLIST);
  }

  notifySubscribers();
}
export function getXVIZConfig() {
  return xvizConfig;
}
//# sourceMappingURL=xviz-config.js.map