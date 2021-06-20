export class ROSConfig {
  constructor(rosConfig = {}) {
    this.rosConfig = rosConfig;
    this._topics = null;
    this._needsTopicTypes = false;

    this._gatherTopics();
  }

  _gatherTopics() {
    const {
      rosConfig
    } = this;

    if (rosConfig && rosConfig.topicConfig) {
      this._topics = new Set();

      for (const {
        topic,
        type,
        converter
      } of rosConfig.topicConfig) {
        const typeSet = type !== '' && type !== undefined && type !== null;
        const converterSet = converter !== '' && converter !== undefined && converter !== null;

        if (!typeSet && !converterSet) {
          this._needsTopicTypes = true;
        }

        this._topics.add(topic);
      }
    } else {
      this._needsTopicTypes = true;
    }
  }

  get topics() {
    if (this._topics) {
      return Array.from(this._topics.values());
    }

    return null;
  }

  get topicConfig() {
    return this.rosConfig.topicConfig;
  }

  get entryCount() {
    if (this.rosConfig.topicConfig) {
      return this.rosConfig.topicConfig.length;
    }

    return 0;
  }

  needsTopicTypes() {
    return this._needsTopicTypes;
  }

}
//# sourceMappingURL=ros-config.js.map