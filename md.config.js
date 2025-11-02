module.exports = {
  transformDefaults: {
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
