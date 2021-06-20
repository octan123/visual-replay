import Converter from './converter';
import { quaternionToEuler } from '../common/quaternion';
import { TimeUtil } from 'rosbag';
export class SensorNavSatFix extends Converter {
  constructor(config) {
    super(config);
  }

  static get name() {
    return 'SensorNavSatFix';
  }

  static get messageType() {
    return 'sensor_msgs/NavSatFix';
  }

  _getOrientationFromIMU(frame, xvizBuilder) {
    if (!this.config.imuTopic) {
      return null;
    }

    const msg = frame[this.config.imuTopic];

    if (!msg) {
      return null;
    }

    const {
      message
    } = msg[msg.length - 1];
    const rotation = quaternionToEuler(message.orientation);
    return {
      rotation
    };
  }

  async convertMessage(frame, xvizBuilder) {
    const msg = frame[this.topic];

    if (!msg) {
      return;
    }

    const {
      timestamp,
      message
    } = msg[msg.length - 1];

    const state = this._getOrientationFromIMU(frame, xvizBuilder);

    const ts = TimeUtil.toDate(timestamp).getTime() / 1e3;
    const poseBuilder = xvizBuilder.pose(this.xvizStream).mapOrigin(message.longitude, message.latitude, message.altitude).timestamp(ts).position(0, 0, 0);

    if (state && state.rotation) {
      const {
        rotation
      } = state;
      poseBuilder.orientation(rotation.roll, rotation.pitch, rotation.yaw);
    }
  }

  getMetadata(xvizMetaBuilder, context) {
    xvizMetaBuilder.stream(this.xvizStream).category('pose');
  }

}
//# sourceMappingURL=sensor-navsatfix-converter.js.map