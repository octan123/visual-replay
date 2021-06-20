"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScenarioProvider = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _io = require("@xviz/io");

var _scenarioReader = require("./scenario-reader");

var _scenarioCircle = _interopRequireDefault(require("./scenario-circle"));

var _scenarioStraight = _interopRequireDefault(require("./scenario-straight"));

var _scenarioOrbit = _interopRequireDefault(require("./scenario-orbit"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Scenarios = _objectSpread(_objectSpread(_objectSpread({}, _scenarioCircle["default"]), _scenarioStraight["default"]), _scenarioOrbit["default"]);

function normalizeOptions(options) {
  if (typeof options.duration === 'string') {
    options.duration = parseFloat(options.duration, 10);
  }

  if (typeof options.hz === 'string') {
    options.hz = parseInt(options.hz, 10);
  }

  if (typeof options.live === 'string') {
    options.live = Boolean(options.live);
  }

  if (typeof options.speed === 'string') {
    options.speed = parseFloat(options.speed);
  }

  if (typeof options.radius === 'string') {
    options.radius = parseFloat(options.radius);
  }

  return options;
}

function loadScenario(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var opts = Object.assign({
    duration: 30,
    hz: 10,
    live: false
  }, normalizeOptions(options));

  if (!Scenarios[name]) {
    return null;
  }

  var scenario = Scenarios[name](options);
  var data = {
    metadata: JSON.stringify(scenario.getMetadata()),
    messages: [],
    timing: []
  };
  var messageLimit = opts.duration * opts.hz;
  var messageLength = 1.0 / opts.hz;

  for (var i = 0; i < messageLimit; i++) {
    var timeOffset = messageLength * i;
    var message = scenario.getMessage(timeOffset);
    data.timing.push(message.data.updates[0].timestamp);
    data.messages.push(JSON.stringify(message));
  }

  return data;
}

var MessageIterator = function () {
  function MessageIterator(start, end) {
    var increment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    (0, _classCallCheck2["default"])(this, MessageIterator);
    this.start = start;
    this.end = end;
    this.increment = increment;
    this.current = start;
  }

  (0, _createClass2["default"])(MessageIterator, [{
    key: "valid",
    value: function valid() {
      return this.current <= this.end;
    }
  }, {
    key: "value",
    value: function value() {
      return this.current;
    }
  }, {
    key: "next",
    value: function next() {
      var valid = this.valid();

      if (!valid) {
        return {
          valid: valid
        };
      }

      var data = this.current;
      this.current += this.increment;
      return {
        valid: valid,
        data: data
      };
    }
  }]);
  return MessageIterator;
}();

var ScenarioProvider = function () {
  function ScenarioProvider(_ref) {
    var root = _ref.root,
        options = _ref.options;
    (0, _classCallCheck2["default"])(this, ScenarioProvider);
    this.root = root;
    this.options = options;
    this.scenario = null;
    this.data = null;
    this.reader = null;
    this.prefix = 'scenario-';
    this.metadata = null;
    this._valid = false;
  }

  (0, _createClass2["default"])(ScenarioProvider, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
        var path, basename, _this$reader$timeRang, startTime, endTime;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.root) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                path = this.root.split('/');
                basename = path[path.length - 1];

                if (basename.startsWith(this.prefix)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return");

              case 6:
                this.scenario = basename.substring(this.prefix.length);
                this.data = loadScenario(this.scenario, this.options);

                if (this.data) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return");

              case 10:
                this.reader = new _scenarioReader.ScenarioReader(this.data);
                _this$reader$timeRang = this.reader.timeRange(), startTime = _this$reader$timeRang.startTime, endTime = _this$reader$timeRang.endTime;
                this.metadata = this._readMetadata();

                if (this.metadata && Number.isFinite(startTime) && Number.isFinite(endTime)) {
                  this._valid = true;
                }

                if (!(this.metadata && (!Number.isFinite(startTime) || !Number.isFinite(endTime)))) {
                  _context.next = 16;
                  break;
                }

                throw new Error('The data source is missing the data index');

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "valid",
    value: function valid() {
      return this._valid;
    }
  }, {
    key: "xvizMetadata",
    value: function xvizMetadata() {
      return this.metadata;
    }
  }, {
    key: "xvizMessage",
    value: function () {
      var _xvizMessage = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(iterator) {
        var _iterator$next, valid, data, message;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _iterator$next = iterator.next(), valid = _iterator$next.valid, data = _iterator$next.data;

                if (valid) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", null);

              case 3:
                message = this._readMessage(data);
                return _context2.abrupt("return", message);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function xvizMessage(_x) {
        return _xvizMessage.apply(this, arguments);
      }

      return xvizMessage;
    }()
  }, {
    key: "getMessageIterator",
    value: function getMessageIterator() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          startTime = _ref2.startTime,
          endTime = _ref2.endTime;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _this$reader$timeRang2 = this.reader.timeRange(),
          start = _this$reader$timeRang2.startTime,
          end = _this$reader$timeRang2.endTime;

      if (!Number.isFinite(startTime)) {
        startTime = start;
      }

      if (!Number.isFinite(endTime)) {
        endTime = end;
      }

      if (startTime > endTime) {
        return null;
      }

      var startMessages = this.reader.findMessage(startTime);
      var endMessages = this.reader.findMessage(endTime);

      if (startMessages !== undefined && endMessages !== undefined) {
        return new MessageIterator(startMessages.first, endMessages.last);
      }

      return null;
    }
  }, {
    key: "_readMessage",
    value: function _readMessage(message) {
      var data = this.reader.readMessage(message);

      if (data) {
        return new _io.XVIZData(data);
      }

      return undefined;
    }
  }, {
    key: "_readMetadata",
    value: function _readMetadata() {
      var data = this.reader.readMetadata();

      if (data) {
        return new _io.XVIZData(data);
      }

      return undefined;
    }
  }]);
  return ScenarioProvider;
}();

exports.ScenarioProvider = ScenarioProvider;
//# sourceMappingURL=scenario-provider.js.map