"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _xvizConfig = require("../config/xviz-config");

var _parseXvizStream = require("../parsers/parse-xviz-stream");

var _textEncoding = require("../utils/text-encoding");

var _default = function _default(config) {
  return function (self) {
    (0, _xvizConfig.setXVIZConfig)(config);

    self.onmessage = function (e) {
      var dataView = new DataView(e.data);
      var decoder = new _textEncoding.TextDecoder('utf-8');
      var decodedString = decoder.decode(dataView);

      try {
        var data = JSON.parse(decodedString);
        data = (0, _parseXvizStream.parseXVIZStream)(data);
        var transfers = [];
        data = data.map(function (_ref) {
          var pointCloud = _ref.pointCloud,
              time = _ref.time;

          if (pointCloud) {
            transfers.push(pointCloud.ids.buffer, pointCloud.colors.buffer, pointCloud.positions.buffer);
          }

          return {
            pointCloud: pointCloud,
            time: time
          };
        });
        self.postMessage(data, transfers);
        self.close();
      } catch (error) {
        throw new Error(error);
      }
    };
  };
};

exports["default"] = _default;
//# sourceMappingURL=lidar-point-cloud-worker.js.map