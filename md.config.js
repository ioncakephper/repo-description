module.exports = {
  transformDefaults: {
    fileTreeExtended: {
      descriptions: {
        '.env': 'Description unavailable.',
        '.prettierrc.json': 'Description unavailable.',
        '.vscode\\launch.json': 'Description unavailable.',
        'babel.config.js': 'Description unavailable.',
        'CONTRIBUTING.md': 'Description unavailable.',
        'eslint.config.js': 'Description unavailable.',
        LICENSE: 'Description unavailable.',
        'md.config.js': 'Description unavailable.',
        'package-lock.json': 'Description unavailable.',
        'package.json': 'Description unavailable.',
        'README.md': 'Description unavailable.',
        'RULES_OF_CONDUCT.md': 'Description unavailable.',
        'src\\cli.js': 'Description unavailable.',
        'src\\describe.js': 'Description unavailable.',
        'src\\index.js': 'Description unavailable.',
        'src\\refactor-package.js': 'Description unavailable.',
        'src\\utils.js': 'Description unavailable.',
        '__tests__\\cli.test.js': 'Description unavailable.',
      },
    },
    BADGES: {
      style: 'for-the-badge',
    },
  },
  transforms: {
    fileTreeExtended: require('markdown-magic-transform-treefile-extended'),
    BADGES: require('markdown-magic-transform-badges'),
    INSTALL: require('markdown-magic-install-extended'),
    ACKNOWLEDGEMENTS: require('markdown-magic-transform-acknowledgements'),
    COMMANDS: require('markdown-magic-scripts'),
  },
};
