import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import CellMeasurer, { CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer';
import { withTheme } from '../shared/theme';
import memoize from '../utils/memoize';
import TableHeader from './table-header';
import TableRow from './table-row';
import { WrapperComponent, TableBody } from './styled-components';
export class Table extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onHeaderResize", columns => {
      this.setState({
        columns
      }, this._forceUpdate);
    });

    _defineProperty(this, "_onSort", sortFunc => {
      const rows = this.formatRows(this.props.rows, this.state.sortFunc);

      if (sortFunc) {
        rows.sort(sortFunc);
      }

      this.setState({
        sortFunc
      });

      this._forceUpdate();
    });

    _defineProperty(this, "_forceUpdate", () => {
      if (this._list) {
        this._cache.clearAll();

        this._list.forceUpdateGrid();
      }
    });

    _defineProperty(this, "_renderRowMeasurer", ({
      key,
      parent,
      index,
      style
    }) => {
      return React.createElement(CellMeasurer, {
        cache: this._cache,
        parent: parent,
        key: key,
        rowIndex: index,
        collumnIndex: 0
      }, () => this._renderRow({
        key,
        index,
        style
      }));
    });

    this.state = {
      columns: null,
      sortFunc: null
    };
    this.formatRows = memoize(this._formatRows);
    this._cache = new CellMeasurerCache({
      fixedWidth: true
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.rows !== prevProps.rows) {
      this._forceUpdate();
    }
  }

  _formatRows(rows, sortFunc) {
    rows = rows.map((row, rowIndex) => ({
      srcObject: row,
      data: row.data,
      children: row.children,
      id: String(rowIndex)
    }));

    if (sortFunc) {
      rows.sort(sortFunc);
    }

    return rows;
  }

  _renderRow({
    key,
    index,
    style
  }) {
    const {
      renderCell,
      theme,
      style: userStyle
    } = this.props;
    const rows = this.formatRows(this.props.rows, this.state.sortFunc);
    const row = rows[index];
    return React.createElement(TableRow, {
      key: key,
      id: row.id,
      index: index,
      data: row,
      style: style,
      theme: theme,
      userStyle: userStyle,
      renderCell: renderCell,
      columns: this.state.columns
    });
  }

  _renderBody({
    width,
    height
  }) {
    const {
      columns
    } = this.state;
    const rows = this.formatRows(this.props.rows, this.state.sortFunc);

    if (!columns) {
      return null;
    }

    return React.createElement(List, {
      ref: list => {
        this._list = list;
      },
      tabIndex: null,
      height: height,
      rowCount: rows.length,
      rowHeight: this._cache.rowHeight,
      rowRenderer: this._renderRowMeasurer,
      width: width
    });
  }

  render() {
    const {
      theme,
      width,
      height,
      style,
      columns,
      renderHeader
    } = this.props;
    return React.createElement(WrapperComponent, {
      style: {
        width,
        height
      },
      theme: theme,
      userStyle: style.wrapper
    }, React.createElement(TableHeader, {
      theme: theme,
      userStyle: style,
      columns: columns,
      renderHeader: renderHeader,
      onSort: this._onSort,
      onResize: this._onHeaderResize
    }), React.createElement(TableBody, {
      theme: theme,
      userStyle: style.body
    }, React.createElement(AutoSizer, null, this._renderBody.bind(this))));
  }

}

_defineProperty(Table, "propTypes", {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  columns: PropTypes.array,
  rows: PropTypes.array,
  renderHeader: PropTypes.func,
  renderCell: PropTypes.func
});

_defineProperty(Table, "defaultProps", {
  width: '100%',
  height: 400,
  style: {},
  rows: [],
  renderHeader: ({
    column
  }) => column.name,
  renderCell: ({
    value
  }) => value === null ? null : String(value)
});

export default withTheme(Table);
//# sourceMappingURL=table.js.map