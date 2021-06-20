"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverArgs = serverArgs;
exports.serverCmd = serverCmd;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _probe = require("probe.gl");

var _xvizServer = require("../server/xviz-server");

var _xvizProviderHandler = require("../server/xviz-provider-handler");

var _io = require("@xviz/io");

var _scenarios = require("../scenarios");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function serverArgs(inArgs) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$defaultCommand = _ref.defaultCommand,
      defaultCommand = _ref$defaultCommand === void 0 ? false : _ref$defaultCommand;

  console.log('cmd/server');
  var cmd = defaultCommand ? ['server', '*'] : 'server';
  return inArgs.command(cmd, 'Start an XVIZ Server', {
    format: {
      describe: 'Output data format',
      choices: ['JSON_STRING', 'JSON_BUFFER', 'BINARY_GLB', 'BINARY_PBE'],
      nargs: 1
    },
    live: {
      describe: 'Return data as if from a live stream',
      "boolean": true
    },
    delay: {
      describe: 'The delay between sending messages in milliseconds',
      type: 'number',
      "default": 50
    },
    scenarios: {
      describe: 'Enable Scenario support',
      type: 'boolean',
      "default": true,
      group: 'Scenario Options:'
    },
    duration: {
      describe: 'The duration in seconds of the generated scenario log',
      type: 'number',
      "default": 30,
      group: 'Scenario Options:'
    },
    hz: {
      describe: 'The frequency of updates for a generated scenario log',
      type: 'number',
      "default": 10,
      group: 'Scenario Options:'
    },
    directory: {
      alias: 'd',
      describe: 'Data directory source.  Multiple directories are supported',
      type: 'string',
      required: true,
      group: 'Hosting Options:'
    },
    port: {
      describe: 'Port to listen on',
      group: 'Hosting Options:'
    },
    verbose: {
      alias: 'v',
      count: true,
      describe: 'Logging level'
    }
  }, serverCmd);
}

function serverCmd(args) {
  var _log = new _probe.Log({
    id: 'xvizserver-log'
  });

  _log.enable(true).setLevel(args.v);

  var logger = {
    log: function log() {
      return _log.log.apply(_log, arguments)();
    },
    error: function error() {
      for (var _len = arguments.length, msg = new Array(_len), _key = 0; _key < _len; _key++) {
        msg[_key] = arguments[_key];
      }

      return _log.apply(void 0, [0].concat(msg))();
    },
    warn: function warn() {
      for (var _len2 = arguments.length, msg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        msg[_key2] = arguments[_key2];
      }

      return _log.log.apply(_log, [1].concat(msg))();
    },
    info: function info() {
      for (var _len3 = arguments.length, msg = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        msg[_key3] = arguments[_key3];
      }

      return _log.log.apply(_log, [1].concat(msg))();
    },
    verbose: function verbose() {
      for (var _len4 = arguments.length, msg = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        msg[_key4] = arguments[_key4];
      }

      return _log.log.apply(_log, [2].concat(msg))();
    }
  };

  var options = _objectSpread(_objectSpread({}, args), {}, {
    logger: logger
  });

  if (args.scenarios) {
    _io.XVIZProviderFactory.addProviderClass(_scenarios.ScenarioProvider);
  }

  var handler = new _xvizProviderHandler.XVIZProviderHandler(_io.XVIZProviderFactory, options);
  var wss = new _xvizServer.XVIZServer([handler], options, function () {
    logger.log("test Listening on port ".concat(wss.server.address().port));
  });
}
//# sourceMappingURL=server.js.map