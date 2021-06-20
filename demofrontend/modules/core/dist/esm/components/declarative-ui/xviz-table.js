import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import { Table, TreeTable, Tooltip } from '@streetscape.gl/monochrome';
import PropTypes from 'prop-types';
import connectToLog from '../connect';

var XVIZTableComponent = function (_PureComponent) {
  _inherits(XVIZTableComponent, _PureComponent);

  var _super = _createSuper(XVIZTableComponent);

  function XVIZTableComponent(props) {
    var _this;

    _classCallCheck(this, XVIZTableComponent);

    _this = _super.call(this, props);
    _this.state = _objectSpread({}, _this._formatData(props));
    return _this;
  }

  _createClass(XVIZTableComponent, [{
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
      var Component = type === 'table' ? Table : TreeTable;
      return React.createElement("div", {
        style: {
          width: width,
          height: height
        }
      }, React.createElement(Tooltip, {
        content: description
      }, React.createElement("h4", null, title)), React.createElement(Component, {
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
}(PureComponent);

_defineProperty(XVIZTableComponent, "propTypes", {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  renderHeader: PropTypes.func,
  renderCell: PropTypes.func,
  indentSize: PropTypes.number,
  stream: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  displayObjectId: PropTypes.bool,
  columns: PropTypes.array,
  nodes: PropTypes.array
});

_defineProperty(XVIZTableComponent, "defaultProps", {
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

export default connectToLog({
  getLogState: getLogState,
  Component: XVIZTableComponent
});
//# sourceMappingURL=xviz-table.js.map