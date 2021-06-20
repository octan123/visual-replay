"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeSeries = getTimeSeries;

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getX = function getX(d) {
  return d.time;
};

var variableNullFilter = function variableNullFilter(value) {
  return value !== undefined;
};

function getTimeSeriesForStream(streamName, metadata, stream, target) {
  if (metadata.nograph) {
    return;
  }

  var mapper = metadata.valueMap;
  var scale = metadata.scale || 1;
  var getY = mapper ? function (d) {
    return mapper[d.variable];
  } : function (d) {
    return d.variable * scale;
  };
  var sampleDatum = stream.find(variableNullFilter);

  if (!sampleDatum || !Number.isFinite(getY(sampleDatum))) {
    return;
  }

  target.isLoading = false;
  target.getX = getX;
  target.getY = getY;
  target.unit = metadata.unit || '';
  target.data[streamName] = stream.filter(variableNullFilter);
}

function getTimeSeries(_ref) {
  var _ref$streamsMetadata = _ref.streamsMetadata,
      streamsMetadata = _ref$streamsMetadata === void 0 ? {} : _ref$streamsMetadata,
      streamNames = _ref.streamNames,
      streams = _ref.streams;
  var timeSeries = {
    isLoading: true,
    data: {},
    missingStreams: []
  };

  var _iterator = _createForOfIteratorHelper(streamNames),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var streamName = _step.value;
      var streamMetadata = streamsMetadata && streamsMetadata[streamName] || {};
      var stream = streams[streamName];

      if (stream) {
        getTimeSeriesForStream(streamName, streamMetadata, stream, timeSeries);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  timeSeries.missingStreams = streamNames.filter(function (streamToDisplay) {
    return !timeSeries.data[streamToDisplay];
  });
  return timeSeries;
}
//# sourceMappingURL=metrics-helper.js.map