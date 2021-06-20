"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Table = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AutoSizer = _interopRequireDefault(require("react-virtualized/dist/commonjs/AutoSizer"));

var _List = _interopRequireDefault(require("react-virtualized/dist/commonjs/List"));

var _CellMeasurer = _interopRequireWildcard(require("react-virtualized/dist/commonjs/CellMeasurer"));

var _theme = require("../shared/theme");

var _memoize = _interopRequireDefault(require("../utils/memoize"));

var _tableHeader = _interopRequireDefault(require("./table-header"));

var _tableRow = _interopRequireDefault(require("./table-row"));

var _styledComponents = require("./styled-components");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Table = function (_PureComponent) {
  (0, _inherits2["default"])(Table, _PureComponent);

  var _super = _createSuper(Table);

  function Table(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Table);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onHeaderResize", function (columns) {
      _this.setState({
        columns: columns
      }, _this._forceUpdate);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onSort", function (sortFunc) {
      var rows = _this.formatRows(_this.props.rows, _this.state.sortFunc);

      if (sortFunc) {
        rows.sort(sortFunc);
      }

      _this.setState({
        sortFunc: sortFunc
      });

      _this._forceUpdate();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_forceUpdate", function () {
      if (_this._list) {
        _this._cache.clearAll();

        _this._list.forceUpdateGrid();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderRowMeasurer", function (_ref) {
      var key = _ref.key,
          parent = _ref.parent,
          index = _ref.index,
          style = _ref.style;
      return _react["default"].createElement(_CellMeasurer["default"], {
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
    _this.formatRows = (0, _memoize["default"])(_this._formatRows);
    _this._cache = new _CellMeasurer.CellMeasurerCache({
      fixedWidth: true
    });
    return _this;
  }

  (0, _createClass2["default"])(Table, [{
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
      return _react["default"].createElement(_tableRow["default"], {
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

      return _react["default"].createElement(_List["default"], {
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
      return _react["default"].createElement(_styledComponents.WrapperComponent, {
        style: {
          width: width,
          height: height
        },
        theme: theme,
        userStyle: style.wrapper
      }, _react["default"].createElement(_tableHeader["default"], {
        theme: theme,
        userStyle: style,
        columns: columns,
        renderHeader: renderHeader,
        onSort: this._onSort,
        onResize: this._onHeaderResize
      }), _react["default"].createElement(_styledComponents.TableBody, {
        theme: theme,
        userStyle: style.body
      }, _react["default"].createElement(_AutoSizer["default"], null, this._renderBody.bind(this))));
    }
  }]);
  return Table;
}(_react.PureComponent);

exports.Table = Table;
(0, _defineProperty2["default"])(Table, "propTypes", {
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  style: _propTypes["default"].object,
  columns: _propTypes["default"].array,
  rows: _propTypes["default"].array,
  renderHeader: _propTypes["default"].func,
  renderCell: _propTypes["default"].func
});
(0, _defineProperty2["default"])(Table, "defaultProps", {
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

var _default = (0, _theme.withTheme)(Table);

exports["default"] = _default;
//# sourceMappingURL=table.js.map