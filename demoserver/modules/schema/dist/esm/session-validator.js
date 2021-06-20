import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { ValidationError, XVIZValidator } from './validator';
var SessionState = Object.freeze({
  DISCONNECTED: 'DISCONNECTED',
  CONNECTED: 'CONNECTED',
  LOG_SESSION_INITIALIZING: 'LOG_SESSION_INITIALIZING',
  LOG_SESSION_ACTIVE: 'LOG_SESSION_ACTIVE',
  TRANSFORMING_LOG: 'TRANSFORMING_LOG',
  LIVE_SESSION_INITIALIZING: 'LIVE_SESSION_INITIALIZING',
  LIVE_SESSION_ACTIVE: 'LIVE_SESSION_ACTIVE'
});
export var MessageTypes = Object.freeze({
  START: 'START',
  ERROR: 'ERROR',
  METADATA: 'METADATA',
  TRANSFORM_LOG: 'TRANSFORM_LOG',
  STATE_UPDATE: 'STATE_UPDATE',
  TRANSFORM_LOG_DONE: 'TRANSFORM_LOG_DONE'
});
var SchemaNames = Object.freeze({
  START: 'session/start',
  ERROR: 'session/error',
  METADATA: 'session/metadata',
  TRANSFORM_LOG: 'session/transform_log',
  STATE_UPDATE: 'session/state_update',
  TRANSFORM_LOG_DONE: 'session/transform_log_done'
});
var TransitionTable = Object.freeze({
  DISCONNECTED: {},
  CONNECTED: {
    START: function START(msg) {
      if (msg) {
        if (msg.session_type === 'LIVE') {
          return SessionState.LIVE_SESSION_INITIALIZING;
        }
      }

      return SessionState.LOG_SESSION_INITIALIZING;
    }
  },
  LOG_SESSION_INITIALIZING: {
    ERROR: SessionState.DISCONNECTED,
    METADATA: SessionState.LOG_SESSION_ACTIVE
  },
  LOG_SESSION_ACTIVE: {
    TRANSFORM_LOG: SessionState.TRANSFORMING_LOG
  },
  TRANSFORMING_LOG: {
    STATE_UPDATE: SessionState.TRANSFORMING_LOG,
    ERROR: SessionState.TRANSFORMING_LOG,
    TRANSFORM_LOG_DONE: SessionState.LOG_SESSION_ACTIVE
  },
  LIVE_SESSION_INITIALIZING: {
    ERROR: SessionState.DISCONNECTED,
    METADATA: SessionState.LIVE_SESSION_ACTIVE
  },
  LIVE_SESSION_ACTIVE: {
    STATE_UPDATE: SessionState.LIVE_SESSION_ACTIVE,
    ERROR: SessionState.LIVE_SESSION_ACTIVE
  }
});
export var XVIZSessionValidator = function () {
  function XVIZSessionValidator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      verbose: false
    };

    _classCallCheck(this, XVIZSessionValidator);

    this.options = options;
    this.msgValidator = new XVIZValidator();
    this.state = SessionState.DISCONNECTED;
    this.resetState();
  }

  _createClass(XVIZSessionValidator, [{
    key: "onConnect",
    value: function onConnect() {
      this.state = SessionState.CONNECTED;
      this.resetState();
    }
  }, {
    key: "onStart",
    value: function onStart(msg) {
      this.processMessage(msg, MessageTypes.START);
    }
  }, {
    key: "onError",
    value: function onError(msg) {
      this.processMessage(msg, MessageTypes.ERROR);
    }
  }, {
    key: "onMetadata",
    value: function onMetadata(msg) {
      this.processMessage(msg, MessageTypes.METADATA);
    }
  }, {
    key: "onTransformLog",
    value: function onTransformLog(msg) {
      this.processMessage(msg, MessageTypes.TRANSFORM_LOG);
    }
  }, {
    key: "onStateUpdate",
    value: function onStateUpdate(msg) {
      this.processMessage(msg, MessageTypes.STATE_UPDATE);
    }
  }, {
    key: "onTransformLogDone",
    value: function onTransformLogDone(msg) {
      this.processMessage(msg, MessageTypes.TRANSFORM_LOG_DONE);
    }
  }, {
    key: "onClose",
    value: function onClose() {
      this.state = SessionState.DISCONNECTED;

      if (this.lastMessage !== MessageTypes.ERROR) {
        this.stats.stateErrors[this.state] = 'Close should only happen on error';
      }
    }
  }, {
    key: "processMessage",
    value: function processMessage(msg, msgType) {
      this.recordMessage(msg, msgType);
      this.runTransition(msg, msgType);
    }
  }, {
    key: "recordMessage",
    value: function recordMessage(msg, msgType) {
      this.lastMessage = msgType;
      this.stats.messages[msgType] = this.stats.messages[msgType] + 1 || 1;
      var schemaName = SchemaNames[msgType];

      if (schemaName === undefined) {
        throw Error("\"".concat(msgType, "\" does not have a schema name"));
      }

      try {
        this.msgValidator.validate(schemaName, msg);
      } catch (e) {
        if (e instanceof ValidationError) {
          var errMsg = e.toString();
          var uniqueErrors = this.stats.uniqueErrors[msgType];
          var newError = uniqueErrors === undefined;

          if (newError) {
            uniqueErrors = {};
            uniqueErrors[errMsg] = 1;
            this.stats.uniqueErrors[msgType] = uniqueErrors;
          } else {
            uniqueErrors[errMsg] = uniqueErrors[errMsg] + 1 || 1;
          }

          this.stats.validationErrors[msgType] = this.stats.validationErrors[msgType] + 1 || 1;

          if (newError && this.options.invalidCallback) {
            this.options.invalidCallback(msgType, e, msg);
          }
        } else {
          throw e;
        }
      }
    }
  }, {
    key: "runTransition",
    value: function runTransition(msg, msgType) {
      var validTransitions = TransitionTable[this.state];

      if (validTransitions === undefined) {
        throw Error("State: ".concat(this.state, " does not have any transitions"));
      }

      var nextState = validTransitions[msgType];

      if (typeof nextState === 'function') {
        nextState = validTransitions[msgType](msg);
      }

      if (nextState === undefined) {
        this.stats.stateErrors[this.state] = "While in ".concat(this.state, " state, cannot accept message ").concat(msgType);
      } else {
        this.state = nextState;
      }
    }
  }, {
    key: "resetState",
    value: function resetState() {
      this.stats = {
        messages: {},
        validationErrors: {},
        uniqueErrors: {},
        stateErrors: {}
      };
      this.lastMessage = null;
    }
  }]);

  return XVIZSessionValidator;
}();
//# sourceMappingURL=session-validator.js.map