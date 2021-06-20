"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _xvizConfig = require("../config/xviz-config");

var _parseXvizMessageSync = require("../parsers/parse-xviz-message-sync");

var _serialize = require("../parsers/serialize");

var _workerUtils = require("../utils/worker-utils");

var _constants = require("../constants");

var _default = function _default(config) {
  return function (self) {
    (0, _xvizConfig.setXVIZConfig)(config);

    function onResult(message) {
      var transfers = new Set();

      switch (message.type) {
        case _constants.XVIZ_MESSAGE_TYPE.TIMESLICE:
          for (var streamName in message.streams) {
            var stream = message.streams[streamName];

            if (stream) {
              (0, _workerUtils.getTransferList)(stream.pointCloud, true, transfers);
              (0, _workerUtils.getTransferList)(stream.vertices, false, transfers);

              if (stream.images && stream.images.length) {
                stream.images.forEach(function (image) {
                  return (0, _workerUtils.getTransferList)(image, true, transfers);
                });
              }
            }
          }

          break;

        case _constants.XVIZ_MESSAGE_TYPE.VIDEO_FRAME:
          (0, _workerUtils.getTransferList)(message.imageData, false, transfers);
          break;

        default:
      }

      message = (0, _serialize.preSerialize)(message);
      self.postMessage(message, Array.from(transfers));
    }

    function onError(error) {
      throw error;
    }

    self.onmessage = function (e) {
      if (e.data && e.data.xvizConfig) {
        (0, _xvizConfig.setXVIZConfig)(e.data.xvizConfig);
      } else if (e.data) {
        if (e.data.opts) {
          (0, _parseXvizMessageSync.parseXVIZMessageSync)(e.data.data, onResult, onError, e.data.opts);
        } else {
          (0, _parseXvizMessageSync.parseXVIZMessageSync)(e.data, onResult, onError);
        }
      }
    };
  };
};

exports["default"] = _default;
//# sourceMappingURL=stream-data-worker.js.map