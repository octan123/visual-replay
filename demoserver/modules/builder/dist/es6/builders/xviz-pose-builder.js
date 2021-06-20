import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import XVIZBaseBuilder from './xviz-base-builder';
import { CATEGORY } from './constant';
export default class XVIZPoseBuilder extends XVIZBaseBuilder {
  constructor(props) {
    super(_objectSpread(_objectSpread({}, props), {}, {
      category: CATEGORY.POSE
    }));
    this._poses = null;
  }

  mapOrigin(longitude, latitude, altitude) {
    this._map_origin = {
      longitude,
      latitude,
      altitude
    };
    return this;
  }

  position(x, y, z) {
    this._position = [x, y, z];
    return this;
  }

  orientation(roll, pitch, yaw) {
    this._orientation = [roll, pitch, yaw];
    return this;
  }

  timestamp(timestamp) {
    this._timestamp = timestamp;
    return this;
  }

  _flush() {
    if (!this._poses) {
      this._poses = {};
    }

    const data = {};

    if (this._timestamp) {
      data.timestamp = this._timestamp;
    }

    if (this._map_origin) {
      data.map_origin = this._map_origin;
    }

    if (this._position) {
      data.position = this._position;
    }

    if (this._orientation) {
      data.orientation = this._orientation;
    }

    this._poses[this._streamId] = data;
  }

  reset() {
    super.reset();
    this._timestamp = null;
    this._map_origin = null;
    this._position = null;
    this._orientation = null;
  }

  getData() {
    if (this._streamId) {
      this._flush();
    }

    return {
      poses: this._poses
    };
  }

}
//# sourceMappingURL=xviz-pose-builder.js.map