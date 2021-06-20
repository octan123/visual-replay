import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
export var Table = function (_PureComponent) {
  _inherits(Table, _PureComponent);

  var _super = _createSuper(Table);

  function Table(props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_onHeaderResize", function (columns) {
      _this.setState({
        columns: columns
      }, _this._forceUpdate);
    });

    _defineProperty(_assertThisInitialized(_this), "_onSort", function (sortFunc) {
      var rows = _this.formatRows(_this.props.rows, _this.state.sortFunc);

      if (sortFunc) {
        rows.sort(sortFunc);
      }

      _this.setState({
        sortFunc: sortFunc
      });

      _this._forceUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "_forceUpdate", function () {
      if (_this._list) {
        _this._cache.clearAll();

        _this._list.forceUpdateGrid();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_renderRowMeasurer", function (_ref) {
      var key = _ref.key,
          parent = _ref.parent,
          index = _ref.index,
          style = _ref.style;
      return React.createElement(CellMeasurer, {
        cache: _this._cache,
        parent: parent,
        key: key,
        rowIndex: index,
        collumnIndex: 0
      }, function () {
        return _this._renderRow({
          key: key,
          index: index,
          style: style
        });
      });
    });

    _this.state = {
      columns: null,
      sortFunc: null
    };
    _this.formatRows = memoize(_this._formatRows);
    _this._cache = new CellMeasurerCache({
      fixedWidth: true
    });
    return _this;
  }

  _createClass(Table, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.rows !== prevProps.rows) {
        this._forceUpdate();
      }
    }
  }, {
    key: "_formatRows",
    value: function _formatRows(rows, sortFunc) {
      rows = rows.map(function (row, rowIndex) {
        return {
          srcObject: row,
          data: row.data,
          children: row.children,
          id: String(rowIndex)
        };
      });

      if (sortFunc) {
        rows.sort(sortFunc);
      }

      return rows;
    }
  }, {
    key: "_renderRow",
    value: function _renderRow(_ref2) {
      var key = _ref2.key,
          index = _ref2.index,
          style = _ref2.style;
      var _this$props = this.props,
          renderCell = _this$props.renderCell,
          theme = _this$props.theme,
          userStyle = _this$props.style;
      var rows = this.formatRows(this.props.rows, this.state.sortFunc);
      var row = rows[index];
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
  }, {
    key: "_renderBody",
    value: function _renderBody(_ref3) {
      var _this2 = this;

      var width = _ref3.width,
          height = _ref3.height;
      var columns = this.state.columns;
      var rows = this.formatRows(this.props.rows, this.state.sortFunc);

      if (!columns) {
        return null;
      }

      return React.createElement(List, {
        ref: function ref(list) {
          _this2._list = list;
        },
        tabIndex: null,
        height: height,
        rowCount: rows.length,
        rowHeight: this._cache.rowHeight,
        rowRenderer: this._renderRowMeasurer,
        width: width
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          width = _this$props2.width,
          height = _this$props2.height,
          style = _this$props2.style,
          columns = _this$props2.columns,
          renderHeader = _this$props2.renderHeader;
      return React.createElement(WrapperComponent, {
        style: {
          width: width,
          height: height
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
  }]);

  return Table;
}(PureComponent);

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
  renderHeader: function renderHeader(_ref4) {
    var column = _ref4.column;
    return column.name;
  },
  renderCell: function renderCell(_ref5) {
    var value = _ref5.value;
    return value === null ? null : String(value);
  }
});

export default withTheme(Table);
//# sourceMappingURL=table.js.map