import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import README from './README.md';
import TextBox from './index';

class TextBoxExample extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      value: 'Cat'
    });
  }

  render() {
    return React.createElement(TextBox, {
      isEnabled: boolean('isEnabled', true),
      showClearButton: boolean('showClearButton', true),
      value: this.state.value,
      onChange: value => this.setState({
        value
      })
    });
  }

}

storiesOf('Building Blocks', module).addDecorator(withReadme(README)).add('TextBox', () => React.createElement(TextBoxExample, null));
//# sourceMappingURL=stories.js.map