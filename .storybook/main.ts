import {StorybookConfig} from '@storybook/react-vite';
import {mergeConfig} from 'vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/modules/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: ['@storybook/addon-links', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    check: false,
    reactDocgen: false,
  },

  viteFinal: async (config) => {
    // Merge custom configuration into the default config
    const {mergeConfig} = await import('vite');

    return mergeConfig(config, {
      plugins: [
        svgr({
          svgrOptions: {
            exportType: 'named',
            ref: true,
            svgo: false,
            titleProp: true,
          },
          include: '**/*.svg',
        }),
      ],
      css: {
        preprocessorOptions: {
          scss: {
            // Suppress deprecation warnings for third-party dependencies and legacy code
            quietDeps: true,
            // Suppress all deprecation warnings temporarily
            silenceDeprecations: [
              'legacy-js-api',
              'import',
              'global-builtin',
              'mixed-decls',
              'slash-div',
            ],
          },
        },
      },
      resolve: {
        alias: {
          '@common': '/src/common',
          '@shared': '/src/shared',
          '@core': '/src/core',
          '@assets': '/src/assets',
          '@modules': '/src/modules',
          '@submodules': '/src/modules/src/shared-components',
          '@store': '/src/rootStore/store',
          '@pages': '/src/pages',
        },
      },
      optimizeDeps: {
        include: ['@storybook/react-vite'],
      },
      assetsInclude: ['**/*.svg'],
    });
  },
};

export default config;
