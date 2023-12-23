import { html } from 'lit';
import '../src/search-app.js';

export default {
  title: 'SearchApp',
  component: 'search-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <search-app
      style="--search-app-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </search-app>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
