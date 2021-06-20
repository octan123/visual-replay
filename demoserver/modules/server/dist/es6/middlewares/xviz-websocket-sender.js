import { XVIZ_FORMAT, XVIZFormatWriter } from '@xviz/io';
export class WebsocketSink {
  constructor(socket, options) {
    this.socket = socket;
    this.options = options;
  }

  writeSync(name, data) {
    let {
      compress = false
    } = this.options;

    if (typeof data === 'string') {
      compress = true;
    }

    this.socket.send(data, {
      compress
    });
  }

}
export class XVIZWebsocketSender {
  constructor(context, socket, options = {}) {
    this.context = context;
    this.socket = socket;
    this.sink = new WebsocketSink(socket, options);
    this.options = options;
    this.format = options.format;

    if (this.format === XVIZ_FORMAT.OBJECT) {
      this.format = XVIZ_FORMAT.BINARY_GLB;
    }

    this.writer = null;
    this.writerFormat = null;

    this._syncFormatWithWriter(this.format);
  }

  log(...msg) {
    const {
      logger
    } = this.options;
    logger.log(...msg);
  }

  _syncFormatWithWriter(format) {
    if (format && (!this.writer || this.writerFormat !== format)) {
      this.writer = new XVIZFormatWriter(this.sink, {
        format
      });
      this.writerFormat = format;
    }
  }

  _sendDataDirect(format, resp) {
    const sourceFormat = resp.format;

    if (format === sourceFormat && !resp.hasMessage()) {
      return true;
    }

    return false;
  }

  _getFormatOptions(msg) {
    if (!this.format) {
      if (msg.format === XVIZ_FORMAT.OBJECT || !msg.hasMessage() && typeof msg.buffer !== 'string' && !msg.buffer.byteLength) {
        return XVIZ_FORMAT.BINARY_GLB;
      }

      return msg.format;
    }

    return this.format;
  }

  onError(msg) {
    const response = JSON.stringify(msg.buffer);
    this.sink.writeSync('error', response);
  }

  onMetadata(msg) {
    const format = this._getFormatOptions(msg);

    if (this._sendDataDirect(format, msg)) {
      this.sink.writeSync("1-frame", msg.buffer);
    } else {
      this._syncFormatWithWriter(format);

      this.writer.writeMetadata(msg);
    }
  }

  onStateUpdate(msg) {
    const format = this._getFormatOptions(msg);

    if (this._sendDataDirect(format, msg)) {
      this.sink.writeSync('2-frame', msg.buffer);
    } else {
      this._syncFormatWithWriter(format);

      this.writer.writeMessage(0, msg);
    }
  }

  onTransformLogDone(msg) {
    const response = JSON.stringify(msg.buffer);
    this.sink.writeSync('done', response);
  }

}
//# sourceMappingURL=xviz-websocket-sender.js.map