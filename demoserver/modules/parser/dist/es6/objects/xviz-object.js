import { Vector2 } from 'math.gl';
import BaseObject from './base-object';
import { getCentroid } from '../utils/geometry';
let defaultCollection = null;
let serialIndex = 0;
export default class XVIZObject extends BaseObject {
  static setDefaultCollection(collection) {
    defaultCollection = collection;
  }

  constructor({
    id,
    timestamp
  }) {
    super();
    this.id = id;
    this.index = serialIndex++;
    this.state = {};
    this.startTime = timestamp;
    this.endTime = timestamp;
    this._props = new Map();
    this._streams = new Map();
    this._geometry = null;
  }

  static observe(id, timestamp) {
    return defaultCollection && defaultCollection.observe(id, timestamp);
  }

  static get(id) {
    return defaultCollection && defaultCollection.get(id);
  }

  static clear() {
    return defaultCollection && defaultCollection.clear();
  }

  static count() {
    return defaultCollection && defaultCollection.count();
  }

  static resetAll() {
    return defaultCollection && defaultCollection.resetAll();
  }

  static getAll() {
    return defaultCollection && defaultCollection.getAll();
  }

  static getAllInCurrentFrame() {
    return defaultCollection && defaultCollection.getAllInCurrentFrame();
  }

  static prune(startTime, endTime) {
    return defaultCollection && defaultCollection.prune(startTime, endTime);
  }

  get position() {
    const p = this._geometry;

    if (!p) {
      return null;
    }

    if (Number.isFinite(p[0])) {
      return p;
    }

    this._geometry = getCentroid(p);
    return this._geometry;
  }

  get isValid() {
    return Boolean(this._geometry);
  }

  get streamNames() {
    return this._streams.keys();
  }

  getBearingToObject(object) {
    const myPosition = this.position;
    const otherPosition = object.position;

    if (myPosition && otherPosition) {
      const bearing = Math.atan2(otherPosition[1] - myPosition[1], otherPosition[0] - myPosition[0]) / Math.PI * 180;
      return bearing;
    }

    return null;
  }

  getDistanceToObject(object) {
    const myPosition = this.position;
    const otherPosition = object.position;
    let distance = null;

    if (myPosition && otherPosition) {
      distance = new Vector2(myPosition).distance(otherPosition);
      distance = Math.round(distance * 10) / 10;
    }

    return distance;
  }

  getProp(name) {
    return this._props.get(name);
  }

  getFeature(streamName) {
    return this._streams.get(streamName);
  }

  _observe(timestamp) {
    this.startTime = Math.min(this.startTime, timestamp);
    this.endTime = Math.max(this.endTime, timestamp);
  }

  _addFeature(streamName, feature) {
    this._streams.set(streamName, feature);

    feature.index = this.index;
    feature.state = this.state;

    for (const entry of this._props) {
      feature[entry[0]] = entry[1];
    }

    const p = feature.center || feature.vertices;

    if (!p || !Array.isArray(p)) {
      return;
    }

    if (Number.isFinite(p[0])) {
      p[2] = p[2] || 0;
    } else if (this._geometry) {
      return;
    }

    this._geometry = p;
  }

  _setState(name, value) {
    if (name) {
      this.state[name] = value;
    }
  }

  _setProp(name, value) {
    this._props.set(name, value);
  }

  _reset() {
    if (this._props.size) {
      this._props.clear();
    }

    if (this._streams.size) {
      this._streams.clear();
    }

    this._geometry = null;
  }

}
//# sourceMappingURL=xviz-object.js.map