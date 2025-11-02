const globals = require('globals');
const pluginJs = require('@eslint/js');
const jsoncParser = require('jsonc-eslint-parser');
const yamlParser = require('yaml-eslint-parser');

module.exports = [
  {
    ignores: ['tmp/**/*'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2021,
      sourceType: 'commonjs',
    },
    rules: {},
  },
  pluginJs.configs.recommended,
  require('eslint-config-prettier'),
  {
    files: ['**/*.json', '**/*.jsonc'],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      jsonc: require('eslint-plugin-jsonc'),
    },
    rules: {
      ...require('eslint-plugin-jsonc').configs['recommended-with-jsonc'].rules,
      'jsonc/indent': ['error', 2],
    },
  },
  {
    files: ['**/*.yaml', '**/*.yml'],
    languageOptions: {
      parser: yamlParser,
    },
    plugins: {
      yaml: require('eslint-plugin-yaml'),
    },
    rules: {
      ...require('eslint-plugin-yaml').configs['recommended'].rules,
    },
  },
];
