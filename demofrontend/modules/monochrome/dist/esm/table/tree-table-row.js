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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TableRowComponent, TableCell, Expander } from './styled-components';

var TreeTableRow = function (_PureComponent) {
  _inherits(TreeTableRow, _PureComponent);

  var _super = _createSuper(TreeTableRow);

  function TreeTableRow() {
    var _this;

    _classCallCheck(this, TreeTableRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_renderItem", function (_ref) {
      var id = _ref.id,
          index = _ref.index,
          _ref$depth = _ref.depth,
          depth = _ref$depth === void 0 ? 0 : _ref$depth,
          key = _ref.key,
          data = _ref.data,
          style = _ref.style;
      var _this$props = _this.props,
          indentSize = _this$props.indentSize,
          columns = _this$props.columns,
          theme = _this$props.theme,
          userStyle = _this$props.userStyle,
          renderCell = _this$props.renderCell,
          getIsExpanded = _this$props.getIsExpanded;
      var isExpanded = getIsExpanded(id);
      var hasChildren = data.children.length > 0;
      var indent = indentSize * (depth + 1);
      return React.createElement("div", {
        key: key,
        style: style
      }, React.createElement(TableRowComponent, {
        theme: theme,
        index: index,
        userStyle: userStyle.row
      }, hasChildren && React.createElement(Expander, {
        key: "toggle",
        isExpanded: isExpanded,
        theme: theme,
        userStyle: userStyle.expander,
        style: {
          marginLeft: indent
        },
        onClick: function onClick() {
          return _this._toggleExpansion(id);
        }
      }, isExpanded ? userStyle.iconExpanded || '▾' : userStyle.iconCollapsed || '▸'), React.createElement("div", {
        style: {
          flexShrink: 0,
          width: indent
        }
      }), data.data.map(function (colValue, colIndex) {
        var column = columns[colIndex];
        var width = colIndex === 0 ? column.width - indent : column.width;
        return React.createElement(TableCell, {
          key: colIndex,
          index: colIndex,
          style: {
            width: width
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
      })), hasChildren && isExpanded && data.children.map(function (row, rowIndex) {
        return _this._renderItem({
          depth: depth + 1,
          id: "".concat(id, ".").concat(rowIndex),
          index: rowIndex,
          key: rowIndex,
          data: row
        });
      }));
    });

    return _this;
  }

  _createClass(TreeTableRow, [{
    key: "_toggleExpansion",
    value: function _toggleExpansion(id) {
      this.props.toggleExpansion(id, this.props.id);
    }
  }, {
    key: "render",
    value: function render() {
      return this._renderItem(_objectSpread({}, this.props));
    }
  }]);

  return TreeTableRow;
}(PureComponent);

_defineProperty(TreeTableRow, "propTypes", {
  id: PropTypes.string,
  data: PropTypes.shape({
    data: PropTypes.array,
    children: PropTypes.array
  }),
  style: PropTypes.object,
  indentSize: PropTypes.number,
  renderCell: PropTypes.func,
  columns: PropTypes.array,
  getIsExpanded: PropTypes.func,
  toggleExpansion: PropTypes.func
});

export { TreeTableRow as default };
//# sourceMappingURL=tree-table-row.js.map