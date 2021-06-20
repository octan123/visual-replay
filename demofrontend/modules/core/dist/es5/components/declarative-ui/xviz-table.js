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

var _monochrome = require("@streetscape.gl/monochrome");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _connect = _interopRequireDefault(require("../connect"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var XVIZTableComponent = function (_PureComponent) {
  (0, _inherits2["default"])(XVIZTableComponent, _PureComponent);

  var _super = _createSuper(XVIZTableComponent);

  function XVIZTableComponent(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, XVIZTableComponent);
    _this = _super.call(this, props);
    _this.state = _objectSpread({}, _this._formatData(props));
    return _this;
  }

  (0, _createClass2["default"])(XVIZTableComponent, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.columns !== this.props.columns || nextProps.nodes !== this.props.nodes) {
        this.setState(this._formatData(nextProps));
      }
    }
  }, {
    key: "_formatData",
    value: function _formatData(_ref) {
      var columns = _ref.columns,
          nodes = _ref.nodes,
          displayObjectId = _ref.displayObjectId;

      if (!columns || !nodes) {
        return {
          columns: null
        };
      }

      columns = columns.map(function (col) {
        return {
          name: col.display_text,
          type: col.type
        };
      });
      var rowIds = {};
      var rows = [];
      nodes.forEach(function (node) {
        var row = {
          data: node.column_values || [],
          children: []
        };
        rowIds[node.id] = row;

        if (!node.hasOwnProperty('parent') || node.parent === undefined) {
          rows.push(row);
        } else {
          var parentRow = rowIds[node.parent];

          if (parentRow) {
            parentRow.children.push(row);
          }
        }
      });
      return {
        columns: columns,
        rows: rows
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          columns = _this$state.columns,
          rows = _this$state.rows;

      if (!columns) {
        return null;
      }

      var _this$props = this.props,
          title = _this$props.title,
          description = _this$props.description,
          width = _this$props.width,
          height = _this$props.height,
          style = _this$props.style,
          renderHeader = _this$props.renderHeader,
          renderCell = _this$props.renderCell,
          indentSize = _this$props.indentSize,
          type = _this$props.type;
      var Component = type === 'table' ? _monochrome.Table : _monochrome.TreeTable;
      return _react["default"].createElement("div", {
        style: {
          width: width,
          height: height
        }
      }, _react["default"].createElement(_monochrome.Tooltip, {
        content: description
      }, _react["default"].createElement("h4", null, title)), _react["default"].createElement(Component, {
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
  }]);
  return XVIZTableComponent;
}(_react.PureComponent);

(0, _defineProperty2["default"])(XVIZTableComponent, "propTypes", {
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  style: _propTypes["default"].object,
  renderHeader: _propTypes["default"].func,
  renderCell: _propTypes["default"].func,
  indentSize: _propTypes["default"].number,
  stream: _propTypes["default"].string,
  title: _propTypes["default"].string,
  description: _propTypes["default"].string,
  displayObjectId: _propTypes["default"].bool,
  columns: _propTypes["default"].array,
  nodes: _propTypes["default"].array
});
(0, _defineProperty2["default"])(XVIZTableComponent, "defaultProps", {
  width: '100%',
  height: 400,
  style: {},
  indentSize: 12,
  renderHeader: function renderHeader(_ref2) {
    var column = _ref2.column;
    return column.name;
  },
  renderCell: function renderCell(_ref3) {
    var value = _ref3.value;
    return value === null ? null : String(value);
  }
});

var getLogState = function getLogState(log, ownProps) {
  var frame = log.getCurrentFrame();
  var data = frame && frame.streams[ownProps.stream];
  return data && data.treetable;
};

var _default = (0, _connect["default"])({
  getLogState: getLogState,
  Component: XVIZTableComponent
});

exports["default"] = _default;
//# sourceMappingURL=xviz-table.js.map