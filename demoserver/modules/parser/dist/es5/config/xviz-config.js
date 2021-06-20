"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeXVIZConfigChange = subscribeXVIZConfigChange;
exports.setXVIZConfig = setXVIZConfig;
exports.getXVIZConfig = getXVIZConfig;

var _xvizObjectCollection = _interopRequireDefault(require("../objects/xviz-object-collection"));

var _xvizObject = _interopRequireDefault(require("../objects/xviz-object"));

var DEFAULT_XVIZ_CONFIG = {
  supportedVersions: [1, 2],
  currentMajorVersion: 1,
  pathDistanceThreshold: 0.1,
  TIME_WINDOW: 0.4,
  PLAYBACK_FRAME_RATE: 10,
  STREAM_BLACKLIST: new Set(),
  preProcessPrimitive: function preProcessPrimitive(primitive) {
    return primitive;
  },
  ALLOW_MISSING_PRIMARY_POSE: false,
  DYNAMIC_STREAM_METADATA: false,
  TIMESTAMP_FORMAT: 'seconds',
  PRIMARY_POSE_STREAM: '/vehicle_pose'
};
var xvizConfig = Object.assign({}, DEFAULT_XVIZ_CONFIG);

_xvizObject["default"].setDefaultCollection(new _xvizObjectCollection["default"]());

var subscribers = [];

function subscribeXVIZConfigChange(func) {
  subscribers.push(func);
}

function notifySubscribers() {
  subscribers.forEach(function (sub) {
    return sub();
  });
}

function setXVIZConfig(config) {
  Object.assign(xvizConfig, config);

  if (Array.isArray(xvizConfig.STREAM_BLACKLIST)) {
    xvizConfig.STREAM_BLACKLIST = new Set(xvizConfig.STREAM_BLACKLIST);
  }

  notifySubscribers();
}

function getXVIZConfig() {
  return xvizConfig;
}
//# sourceMappingURL=xviz-config.js.map