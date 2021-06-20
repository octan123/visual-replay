import Converter from './converter';
import sharp from 'sharp';
export class SensorImage extends Converter {
  constructor(config) {
    super(config);
  }

  static get name() {
    return 'SensorImage';
  }

  static get messageType() {
    return 'sensor_msgs/Image';
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
        width,
        height,
        data
      } = message;
      const imgData = await sharp(data, {
        raw: {
          width,
          height,
          channels: 3
        }
      }).resize(400).toFormat('png').toBuffer();
      xvizBuilder.primitive(this.xvizStream).image(nodeBufferToTypedArray(imgData), 'png').dimensions(width, height);
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
//# sourceMappingURL=sensor-image-converter.js.map