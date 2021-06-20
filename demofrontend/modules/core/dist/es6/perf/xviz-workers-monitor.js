import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { XVIZ_WORKERS_MONITOR_INTERVAL } from './constants';
export class XVIZWorkersMonitor {
  constructor(options) {
    _defineProperty(this, "update", payload => {
      const {
        worker,
        backlog,
        dropped
      } = payload;
      this.status.backlog = backlog;
      this.status.dropped = dropped;
      const now = new Date(Date.now());

      for (const workerId of Object.keys(this.status.workers)) {
        if (worker === workerId) {
          this.status.workers[workerId] = {
            lastUpdated: now,
            isActive: true
          };
        }
      }
    });

    _defineProperty(this, "cleanup", () => {
      const now = new Date(Date.now());

      for (const [workerId, workerStatus] of Object.entries(this.status.workers)) {
        if (workerStatus.isActive && workerStatus.lastUpdated) {
          const timeDelta = now.getTime() - workerStatus.lastUpdated.getTime();

          if (timeDelta > +2 * XVIZ_WORKERS_MONITOR_INTERVAL) {
            this.status.workers[workerId] = {
              lastUpdated: now,
              isActive: false
            };
          }
        }
      }
    });

    _defineProperty(this, "reset", () => {
      const workers = {};

      for (let i = 0; i < this.numWorkers; i++) {
        const workerId = "".concat(i, "/").concat(this.numWorkers);
        workers[workerId] = {
          lastUpdated: null,
          isActive: false
        };
      }

      this.status = {
        backlog: 'NA',
        dropped: 'NA',
        workers
      };
    });

    _defineProperty(this, "start", () => {
      this.stop();
      this.interval = setInterval(() => {
        this.cleanup();
        this.reportCallback(this.status);
      }, XVIZ_WORKERS_MONITOR_INTERVAL);
    });

    _defineProperty(this, "stop", () => {
      this.reset();

      if (this.interval) {
        clearInterval(this.interval);
      }
    });

    const {
      numWorkers,
      reportCallback
    } = options;
    this.numWorkers = numWorkers;
    this.reportCallback = reportCallback;
    this.interval = null;
    this.reset();
  }

}
//# sourceMappingURL=xviz-workers-monitor.js.map