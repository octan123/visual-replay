import Converter from './converter';
export class SensorCompressedImage extends Converter {
  constructor(config) {
    super(config);
  }

  static get name() {
    return 'SensorCompressedImage';
  }

  static get messageType() {
    return 'sensor_msgs/CompressedImage';
  }

  async convertMessage(frame, xvizBuilder) {
    const msgs = frame[this.topic];

    if (!msgs) {
      return;
    }

    if (msgs.length) {
      const {
        message
      } = msgs[msgs.length - 1];
      const {
        format,
        data
      } = message;
      xvizBuilder.primitive(this.xvizStream).image(nodeBufferToTypedArray(data), format);
    }
  }

  getMetadata(xvizMetaBuilder) {
    const xb = xvizMetaBuilder;
    xb.stream(this.xvizStream).category('primitive').type('image');
  }

}

function nodeBufferToTypedArray(buffer) {
  const typedArray = new Uint8Array(buffer);
  return typedArray;
}
//# sourceMappingURL=sensor-compressedimage-converter.js.map