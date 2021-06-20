import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { XVIZData } from '@xviz/io';
import { ScenarioReader } from './scenario-reader';
import ScenarioCircle from './scenario-circle';
import ScenarioStraight from './scenario-straight';
import ScenarioOrbit from './scenario-orbit';

const Scenarios = _objectSpread(_objectSpread(_objectSpread({}, ScenarioCircle), ScenarioStraight), ScenarioOrbit);

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

function loadScenario(name, options = {}) {
  const opts = Object.assign({
    duration: 30,
    hz: 10,
    live: false
  }, normalizeOptions(options));

  if (!Scenarios[name]) {
    return null;
  }

  const scenario = Scenarios[name](options);
  const data = {
    metadata: JSON.stringify(scenario.getMetadata()),
    messages: [],
    timing: []
  };
  const messageLimit = opts.duration * opts.hz;
  const messageLength = 1.0 / opts.hz;

  for (let i = 0; i < messageLimit; i++) {
    const timeOffset = messageLength * i;
    const message = scenario.getMessage(timeOffset);
    data.timing.push(message.data.updates[0].timestamp);
    data.messages.push(JSON.stringify(message));
  }

  return data;
}

class MessageIterator {
  constructor(start, end, increment = 1) {
    this.start = start;
    this.end = end;
    this.increment = increment;
    this.current = start;
  }

  valid() {
    return this.current <= this.end;
  }

  value() {
    return this.current;
  }

  next() {
    const valid = this.valid();

    if (!valid) {
      return {
        valid
      };
    }

    const data = this.current;
    this.current += this.increment;
    return {
      valid,
      data
    };
  }

}

export class ScenarioProvider {
  constructor({
    root,
    options
  }) {
    this.root = root;
    this.options = options;
    this.scenario = null;
    this.data = null;
    this.reader = null;
    this.prefix = 'scenario-';
    this.metadata = null;
    this._valid = false;
  }

  async init() {
    if (!this.root) {
      return;
    }

    const path = this.root.split('/');
    const basename = path[path.length - 1];

    if (!basename.startsWith(this.prefix)) {
      return;
    }

    this.scenario = basename.substring(this.prefix.length);
    this.data = loadScenario(this.scenario, this.options);

    if (!this.data) {
      return;
    }

    this.reader = new ScenarioReader(this.data);
    const {
      startTime,
      endTime
    } = this.reader.timeRange();
    this.metadata = this._readMetadata();

    if (this.metadata && Number.isFinite(startTime) && Number.isFinite(endTime)) {
      this._valid = true;
    }

    if (this.metadata && (!Number.isFinite(startTime) || !Number.isFinite(endTime))) {
      throw new Error('The data source is missing the data index');
    }
  }

  valid() {
    return this._valid;
  }

  xvizMetadata() {
    return this.metadata;
  }

  async xvizMessage(iterator) {
    const {
      valid,
      data
    } = iterator.next();

    if (!valid) {
      return null;
    }

    const message = this._readMessage(data);

    return message;
  }

  getMessageIterator({
    startTime,
    endTime
  } = {}, options = {}) {
    const {
      startTime: start,
      endTime: end
    } = this.reader.timeRange();

    if (!Number.isFinite(startTime)) {
      startTime = start;
    }

    if (!Number.isFinite(endTime)) {
      endTime = end;
    }

    if (startTime > endTime) {
      return null;
    }

    const startMessages = this.reader.findMessage(startTime);
    const endMessages = this.reader.findMessage(endTime);

    if (startMessages !== undefined && endMessages !== undefined) {
      return new MessageIterator(startMessages.first, endMessages.last);
    }

    return null;
  }

  _readMessage(message) {
    const data = this.reader.readMessage(message);

    if (data) {
      return new XVIZData(data);
    }

    return undefined;
  }

  _readMetadata() {
    const data = this.reader.readMetadata();

    if (data) {
      return new XVIZData(data);
    }

    return undefined;
  }

}
//# sourceMappingURL=scenario-provider.js.map