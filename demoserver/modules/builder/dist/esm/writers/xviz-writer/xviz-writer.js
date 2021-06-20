import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { writeBinaryXVIZtoFile } from './xviz-binary-writer';
import { xvizConvertJson } from './xviz-json-encoder.js';
import { XVIZEnvelope } from '@xviz/io';

var frameName = function frameName(index) {
  return "".concat(index + 2, "-frame");
};

var FileSink = function () {
  function FileSink() {
    _classCallCheck(this, FileSink);

    this.fs = module.require('fs');
    this.path = module.require('path');
  }

  _createClass(FileSink, [{
    key: "writeSync",
    value: function writeSync(scope, name, data) {
      var xvizMetadataFilename = this.path.join(scope, name);
      var options = {
        flag: 'w'
      };
      this.fs.writeFileSync(xvizMetadataFilename, data, options);
    }
  }]);

  return FileSink;
}();

var XVIZWriter = function () {
  function XVIZWriter() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, XVIZWriter);

    var _options$dataSink = options.dataSink,
        dataSink = _options$dataSink === void 0 ? new FileSink() : _options$dataSink,
        _options$envelope = options.envelope,
        envelope = _options$envelope === void 0 ? true : _options$envelope,
        _options$binary = options.binary,
        binary = _options$binary === void 0 ? true : _options$binary,
        _options$json = options.json,
        json = _options$json === void 0 ? false : _options$json,
        DracoWriter = options.DracoWriter,
        DracoLoader = options.DracoLoader;
    this.sink = dataSink;
    this.frameTimings = {
      frames: new Map()
    };
    this.wroteFrameIndex = null;
    this.options = {
      envelope: envelope,
      binary: binary,
      json: json,
      DracoWriter: DracoWriter,
      DracoLoader: DracoLoader
    };
  }

  _createClass(XVIZWriter, [{
    key: "writeMetadata",
    value: function writeMetadata(xvizDirectory, xvizMetadata) {
      this._saveTimestamp(xvizMetadata);

      if (this.options.envelope) {
        xvizMetadata = XVIZEnvelope.Metadata(xvizMetadata);
      }

      if (this.options.binary) {
        var options = {
          flattenArrays: true
        };
        writeBinaryXVIZtoFile(this.sink, xvizDirectory, '1-frame', xvizMetadata, options);
      }

      if (this.options.json) {
        this.sink.writeSync(xvizDirectory, '1-frame.json', JSON.stringify(xvizMetadata));
      }
    }
  }, {
    key: "writeFrame",
    value: function writeFrame(xvizDirectory, frameIndex, xvizFrame) {
      if (this.wroteFrameIndex !== null) {
        throw new Error("writeFrame() was called after writeFrameIndex().  The index was written with last frame of ".concat(frameName(this.wroteFrameIndex - 1)));
      }

      this._saveTimestamp(xvizFrame, frameIndex);

      if (this.options.envelope) {
        xvizFrame = XVIZEnvelope.StateUpdate(xvizFrame);
      }

      if (this.options.binary) {
        var options = {
          flattenArrays: true
        };

        if (this.options.DracoWriter) {
          options.DracoWriter = this.options.DracoWriter;
        }

        if (this.options.DracoLoader) {
          options.DracoLoader = this.options.DracoLoader;
        }

        writeBinaryXVIZtoFile(this.sink, xvizDirectory, frameName(frameIndex), xvizFrame, options);
      }

      if (this.options.json) {
        var numberRounder = function numberRounder(k, value) {
          if (typeof value === 'number') {
            return Number(value.toFixed(10));
          }

          return value;
        };

        var jsonXVIZFrame = xvizConvertJson(xvizFrame);
        this.sink.writeSync(xvizDirectory, "".concat(frameName(frameIndex), ".json"), JSON.stringify(jsonXVIZFrame, numberRounder));
      }
    }
  }, {
    key: "writeFrameIndex",
    value: function writeFrameIndex(xvizDirectory) {
      var _this$frameTimings = this.frameTimings,
          startTime = _this$frameTimings.startTime,
          endTime = _this$frameTimings.endTime,
          frames = _this$frameTimings.frames;
      var frameTimings = {};

      if (startTime) {
        frameTimings.startTime = startTime;
      }

      if (endTime) {
        frameTimings.endTime = endTime;
      }

      var frameTimes = Array.from(frames.keys()).sort(function (a, b) {
        return a - b;
      });
      var timing = [];
      frameTimes.forEach(function (value, index) {
        var limit = timing.length;

        if (value > limit) {
          throw new Error("Error writing time index file. Frames are missing between ".concat(limit + 2, " and ").concat(value + 2));
        }

        timing.push(frames.get(value));
      });
      frameTimings.timing = timing;
      this.sink.writeSync(xvizDirectory, '0-frame.json', JSON.stringify(frameTimings));
      this.wroteFrameIndex = timing.length;
    }
  }, {
    key: "_saveTimestamp",
    value: function _saveTimestamp(xviz_data, index) {
      var log_info = xviz_data.log_info,
          updates = xviz_data.updates;

      if (index === undefined) {
        if (log_info) {
          var _ref = log_info || {},
              start_time = _ref.start_time,
              end_time = _ref.end_time;

          if (start_time) {
            this.frameTimings.startTime = start_time;
          }

          if (end_time) {
            this.frameTimings.endTime = end_time;
          }
        }
      } else if (updates) {
        if (updates.length === 0 || !updates.every(function (update) {
          return typeof update.timestamp === 'number';
        })) {
          throw new Error('XVIZ updates did not contain a valid timestamp');
        }

        var min = Math.min(updates.map(function (update) {
          return update.timestamp;
        }));
        var max = Math.max(updates.map(function (update) {
          return update.timestamp;
        }));
        this.frameTimings.frames.set(index, [min, max, index, frameName(index)]);
      } else {
        throw new Error('Cannot find timestamp');
      }
    }
  }]);

  return XVIZWriter;
}();

export { XVIZWriter as default };
//# sourceMappingURL=xviz-writer.js.map