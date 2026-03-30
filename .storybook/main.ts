import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../projects/ngx-tw/src/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/angular',
    options: {
      enableIvy: true,
    },
  },
  docs: {},
  staticDirs: [{ from: '../projects/demo/public', to: '/' }],
};

export default config;
