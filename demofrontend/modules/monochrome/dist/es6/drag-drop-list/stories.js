import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import DragDropList from './index';
import README from './README.md';
const SAMPLE_ITEMS = new Array(10).fill(0).map((d, i) => ({
  key: "item-".concat(i),
  className: 'sample-item',
  content: React.createElement("p", null, "ITEM ", i + 1)
}));
const SAMPLE_ITEMS_WITH_HEADER = new Array(8).fill(0).map((d, i) => ({
  key: "item-".concat(i),
  title: "ITEM ".concat(i + 1),
  className: 'sample-item',
  content: React.createElement("p", null, "This is the content")
}));
const EXAMPLE_STYLE = {
  item: {
    padding: 12,
    border: '1px solid #fff',
    background: '#f8f8f8'
  },
  title: {
    padding: '4px 12px',
    margin: '-12px -12px 12px -12px',
    background: '#ccc',
    color: '#fff'
  }
};

class DragDropListExample extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      items: null
    });
  }

  _onListChange({
    items
  }) {
    this.setState({
      items
    });
  }

  render() {
    const items = this.state.items || this.props.items;
    return React.createElement("div", {
      style: {
        width: 200,
        margin: 'auto'
      }
    }, React.createElement(DragDropList, {
      style: EXAMPLE_STYLE,
      items: items,
      canRemoveItem: boolean('canRemoveItem', true),
      onListChange: this._onListChange.bind(this)
    }));
  }

}

storiesOf('DragDropList', module).addDecorator(withReadme(README)).add('Basic example', () => React.createElement(DragDropListExample, {
  items: SAMPLE_ITEMS
})).add('With headers', () => React.createElement(DragDropListExample, {
  items: SAMPLE_ITEMS_WITH_HEADER
}));
//# sourceMappingURL=stories.js.map