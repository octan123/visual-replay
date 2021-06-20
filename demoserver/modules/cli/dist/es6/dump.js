export const DumpMode = Object.freeze({
  ONELINE: 0,
  CONDENSED: 1,
  ALL: 2
});
export class DumpXVIZ {
  constructor(options = {}) {
    this.mode = options.mode === undefined ? DumpMode.ALL : options.mode;
    this.log = options.log || console.log;
  }

  onConnect() {
    this.log('[CONNECTED]');
  }

  onStart(msg) {
    const oneline = () => {
      if (msg) {
        return "log: ".concat(msg.log);
      }

      return '';
    };

    this._dumpSent('start', msg, oneline);
  }

  onError(msg) {
    const oneline = () => {
      return "msg: ".concat(msg.message);
    };

    this._dumpReceived('error', msg, oneline);
  }

  onMetadata(msg) {
    const oneline = () => {
      const verStr = msg.version || 'Unknown';
      return "version: ".concat(verStr);
    };

    this._dumpReceived('metadata', msg, oneline);
  }

  onTransformLog(msg) {
    const oneline = () => {
      const startStr = msg.start_timestamp || 'LOG-START';
      const endStr = msg.end_timestamp || 'LOG-END';
      return "".concat(startStr, " - ").concat(endStr, " (tid: ").concat(msg.id, ")");
    };

    this._dumpSent('transform_log', msg, oneline);
  }

  onStateUpdate(msg) {
    const oneline = () => {
      const updates = msg.updates;

      if (updates && updates.length > 0) {
        const startTime = updates[0].timestamp;

        if (updates.length === 1) {
          return "time: ".concat(startTime);
        }

        const endTime = updates[updates.length - 1].timestamp;
        return "time: ".concat(startTime, " - ").concat(endTime, " (").concat(endTime - startTime, ")");
      }

      return 'empty';
    };

    this._dumpReceived('state_update', msg, oneline);
  }

  onTransformLogDone(msg) {
    const oneline = () => {
      return "tid: ".concat(msg.id);
    };

    this._dumpReceived('transform_log_done', msg, oneline);
  }

  onClose() {
    this.log('[CONNECTION CLOSED]');
  }

  _dumpSent(type, data, condensed, oneline) {
    this._dump('<', type, data, condensed, oneline);
  }

  _dumpReceived(type, data, condensed, oneline) {
    this._dump('>', type, data, condensed, oneline);
  }

  _dump(prefix, type, data, condensed, oneline) {
    const header = "[".concat(prefix, " ").concat(type.toUpperCase(), "]");

    switch (this.mode) {
      case DumpMode.ALL:
        this.log("".concat(header, "\n").concat(JSON.stringify(data, null, 4)));
        break;

      case DumpMode.CONDENSED:
        this.log("".concat(header, " ").concat(condensed()));
        break;

      case DumpMode.ONELINE:
        const output = oneline || condensed;
        this.log("".concat(header, " ").concat(output()));
        break;

      default:
        throw new Error("Unknown dump mode ".concat(this.mode));
    }
  }

}
//# sourceMappingURL=dump.js.map