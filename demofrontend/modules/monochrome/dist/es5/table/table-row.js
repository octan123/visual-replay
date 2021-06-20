"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = require("./styled-components");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TableRow = function (_PureComponent) {
  (0, _inherits2["default"])(TableRow, _PureComponent);

  var _super = _createSuper(TableRow);

  function TableRow() {
    (0, _classCallCheck2["default"])(this, TableRow);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(TableRow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          id = _this$props.id,
          index = _this$props.index,
          data = _this$props.data,
          theme = _this$props.theme,
          userStyle = _this$props.userStyle,
          columns = _this$props.columns,
          style = _this$props.style,
          renderCell = _this$props.renderCell;
      return _react["default"].createElement("div", {
        style: style
      }, _react["default"].createElement(_styledComponents.TableRowComponent, {
        theme: theme,
        index: index,
        userStyle: userStyle.row
      }, data.data.map(function (colValue, colIndex) {
        var column = columns[colIndex];
        return _react["default"].createElement(_styledComponents.TableCell, {
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
  }]);
  return TableRow;
}(_react.PureComponent);

exports["default"] = TableRow;
(0, _defineProperty2["default"])(TableRow, "propTypes", {
  id: _propTypes["default"].string,
  data: _propTypes["default"].shape({
    data: _propTypes["default"].array
  }),
  style: _propTypes["default"].object,
  renderCell: _propTypes["default"].func,
  columns: _propTypes["default"].array
});
//# sourceMappingURL=table-row.js.map