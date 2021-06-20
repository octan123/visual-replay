export default class Converter {
  constructor(config) {
    this.config = config;

    this._setup();
  }

  _setup() {
    if (!this.config.topic) {
      throw new Error('ROS Message converter must have a topic to convert');
    }

    if (!this.config.xvizStream) {
      this.config.xvizStream = this.config.topic;
    }
  }

  get topic() {
    return this.config.topic;
  }

  get xvizStream() {
    return this.config.xvizStream;
  }

  async convertMessage(frame, xvizBuilder) {
    throw new Error('Implement me');
  }

  getMetadata(xvizMetaBuilder, aux) {
    throw new Error('Implement me');
  }

}
//# sourceMappingURL=converter.js.map