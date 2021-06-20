import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import XVIZBaseBuilder from './xviz-base-builder';
import { CATEGORY, PRIMITIVE_TYPES } from './constant';

class XVIZTreeTableRowBuilder {
  constructor(id, values, parent = null) {
    this._parent = parent;
    this._id = id;
    this._values = values;
    this._children = [];
  }

  child(id, values) {
    const row = new XVIZTreeTableRowBuilder(id, values, this._id);

    this._children.push(row);

    return row;
  }

  getData() {
    const obj = {
      id: this._id
    };

    if (this._values) {
      obj.column_values = this._values;
    }

    if (this._parent !== null) {
      obj.parent = this._parent;
    }

    return [].concat.apply([obj], this._children.map(row => row.getData()));
  }

}

export default class XVIZUIPrimitiveBuilder extends XVIZBaseBuilder {
  constructor(props) {
    super(_objectSpread(_objectSpread({}, props), {}, {
      category: CATEGORY.UI_PRIMITIVE
    }));
    this.reset();
    this._primitives = {};
  }

  treetable(columns) {
    if (this._type) {
      this._flush();
    }

    this.validatePropSetOnce('_columns');
    this._columns = columns;
    this._type = PRIMITIVE_TYPES.treetable;
    return this;
  }

  row(id, values) {
    this.validatePropSetOnce('_id');
    const row = new XVIZTreeTableRowBuilder(id, values);

    this._rows.push(row);

    this._type = PRIMITIVE_TYPES.treetable;
    return row;
  }

  _validate() {
    super._validate();
  }

  _flush() {
    this._validate();

    this._flushPrimitives();
  }

  getData() {
    if (this._type) {
      this._flush();
    }

    if (Object.keys(this._primitives).length) {
      return this._primitives;
    }

    return null;
  }

  _flushPrimitives() {
    let stream = this._primitives[this._streamId];

    if (!stream) {
      stream = {};
      this._primitives[this._streamId] = stream;
    }

    let fieldName;
    let primitiveArray;

    switch (this._type) {
      case PRIMITIVE_TYPES.treetable:
        fieldName = this._type;

        if (!stream[fieldName]) {
          this._validator.hasProp(this, '_columns');

          stream[fieldName] = {
            columns: this._columns,
            nodes: []
          };
        }

        primitiveArray = stream[fieldName].nodes;
        break;

      default:
    }

    const primitives = this._formatPrimitives();

    if (primitives) {
      for (const primitive of primitives) {
        primitiveArray.push(primitive);
      }
    }

    this.reset();
  }

  _formatPrimitives() {
    switch (this._type) {
      case PRIMITIVE_TYPES.treetable:
        if (this._rows.length > 0) {
          return [].concat(...this._rows.map(row => row.getData()));
        }

        break;

      default:
    }

    return null;
  }

  reset() {
    this._type = null;
    this._columns = null;
    this._rows = [];
  }

}
//# sourceMappingURL=xviz-ui-primitive-builder.js.map