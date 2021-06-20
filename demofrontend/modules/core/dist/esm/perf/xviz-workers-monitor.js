import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { XVIZ_WORKERS_MONITOR_INTERVAL } from './constants';
export var XVIZWorkersMonitor = function XVIZWorkersMonitor(options) {
  var _this = this;

  _classCallCheck(this, XVIZWorkersMonitor);

  _defineProperty(this, "update", function (payload) {
    var worker = payload.worker,
        backlog = payload.backlog,
        dropped = payload.dropped;
    _this.status.backlog = backlog;
    _this.status.dropped = dropped;
    var now = new Date(Date.now());

    for (var _i = 0, _Object$keys = Object.keys(_this.status.workers); _i < _Object$keys.length; _i++) {
      var workerId = _Object$keys[_i];

      if (worker === workerId) {
        _this.status.workers[workerId] = {
          lastUpdated: now,
          isActive: true
        };
      }
    }
  });

  _defineProperty(this, "cleanup", function () {
    var now = new Date(Date.now());

    for (var _i2 = 0, _Object$entries = Object.entries(_this.status.workers); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
          workerId = _Object$entries$_i[0],
          workerStatus = _Object$entries$_i[1];

      if (workerStatus.isActive && workerStatus.lastUpdated) {
        var timeDelta = now.getTime() - workerStatus.lastUpdated.getTime();

        if (timeDelta > +2 * XVIZ_WORKERS_MONITOR_INTERVAL) {
          _this.status.workers[workerId] = {
            lastUpdated: now,
            isActive: false
          };
        }
      }
    }
  });

  _defineProperty(this, "reset", function () {
    var workers = {};

    for (var i = 0; i < _this.numWorkers; i++) {
      var workerId = "".concat(i, "/").concat(_this.numWorkers);
      workers[workerId] = {
        lastUpdated: null,
        isActive: false
      };
    }

    _this.status = {
      backlog: 'NA',
      dropped: 'NA',
      workers: workers
    };
  });

  _defineProperty(this, "start", function () {
    _this.stop();

    _this.interval = setInterval(function () {
      _this.cleanup();

      _this.reportCallback(_this.status);
    }, XVIZ_WORKERS_MONITOR_INTERVAL);
  });

  _defineProperty(this, "stop", function () {
    _this.reset();

    if (_this.interval) {
      clearInterval(_this.interval);
    }
  });

  var numWorkers = options.numWorkers,
      reportCallback = options.reportCallback;
  this.numWorkers = numWorkers;
  this.reportCallback = reportCallback;
  this.interval = null;
  this.reset();
};
//# sourceMappingURL=xviz-workers-monitor.js.map