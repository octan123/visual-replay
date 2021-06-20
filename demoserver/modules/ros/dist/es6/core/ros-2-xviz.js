import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { XVIZBuilder } from '@xviz/builder';
export class ROS2XVIZConverter {
  constructor(converters, rosConfig, options = {}) {
    this.options = options;
    this.converters = converters;
    this.rosConfig = rosConfig;
    this.instances = [];
  }

  verbose(msg) {
    const {
      logger
    } = this.options;

    if (logger && logger.verbose) {
      logger.verbose(msg);
    }
  }

  _makeConvertersForTopic(entry, topicMessageTypes, aux) {
    const {
      topic,
      type,
      converter,
      config
    } = entry;
    const {
      converters
    } = this;
    let ConverterClass = null;

    if (converter) {
      this.verbose("ROS2XVIZConverter setting up converter by name for '".concat(topic, "'"));
      ConverterClass = converters.find(conv => conv.name === converter);

      if (!ConverterClass) {
        this.verbose("ROS2XVIZConverter cannot find the converter with name '".concat(converter, "' for topic '").concat(topic, "'"));
      }
    } else {
      const msgType = type || topicMessageTypes[topic];

      if (!msgType) {
        this.verbose("ROS2XVIZConverter does not have a type for the '".concat(topic, "', skipping"));
      } else {
        this.verbose("ROS2XVIZConverter setting up converter by type '".concat(msgType, "' for '").concat(topic, "'"));
        ConverterClass = converters.find(conv => conv.messageType === msgType);

        if (!ConverterClass) {
          this.verbose("ROS2XVIZConverter cannot find the converter for message type '".concat(msgType, "' for topic '").concat(topic, "'"));
        }
      }
    }

    if (ConverterClass) {
      const converterConfig = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, this.options), aux), config), {}, {
        topic
      });

      this.instances.push(new ConverterClass(converterConfig));
    }
  }

  initializeConverters(topicMessageTypes, aux) {
    const {
      rosConfig
    } = this;
    const count = rosConfig.entryCount;

    if (count > 0) {
      for (const entry of rosConfig.topicConfig) {
        this._makeConvertersForTopic(entry, topicMessageTypes, aux);
      }
    } else {
      for (const key in topicMessageTypes) {
        this._makeConvertersForTopic({
          topic: key,
          type: topicMessageTypes[key]
        }, topicMessageTypes, aux);
      }
    }

    if (this.instances.length === 0) {
      throw new Error('No converters where created. Check that the configuration is correct and the Converter classes are properly registered.');
    }
  }

  buildMetadata(metadataBuilder, aux) {
    for (const instance of this.instances) {
      instance.getMetadata(metadataBuilder, aux);
    }

    this.metadata = metadataBuilder.getMetadata();
  }

  async buildMessage(frame) {
    const xvizBuilder = new XVIZBuilder(this.metadata, this.disableStreams, {});

    for (const instance of this.instances) {
      await instance.convertMessage(frame, xvizBuilder);
    }

    try {
      const frm = xvizBuilder.getMessage();
      return frm;
    } catch (err) {
      return null;
    }
  }

}
//# sourceMappingURL=ros-2-xviz.js.map