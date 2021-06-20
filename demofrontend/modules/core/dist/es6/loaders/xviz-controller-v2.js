import assert from 'assert';
export default class XVIZControllerV2 {
  constructor(socket) {
    assert(socket, 'XVIZ socket');
    this.socket = socket;
    this.transformCounter = 0;
  }

  _send(type, message) {
    const msg = {
      type: "xviz/".concat(type),
      data: message
    };
    this.socket.send(JSON.stringify(msg));
  }

  transformLog({
    startTimestamp,
    endTimestamp
  } = {}) {
    const msg = {};

    if (startTimestamp) {
      msg.start_timestamp = startTimestamp;
    }

    if (endTimestamp) {
      msg.end_timestamp = endTimestamp;
    }

    msg.id = "".concat(this.transformCounter);
    this.transformCounter++;

    this._send('transform_log', msg);
  }

}
//# sourceMappingURL=xviz-controller-v2.js.map