import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Stats } from 'probe.gl';
import { XVIZEnvelope } from '@xviz/io';
const DEFAULT_OPTIONS = {
  delay: 0
};
export class XVIZProviderRequestHandler {
  constructor(context, provider, middleware, options = {}) {
    this.context = context;
    this.provider = provider;
    this.middleware = middleware;
    this.metrics = new Stats({
      id: 'xviz-provider-request-handler'
    });
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    this._setupContext();
  }

  _setupContext() {
    const metadata = this.provider.xvizMetadata().message();

    if (metadata && metadata.data && metadata.data.log_info) {
      const {
        start_time,
        end_time
      } = metadata.data.log_info;

      if (start_time) {
        this.context.set('start_time', start_time);
      }

      if (end_time) {
        this.context.set('end_time', start_time);
      }
    }
  }

  onStart(msg) {
    console.log('onStart');
    const error = null;

    if (error) {
      this.middleware.onError(XVIZEnvelope.Error({
        message: error
      }));
    } else {
      const message = msg.message();

      if (message.data.message_format) {
        this.context.set('message_format', message.data.message_format);
      } else {
        this.context.set('message_format', 'BINARY');
      }

      if (message.data.profile) {
        this.context.set('profile', message.data.profile);
      } else {
        this.context.set('profile', 'default');
      }

      if (message.data.session_type) {
        this.context.set('session_type', message.data.session_type);
      } else {
        this.context.set('session_type', 'LOG');
      }
    }

    const metadata = this.provider.xvizMetadata();
    this.middleware.onMetadata(metadata);
  }

  _setupTransformMetrics() {
    return {
      totalTimer: this.metrics.get("total"),
      loadTimer: this.metrics.get("load"),
      sendTimer: this.metrics.get("send")
    };
  }

  onTransformLog(msg) {
    const error = null;

    if (error) {
      this.middleware.onError(XVIZEnvelope.Error({
        message: error
      }));
    } else {
      this._clearActiveTransforms();

      this._startTransform(msg);
    }
  }

  onTransformPointInTime(msg) {
    this.middleware.onError(XVIZEnvelope.Error({
      message: 'Error: transform_point_in_time is not supported.'
    }));
  }

  onReconfigure(msg) {
    this.middleware.onError(XVIZEnvelope.Error({
      message: 'Error: reconfigure is not supported.'
    }));
  }

  log(...msg) {
    const {
      logger
    } = this.options;

    if (logger && logger.log) {
      logger.log(...msg);
    }
  }

  async _sendStateUpdate(id, transformState) {
    const {
      delay,
      interval,
      iterator
    } = transformState;
    const {
      loadTimer,
      sendTimer,
      totalTimer
    } = transformState;

    if (!interval) {
      totalTimer && totalTimer.timeStart();
    }

    if (interval) {
      clearTimeout(interval);
      transformState.interval = null;
    }

    if (iterator.valid() && this.context.transform(id)) {
      loadTimer && loadTimer.timeStart();
      const data = await this.provider.xvizMessage(iterator);
      loadTimer && loadTimer.timeEnd();

      if (data) {
        sendTimer && sendTimer.timeStart();
        this.middleware.onStateUpdate(data);
        sendTimer && sendTimer.timeEnd();
        this.logMsgSent(id, iterator.value(), loadTimer, sendTimer);
      }

      transformState.interval = setTimeout(() => this._sendStateUpdate(id, transformState), delay);
    } else {
      this.middleware.onTransformLogDone(XVIZEnvelope.TransformLogDone({
        id
      }));
      totalTimer && totalTimer.timeEnd();
      this.logDone(id, loadTimer, sendTimer, totalTimer);
      this.context.endTransform(id);
      this.metrics.reset();
    }
  }

  _clearActiveTransforms() {
    const transforms = this.context.transforms();

    for (const tKey of transforms) {
      this.context.endTransform(tKey);
    }
  }

  _startTransform(msg) {
    const message = msg.message();
    const id = message.data.id;

    const tformState = _objectSpread({
      request: message.data,
      iterator: null,
      interval: null,
      delay: this.options.delay
    }, this._setupTransformMetrics());

    this.context.startTransform(id, tformState);
    tformState.iterator = this.provider.getMessageIterator({
      startTime: message.data.start_timestamp,
      endTime: message.data.end_timestamp
    });

    if (tformState.delay < 1) {
      this._sendAllStateUpdates(id, tformState);
    } else {
      this._sendStateUpdate(id, tformState);
    }
  }

  async _sendAllStateUpdates(id, transformState) {
    const {
      iterator
    } = transformState;
    const {
      loadTimer,
      sendTimer,
      totalTimer
    } = transformState;
    totalTimer && totalTimer.timeStart();

    while (iterator.valid() && this.context.transform(id)) {
      loadTimer && loadTimer.timeStart();
      const data = await this.provider.xvizMessage(iterator);
      loadTimer && loadTimer.timeEnd();

      if (data) {
        sendTimer && sendTimer.timeStart();
        this.middleware.onStateUpdate(data);
        sendTimer && sendTimer.timeEnd();
        this.logMsgSent(id, iterator.value(), loadTimer, sendTimer);
      }
    }

    this.middleware.onTransformLogDone(XVIZEnvelope.TransformLogDone({
      id
    }));
    totalTimer && totalTimer.timeEnd();
    this.logDone(id, loadTimer, sendTimer, totalTimer);
    this.context.endTransform(id);
    this.metrics.reset();
  }

  logMsgSent(id, index, loadTimer, sendTimer) {
    const {
      logger
    } = this.options;

    if (logger && logger.verbose) {
      let msg = "id: ".concat(id, " [< STATE_UPDATE] message: ").concat(index);

      if (loadTimer) {
        msg += " ".concat(loadTimer.name, ":").concat(loadTimer.lastTiming.toFixed(3), "ms");
      }

      if (sendTimer) {
        msg += " ".concat(sendTimer.name, ":").concat(sendTimer.lastTiming.toFixed(3), "ms");
      }

      logger.verbose(msg);
    }
  }

  logDone(id, load, send, total) {
    const {
      logger
    } = this.options;

    if (logger && logger.info) {
      const msg = "id: ".concat(id, " [< DONE]");

      if (load) {
        logger.info("".concat(msg, " ").concat(load.name, " Avg:").concat(load.getAverageTime().toFixed(3), "ms Total:").concat(load.time.toFixed(3), "ms Hz:").concat(load.getHz().toFixed(3), "/sec Count:").concat(load.count));
      }

      if (send) {
        logger.info("".concat(msg, " ").concat(send.name, " Avg:").concat(send.getAverageTime().toFixed(3), "ms Total:").concat(send.time.toFixed(3), "ms Hz:").concat(send.getHz().toFixed(3), "/sec Count:").concat(send.count));
      }

      if (total) {
        logger.info("".concat(msg, " ").concat(total.name, " ").concat(total.lastTiming.toFixed(3), "ms"));
      }
    }
  }

}
//# sourceMappingURL=xviz-provider-request-handler.js.map