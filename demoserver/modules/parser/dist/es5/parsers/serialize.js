"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preSerialize = preSerialize;
exports.postDeserialize = postDeserialize;

var _constants = require("../constants");

var _xvizConfig = require("../config/xviz-config");

var _xvizObject = _interopRequireDefault(require("../objects/xviz-object"));

function preSerialize(message) {
  return message;
}

function observeObjects(objects, timestamp) {
  if (objects) {
    objects.features.forEach(function (f) {
      _xvizObject["default"].observe(f.id, timestamp);
    });
  }
}

function postDeserialize(message) {
  if (message.type !== _constants.XVIZ_MESSAGE_TYPE.TIMESLICE) {
    return message;
  }

  var _getXVIZConfig = (0, _xvizConfig.getXVIZConfig)(),
      OBJECT_STREAM = _getXVIZConfig.OBJECT_STREAM;

  var streams = message.streams,
      timestamp = message.timestamp;

  if (OBJECT_STREAM) {
    observeObjects(streams[OBJECT_STREAM], timestamp);
    return message;
  }

  for (var streamName in streams) {
    var objects = streams[streamName];

    if (objects && objects.features && objects.features.length && objects.features[0].id) {
      observeObjects(objects, timestamp);
    }
  }

  return message;
}
//# sourceMappingURL=serialize.js.map