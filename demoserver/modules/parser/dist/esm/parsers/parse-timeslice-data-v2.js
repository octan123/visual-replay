import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { XVIZ_MESSAGE_TYPE, STATE_UPDATE_TYPE } from '../constants';
import { getXVIZConfig } from '../config/xviz-config';
import { parseXVIZPose } from './parse-xviz-pose';
import { parseXVIZLink } from './parse-xviz-link';
import { parseStreamFutures, parseStreamPrimitive, parseStreamVariable, parseStreamTimeSeries, parseStreamUIPrimitives } from './parse-xviz-stream';
import log from '../utils/log';
export default function parseStreamSet(data, convertPrimitive) {
  var update_type = data.update_type,
      updates = data.updates;
  var updateType = STATE_UPDATE_TYPE[update_type.toUpperCase()];

  if (!updateType) {
    log.error("update_type of \"".concat(update_type, "\" is not supported."))();
    return {
      type: XVIZ_MESSAGE_TYPE.INCOMPLETE,
      message: 'Unsupported update type'
    };
  }

  if (!updates) {
    return {
      type: XVIZ_MESSAGE_TYPE.INCOMPLETE,
      message: 'Missing required "updates" property'
    };
  }

  if (updates && updates.length === 0) {
    return {
      type: XVIZ_MESSAGE_TYPE.INCOMPLETE,
      message: 'Property "updates" has length of 0, no data?'
    };
  }

  if (updates.length > 1) {
    log.warn("Only XVIZ first update of \"snapshot\" is currently supported. Current updates has \"".concat(updates.length, "\" entries."))();
  }

  var streamSets = updates;
  var timestamp = null;

  if (streamSets) {
    timestamp = streamSets.reduce(function (t, stateUpdate) {
      if (!t) {
        return stateUpdate && stateUpdate.timestamp;
      }

      return Math.max(t, stateUpdate.timestamp);
    }, null);
  }

  if (!Number.isFinite(timestamp)) {
    return {
      type: XVIZ_MESSAGE_TYPE.INCOMPLETE,
      message: 'Missing timestamp in "updates"'
    };
  }

  var result = {
    type: XVIZ_MESSAGE_TYPE.TIMESLICE,
    updateType: updateType,
    streams: {},
    links: {},
    timestamp: timestamp
  };

  if (streamSets) {
    var _parseStreamSets = parseStreamSets(streamSets, timestamp, convertPrimitive),
        streams = _parseStreamSets.streams,
        links = _parseStreamSets.links;

    Object.assign(result.streams, streams);
    Object.assign(result.links, links);
  }

  return result;
}

function parseStreamSets(streamSets, timestamp, convertPrimitive) {
  var _getXVIZConfig = getXVIZConfig(),
      STREAM_BLACKLIST = _getXVIZConfig.STREAM_BLACKLIST;

  var newStreams = {};
  var newLinks = {};
  var poses = {};
  var primitives = {};
  var variables = {};
  var timeSeries = [];
  var futures = {};
  var uiPrimitives = {};
  var noDataStreams = [];

  var _iterator = _createForOfIteratorHelper(streamSets),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var streamSet = _step.value;
      Object.assign(newLinks, streamSet.links);
      Object.assign(poses, streamSet.poses);
      Object.assign(primitives, streamSet.primitives);
      Object.assign(variables, streamSet.variables);
      Object.assign(futures, streamSet.future_instances);
      Object.assign(uiPrimitives, streamSet.ui_primitives);

      if (streamSet.time_series) {
        if (timeSeries) {
          timeSeries.push.apply(timeSeries, _toConsumableArray(streamSet.time_series));
        }
      }

      if (streamSet.no_data_streams) {
        noDataStreams.push.apply(noDataStreams, _toConsumableArray(streamSet.no_data_streams));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  Object.keys(newLinks).filter(function (streamName) {
    return !STREAM_BLACKLIST.has(streamName);
  }).forEach(function (streamName) {
    newLinks[streamName] = parseXVIZLink(newLinks[streamName]);
  });
  Object.keys(poses).filter(function (streamName) {
    return !STREAM_BLACKLIST.has(streamName);
  }).forEach(function (streamName) {
    newStreams[streamName] = parseXVIZPose(poses[streamName]);
  });
  Object.keys(primitives).filter(function (streamName) {
    return !STREAM_BLACKLIST.has(streamName);
  }).forEach(function (primitive) {
    newStreams[primitive] = parseStreamPrimitive(primitives[primitive], primitive, timestamp, convertPrimitive);
  });
  Object.keys(variables).filter(function (streamName) {
    return !STREAM_BLACKLIST.has(streamName);
  }).forEach(function (variable) {
    newStreams[variable] = parseStreamVariable(variables[variable], variable, timestamp);
  });

  if (timeSeries.length) {
    var timeSeriesStreams = parseStreamTimeSeries(timeSeries, STREAM_BLACKLIST);
    Object.assign(newStreams, timeSeriesStreams);
  }

  Object.keys(futures).filter(function (streamName) {
    return !STREAM_BLACKLIST.has(streamName);
  }).forEach(function (future) {
    newStreams[future] = parseStreamFutures(futures[future], future, timestamp, convertPrimitive);
  });
  Object.keys(uiPrimitives).filter(function (streamName) {
    return !STREAM_BLACKLIST.has(streamName);
  }).forEach(function (primitive) {
    newStreams[primitive] = parseStreamUIPrimitives(uiPrimitives[primitive], primitive, timestamp);
  });

  if (noDataStreams.length) {
    noDataStreams.forEach(function (stream) {
      return newStreams[stream] = null;
    });
  }

  return {
    streams: newStreams,
    links: newLinks
  };
}
//# sourceMappingURL=parse-timeslice-data-v2.js.map