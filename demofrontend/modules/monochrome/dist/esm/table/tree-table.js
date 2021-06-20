import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '../shared/theme';
import { Table } from './table';
import TreeTableRow from './tree-table-row';

var TreeTable = function (_Table) {
  _inherits(TreeTable, _Table);

  var _super = _createSuper(TreeTable);

  function TreeTable(props) {
    var _this;

    _classCallCheck(this, TreeTable);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_isRowExpanded", function (id) {
      return _this.state.expanded[id];
    });

    _defineProperty(_assertThisInitialized(_this), "_toggleRowExpansion", function (id, rootId) {
      var expanded = _this.state.expanded;

      var rows = _this.formatRows(_this.props.rows, _this.state.sortFunc);

      expanded[id] = !expanded[id];
      var rootRowIndex = rows.findIndex(function (row) {
        return row.id === rootId;
      });

      _this._cache.clear(rootRowIndex);

      _this._list.recomputeRowHeights(rootRowIndex);
    });

    _this.state.expanded = {};
    return _this;
  }

  _createClass(TreeTable, [{
    key: "_renderRow",
    value: function _renderRow(_ref) {
      var key = _ref.key,
          index = _ref.index,
          style = _ref.style;
      var _this$props = this.props,
          indentSize = _this$props.indentSize,
          renderCell = _this$props.renderCell,
          theme = _this$props.theme,
          userStyle = _this$props.style;
      var rows = this.formatRows(this.props.rows, this.state.sortFunc);
      var row = rows[index];
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
  }]);

  return TreeTable;
}(Table);

_defineProperty(TreeTable, "propTypes", _objectSpread(_objectSpread({}, Table.propTypes), {}, {
  indentSize: PropTypes.number
}));

_defineProperty(TreeTable, "defaultProps", _objectSpread(_objectSpread({}, Table.defaultProps), {}, {
  indentSize: 12
}));

export default withTheme(TreeTable);
//# sourceMappingURL=tree-table.js.map