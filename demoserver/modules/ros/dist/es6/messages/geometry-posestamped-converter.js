import Converter from './converter';
import { quaternionToEuler } from '../common/quaternion';
import { TimeUtil } from 'rosbag';
export class GeometryPoseStamped extends Converter {
  constructor(config) {
    super(config);
  }

  static get name() {
    return 'GeometryPoseStamped';
  }

  static get messageType() {
    return 'geometry_msgs/PoseStamped';
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
    const rotation = quaternionToEuler(message.pose.orientation);
    const {
      position
    } = message.pose;
    const poseBuilder = xvizBuilder.pose(this.xvizStream).position(position.x, position.y, 0).orientation(rotation.roll, rotation.pitch, rotation.yaw).timestamp(TimeUtil.toDate(timestamp).getTime() / 1e3);

    if (this.config.origin) {
      const {
        origin
      } = this.config;
      poseBuilder.mapOrigin(origin.longitude, origin.latitude, origin.altitude);
    }
  }

  getMetadata(xvizMetaBuilder) {
    xvizMetaBuilder.stream(this.xvizStream).category('pose');
  }

}
//# sourceMappingURL=geometry-posestamped-converter.js.map