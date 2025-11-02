module.exports = {
  transformDefaults: {
    fileTreeExtended: {
      descriptions: {
        '.env':
          'Configure... the environment by setting the `GROQ_API_KEY` variable to provide authentication for Groq API access.',
        '.prettierrc.json':
          'Configure Prettier to enforce single quotes, trailing commas (es5), an 80‑character print width, and a specific ordering of fields in package.json via the prettier‑plugin‑packagejson.',
        '.vscode/launch.json':
          'Configure launch configurations for debugging Node.js programs in VS Code.',
        'babel.config.js':
          '[configure] Babel to use @babel/preset‑env with the target set to the current Node version…',
        'CHANGELOG.md':
          "Documenting the project's version history by listing each release’s features, bug fixes, and related metadata in a Keep‑a‑Changelog format.",
        'CONTRIBUTING.md':
          'Guide contributors on how to report bugs, suggest enhancements, and submit code via pull requests.',
        'eslint.config.js':
          'Configure ESLint with global browser, node, and jest globals, recommended core and Prettier rules, and custom JSON/JSONC and YAML parsers and plugins for those file types.',
        'LICENSE':
          'Granting permission to use, copy, modify, merge, publish, distribute, sublicense, and sell the software freely under the MIT License.',
        'md.config.js':
          '[Exports] a configuration object that defines default settings (like file descriptions and badge style) and registers the markdown‑magic transform modules used to generate and augment the project’s documentation.',
        'package-lock.json': 'Description unavailable.',
        'package.json': 'Description unavailable.',
        'README.md': 'Description unavailable.',
        'RULES_OF_CONDUCT.md': 'Description unavailable.',
        'src/cli.js': 'Description unavailable.',
        'src/describe.js': 'Description unavailable.',
        'src/index.js': 'Description unavailable.',
        'src/utils.js': 'Description unavailable.',
        '__tests__/cli.test.js': 'Description unavailable.',
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
