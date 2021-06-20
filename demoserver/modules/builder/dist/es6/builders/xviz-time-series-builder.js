import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { CATEGORY } from './constant';
import XVIZBaseBuilder from './xviz-base-builder';
export default class XVIZTimeSeriesBuilder extends XVIZBaseBuilder {
  constructor(props) {
    super(_objectSpread(_objectSpread({}, props), {}, {
      category: CATEGORY.TIME_SERIES
    }));
    this._data = new Map();
    this._id = null;
    this._value = null;
    this._timestamp = null;
  }

  id(identifier) {
    this.validatePropSetOnce('_id');
    this._id = identifier;
    return this;
  }

  value(value) {
    this.validatePropSetOnce('_value');

    if (value instanceof Array) {
      this.validateError('Input `value` must be single value');
    }

    this._value = value;
    return this;
  }

  timestamp(timestamp) {
    this.validatePropSetOnce('_timestamp');

    if (timestamp instanceof Array) {
      this.validateError('Input `timestamp` must be a single value');
    }

    this._timestamp = timestamp;
    return this;
  }

  getData() {
    this._flush();

    if (this._data.size === 0) {
      return null;
    }

    const timeSeriesData = [];

    for (const [timestamp, ids] of this._data) {
      for (const [id, fields] of ids) {
        for (const tsdata of fields.values()) {
          const entry = {
            timestamp,
            streams: tsdata.streams,
            values: tsdata.values
          };

          if (id !== null) {
            entry.object_id = id;
          }

          timeSeriesData.push(entry);
        }
      }
    }

    return timeSeriesData;
  }

  _addTimestampEntry() {
    if (!this._dataPending()) {
      return;
    }

    let fieldName = 'doubles';

    if (typeof this._value === 'string' || this._value instanceof String) {
      fieldName = 'strings';
    } else if (typeof this._value === 'boolean') {
      fieldName = 'bools';
    }

    let tsEntry = this._data.get(this._timestamp);

    if (tsEntry) {
      const idEntry = tsEntry.get(this._id);

      if (idEntry) {
        const fieldEntry = idEntry.get(fieldName);

        if (fieldEntry) {
          fieldEntry.streams.push(this._streamId);
          fieldEntry.values[fieldName].push(this._value);
        } else {
          idEntry.set(fieldName, this._getFieldEntry(fieldName));
        }
      } else {
        tsEntry.set(this._id, this._getIdEntry(fieldName));
      }
    } else {
      tsEntry = new Map();
      tsEntry.set(this._id, this._getIdEntry(fieldName));

      this._data.set(this._timestamp, tsEntry);
    }
  }

  _getIdEntry(fieldName) {
    const idEntry = new Map();
    idEntry.set(fieldName, this._getFieldEntry(fieldName));
    return idEntry;
  }

  _getFieldEntry(fieldName) {
    return {
      streams: [this._streamId],
      values: {
        [fieldName]: [this._value]
      }
    };
  }

  _dataPending() {
    return this._value !== null || this._timestamp !== null || this._id !== null;
  }

  _validate() {
    if (this._dataPending()) {
      super._validate();

      if (this._value === null) {
        this.validateWarn("Stream ".concat(this._streamId, " value is not provided."));
      }

      if (this._timestamp === null) {
        this.validateWarn("Stream ".concat(this._streamId, " timestamp is not provided."));
      }
    }
  }

  _flush() {
    this._validate();

    this._addTimestampEntry();

    this._reset();
  }

  _reset() {
    this._id = null;
    this._value = null;
    this._timestamp = null;
  }

}
//# sourceMappingURL=xviz-time-series-builder.js.map