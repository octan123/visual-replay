import { setXVIZConfig } from '../config/xviz-config';
import { parseXVIZStream } from '../parsers/parse-xviz-stream';
import { TextDecoder } from '../utils/text-encoding';
export default (config => self => {
  setXVIZConfig(config);

  self.onmessage = e => {
    const dataView = new DataView(e.data);
    const decoder = new TextDecoder('utf-8');
    const decodedString = decoder.decode(dataView);

    try {
      let data = JSON.parse(decodedString);
      data = parseXVIZStream(data);
      const transfers = [];
      data = data.map(({
        pointCloud,
        time
      }) => {
        if (pointCloud) {
          transfers.push(pointCloud.ids.buffer, pointCloud.colors.buffer, pointCloud.positions.buffer);
        }

        return {
          pointCloud,
          time
        };
      });
      self.postMessage(data, transfers);
      self.close();
    } catch (error) {
      throw new Error(error);
    }
  };
});
//# sourceMappingURL=lidar-point-cloud-worker.js.map