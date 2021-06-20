import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import README from './README.md';
import Dropdown from './index';
const SAMPLE_DATA = {
  cat: 'Cat',
  dog: 'Dog',
  banana: 'Banana'
};

class DropdownExample extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      value: 'cat'
    });
  }

  render() {
    return React.createElement(Dropdown, {
      data: SAMPLE_DATA,
      isEnabled: boolean('isEnabled', true),
      value: this.state.value,
      onChange: value => this.setState({
        value
      })
    });
  }

}

storiesOf('Building Blocks', module).addDecorator(withReadme(README)).add('Dropdown', () => React.createElement(DropdownExample, null));
//# sourceMappingURL=stories.js.map