"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = require("./styled-components");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TreeTableRow = function (_PureComponent) {
  (0, _inherits2["default"])(TreeTableRow, _PureComponent);

  var _super = _createSuper(TreeTableRow);

  function TreeTableRow() {
    var _this;

    (0, _classCallCheck2["default"])(this, TreeTableRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderItem", function (_ref) {
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
      return _react["default"].createElement("div", {
        key: key,
        style: style
      }, _react["default"].createElement(_styledComponents.TableRowComponent, {
        theme: theme,
        index: index,
        userStyle: userStyle.row
      }, hasChildren && _react["default"].createElement(_styledComponents.Expander, {
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
      }, isExpanded ? userStyle.iconExpanded || '▾' : userStyle.iconCollapsed || '▸'), _react["default"].createElement("div", {
        style: {
          flexShrink: 0,
          width: indent
        }
      }), data.data.map(function (colValue, colIndex) {
        var column = columns[colIndex];
        var width = colIndex === 0 ? column.width - indent : column.width;
        return _react["default"].createElement(_styledComponents.TableCell, {
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

  (0, _createClass2["default"])(TreeTableRow, [{
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
}(_react.PureComponent);

exports["default"] = TreeTableRow;
(0, _defineProperty2["default"])(TreeTableRow, "propTypes", {
  id: _propTypes["default"].string,
  data: _propTypes["default"].shape({
    data: _propTypes["default"].array,
    children: _propTypes["default"].array
  }),
  style: _propTypes["default"].object,
  indentSize: _propTypes["default"].number,
  renderCell: _propTypes["default"].func,
  columns: _propTypes["default"].array,
  getIsExpanded: _propTypes["default"].func,
  toggleExpansion: _propTypes["default"].func
});
//# sourceMappingURL=tree-table-row.js.map