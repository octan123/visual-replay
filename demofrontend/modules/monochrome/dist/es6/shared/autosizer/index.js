import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import debounce from 'debounce';

const noop = () => null;

export default class SizeSensor extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onResize", size => {
      if (this.resize) {
        this.resize(size);
      } else if (this.props.onResize) {
        const {
          onResize,
          debounceTime
        } = this.props;
        onResize(size);
        this.resize = debounceTime > 0 ? debounce(onResize, debounceTime) : onResize;
      }
    });
  }

  render() {
    return React.createElement(AutoSizer, {
      onResize: this._onResize
    }, this.props.children || noop);
  }

}

_defineProperty(SizeSensor, "propTypes", {
  debounceTime: PropTypes.number
});
//# sourceMappingURL=index.js.map