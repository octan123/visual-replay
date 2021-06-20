import React from 'react';
import { boolean as _boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import README from './README.md';
import Label from './index';
storiesOf('Building Blocks', module).addDecorator(withReadme(README)).add('Label', function () {
  return React.createElement(Label, {
    tooltip: "Last, First",
    isEnabled: _boolean('isEnabled', true)
  }, "Your name");
});
//# sourceMappingURL=stories.js.map