import Converter from './converter';
import _ from 'lodash';
import { loadProcessedLidarData } from './lib/parse-lidar-points';
export class SensorPointCloud2 extends Converter {
  constructor(config) {
    super(config);
    this.previousData = {};
  }

  static get name() {
    return 'SensorPointCloud2';
  }

  static get messageType() {
    return 'sensor_msgs/PointCloud2';
  }

  async convertMessage(frame, xvizBuilder) {
    this._buildPoints(frame, xvizBuilder, {
      topic: this.topic,
      color: '#00ff00aa'
    });
  }

  _buildPoints(frame, xvizBuilder, {
    color,
    topic
  }) {
    let data = frame[topic];

    if (!data) {
      data = this.previousData[topic];

      if (!data) {
        return;
      }
    }

    this.previousData[topic] = data;

    for (const {
      message
    } of data) {
      const pointsSize = message.data.length / (message.height * message.width);
      const {
        positions
      } = loadProcessedLidarData(message.data, pointsSize);
      xvizBuilder.primitive(this.xvizStream).points(positions).style({
        fill_color: color
      });
    }
  }

  getMetadata(xvizMetaBuilder, context) {
    const {
      frameIdToPoseMap
    } = context;
    const streamMetadata = xvizMetaBuilder.stream(this.xvizStream).category('primitive').type('point').streamStyle({
      fill_color: '#00a',
      radiusPixels: 3
    });
    const frameId = this.config.frameId || 'velodyne';
    const pose = (frameIdToPoseMap || {})[frameId];

    if (pose) {
      streamMetadata.pose(_.pick(pose, ['x', 'y', 'z']), _.pick(pose, ['pitch', 'roll', 'yaw'])).coordinate('VEHICLE_RELATIVE');
    }
  }

}
//# sourceMappingURL=sensor-pointcloud2-converter.js.map