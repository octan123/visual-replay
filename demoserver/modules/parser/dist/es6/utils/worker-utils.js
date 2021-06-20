export function getTransferList(object, recursive = true, transfers) {
  const transfersSet = transfers || new Set();

  if (!object) {} else if (object instanceof ArrayBuffer) {
    transfersSet.add(object);
  } else if (object.buffer && object.buffer instanceof ArrayBuffer) {
    transfersSet.add(object.buffer);
  } else if (recursive && typeof object === 'object') {
    for (const key in object) {
      getTransferList(object[key], false, transfersSet);
    }
  }

  return transfers === undefined ? Array.from(transfersSet) : null;
}

class WorkerThread {
  constructor({
    url,
    metadata
  }) {
    this.worker = new Worker(url);
    this.isBusy = false;
    this.metadata = metadata;
  }

  process(data) {
    const {
      worker
    } = this;
    return new Promise((resolve, reject) => {
      worker.onmessage = e => {
        this.isBusy = false;
        resolve(e.data);
      };

      worker.onerror = err => {
        this.isBusy = false;
        reject(err);
      };

      this.isBusy = true;
      worker.postMessage(data, getTransferList(data));
    });
  }

  terminate() {
    this.worker.terminate();
    this.worker = null;
  }

}

export class WorkerFarm {
  constructor({
    workerURL,
    maxConcurrency = 1,
    debug = () => {},
    initialMessage = null,
    capacity = null,
    id = 'default'
  }) {
    this.id = id;
    this.workerURL = workerURL;
    this.workers = [];
    this.queue = [];
    this.debug = debug;
    this.capacity = capacity;
    this.dropped = 0;

    for (let i = 0; i < maxConcurrency; i++) {
      this.workers[i] = new WorkerThread({
        url: this.workerURL,
        metadata: {
          name: "".concat(i, "/").concat(maxConcurrency)
        }
      });
    }

    if (initialMessage) {
      this.broadcast(initialMessage);
    }
  }

  destroy() {
    this.workers.forEach(worker => worker.terminate());
  }

  getAvailableWorker() {
    return this.workers.find(worker => !worker.isBusy);
  }

  broadcast(data) {
    const count = this.workers.length;

    for (let i = count - 1; i >= 0; i--) {
      this.workers[i].worker.postMessage(data, getTransferList(data));
    }
  }

  next() {
    const {
      queue
    } = this;

    while (this.capacity && queue.length > this.capacity) {
      queue.shift();
      this.dropped++;
    }

    while (queue.length) {
      const worker = this.getAvailableWorker();

      if (!worker) {
        break;
      }

      const job = queue.shift();
      this.debug({
        id: this.id,
        message: 'processing',
        worker: worker.metadata.name,
        backlog: queue.length,
        dropped: this.dropped
      });
      worker.process(job.data).then(job.onResult).catch(job.onError).then(() => {
        this.debug({
          id: this.id,
          message: 'waiting',
          worker: worker.metadata.name,
          backlog: queue.length,
          dropped: this.dropped
        });
        this.next();
      });
    }
  }

  process(data, onResult, onError) {
    this.queue.push({
      data,
      onResult,
      onError
    });
    this.next();
  }

}
//# sourceMappingURL=worker-utils.js.map