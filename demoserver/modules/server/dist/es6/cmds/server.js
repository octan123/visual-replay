import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Log } from 'probe.gl';
import { XVIZServer } from '../server/xviz-server';
import { XVIZProviderHandler } from '../server/xviz-provider-handler';
import { XVIZProviderFactory } from '@xviz/io';
import { ScenarioProvider } from '../scenarios';
export function serverArgs(inArgs, {
  defaultCommand = false
} = {}) {
  console.log('cmd/server');
  const cmd = defaultCommand ? ['server', '*'] : 'server';
  return inArgs.command(cmd, 'Start an XVIZ Server', {
    format: {
      describe: 'Output data format',
      choices: ['JSON_STRING', 'JSON_BUFFER', 'BINARY_GLB', 'BINARY_PBE'],
      nargs: 1
    },
    live: {
      describe: 'Return data as if from a live stream',
      boolean: true
    },
    delay: {
      describe: 'The delay between sending messages in milliseconds',
      type: 'number',
      default: 50
    },
    scenarios: {
      describe: 'Enable Scenario support',
      type: 'boolean',
      default: true,
      group: 'Scenario Options:'
    },
    duration: {
      describe: 'The duration in seconds of the generated scenario log',
      type: 'number',
      default: 30,
      group: 'Scenario Options:'
    },
    hz: {
      describe: 'The frequency of updates for a generated scenario log',
      type: 'number',
      default: 10,
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
export function serverCmd(args) {
  const _log = new Log({
    id: 'xvizserver-log'
  });

  _log.enable(true).setLevel(args.v);

  const logger = {
    log: (...msg) => _log.log(...msg)(),
    error: (...msg) => _log(0, ...msg)(),
    warn: (...msg) => _log.log(1, ...msg)(),
    info: (...msg) => _log.log(1, ...msg)(),
    verbose: (...msg) => _log.log(2, ...msg)()
  };

  const options = _objectSpread(_objectSpread({}, args), {}, {
    logger
  });

  if (args.scenarios) {
    XVIZProviderFactory.addProviderClass(ScenarioProvider);
  }

  const handler = new XVIZProviderHandler(XVIZProviderFactory, options);
  const wss = new XVIZServer([handler], options, () => {
    logger.log("test Listening on port ".concat(wss.server.address().port));
  });
}
//# sourceMappingURL=server.js.map