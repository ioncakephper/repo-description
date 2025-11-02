module.exports = {
  transformDefaults: {
    fileTreeExtended: {},
    BADGES: {
      style: 'for-the-badge',
    },
  },
  transforms: {
    INSTALL: require('markdown-magic-install-extended'),
    COMMANDS: require('markdown-magic-scripts'),
    BADGES: require('markdown-magic-transform-badges'),
    fileTreeExtended: require('markdown-magic-transform-treefile-extended'),
    ACKNOWLEDGEMENTS: require('markdown-magic-transform-acknowledgements'),
  },
};
