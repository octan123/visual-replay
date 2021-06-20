import { XVIZData, XVIZEnvelope } from '@xviz/io';
import { XVIZMetadataBuilder } from '@xviz/builder';
import { ROSBag } from '../core/ros-bag';
import { ROSConfig } from '../core/ros-config';

class MessageIterator {
  constructor(start, end, increment = 1) {
    this.start = start;
    this.end = end;
    this.increment = increment;
    this.current = start;
  }

  valid() {
    return this.current <= this.end;
  }

  value() {
    return this.current;
  }

  next() {
    const valid = this.valid();

    if (!valid) {
      return {
        valid
      };
    }

    const val = this.current;
    this.current += this.increment;
    return {
      valid,
      data: {
        start: val,
        end: this.current
      }
    };
  }

}

export class ROSBagProvider {
  constructor({
    root,
    options
  }) {
    this.bagPath = root.endsWith('.bag') ? root : "".concat(root, ".bag");
    this.BagClass = options && options.BagClass || ROSBag;
    this.ros2xvizFactory = options && options.ros2xvizFactory;
    this.rosConfig = options && options.rosConfig && new ROSConfig(options.rosConfig);
    this.options = options || {};
    this.metadata = null;
    this.ros2xviz = null;
    this.isValid = false;

    if (!this.ros2xvizFactory) {
      throw new Error('The ROSBagProvider requires a ROS2XVIZFactory instance');
    }
  }

  log(msg) {
    const {
      logger
    } = this.options;

    if (logger && logger.info) {
      logger.info(msg);
    }
  }

  async init() {
    try {
      this.ros2xviz = this.ros2xvizFactory.create(this.rosConfig, this.options);
      this.bag = new this.BagClass(this.bagPath, this.rosConfig, this.options);

      if (this.bag) {
        this.isValid = await this.bag.init(this.ros2xviz);

        if (this.isValid) {
          this._getMetadata();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  valid() {
    return this.isValid;
  }

  _getMetadata() {
    if (this.valid) {
      const xvizMetadataBuilder = new XVIZMetadataBuilder();
      this.bag.getMetadata(xvizMetadataBuilder, this.ros2xviz);
      const rawMetadata = xvizMetadataBuilder.getMetadata();
      this.metadata = XVIZEnvelope.Metadata(rawMetadata);
    }
  }

  xvizMetadata() {
    if (!this.metadata) {
      this._getMetadata();
    }

    if (this.metadata) {
      return new XVIZData(this.metadata);
    }

    return null;
  }

  getMessageIterator({
    startTime,
    endTime
  } = {}) {
    let {
      start_time: start,
      end_time: end
    } = this.metadata.data.log_info;

    if (startTime) {
      if (startTime >= start && startTime <= end) {
        start = startTime;
      }
    }

    if (endTime) {
      if (endTime >= start && endTime <= end) {
        end = endTime;
      } else {
        end = start + 30;
      }
    }

    return new MessageIterator(start, end, 0.1);
  }

  async xvizMessage(iterator) {
    const {
      valid,
      data: {
        start,
        end
      }
    } = iterator.next();

    if (!valid) {
      return null;
    }

    const dataset = await this.bag.readMessages(start, end);
    const msg = await this.ros2xviz.buildMessage(dataset);

    if (msg) {
      return new XVIZData(XVIZEnvelope.StateUpdate(msg));
    }

    return null;
  }

}
//# sourceMappingURL=rosbag-provider.js.map