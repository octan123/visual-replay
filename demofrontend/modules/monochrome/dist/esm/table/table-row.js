import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TableRowComponent, TableCell } from './styled-components';

var TableRow = function (_PureComponent) {
  _inherits(TableRow, _PureComponent);

  var _super = _createSuper(TableRow);

  function TableRow() {
    _classCallCheck(this, TableRow);

    return _super.apply(this, arguments);
  }

  _createClass(TableRow, [{
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
      return React.createElement("div", {
        style: style
      }, React.createElement(TableRowComponent, {
        theme: theme,
        index: index,
        userStyle: userStyle.row
      }, data.data.map(function (colValue, colIndex) {
        var column = columns[colIndex];
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
  }]);

  return TableRow;
}(PureComponent);

_defineProperty(TableRow, "propTypes", {
  id: PropTypes.string,
  data: PropTypes.shape({
    data: PropTypes.array
  }),
  style: PropTypes.object,
  renderCell: PropTypes.func,
  columns: PropTypes.array
});

export { TableRow as default };
//# sourceMappingURL=table-row.js.map