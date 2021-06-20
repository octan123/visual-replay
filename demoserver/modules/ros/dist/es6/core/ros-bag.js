import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { open, TimeUtil } from 'rosbag';
import { quaternionToEuler } from '../common/quaternion';
export class ROSBag {
  constructor(bagPath, rosConfig, options = {}) {
    this.bagPath = bagPath;
    this.rosConfig = rosConfig;
    this.options = options;
    this.bagContext = {};
    this.topicMessageTypes = {};
  }

  async init(ros2xviz) {
    const bag = await this._openBag();
    await this._initBag(bag);

    if (this.rosConfig.needsTopicTypes()) {
      this._gatherTopicsTypes(bag);
    }

    this._initTopics(ros2xviz);

    return true;
  }

  async _openBag() {
    return await open(this.bagPath);
  }

  async _initBag(bag) {
    const TF = '/tf';
    const TF_STATIC = '/tf_static';
    this.bagContext.start_time = TimeUtil.toDate(bag.startTime).getTime() / 1e3;
    this.bagContext.end_time = TimeUtil.toDate(bag.endTime).getTime() / 1e3;
    const frameIdToPoseMap = {};
    await bag.readMessages({
      topics: [TF, TF_STATIC]
    }, ({
      topic,
      message
    }) => {
      message.transforms.forEach(t => {
        frameIdToPoseMap[t.child_frame_id] = _objectSpread(_objectSpread({}, t.transform.translation), quaternionToEuler(t.transform.rotation));
      });
    });
    this.bagContext.frameIdToPoseMap = frameIdToPoseMap;
  }

  _gatherTopicsTypes(bag) {
    const topics = this.rosConfig.topics;

    for (const conn in bag.connections) {
      const {
        topic,
        type
      } = bag.connections[conn];

      if (!topics || topics.includes(topic)) {
        if (this.topicMessageTypes[topic] && this.topicMessageTypes[topic] !== type) {
          throw new Error("Unexpected change in topic type ".concat(topic, " has ").concat(this.topicMessageTypes[topic], " with new type ").concat(type));
        } else if (!this.topicMessageTypes[topic]) {
          this.topicMessageTypes[topic] = type;
        }
      }
    }
  }

  _initTopics(ros2xviz) {
    ros2xviz.initializeConverters(this.topicMessageTypes, this.bagContext);
  }

  getMetadata(metadataBuilder, ros2xviz) {
    ros2xviz.buildMetadata(metadataBuilder, this.bagContext);
    metadataBuilder.startTime(this.bagContext.start_time);
    metadataBuilder.endTime(this.bagContext.end_time);
  }

  async readMessages(start, end) {
    const bag = await this._openBag();
    const frame = {};
    const options = {
      topics: this.rosConfig.topics
    };

    if (start) {
      options.startTime = TimeUtil.fromDate(new Date(start * 1e3));
    }

    if (end) {
      options.endTime = TimeUtil.fromDate(new Date(end * 1e3));
    }

    await bag.readMessages(options, async result => {
      if (result.message.data) {
        result.message.data = Buffer.from(result.message.data);
      }

      frame[result.topic] = frame[result.topic] || [];
      frame[result.topic].push(result);
    });
    return frame;
  }

}
//# sourceMappingURL=ros-bag.js.map