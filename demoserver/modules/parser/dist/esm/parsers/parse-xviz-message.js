import { parseXVIZMessageSync } from './parse-xviz-message-sync';
import { postDeserialize } from './serialize';
import { getWorkerFarm, initializeWorkerFarm } from './parse-xviz-message-workerfarm';
export function initializeWorkers(_ref) {
  var id = _ref.id,
      worker = _ref.worker,
      _ref$maxConcurrency = _ref.maxConcurrency,
      maxConcurrency = _ref$maxConcurrency === void 0 ? 4 : _ref$maxConcurrency,
      _ref$capacity = _ref.capacity,
      capacity = _ref$capacity === void 0 ? null : _ref$capacity;
  initializeWorkerFarm({
    id: id,
    worker: worker,
    maxConcurrency: maxConcurrency,
    capacity: capacity
  });
}
export function parseXVIZMessage(_ref2) {
  var message = _ref2.message,
      onResult = _ref2.onResult,
      onError = _ref2.onError,
      debug = _ref2.debug,
      _ref2$worker = _ref2.worker,
      worker = _ref2$worker === void 0 ? false : _ref2$worker,
      _ref2$workerId = _ref2.workerId,
      workerId = _ref2$workerId === void 0 ? 'default' : _ref2$workerId,
      _ref2$maxConcurrency = _ref2.maxConcurrency,
      maxConcurrency = _ref2$maxConcurrency === void 0 ? 4 : _ref2$maxConcurrency,
      _ref2$capacity = _ref2.capacity,
      capacity = _ref2$capacity === void 0 ? null : _ref2$capacity,
      _ref2$opts = _ref2.opts,
      opts = _ref2$opts === void 0 ? {} : _ref2$opts;

  if (worker) {
    var id = workerId;

    if (!getWorkerFarm(id)) {
      initializeWorkers({
        id: id,
        worker: worker,
        maxConcurrency: maxConcurrency,
        capacity: capacity
      });
    }

    var workerFarm = getWorkerFarm(id);

    if (debug) {
      workerFarm.debug = debug;
    }

    var onMessage = function onMessage(data) {
      return onResult(postDeserialize(data));
    };

    workerFarm.process({
      data: message,
      opts: opts
    }, onMessage, onError);
  } else {
    parseXVIZMessageSync(message, onResult, onError, opts);
  }
}
//# sourceMappingURL=parse-xviz-message.js.map