"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _autosizer = _interopRequireDefault(require("../shared/autosizer"));

var _memoize = _interopRequireDefault(require("../utils/memoize"));

var _styledComponents = require("./styled-components");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SORT = {
  NONE: 0,
  ASCEND: 1,
  DESCEND: 2
};

var TableHeader = function (_PureComponent) {
  (0, _inherits2["default"])(TableHeader, _PureComponent);

  var _super = _createSuper(TableHeader);

  function TableHeader(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TableHeader);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onResize", function () {
      var columns = _this.formatColumns(_this.props.columns);

      columns.map(function (col, colIndex) {
        var ref = _this._cells[colIndex];

        if (ref) {
          col.width = ref.clientWidth;
        }
      });

      _this.props.onResize(columns);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_sortColumn", function (index) {
      var columns = _this.formatColumns(_this.props.columns);

      var sortType = columns[index].sort === SORT.ASCEND ? SORT.DESCEND : SORT.ASCEND;
      columns.forEach(function (col, colIndex) {
        col.sort = colIndex === index ? sortType : SORT.NONE;
      });
      var multiplier = sortType === SORT.ASCEND ? 1 : -1;

      var sortFunc = function sortFunc(row1, row2) {
        return row1.data[index] <= row2.data[index] ? -multiplier : multiplier;
      };

      _this.props.onSort(sortFunc);

      _this.forceUpdate();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderColumn", function (column, colIndex) {
      var _this$props = _this.props,
          renderHeader = _this$props.renderHeader,
          theme = _this$props.theme,
          userStyle = _this$props.userStyle;
      var styleProps = {
        theme: theme,
        isAscending: column.sort === SORT.ASCEND,
        isDescending: column.sort === SORT.DESCEND
      };
      var icon = null;

      if (styleProps.isAscending) {
        icon = userStyle.iconAscending || '↑';
      } else if (styleProps.isDescending) {
        icon = userStyle.iconDescending || '↓';
      }

      return _react["default"].createElement(_styledComponents.HeaderCell, (0, _extends2["default"])({}, styleProps, {
        userStyle: userStyle.headerCell,
        style: {
          width: column.defaultWidth
        },
        key: colIndex,
        index: colIndex,
        ref: function ref(cell) {
          _this._cells[colIndex] = cell;
        },
        onClick: function onClick() {
          return _this._sortColumn(colIndex);
        }
      }), renderHeader({
        column: column.srcObject,
        columnIndex: colIndex
      }), icon && _react["default"].createElement(_styledComponents.SortIcon, (0, _extends2["default"])({}, styleProps, {
        userStyle: userStyle.sort
      }), icon));
    });
    _this.formatColumns = (0, _memoize["default"])(_this._formatColumns);
    _this._cells = [];
    return _this;
  }

  (0, _createClass2["default"])(TableHeader, [{
    key: "_formatColumns",
    value: function _formatColumns(columns) {
      var totalWeight = 0;
      var weights = [];
      columns.forEach(function (col, colIndex) {
        var weight = 1;

        if (colIndex === 0) {
          weight++;
        }

        if (col.type === 'string') {
          weight++;
        }

        weights[colIndex] = weight;
        totalWeight += weight;
      });
      return columns.map(function (col, colIndex) {
        return {
          srcObject: col,
          name: col.name,
          type: col.type,
          sort: SORT.NONE,
          defaultWidth: "".concat(100 / totalWeight * weights[colIndex], "%")
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          userStyle = _this$props2.userStyle;
      var columns = this.formatColumns(this.props.columns);
      return _react["default"].createElement(_styledComponents.HeaderContainer, {
        theme: theme,
        userStyle: userStyle.header
      }, columns.map(this._renderColumn), _react["default"].createElement(_autosizer["default"], {
        onResize: this._onResize,
        debounceTime: 200
      }));
    }
  }]);
  return TableHeader;
}(_react.PureComponent);

exports["default"] = TableHeader;
(0, _defineProperty2["default"])(TableHeader, "propTypes", {
  columns: _propTypes["default"].arrayOf(_propTypes["default"].object),
  renderHeader: _propTypes["default"].func,
  onSort: _propTypes["default"].func,
  onResize: _propTypes["default"].func
});
//# sourceMappingURL=table-header.js.map