import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { getXVIZConfig, setXVIZConfig } from '../config/xviz-config';
import { parseVersionString } from './xviz-v2-common';
export function parseLogMetadata(data) {
  const {
    supportedVersions
  } = getXVIZConfig();
  const {
    version: versionString
  } = data;
  let currentMajorVersion = null;

  if (versionString === undefined) {
    currentMajorVersion = 1;
  } else {
    const {
      major
    } = parseVersionString(versionString);
    currentMajorVersion = major;
  }

  if (!currentMajorVersion) {
    throw new Error('Unable to detect the XVIZ version.');
  } else {
    setXVIZConfig({
      currentMajorVersion
    });
  }

  if (supportedVersions && !supportedVersions.includes(currentMajorVersion)) {
    throw new Error("XVIZ version ".concat(currentMajorVersion, " is not supported.  Currently supported versions are ").concat(supportedVersions, "."));
  }

  return currentMajorVersion === 1 ? parseLogMetadataV1(data) : parseLogMetadataV2(data);
}
export function parseLogMetadataV1(data) {
  const originalStreams = data.streams || [];
  const {
    STREAM_BLACKLIST
  } = getXVIZConfig();
  const streams = {};
  Object.keys(originalStreams).forEach(streamName => {
    if (!STREAM_BLACKLIST.has(streamName)) {
      streams[streamName] = originalStreams[streamName];
    }
  });
  const {
    logStartTime,
    logEndTime,
    eventStartTime,
    eventEndTime
  } = getTimestamps(data);

  const metadata = _objectSpread(_objectSpread({}, data), {}, {
    streams,
    logStartTime,
    logEndTime,
    eventStartTime,
    eventEndTime
  });

  return metadata;
}
export function parseLogMetadataV2(data) {
  const originalStreams = data.streams;
  const {
    STREAM_BLACKLIST
  } = getXVIZConfig();
  const streams = {};

  if (originalStreams) {
    Object.keys(originalStreams).forEach(streamName => {
      if (!STREAM_BLACKLIST.has(streamName)) {
        streams[streamName] = originalStreams[streamName];
      }
    });
  }

  const logInfo = data.log_info || {};
  const {
    logStartTime,
    logEndTime,
    eventStartTime,
    eventEndTime
  } = getTimestamps(logInfo);
  const styles = collectStreamStyles(streams);

  const metadata = _objectSpread(_objectSpread({}, data), {}, {
    streams,
    logStartTime,
    logEndTime,
    start_time: eventStartTime,
    end_time: eventEndTime,
    eventStartTime,
    eventEndTime,
    styles
  });

  return metadata;
}

function getTimestamps(info) {
  const logStartTime = Number.isFinite(info.log_start_time) ? info.log_start_time : null;
  const logEndTime = Number.isFinite(info.log_end_time) ? info.log_end_time : null;
  const eventStartTime = Number.isFinite(info.start_time) ? info.start_time : logStartTime;
  const eventEndTime = Number.isFinite(info.end_time) ? info.end_time : logEndTime;
  return {
    logStartTime,
    logEndTime,
    eventStartTime,
    eventEndTime
  };
}

function collectStreamStyles(metadataStreams) {
  const internalStylesheet = {};
  Object.keys(metadataStreams).forEach(streamId => {
    const streamMetadata = metadataStreams[streamId];
    const streamStylesheet = [];

    if (streamMetadata.stream_style) {
      streamStylesheet.push({
        name: '*',
        style: streamMetadata.stream_style
      });
    }

    if (streamMetadata.style_classes) {
      streamStylesheet.push(...streamMetadata.style_classes);
    }

    if (streamStylesheet.length !== 0) {
      internalStylesheet[streamId] = streamStylesheet;
    }
  });
  return internalStylesheet;
}
//# sourceMappingURL=parse-log-metadata.js.map