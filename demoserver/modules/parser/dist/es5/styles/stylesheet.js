"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _xvizStyleProperty = _interopRequireDefault(require("./xviz-style-property"));

var SELECTOR_REGEX = /\S+/g;
var OPERATOR_REGEX = /([=:~\*\^]+)/;

var NULL_VALIDATOR = function NULL_VALIDATOR() {
  return true;
};

var Stylesheet = function () {
  function Stylesheet() {
    var _this = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    (0, _classCallCheck2["default"])(this, Stylesheet);
    var rules = data.slice().reverse().map(function (rule) {
      var _this$_parseSelector = _this._parseSelector(rule.name || '*'),
          selectors = _this$_parseSelector.selectors,
          validate = _this$_parseSelector.validate;

      var properties = _this._parseProperties(rule);

      return {
        selectors: selectors,
        validate: validate,
        properties: properties
      };
    });
    this.properties = {};
    rules.forEach(function (rule) {
      for (var _i = 0, _Object$keys = Object.keys(rule.properties); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        var p = _this.properties[key];

        if (!p) {
          p = [];
          _this.properties[key] = p;
        }

        p.push(rule);
      }
    });
    this.rules = rules;
  }

  (0, _createClass2["default"])(Stylesheet, [{
    key: "getProperty",
    value: function getProperty(propertyName) {
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var inlineProp = state.base && state.base.style && state.base.style.hasOwnProperty(propertyName) && state.base.style[propertyName];

      if (inlineProp !== undefined && inlineProp !== null && inlineProp !== false) {
        return _xvizStyleProperty["default"].formatValue(propertyName, inlineProp);
      }

      var rules = this.properties[propertyName];
      var match = rules && rules.find(function (rule) {
        return rule.validate(state);
      });
      return match ? match.properties[propertyName].getValue(state) : null;
    }
  }, {
    key: "getPropertyDefault",
    value: function getPropertyDefault(propertyName) {
      var value = _xvizStyleProperty["default"].getDefault(propertyName);

      if (typeof value === 'function') {
        return value(this);
      }

      return value;
    }
  }, {
    key: "getPropertyDependencies",
    value: function getPropertyDependencies(propertyName) {
      var attributes = {};
      var rules = this.properties[propertyName];

      if (!rules) {
        return [];
      }

      rules.forEach(function (rule) {
        rule.selectors.forEach(function (selector) {
          if (selector !== '*') {
            var _selector$split = selector.split(OPERATOR_REGEX),
                _selector$split2 = (0, _slicedToArray2["default"])(_selector$split, 1),
                name = _selector$split2[0];

            attributes[name] = 1;
          }
        });
      });
      return Object.keys(attributes);
    }
  }, {
    key: "_getValidator",
    value: function _getValidator(selector) {
      if (selector === '*') {
        return NULL_VALIDATOR;
      }

      var _selector$split3 = selector.split(OPERATOR_REGEX),
          _selector$split4 = (0, _slicedToArray2["default"])(_selector$split3, 3),
          name = _selector$split4[0],
          operator = _selector$split4[1],
          value = _selector$split4[2];

      switch (operator) {
        case '=':
          return function (object) {
            return object && object[name] === value;
          };

        default:
          {
            return function (object) {
              var classes = object && object.base && object.base.classes;
              return object && (classes && classes.includes(name) || object[name]);
            };
          }
      }
    }
  }, {
    key: "_parseSelector",
    value: function _parseSelector(selectorString) {
      var selectors = selectorString.match(SELECTOR_REGEX);
      var validate;

      if (selectors.length === 0 || selectors.includes('*')) {
        validate = NULL_VALIDATOR;
      } else if (selectors.length === 1) {
        var match = this._getValidator(selectors[0]);

        validate = function validate(object) {
          return match(object) || match(object.state);
        };
      } else {
        var validators = selectors.map(this._getValidator);

        validate = function validate(object) {
          return validators.every(function (match) {
            return match(object) || match(object.state);
          });
        };
      }

      return {
        selectors: selectors,
        validate: validate
      };
    }
  }, {
    key: "_parseProperties",
    value: function _parseProperties(properties) {
      var result = {};

      for (var _i2 = 0, _Object$keys2 = Object.keys(properties.style); _i2 < _Object$keys2.length; _i2++) {
        var key = _Object$keys2[_i2];
        result[key] = new _xvizStyleProperty["default"](key, properties.style[key]);
      }

      return result;
    }
  }]);
  return Stylesheet;
}();

exports["default"] = Stylesheet;
//# sourceMappingURL=stylesheet.js.map