"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZWorkersMonitor = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _constants = require("./constants");

var XVIZWorkersMonitor = function XVIZWorkersMonitor(options) {
  var _this = this;

  (0, _classCallCheck2["default"])(this, XVIZWorkersMonitor);
  (0, _defineProperty2["default"])(this, "update", function (payload) {
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
  (0, _defineProperty2["default"])(this, "cleanup", function () {
    var now = new Date(Date.now());

    for (var _i2 = 0, _Object$entries = Object.entries(_this.status.workers); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i2], 2),
          workerId = _Object$entries$_i[0],
          workerStatus = _Object$entries$_i[1];

      if (workerStatus.isActive && workerStatus.lastUpdated) {
        var timeDelta = now.getTime() - workerStatus.lastUpdated.getTime();

        if (timeDelta > +2 * _constants.XVIZ_WORKERS_MONITOR_INTERVAL) {
          _this.status.workers[workerId] = {
            lastUpdated: now,
            isActive: false
          };
        }
      }
    }
  });
  (0, _defineProperty2["default"])(this, "reset", function () {
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
  (0, _defineProperty2["default"])(this, "start", function () {
    _this.stop();

    _this.interval = setInterval(function () {
      _this.cleanup();

      _this.reportCallback(_this.status);
    }, _constants.XVIZ_WORKERS_MONITOR_INTERVAL);
  });
  (0, _defineProperty2["default"])(this, "stop", function () {
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

exports.XVIZWorkersMonitor = XVIZWorkersMonitor;
//# sourceMappingURL=xviz-workers-monitor.js.map