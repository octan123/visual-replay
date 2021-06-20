"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theme = require("../shared/theme");

var _table = require("./table");

var _treeTableRow = _interopRequireDefault(require("./tree-table-row"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TreeTable = function (_Table) {
  (0, _inherits2["default"])(TreeTable, _Table);

  var _super = _createSuper(TreeTable);

  function TreeTable(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TreeTable);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_isRowExpanded", function (id) {
      return _this.state.expanded[id];
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_toggleRowExpansion", function (id, rootId) {
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

  (0, _createClass2["default"])(TreeTable, [{
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
      return _react["default"].createElement(_treeTableRow["default"], {
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
}(_table.Table);

(0, _defineProperty2["default"])(TreeTable, "propTypes", _objectSpread(_objectSpread({}, _table.Table.propTypes), {}, {
  indentSize: _propTypes["default"].number
}));
(0, _defineProperty2["default"])(TreeTable, "defaultProps", _objectSpread(_objectSpread({}, _table.Table.defaultProps), {}, {
  indentSize: 12
}));

var _default = (0, _theme.withTheme)(TreeTable);

exports["default"] = _default;
//# sourceMappingURL=tree-table.js.map