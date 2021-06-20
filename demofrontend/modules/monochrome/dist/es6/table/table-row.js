import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TableRowComponent, TableCell } from './styled-components';
export default class TableRow extends PureComponent {
  render() {
    const {
      id,
      index,
      data,
      theme,
      userStyle,
      columns,
      style,
      renderCell
    } = this.props;
    return React.createElement("div", {
      style: style
    }, React.createElement(TableRowComponent, {
      theme: theme,
      index: index,
      userStyle: userStyle.row
    }, data.data.map((colValue, colIndex) => {
      const column = columns[colIndex];
      return React.createElement(TableCell, {
        key: colIndex,
        index: colIndex,
        style: {
          width: column.width
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
    })));
  }

}

_defineProperty(TableRow, "propTypes", {
  id: PropTypes.string,
  data: PropTypes.shape({
    data: PropTypes.array
  }),
  style: PropTypes.object,
  renderCell: PropTypes.func,
  columns: PropTypes.array
});
//# sourceMappingURL=table-row.js.map