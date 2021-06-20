import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
export var DumpMode = Object.freeze({
  ONELINE: 0,
  CONDENSED: 1,
  ALL: 2
});
export var DumpXVIZ = function () {
  function DumpXVIZ() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, DumpXVIZ);

    this.mode = options.mode === undefined ? DumpMode.ALL : options.mode;
    this.log = options.log || console.log;
  }

  _createClass(DumpXVIZ, [{
    key: "onConnect",
    value: function onConnect() {
      this.log('[CONNECTED]');
    }
  }, {
    key: "onStart",
    value: function onStart(msg) {
      var oneline = function oneline() {
        if (msg) {
          return "log: ".concat(msg.log);
        }

        return '';
      };

      this._dumpSent('start', msg, oneline);
    }
  }, {
    key: "onError",
    value: function onError(msg) {
      var oneline = function oneline() {
        return "msg: ".concat(msg.message);
      };

      this._dumpReceived('error', msg, oneline);
    }
  }, {
    key: "onMetadata",
    value: function onMetadata(msg) {
      var oneline = function oneline() {
        var verStr = msg.version || 'Unknown';
        return "version: ".concat(verStr);
      };

      this._dumpReceived('metadata', msg, oneline);
    }
  }, {
    key: "onTransformLog",
    value: function onTransformLog(msg) {
      var oneline = function oneline() {
        var startStr = msg.start_timestamp || 'LOG-START';
        var endStr = msg.end_timestamp || 'LOG-END';
        return "".concat(startStr, " - ").concat(endStr, " (tid: ").concat(msg.id, ")");
      };

      this._dumpSent('transform_log', msg, oneline);
    }
  }, {
    key: "onStateUpdate",
    value: function onStateUpdate(msg) {
      var oneline = function oneline() {
        var updates = msg.updates;

        if (updates && updates.length > 0) {
          var startTime = updates[0].timestamp;

          if (updates.length === 1) {
            return "time: ".concat(startTime);
          }

          var endTime = updates[updates.length - 1].timestamp;
          return "time: ".concat(startTime, " - ").concat(endTime, " (").concat(endTime - startTime, ")");
        }

        return 'empty';
      };

      this._dumpReceived('state_update', msg, oneline);
    }
  }, {
    key: "onTransformLogDone",
    value: function onTransformLogDone(msg) {
      var oneline = function oneline() {
        return "tid: ".concat(msg.id);
      };

      this._dumpReceived('transform_log_done', msg, oneline);
    }
  }, {
    key: "onClose",
    value: function onClose() {
      this.log('[CONNECTION CLOSED]');
    }
  }, {
    key: "_dumpSent",
    value: function _dumpSent(type, data, condensed, oneline) {
      this._dump('<', type, data, condensed, oneline);
    }
  }, {
    key: "_dumpReceived",
    value: function _dumpReceived(type, data, condensed, oneline) {
      this._dump('>', type, data, condensed, oneline);
    }
  }, {
    key: "_dump",
    value: function _dump(prefix, type, data, condensed, oneline) {
      var header = "[".concat(prefix, " ").concat(type.toUpperCase(), "]");

      switch (this.mode) {
        case DumpMode.ALL:
          this.log("".concat(header, "\n").concat(JSON.stringify(data, null, 4)));
          break;

        case DumpMode.CONDENSED:
          this.log("".concat(header, " ").concat(condensed()));
          break;

        case DumpMode.ONELINE:
          var output = oneline || condensed;
          this.log("".concat(header, " ").concat(output()));
          break;

        default:
          throw new Error("Unknown dump mode ".concat(this.mode));
      }
    }
  }]);

  return DumpXVIZ;
}();
//# sourceMappingURL=dump.js.map