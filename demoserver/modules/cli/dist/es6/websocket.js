import { isEnvelope, unpackEnvelope, parseBinaryXVIZ, isBinaryXVIZ } from '@xviz/io';
export class WebSocketInterface {
  constructor(options = {}) {
    this.middleware = options.middleware;
    this.start = options.start;
    this.socket = options.socket;
    this.unknownMessageTypes = new Set([]);

    this.socket.onerror = error => {
      console.log('WebSocket Error: ', error);
    };

    this.socket.onclose = () => {
      this.onClose();
    };

    this.socket.onopen = () => {
      this.onConnect();
    };

    this.socket.onmessage = message => {
      this.onMessage(message);
    };
  }

  close() {
    this.socket.close();
  }

  onConnect() {
    this.middleware.onConnect();

    if (this.start) {
      this.sendMessage('start', this.start);
    } else {
      this.middleware.onStart(null);
    }
  }

  onError(error) {
    console.log('Connection Error: ', error.toString());
  }

  onClose(message) {
    this.middleware.onClose();
  }

  onMessage(message) {
    if (typeof message.data !== 'string') {
      if (isBinaryXVIZ(message.data)) {
        const parsed = parseBinaryXVIZ(message.data);
        this.processMessage(parsed);
      } else {
        const utf8decoder = new TextDecoder();
        const parsed = JSON.parse(utf8decoder.decode(message.data));
        this.processMessage(parsed);
      }
    } else {
      const parsed = JSON.parse(message.data);
      this.processMessage(parsed);
    }
  }

  processMessage(parsed) {
    if (isEnvelope(parsed)) {
      const unpacked = unpackEnvelope(parsed);

      if (unpacked.namespace === 'xviz') {
        this.callMiddleware(unpacked.type, unpacked.data);
      } else if (!this.unknownMessageTypes.has(parsed.type)) {
        this.unknownMessageTypes.add(parsed.type);
        console.log("Unknown message namespace: \"".concat(unpacked.namespace, "\" type: \"").concat(unpacked.type, "\""));
      }
    } else {
      console.log('Unknown message format', parsed);
    }
  }

  sendMessage(msgType, data) {
    this.callMiddleware(msgType, data);
    const enveloped = {
      type: "xviz/".concat(msgType),
      data
    };
    this.socket.send(JSON.stringify(enveloped));
  }

  callMiddleware(xvizType, data) {
    switch (xvizType) {
      case 'start':
        this.middleware.onStart(data);
        break;

      case 'error':
        this.middleware.onError(data);
        break;

      case 'metadata':
        this.middleware.onMetadata(data);
        break;

      case 'transform_log':
        this.middleware.onTransformLog(data);
        break;

      case 'state_update':
        this.middleware.onStateUpdate(data);
        break;

      case 'transform_log_done':
        this.middleware.onTransformLogDone(data);
        break;

      default:
        console.log('UNKNOWN XVIZ', xvizType, data);
        break;
    }
  }

}
//# sourceMappingURL=websocket.js.map