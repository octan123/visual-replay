import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import README from './README.md';
import Toggle from './index';

class ToggleExample extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      value: true
    });
  }

  render() {
    return React.createElement(Toggle, {
      isEnabled: boolean('isEnabled', true),
      value: this.state.value,
      onChange: value => this.setState({
        value
      })
    });
  }

}

storiesOf('Building Blocks', module).addDecorator(withReadme(README)).add('Toggle', () => React.createElement(ToggleExample, null));
//# sourceMappingURL=stories.js.map