import { parseXVIZMessageSync } from './parse-xviz-message-sync';
import { postDeserialize } from './serialize';
import { getWorkerFarm, initializeWorkerFarm } from './parse-xviz-message-workerfarm';
export function initializeWorkers({
  id,
  worker,
  maxConcurrency = 4,
  capacity = null
}) {
  initializeWorkerFarm({
    id,
    worker,
    maxConcurrency,
    capacity
  });
}
export function parseXVIZMessage({
  message,
  onResult,
  onError,
  debug,
  worker = false,
  workerId = 'default',
  maxConcurrency = 4,
  capacity = null,
  opts = {}
}) {
  if (worker) {
    const id = workerId;

    if (!getWorkerFarm(id)) {
      initializeWorkers({
        id,
        worker,
        maxConcurrency,
        capacity
      });
    }

    const workerFarm = getWorkerFarm(id);

    if (debug) {
      workerFarm.debug = debug;
    }

    const onMessage = data => onResult(postDeserialize(data));

    workerFarm.process({
      data: message,
      opts
    }, onMessage, onError);
  } else {
    parseXVIZMessageSync(message, onResult, onError, opts);
  }
}
//# sourceMappingURL=parse-xviz-message.js.map