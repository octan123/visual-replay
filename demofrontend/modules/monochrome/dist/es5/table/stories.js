"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookReadme = require("storybook-readme");

var _README = _interopRequireDefault(require("./README.md"));

var _index = require("./index");

var COLUMNS = [{
  name: 'Object ID',
  id: 0,
  type: 'string'
}, {
  name: 'Timestamp',
  id: 1,
  type: 'int'
}, {
  name: 'Source',
  id: 2,
  type: 'string'
}, {
  name: 'Index',
  id: 3,
  type: 'string'
}, {
  name: 'Promoted',
  id: 4,
  type: 'boolean'
}, {
  name: 'Anomaly',
  id: 5,
  type: 'boolean'
}];
var sources = 'US EU China Brazil India Turkey Japan'.split(' ');
var len = [8, 4, 4, 4, 12];
var id = [0, 0, 0, 0, 0];

var makeUuid = function makeUuid() {
  return id.map(function (d, i) {
    return String(d).padStart(len[i], '0');
  }).join('-');
};

var MAX_NODE_COUNT = 2000;
var nodeCount = 0;

var makeRandomData = function makeRandomData(depth) {
  id[depth]++;
  var childCount = depth < id.length - 1 && nodeCount < MAX_NODE_COUNT ? Math.round(1 / (depth + 1) / Math.random()) : 0;
  nodeCount += childCount;
  return {
    data: [makeUuid(), Date.now(), depth > 0 ? null : sources[Math.floor(Math.random() * sources.length)], depth > 0 ? null : id.reduce(function (sum, d) {
      return sum + d;
    }, 0).toString(), Math.random() < 0.3, Math.random() < 0.7],
    children: Array.from({
      length: childCount
    }, function () {
      return makeRandomData(depth + 1);
    })
  };
};

var ROWS = Array.from({
  length: 200
}, function () {
  return makeRandomData(0);
});
(0, _react2.storiesOf)('Table', module).addDecorator((0, _storybookReadme.withReadme)(_README["default"])).add('Table', function () {
  return _react["default"].createElement(_index.Table, {
    columns: COLUMNS,
    rows: ROWS
  });
}).add('TreeTable', function () {
  return _react["default"].createElement(_index.TreeTable, {
    columns: COLUMNS,
    rows: ROWS
  });
});
//# sourceMappingURL=stories.js.map