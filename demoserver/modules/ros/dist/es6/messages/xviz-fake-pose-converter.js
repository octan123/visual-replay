import Converter from './converter';
import { TimeUtil } from 'rosbag';
export class XVIZFakePose extends Converter {
  constructor(config) {
    super(config);
  }

  static get name() {
    return 'XVIZFakePose';
  }

  static get messageType() {
    return 'xviz_msgs/FakePose';
  }

  async convertMessage(frame, xvizBuilder) {
    const position = this.config.position || [0, 0, 0];
    const msg = frame[this.topic];

    if (!msg) {
      return;
    }

    const {
      timestamp
    } = msg[msg.length - 1];
    xvizBuilder.pose(this.xvizStream).position(...position).timestamp(TimeUtil.toDate(timestamp).getTime() / 1e3);
  }

  getMetadata(xvizMetaBuilder) {
    xvizMetaBuilder.stream(this.xvizStream).category('pose');
  }

}
//# sourceMappingURL=xviz-fake-pose-converter.js.map