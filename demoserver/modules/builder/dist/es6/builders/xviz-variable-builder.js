import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { CATEGORY } from './constant';
import XVIZBaseBuilder from './xviz-base-builder';
export default class XVIZVariableBuilder extends XVIZBaseBuilder {
  constructor(props) {
    super(_objectSpread(_objectSpread({}, props), {}, {
      category: CATEGORY.VARIABLE
    }));
    this._data = new Map();
    this._id = null;
    this._values = null;
  }

  id(identifier) {
    this.validatePropSetOnce('_id');
    this._id = identifier;
    return this;
  }

  values(values) {
    this.validatePropSetOnce('_values');

    if (!(values instanceof Array)) {
      this.validateError('Input `values` must be array');
    }

    this._values = values;
    return this;
  }

  getData() {
    this._flush();

    if (this._data.size === 0) {
      return null;
    }

    const variablesData = {};

    for (const [streamId, ids] of this._data) {
      const variables = [];
      ids.forEach(entry => variables.push(entry));
      variablesData[streamId] = {
        variables
      };
    }

    return variablesData;
  }

  _addVariableEntry() {
    if (!this._dataPending()) {
      return;
    }

    let fieldName = 'doubles';
    const value = this._values[0];

    if (typeof value === 'string' || value instanceof String) {
      fieldName = 'strings';
    } else if (typeof value === 'boolean') {
      fieldName = 'bools';
    }

    const entry = {
      values: {
        [fieldName]: this._values
      }
    };

    if (this._id) {
      entry.base = {
        object_id: this._id
      };
    }

    const streamEntry = this._data.get(this._streamId);

    if (streamEntry) {
      const idEntry = streamEntry.get(this._id);

      if (idEntry) {
        this.validateError("Input `values` already set for id ".concat(this._id));
      } else {
        streamEntry.set(this._id, entry);
      }
    } else {
      const idEntry = new Map();
      idEntry.set(this._id, entry);

      this._data.set(this._streamId, idEntry);
    }
  }

  _dataPending() {
    return this._values !== null || this._id !== null;
  }

  _validate() {
    if (this._dataPending()) {
      super._validate();

      if (this._values === null) {
        this.validateWarn("Stream".concat(this._streamId, " values are not provided."));
      }
    }
  }

  _flush() {
    this._validate();

    this._addVariableEntry();

    this._reset();
  }

  _reset() {
    this._id = null;
    this._values = null;
  }

}
//# sourceMappingURL=xviz-variable-builder.js.map