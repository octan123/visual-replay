"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseLogMetadata = parseLogMetadata;
exports.parseLogMetadataV1 = parseLogMetadataV1;
exports.parseLogMetadataV2 = parseLogMetadataV2;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _xvizConfig = require("../config/xviz-config");

var _xvizV2Common = require("./xviz-v2-common");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function parseLogMetadata(data) {
  var _getXVIZConfig = (0, _xvizConfig.getXVIZConfig)(),
      supportedVersions = _getXVIZConfig.supportedVersions;

  var versionString = data.version;
  var currentMajorVersion = null;

  if (versionString === undefined) {
    currentMajorVersion = 1;
  } else {
    var _parseVersionString = (0, _xvizV2Common.parseVersionString)(versionString),
        major = _parseVersionString.major;

    currentMajorVersion = major;
  }

  if (!currentMajorVersion) {
    throw new Error('Unable to detect the XVIZ version.');
  } else {
    (0, _xvizConfig.setXVIZConfig)({
      currentMajorVersion: currentMajorVersion
    });
  }

  if (supportedVersions && !supportedVersions.includes(currentMajorVersion)) {
    throw new Error("XVIZ version ".concat(currentMajorVersion, " is not supported.  Currently supported versions are ").concat(supportedVersions, "."));
  }

  return currentMajorVersion === 1 ? parseLogMetadataV1(data) : parseLogMetadataV2(data);
}

function parseLogMetadataV1(data) {
  var originalStreams = data.streams || [];

  var _getXVIZConfig2 = (0, _xvizConfig.getXVIZConfig)(),
      STREAM_BLACKLIST = _getXVIZConfig2.STREAM_BLACKLIST;

  var streams = {};
  Object.keys(originalStreams).forEach(function (streamName) {
    if (!STREAM_BLACKLIST.has(streamName)) {
      streams[streamName] = originalStreams[streamName];
    }
  });

  var _getTimestamps = getTimestamps(data),
      logStartTime = _getTimestamps.logStartTime,
      logEndTime = _getTimestamps.logEndTime,
      eventStartTime = _getTimestamps.eventStartTime,
      eventEndTime = _getTimestamps.eventEndTime;

  var metadata = _objectSpread(_objectSpread({}, data), {}, {
    streams: streams,
    logStartTime: logStartTime,
    logEndTime: logEndTime,
    eventStartTime: eventStartTime,
    eventEndTime: eventEndTime
  });

  return metadata;
}

function parseLogMetadataV2(data) {
  var originalStreams = data.streams;

  var _getXVIZConfig3 = (0, _xvizConfig.getXVIZConfig)(),
      STREAM_BLACKLIST = _getXVIZConfig3.STREAM_BLACKLIST;

  var streams = {};

  if (originalStreams) {
    Object.keys(originalStreams).forEach(function (streamName) {
      if (!STREAM_BLACKLIST.has(streamName)) {
        streams[streamName] = originalStreams[streamName];
      }
    });
  }

  var logInfo = data.log_info || {};

  var _getTimestamps2 = getTimestamps(logInfo),
      logStartTime = _getTimestamps2.logStartTime,
      logEndTime = _getTimestamps2.logEndTime,
      eventStartTime = _getTimestamps2.eventStartTime,
      eventEndTime = _getTimestamps2.eventEndTime;

  var styles = collectStreamStyles(streams);

  var metadata = _objectSpread(_objectSpread({}, data), {}, {
    streams: streams,
    logStartTime: logStartTime,
    logEndTime: logEndTime,
    start_time: eventStartTime,
    end_time: eventEndTime,
    eventStartTime: eventStartTime,
    eventEndTime: eventEndTime,
    styles: styles
  });

  return metadata;
}

function getTimestamps(info) {
  var logStartTime = Number.isFinite(info.log_start_time) ? info.log_start_time : null;
  var logEndTime = Number.isFinite(info.log_end_time) ? info.log_end_time : null;
  var eventStartTime = Number.isFinite(info.start_time) ? info.start_time : logStartTime;
  var eventEndTime = Number.isFinite(info.end_time) ? info.end_time : logEndTime;
  return {
    logStartTime: logStartTime,
    logEndTime: logEndTime,
    eventStartTime: eventStartTime,
    eventEndTime: eventEndTime
  };
}

function collectStreamStyles(metadataStreams) {
  var internalStylesheet = {};
  Object.keys(metadataStreams).forEach(function (streamId) {
    var streamMetadata = metadataStreams[streamId];
    var streamStylesheet = [];

    if (streamMetadata.stream_style) {
      streamStylesheet.push({
        name: '*',
        style: streamMetadata.stream_style
      });
    }

    if (streamMetadata.style_classes) {
      streamStylesheet.push.apply(streamStylesheet, (0, _toConsumableArray2["default"])(streamMetadata.style_classes));
    }

    if (streamStylesheet.length !== 0) {
      internalStylesheet[streamId] = streamStylesheet;
    }
  });
  return internalStylesheet;
}
//# sourceMappingURL=parse-log-metadata.js.map