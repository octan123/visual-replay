import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _typeof from "@babel/runtime/helpers/esm/typeof";
export function getTransferList(object) {
  var recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var transfers = arguments.length > 2 ? arguments[2] : undefined;
  var transfersSet = transfers || new Set();

  if (!object) {} else if (object instanceof ArrayBuffer) {
    transfersSet.add(object);
  } else if (object.buffer && object.buffer instanceof ArrayBuffer) {
    transfersSet.add(object.buffer);
  } else if (recursive && _typeof(object) === 'object') {
    for (var key in object) {
      getTransferList(object[key], false, transfersSet);
    }
  }

  return transfers === undefined ? Array.from(transfersSet) : null;
}

var WorkerThread = function () {
  function WorkerThread(_ref) {
    var url = _ref.url,
        metadata = _ref.metadata;

    _classCallCheck(this, WorkerThread);

    this.worker = new Worker(url);
    this.isBusy = false;
    this.metadata = metadata;
  }

  _createClass(WorkerThread, [{
    key: "process",
    value: function process(data) {
      var _this = this;

      var worker = this.worker;
      return new Promise(function (resolve, reject) {
        worker.onmessage = function (e) {
          _this.isBusy = false;
          resolve(e.data);
        };

        worker.onerror = function (err) {
          _this.isBusy = false;
          reject(err);
        };

        _this.isBusy = true;
        worker.postMessage(data, getTransferList(data));
      });
    }
  }, {
    key: "terminate",
    value: function terminate() {
      this.worker.terminate();
      this.worker = null;
    }
  }]);

  return WorkerThread;
}();

export var WorkerFarm = function () {
  function WorkerFarm(_ref2) {
    var workerURL = _ref2.workerURL,
        _ref2$maxConcurrency = _ref2.maxConcurrency,
        maxConcurrency = _ref2$maxConcurrency === void 0 ? 1 : _ref2$maxConcurrency,
        _ref2$debug = _ref2.debug,
        debug = _ref2$debug === void 0 ? function () {} : _ref2$debug,
        _ref2$initialMessage = _ref2.initialMessage,
        initialMessage = _ref2$initialMessage === void 0 ? null : _ref2$initialMessage,
        _ref2$capacity = _ref2.capacity,
        capacity = _ref2$capacity === void 0 ? null : _ref2$capacity,
        _ref2$id = _ref2.id,
        id = _ref2$id === void 0 ? 'default' : _ref2$id;

    _classCallCheck(this, WorkerFarm);

    this.id = id;
    this.workerURL = workerURL;
    this.workers = [];
    this.queue = [];
    this.debug = debug;
    this.capacity = capacity;
    this.dropped = 0;

    for (var i = 0; i < maxConcurrency; i++) {
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

  _createClass(WorkerFarm, [{
    key: "destroy",
    value: function destroy() {
      this.workers.forEach(function (worker) {
        return worker.terminate();
      });
    }
  }, {
    key: "getAvailableWorker",
    value: function getAvailableWorker() {
      return this.workers.find(function (worker) {
        return !worker.isBusy;
      });
    }
  }, {
    key: "broadcast",
    value: function broadcast(data) {
      var count = this.workers.length;

      for (var i = count - 1; i >= 0; i--) {
        this.workers[i].worker.postMessage(data, getTransferList(data));
      }
    }
  }, {
    key: "next",
    value: function next() {
      var _this2 = this;

      var queue = this.queue;

      while (this.capacity && queue.length > this.capacity) {
        queue.shift();
        this.dropped++;
      }

      var _loop = function _loop() {
        var worker = _this2.getAvailableWorker();

        if (!worker) {
          return "break";
        }

        var job = queue.shift();

        _this2.debug({
          id: _this2.id,
          message: 'processing',
          worker: worker.metadata.name,
          backlog: queue.length,
          dropped: _this2.dropped
        });

        worker.process(job.data).then(job.onResult)["catch"](job.onError).then(function () {
          _this2.debug({
            id: _this2.id,
            message: 'waiting',
            worker: worker.metadata.name,
            backlog: queue.length,
            dropped: _this2.dropped
          });

          _this2.next();
        });
      };

      while (queue.length) {
        var _ret = _loop();

        if (_ret === "break") break;
      }
    }
  }, {
    key: "process",
    value: function process(data, onResult, onError) {
      this.queue.push({
        data: data,
        onResult: onResult,
        onError: onError
      });
      this.next();
    }
  }]);

  return WorkerFarm;
}();
//# sourceMappingURL=worker-utils.js.map