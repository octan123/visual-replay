import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '../shared/theme';
import { Table } from './table';
import TreeTableRow from './tree-table-row';

class TreeTable extends Table {
  constructor(props) {
    super(props);

    _defineProperty(this, "_isRowExpanded", id => {
      return this.state.expanded[id];
    });

    _defineProperty(this, "_toggleRowExpansion", (id, rootId) => {
      const {
        expanded
      } = this.state;
      const rows = this.formatRows(this.props.rows, this.state.sortFunc);
      expanded[id] = !expanded[id];
      const rootRowIndex = rows.findIndex(row => row.id === rootId);

      this._cache.clear(rootRowIndex);

      this._list.recomputeRowHeights(rootRowIndex);
    });

    this.state.expanded = {};
  }

  _renderRow({
    key,
    index,
    style
  }) {
    const {
      indentSize,
      renderCell,
      theme,
      style: userStyle
    } = this.props;
    const rows = this.formatRows(this.props.rows, this.state.sortFunc);
    const row = rows[index];
    return React.createElement(TreeTableRow, {
      key: key,
      id: row.id,
      index: index,
      data: row,
      style: style,
      theme: theme,
      userStyle: userStyle,
      indentSize: indentSize,
      renderCell: renderCell,
      getIsExpanded: this._isRowExpanded,
      toggleExpansion: this._toggleRowExpansion,
      columns: this.state.columns
    });
  }

}

_defineProperty(TreeTable, "propTypes", _objectSpread(_objectSpread({}, Table.propTypes), {}, {
  indentSize: PropTypes.number
}));

_defineProperty(TreeTable, "defaultProps", _objectSpread(_objectSpread({}, Table.defaultProps), {}, {
  indentSize: 12
}));

export default withTheme(TreeTable);
//# sourceMappingURL=tree-table.js.map