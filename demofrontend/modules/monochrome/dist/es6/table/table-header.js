import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from '../shared/autosizer';
import memoize from '../utils/memoize';
import { HeaderContainer, HeaderCell, SortIcon } from './styled-components';
const SORT = {
  NONE: 0,
  ASCEND: 1,
  DESCEND: 2
};
export default class TableHeader extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onResize", () => {
      const columns = this.formatColumns(this.props.columns);
      columns.map((col, colIndex) => {
        const ref = this._cells[colIndex];

        if (ref) {
          col.width = ref.clientWidth;
        }
      });
      this.props.onResize(columns);
    });

    _defineProperty(this, "_sortColumn", index => {
      const columns = this.formatColumns(this.props.columns);
      const sortType = columns[index].sort === SORT.ASCEND ? SORT.DESCEND : SORT.ASCEND;
      columns.forEach((col, colIndex) => {
        col.sort = colIndex === index ? sortType : SORT.NONE;
      });
      const multiplier = sortType === SORT.ASCEND ? 1 : -1;

      const sortFunc = (row1, row2) => {
        return row1.data[index] <= row2.data[index] ? -multiplier : multiplier;
      };

      this.props.onSort(sortFunc);
      this.forceUpdate();
    });

    _defineProperty(this, "_renderColumn", (column, colIndex) => {
      const {
        renderHeader,
        theme,
        userStyle
      } = this.props;
      const styleProps = {
        theme,
        isAscending: column.sort === SORT.ASCEND,
        isDescending: column.sort === SORT.DESCEND
      };
      let icon = null;

      if (styleProps.isAscending) {
        icon = userStyle.iconAscending || '↑';
      } else if (styleProps.isDescending) {
        icon = userStyle.iconDescending || '↓';
      }

      return React.createElement(HeaderCell, _extends({}, styleProps, {
        userStyle: userStyle.headerCell,
        style: {
          width: column.defaultWidth
        },
        key: colIndex,
        index: colIndex,
        ref: cell => {
          this._cells[colIndex] = cell;
        },
        onClick: () => this._sortColumn(colIndex)
      }), renderHeader({
        column: column.srcObject,
        columnIndex: colIndex
      }), icon && React.createElement(SortIcon, _extends({}, styleProps, {
        userStyle: userStyle.sort
      }), icon));
    });

    this.formatColumns = memoize(this._formatColumns);
    this._cells = [];
  }

  _formatColumns(columns) {
    let totalWeight = 0;
    const weights = [];
    columns.forEach((col, colIndex) => {
      let weight = 1;

      if (colIndex === 0) {
        weight++;
      }

      if (col.type === 'string') {
        weight++;
      }

      weights[colIndex] = weight;
      totalWeight += weight;
    });
    return columns.map((col, colIndex) => ({
      srcObject: col,
      name: col.name,
      type: col.type,
      sort: SORT.NONE,
      defaultWidth: "".concat(100 / totalWeight * weights[colIndex], "%")
    }));
  }

  render() {
    const {
      theme,
      userStyle
    } = this.props;
    const columns = this.formatColumns(this.props.columns);
    return React.createElement(HeaderContainer, {
      theme: theme,
      userStyle: userStyle.header
    }, columns.map(this._renderColumn), React.createElement(AutoSizer, {
      onResize: this._onResize,
      debounceTime: 200
    }));
  }

}

_defineProperty(TableHeader, "propTypes", {
  columns: PropTypes.arrayOf(PropTypes.object),
  renderHeader: PropTypes.func,
  onSort: PropTypes.func,
  onResize: PropTypes.func
});
//# sourceMappingURL=table-header.js.map