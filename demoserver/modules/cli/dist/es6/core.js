export class TransformLogFlow {
  constructor(client, options = {}) {
    this.client = client;
    this.options = options;
    this.id = 'f8b38a41-59fa-44b9-9311-cd612886bb37';
    this.sent = false;
  }

  onMetadata(msg) {
    if (!this.sent && !this.options.metadata) {
      const outMsg = {
        id: this.id
      };

      if (this.options.start) {
        outMsg.start_timestamp = this.options.start;
      }

      if (this.options.end) {
        outMsg.end_timestamp = this.options.end;
      }

      this.client.sendMessage('transform_log', outMsg);
      this.sent = true;
    }
  }

  onTransformLogDone(msg) {
    this.client.close();
  }

}
export class OnlyMetadata {
  constructor(client) {
    this.client = client;
  }

  onMetadata(msg) {
    this.client.close();
  }

}
//# sourceMappingURL=core.js.map