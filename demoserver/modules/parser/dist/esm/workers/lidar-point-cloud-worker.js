import { setXVIZConfig } from '../config/xviz-config';
import { parseXVIZStream } from '../parsers/parse-xviz-stream';
import { TextDecoder } from '../utils/text-encoding';
export default (function (config) {
  return function (self) {
    setXVIZConfig(config);

    self.onmessage = function (e) {
      var dataView = new DataView(e.data);
      var decoder = new TextDecoder('utf-8');
      var decodedString = decoder.decode(dataView);

      try {
        var data = JSON.parse(decodedString);
        data = parseXVIZStream(data);
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
});
//# sourceMappingURL=lidar-point-cloud-worker.js.map