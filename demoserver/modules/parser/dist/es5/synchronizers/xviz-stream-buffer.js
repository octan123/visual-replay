"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _xvizObject = _interopRequireDefault(require("../objects/xviz-object"));

var _assert = _interopRequireDefault(require("../utils/assert"));

var _search = require("../utils/search");

var LEFT = _search.INSERT_POSITION.LEFT;
var RIGHT = _search.INSERT_POSITION.RIGHT;
var UNLIMITED = 0;
var OFFSET = 1;
var FIXED = 2;

var XVIZStreamBuffer = function () {
  function XVIZStreamBuffer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$startOffset = _ref.startOffset,
        startOffset = _ref$startOffset === void 0 ? null : _ref$startOffset,
        _ref$endOffset = _ref.endOffset,
        endOffset = _ref$endOffset === void 0 ? null : _ref$endOffset,
        _ref$maxLength = _ref.maxLength,
        maxLength = _ref$maxLength === void 0 ? null : _ref$maxLength;

    (0, _classCallCheck2["default"])(this, XVIZStreamBuffer);

    if (Number.isFinite(startOffset) && Number.isFinite(endOffset)) {
      (0, _assert["default"])(startOffset <= 0 && endOffset >= 0, 'Steam buffer offset');
      this.bufferType = OFFSET;
    } else {
      this.bufferType = UNLIMITED;
    }

    this.options = {
      startOffset: startOffset,
      endOffset: endOffset,
      maxLength: maxLength
    };
    this.bufferStart = null;
    this.bufferEnd = null;
    this.timeslices = [];
    this.persistent = [];
    this.streams = {};
    this.videos = {};
    this.persistentStreams = {};
    this.lastUpdate = 0;
    this.streamCount = 0;
    this.hasBuffer = this.hasBuffer.bind(this);
  }

  (0, _createClass2["default"])(XVIZStreamBuffer, [{
    key: "updateFixedBuffer",
    value: function updateFixedBuffer(start, end) {
      var bufferStart = this.bufferStart,
          bufferEnd = this.bufferEnd,
          maxLength = this.options.maxLength;
      (0, _assert["default"])(start < end, 'updateFixedBuffer start / end');
      (0, _assert["default"])(this.bufferType === UNLIMITED || this.bufferType === FIXED, 'updateFixedBuffer multiple buffer types');
      this.bufferType = FIXED;

      if (!maxLength) {
        this.bufferStart = start;
        this.bufferEnd = end;
      } else if (!Number.isFinite(bufferStart) || start > bufferEnd + maxLength || start < bufferStart - maxLength) {
        this.bufferStart = start;
        this.bufferEnd = Math.min(end, start + maxLength);
      } else if (start < bufferStart) {
        this.bufferStart = start;
        this.bufferEnd = Math.min(bufferEnd, start + maxLength);
      } else {
        this.bufferStart = Math.min(bufferEnd, end - maxLength);
        this.bufferEnd = Math.min(this.bufferStart + maxLength, end);
      }

      this._pruneBuffer();

      return {
        start: this.bufferStart,
        end: this.bufferEnd,
        oldStart: bufferStart,
        oldEnd: bufferEnd
      };
    }
  }, {
    key: "getBufferRange",
    value: function getBufferRange() {
      if (this.bufferType !== UNLIMITED) {
        var bufferStart = this.bufferStart,
            bufferEnd = this.bufferEnd;

        if (Number.isFinite(bufferStart)) {
          return {
            start: bufferStart,
            end: bufferEnd
          };
        }
      }

      return {
        start: null,
        end: null
      };
    }
  }, {
    key: "getLoadedTimeRange",
    value: function getLoadedTimeRange() {
      var timeslices = this.timeslices;
      var len = timeslices.length;

      if (len > 0) {
        return {
          start: timeslices[0].timestamp,
          end: timeslices[len - 1].timestamp
        };
      }

      return null;
    }
  }, {
    key: "getTimeslices",
    value: function getTimeslices() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          start = _ref2.start,
          end = _ref2.end;

      var timeslices = this.timeslices,
          persistent = this.persistent;
      var startIndex = Number.isFinite(start) ? this._indexOf(start, LEFT) : 0;
      var endIndex = Number.isFinite(end) ? this._indexOf(end, RIGHT) : timeslices.length;
      var persistentEndIndex = Number.isFinite(end) ? (0, _search.findInsertPos)(persistent, end, RIGHT) : persistent.length;
      return persistent.slice(0, persistentEndIndex).concat(timeslices.slice(startIndex, endIndex));
    }
  }, {
    key: "getStreams",
    value: function getStreams() {
      var streams = this.streams;
      var result = {};

      for (var streamName in streams) {
        result[streamName] = streams[streamName].filter(function (value) {
          return value !== undefined;
        });
      }

      return result;
    }
  }, {
    key: "getVideos",
    value: function getVideos() {
      var videos = this.videos;
      var result = {};

      for (var streamName in videos) {
        result[streamName] = videos[streamName].filter(function (value) {
          return value !== undefined;
        });
      }

      return result;
    }
  }, {
    key: "getVehiclePoses",
    value: function getVehiclePoses() {
      return this.timeslices.map(function (t) {
        return t.vehiclePose;
      }).filter(Boolean);
    }
  }, {
    key: "insert",
    value: function insert(timeslice) {
      var timestamp = timeslice.timestamp,
          updateType = timeslice.updateType;

      if (!this.isInBufferRange(timestamp)) {
        return false;
      }

      timeslice.streams = timeslice.streams || {};
      timeslice.videos = timeslice.videos || {};
      timeslice.links = timeslice.links || {};
      var timeslices = this.timeslices,
          streams = this.streams,
          videos = this.videos;

      if (updateType === 'PERSISTENT') {
        this._insertPersistentSlice(timeslice);

        this.lastUpdate++;
        return true;
      }

      for (var streamName in timeslice.streams) {
        if (!streams[streamName]) {
          streams[streamName] = new Array(timeslices.length);
          this.streamCount++;
        }
      }

      for (var _streamName in timeslice.videos) {
        if (!videos[_streamName]) {
          videos[_streamName] = new Array(timeslices.length);
        }
      }

      var insertPosition = this._indexOf(timestamp, LEFT);

      var timesliceAtInsertPosition = timeslices[insertPosition];

      if (timesliceAtInsertPosition && timesliceAtInsertPosition.timestamp === timestamp) {
        if (updateType === 'COMPLETE') {
          this._insertTimesliceAt(insertPosition, 1, timeslice);
        } else {
          this._mergeTimesliceAt(insertPosition, timeslice);
        }
      } else {
        this._insertTimesliceAt(insertPosition, 0, timeslice);
      }

      this.lastUpdate++;
      return true;
    }
  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(timestamp) {
      if (this.bufferType === OFFSET) {
        var _this$options = this.options,
            startOffset = _this$options.startOffset,
            endOffset = _this$options.endOffset;
        this.bufferStart = timestamp + startOffset;
        this.bufferEnd = timestamp + endOffset;

        this._pruneBuffer();
      }
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.lastUpdate;
    }
  }, {
    key: "hasBuffer",
    value: function hasBuffer(fromTime, toTime) {
      if (!this.timeslices.length) {
        return true;
      }

      var _this$getLoadedTimeRa = this.getLoadedTimeRange(),
          start = _this$getLoadedTimeRa.start,
          end = _this$getLoadedTimeRa.end;

      return fromTime >= start && toTime <= end;
    }
  }, {
    key: "isInBufferRange",
    value: function isInBufferRange(timestamp) {
      var bufferStart = this.bufferStart,
          bufferEnd = this.bufferEnd,
          bufferType = this.bufferType;

      if (bufferType !== UNLIMITED && Number.isFinite(bufferStart)) {
        return timestamp >= bufferStart && timestamp <= bufferEnd;
      }

      return true;
    }
  }, {
    key: "_pruneBuffer",
    value: function _pruneBuffer() {
      var timeslices = this.timeslices,
          streams = this.streams,
          videos = this.videos;

      if (timeslices.length) {
        var startIndex = this._indexOf(this.bufferStart, LEFT);

        var endIndex = this._indexOf(this.bufferEnd, RIGHT);

        _xvizObject["default"].prune(this.bufferStart, this.bufferEnd);

        var trimStart = startIndex > 0;
        var trimEnd = endIndex < timeslices.length;

        if (trimStart || trimEnd) {
          trimEnd && timeslices.splice(endIndex);
          trimStart && timeslices.splice(0, startIndex);

          for (var streamName in streams) {
            var stream = streams[streamName];
            trimEnd && stream.splice(endIndex);
            trimStart && stream.splice(0, startIndex);
          }

          for (var _streamName2 in videos) {
            var _stream = videos[_streamName2];
            trimEnd && _stream.splice(endIndex);
            trimStart && _stream.splice(0, startIndex);
          }

          this.lastUpdate++;
        }
      }
    }
  }, {
    key: "_insertPersistentSlice",
    value: function _insertPersistentSlice(persistentSlice) {
      var persistent = this.persistent,
          persistentStreams = this.persistentStreams;
      var timestamp = persistentSlice.timestamp,
          streams = persistentSlice.streams,
          links = persistentSlice.links;
      var index = (0, _search.findInsertPos)(persistent, timestamp, LEFT);
      var timesliceAtInsertPosition = persistent[index];

      if (timesliceAtInsertPosition && timesliceAtInsertPosition.timestamp === timestamp) {
        Object.assign(timesliceAtInsertPosition, persistentSlice, {
          streams: Object.assign(timesliceAtInsertPosition.streams, streams),
          links: Object.assign(timesliceAtInsertPosition.links, links)
        });
      } else {
        persistent.splice(index, 0, persistentSlice);
      }

      for (var streamName in streams) {
        if (!(streamName in persistentStreams)) {
          persistentStreams[streamName] = true;
          this.streamCount++;
        }
      }
    }
  }, {
    key: "_mergeTimesliceAt",
    value: function _mergeTimesliceAt(index, timeslice) {
      var timeslices = this.timeslices,
          streams = this.streams,
          videos = this.videos;
      var timesliceAtInsertPosition = timeslices[index];
      Object.assign(timesliceAtInsertPosition, timeslice, {
        streams: Object.assign(timesliceAtInsertPosition.streams, timeslice.streams),
        links: Object.assign(timesliceAtInsertPosition.links, timeslice.links),
        videos: Object.assign(timesliceAtInsertPosition.videos, timeslice.videos)
      });

      for (var streamName in timeslice.streams) {
        var value = timeslice.streams[streamName];
        streams[streamName][index] = value;
      }

      for (var _streamName3 in timeslice.videos) {
        videos[_streamName3][index] = timeslice.videos[_streamName3];
      }
    }
  }, {
    key: "_insertTimesliceAt",
    value: function _insertTimesliceAt(index, deleteCount, timeslice) {
      var timeslices = this.timeslices,
          streams = this.streams,
          videos = this.videos;
      timeslices.splice(index, deleteCount, timeslice);

      for (var streamName in streams) {
        streams[streamName].splice(index, deleteCount, timeslice.streams[streamName]);
      }

      for (var _streamName4 in videos) {
        videos[_streamName4].splice(index, deleteCount, timeslice.videos[_streamName4]);
      }
    }
  }, {
    key: "_indexOf",
    value: function _indexOf(timestamp) {
      var insertPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LEFT;
      var timeslices = this.timeslices;
      return (0, _search.findInsertPos)(timeslices, timestamp, insertPosition);
    }
  }, {
    key: "size",
    get: function get() {
      return this.timeslices.length + this.persistent.length;
    }
  }]);
  return XVIZStreamBuffer;
}();

exports["default"] = XVIZStreamBuffer;
//# sourceMappingURL=xviz-stream-buffer.js.map