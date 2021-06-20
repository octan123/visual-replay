import XVIZStyleProperty from './xviz-style-property';
const SELECTOR_REGEX = /\S+/g;
const OPERATOR_REGEX = /([=:~\*\^]+)/;

const NULL_VALIDATOR = () => true;

export default class Stylesheet {
  constructor(data = []) {
    const rules = data.slice().reverse().map(rule => {
      const {
        selectors,
        validate
      } = this._parseSelector(rule.name || '*');

      const properties = this._parseProperties(rule);

      return {
        selectors,
        validate,
        properties
      };
    });
    this.properties = {};
    rules.forEach(rule => {
      for (const key of Object.keys(rule.properties)) {
        let p = this.properties[key];

        if (!p) {
          p = [];
          this.properties[key] = p;
        }

        p.push(rule);
      }
    });
    this.rules = rules;
  }

  getProperty(propertyName, state = {}) {
    const inlineProp = state.base && state.base.style && state.base.style.hasOwnProperty(propertyName) && state.base.style[propertyName];

    if (inlineProp !== undefined && inlineProp !== null && inlineProp !== false) {
      return XVIZStyleProperty.formatValue(propertyName, inlineProp);
    }

    const rules = this.properties[propertyName];
    const match = rules && rules.find(rule => rule.validate(state));
    return match ? match.properties[propertyName].getValue(state) : null;
  }

  getPropertyDefault(propertyName) {
    const value = XVIZStyleProperty.getDefault(propertyName);

    if (typeof value === 'function') {
      return value(this);
    }

    return value;
  }

  getPropertyDependencies(propertyName) {
    const attributes = {};
    const rules = this.properties[propertyName];

    if (!rules) {
      return [];
    }

    rules.forEach(rule => {
      rule.selectors.forEach(selector => {
        if (selector !== '*') {
          const [name] = selector.split(OPERATOR_REGEX);
          attributes[name] = 1;
        }
      });
    });
    return Object.keys(attributes);
  }

  _getValidator(selector) {
    if (selector === '*') {
      return NULL_VALIDATOR;
    }

    const [name, operator, value] = selector.split(OPERATOR_REGEX);

    switch (operator) {
      case '=':
        return object => object && object[name] === value;

      default:
        {
          return object => {
            const classes = object && object.base && object.base.classes;
            return object && (classes && classes.includes(name) || object[name]);
          };
        }
    }
  }

  _parseSelector(selectorString) {
    const selectors = selectorString.match(SELECTOR_REGEX);
    let validate;

    if (selectors.length === 0 || selectors.includes('*')) {
      validate = NULL_VALIDATOR;
    } else if (selectors.length === 1) {
      const match = this._getValidator(selectors[0]);

      validate = object => match(object) || match(object.state);
    } else {
      const validators = selectors.map(this._getValidator);

      validate = object => validators.every(match => match(object) || match(object.state));
    }

    return {
      selectors,
      validate
    };
  }

  _parseProperties(properties) {
    const result = {};

    for (const key of Object.keys(properties.style)) {
      result[key] = new XVIZStyleProperty(key, properties.style[key]);
    }

    return result;
  }

}
//# sourceMappingURL=stylesheet.js.map