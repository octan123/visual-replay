"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _storybookReadme = require("storybook-readme");

var _README = _interopRequireDefault(require("./README.md"));

var _index = _interopRequireDefault(require("./index"));

var _shared = require("../shared");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SETTINGS = {
  title: {
    type: 'title',
    title: 'My App Settings'
  },
  sectionSeparator: {
    type: 'separator'
  },
  sectionHeader: {
    type: 'header',
    title: 'Section Header'
  },
  showTitle: {
    type: 'toggle',
    title: 'Show Title'
  },
  richText: {
    type: 'toggle',
    title: 'Rich Text',
    tooltip: 'Fancy text formatting',
    warning: 'An example warning',
    children: {
      format: {
        type: 'select',
        visible: true,
        enabled: function enabled(_ref) {
          var richText = _ref.richText;
          return richText;
        },
        title: 'Format',
        data: {
          html: 'HTML',
          markdown: 'Markdown'
        }
      },
      flavor: {
        type: 'select',
        tooltip: 'Markdown syntax',
        visible: function visible(_ref2) {
          var format = _ref2.format;
          return format === 'markdown';
        },
        enabled: function enabled(_ref3) {
          var richText = _ref3.richText;
          return richText;
        },
        title: 'Flavor',
        data: {
          standard: 'Standard',
          github: 'GitHub',
          wikipedia: 'Wikipedia'
        }
      },
      stylesheet: {
        type: 'select',
        title: 'Stylesheet',
        visible: true,
        enabled: function enabled(_ref4) {
          var richText = _ref4.richText;
          return richText;
        },
        data: {
          light: 'Light',
          dark: 'Dark'
        }
      }
    }
  },
  fontSize: {
    type: 'range',
    tooltip: 'Size of text in pixels',
    title: 'Font Size',
    min: 10,
    max: 80
  },
  fontFamily: {
    type: 'text',
    tooltip: 'Fontface',
    title: 'Font Family'
  },
  alignment: {
    type: 'radio',
    tooltip: 'Align text with viewport',
    title: 'Alignment',
    data: {
      left: 'Left',
      right: 'Right',
      center: 'Center'
    }
  },
  autocorrect: {
    type: 'checkbox',
    title: 'Autocorrect',
    visible: true,
    collapsible: true,
    children: {
      spelling: {
        type: 'checkbox',
        title: 'Spelling',
        visible: true
      },
      grammer: {
        type: 'checkbox',
        title: 'Grammer',
        visible: true
      }
    }
  }
};
var STYLES = {
  wrapper: {
    padding: 24
  },
  label: {
    tooltip: {
      arrowSize: 0,
      borderWidth: 0
    }
  }
};

var FormExample = function (_Component) {
  (0, _inherits2["default"])(FormExample, _Component);

  var _super = _createSuper(FormExample);

  function FormExample(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, FormExample);
    _this = _super.call(this, props);
    _this.state = {
      values: {
        showTitle: true,
        richText: true,
        format: 'markdown',
        flavor: 'github',
        stylesheet: 'light',
        fontSize: 24,
        fontFamily: 'Clan Pro Medium',
        alignment: 'left',
        autocorrect: _shared.CheckBox.INDETERMINATE,
        spelling: _shared.CheckBox.ON,
        grammer: _shared.CheckBox.OFF
      }
    };
    return _this;
  }

  (0, _createClass2["default"])(FormExample, [{
    key: "_onSettingsChange",
    value: function _onSettingsChange(changedSettings) {
      var newState = Object.assign({}, this.state.values, changedSettings);

      if (changedSettings.spelling || changedSettings.grammer) {
        if (newState.spelling === newState.grammer) {
          newState.autocorrect = newState.spelling;
        } else {
          newState.autocorrect = _shared.CheckBox.INDETERMINATE;
        }
      } else if (changedSettings.autocorrect) {
        newState.spelling = changedSettings.autocorrect;
        newState.grammer = changedSettings.autocorrect;
      }

      this.setState({
        values: newState
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement(_index["default"], {
        data: SETTINGS,
        style: STYLES,
        values: this.state.values,
        onChange: this._onSettingsChange.bind(this)
      });
    }
  }]);
  return FormExample;
}(_react.Component);

(0, _react2.storiesOf)('Form', module).addDecorator((0, _storybookReadme.withReadme)(_README["default"])).add('Basic example', function () {
  return _react["default"].createElement(FormExample, null);
});
//# sourceMappingURL=stories.js.map