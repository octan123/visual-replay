import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TableRowComponent, TableCell, Expander } from './styled-components';
export default class TreeTableRow extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_renderItem", ({
      id,
      index,
      depth = 0,
      key,
      data,
      style
    }) => {
      const {
        indentSize,
        columns,
        theme,
        userStyle,
        renderCell,
        getIsExpanded
      } = this.props;
      const isExpanded = getIsExpanded(id);
      const hasChildren = data.children.length > 0;
      const indent = indentSize * (depth + 1);
      return React.createElement("div", {
        key: key,
        style: style
      }, React.createElement(TableRowComponent, {
        theme: theme,
        index: index,
        userStyle: userStyle.row
      }, hasChildren && React.createElement(Expander, {
        key: "toggle",
        isExpanded: isExpanded,
        theme: theme,
        userStyle: userStyle.expander,
        style: {
          marginLeft: indent
        },
        onClick: () => this._toggleExpansion(id)
      }, isExpanded ? userStyle.iconExpanded || '▾' : userStyle.iconCollapsed || '▸'), React.createElement("div", {
        style: {
          flexShrink: 0,
          width: indent
        }
      }), data.data.map((colValue, colIndex) => {
        const column = columns[colIndex];
        const width = colIndex === 0 ? column.width - indent : column.width;
        return React.createElement(TableCell, {
          key: colIndex,
          index: colIndex,
          style: {
            width
          },
          title: "".concat(column.name, ": ").concat(colValue),
          theme: theme,
          userStyle: userStyle.cell
        }, renderCell({
          value: colValue,
          column: column.srcObject,
          columnIndex: colIndex,
          row: data.srcObject,
          rowId: id
        }));
      })), hasChildren && isExpanded && data.children.map((row, rowIndex) => this._renderItem({
        depth: depth + 1,
        id: "".concat(id, ".").concat(rowIndex),
        index: rowIndex,
        key: rowIndex,
        data: row
      })));
    });
  }

  _toggleExpansion(id) {
    this.props.toggleExpansion(id, this.props.id);
  }

  render() {
    return this._renderItem(_objectSpread({}, this.props));
  }

}

_defineProperty(TreeTableRow, "propTypes", {
  id: PropTypes.string,
  data: PropTypes.shape({
    data: PropTypes.array,
    children: PropTypes.array
  }),
  style: PropTypes.object,
  indentSize: PropTypes.number,
  renderCell: PropTypes.func,
  columns: PropTypes.array,
  getIsExpanded: PropTypes.func,
  toggleExpansion: PropTypes.func
});
//# sourceMappingURL=tree-table-row.js.map