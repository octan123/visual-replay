"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _react2 = require("@storybook/react");

var _storybookReadme = require("storybook-readme");

var _README = _interopRequireDefault(require("./README.md"));

var _index = require("./index");

var sampleData = {
  'Series 1': Array.from({
    length: 101
  }, function (d, i) {
    var x = i / 25;
    return [x, Math.sin(x * Math.PI)];
  }),
  'Series 2': Array.from({
    length: 101
  }, function (d, i) {
    var x = i / 25;
    return [x, Math.cos(x * Math.PI)];
  }),
  'Series 3': Array.from({
    length: 101
  }, function (d, i) {
    var x = i / 25;
    return [x, Math.sin(x * Math.PI) + 0.1, Math.sin(x * Math.PI) - 0.1];
  })
};
var lineColors = {
  'Series 1': '#004b78',
  'Series 2': '#907700',
  'Series 3': 'rgba(0, 80, 245, 0.5)'
};
var style = {
  margin: {
    left: 48,
    right: 20,
    top: 20,
    bottom: 48
  },
  crosshair: {
    background: 'rgba(0, 0, 0, 0.8)'
  }
};
var sampleData2 = {};

var _loop = function _loop(k) {
  sampleData2["Series ".concat(k)] = Array.from({
    length: 101
  }, function (d, i) {
    var x = i / 50;
    return [x, Math.pow(x, k / 2)];
  });
};

for (var k = 1; k <= 10; k++) {
  _loop(k);
}

(0, _react2.storiesOf)('MetricCard', module).addDecorator((0, _storybookReadme.withReadme)(_README["default"])).add('Basic example', function () {
  return _react["default"].createElement(_index.MetricCard, {
    title: "Example Metric Card",
    description: "This is an example metric card"
  }, _react["default"].createElement(_index.MetricChart, {
    height: 200,
    style: style,
    data: sampleData,
    unit: (0, _addonKnobs.text)('unit', 'm/s'),
    getX: function getX(d) {
      return d[0];
    },
    getY: function getY(d) {
      return d[1];
    },
    getY0: function getY0(d) {
      return d[2];
    },
    getColor: lineColors,
    formatTitle: function formatTitle(title) {
      return title;
    },
    formatValue: function formatValue(v) {
      return v.toFixed(3);
    },
    formatXTick: function formatXTick(x) {
      return "".concat(x, "\u03C0");
    },
    xTicks: (0, _addonKnobs.number)('xTicks', 3, {
      range: true,
      min: 0,
      max: 10,
      step: 1
    }),
    yTicks: (0, _addonKnobs.number)('yTicks', 5, {
      range: true,
      min: 0,
      max: 10,
      step: 1
    }),
    horizontalGridLines: (0, _addonKnobs.number)('horizontalGridLines', 5, {
      range: true,
      min: 0,
      max: 10,
      step: 1
    }),
    verticalGridLines: (0, _addonKnobs.number)('verticalGridLines', 0, {
      range: true,
      min: 0,
      max: 10,
      step: 1
    }),
    highlightX: 0
  }));
}).add('Loading', function () {
  return _react["default"].createElement(_index.MetricCard, {
    title: "Example Metric Card",
    description: "This is an example metric card loading",
    isLoading: true
  });
}).add('Error', function () {
  return _react["default"].createElement(_index.MetricCard, {
    title: "Example Metric Card",
    description: "This is an example metric card with error",
    error: "Cannot load data"
  });
}).add('Chart with filters', function () {
  return _react["default"].createElement(_index.MetricCard, {
    title: "Example Plot",
    description: "This is an example plot"
  }, _react["default"].createElement(_index.RichMetricChart, {
    height: 400,
    style: style,
    data: sampleData2,
    unit: (0, _addonKnobs.text)('unit', 'm/s'),
    getX: function getX(d) {
      return d[0];
    },
    getY: function getY(d) {
      return d[1];
    },
    formatTitle: function formatTitle(title) {
      return title;
    },
    formatValue: function formatValue(v) {
      return v.toFixed(3);
    },
    xTicks: (0, _addonKnobs.number)('xTicks', 3, {
      range: true,
      min: 0,
      max: 10,
      step: 1
    }),
    yTicks: (0, _addonKnobs.number)('yTicks', 5, {
      range: true,
      min: 0,
      max: 10,
      step: 1
    }),
    horizontalGridLines: (0, _addonKnobs.number)('horizontalGridLines', 5, {
      range: true,
      min: 0,
      max: 10,
      step: 1
    }),
    verticalGridLines: (0, _addonKnobs.number)('verticalGridLines', 0, {
      range: true,
      min: 0,
      max: 10,
      step: 1
    }),
    highlightX: 0
  }));
});
//# sourceMappingURL=stories.js.map