import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import { Table, TreeTable, Tooltip } from '@streetscape.gl/monochrome';
import PropTypes from 'prop-types';
import connectToLog from '../connect';

class XVIZTableComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = _objectSpread({}, this._formatData(props));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columns !== this.props.columns || nextProps.nodes !== this.props.nodes) {
      this.setState(this._formatData(nextProps));
    }
  }

  _formatData({
    columns,
    nodes,
    displayObjectId
  }) {
    if (!columns || !nodes) {
      return {
        columns: null
      };
    }

    columns = columns.map(col => ({
      name: col.display_text,
      type: col.type
    }));
    const rowIds = {};
    const rows = [];
    nodes.forEach(node => {
      const row = {
        data: node.column_values || [],
        children: []
      };
      rowIds[node.id] = row;

      if (!node.hasOwnProperty('parent') || node.parent === undefined) {
        rows.push(row);
      } else {
        const parentRow = rowIds[node.parent];

        if (parentRow) {
          parentRow.children.push(row);
        }
      }
    });
    return {
      columns,
      rows
    };
  }

  render() {
    const {
      columns,
      rows
    } = this.state;

    if (!columns) {
      return null;
    }

    const {
      title,
      description,
      width,
      height,
      style,
      renderHeader,
      renderCell,
      indentSize,
      type
    } = this.props;
    const Component = type === 'table' ? Table : TreeTable;
    return React.createElement("div", {
      style: {
        width,
        height
      }
    }, React.createElement(Tooltip, {
      content: description
    }, React.createElement("h4", null, title)), React.createElement(Component, {
      width: "100%",
      height: "100%",
      style: style,
      renderHeader: renderHeader,
      renderCell: renderCell,
      indentSize: indentSize,
      columns: columns,
      rows: rows
    }));
  }

}

_defineProperty(XVIZTableComponent, "propTypes", {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  renderHeader: PropTypes.func,
  renderCell: PropTypes.func,
  indentSize: PropTypes.number,
  stream: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  displayObjectId: PropTypes.bool,
  columns: PropTypes.array,
  nodes: PropTypes.array
});

_defineProperty(XVIZTableComponent, "defaultProps", {
  width: '100%',
  height: 400,
  style: {},
  indentSize: 12,
  renderHeader: ({
    column
  }) => column.name,
  renderCell: ({
    value
  }) => value === null ? null : String(value)
});

const getLogState = (log, ownProps) => {
  const frame = log.getCurrentFrame();
  const data = frame && frame.streams[ownProps.stream];
  return data && data.treetable;
};

export default connectToLog({
  getLogState,
  Component: XVIZTableComponent
});
//# sourceMappingURL=xviz-table.js.map