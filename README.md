# repo-description

> An AI-powered CLI tool that automatically generates clear, natural-language descriptions for every file within a given repository. `repo-description` helps developers quickly understand unfamiliar codebases, onboard new team members, and maintain comprehensive documentation effortlessly. By leveraging advanced AI, it transforms raw code into insightful summaries, making project navigation and collaboration significantly smoother.

<!-- doc-gen BADGES -->
[![npm version](https://img.shields.io/npm/v/repo-description.svg?style=for-the-badge)](https://www.npmjs.com/package/repo-description) [![npm downloads](https://img.shields.io/npm/dw/repo-description.svg?style=for-the-badge)](https://www.npmjs.com/package/repo-description) [![license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://www.npmjs.com/package/repo-description) [![actions status](https://img.shields.io/github/actions/workflow/status/ioncakephper/repo-description/ci.yml?branch=main&style=for-the-badge)](https://github.com/ioncakephper/repo-description/actions) [![codecov](https://img.shields.io/codecov/c/github/ioncakephper/repo-description?branch=main&style=for-the-badge)](https://codecov.io/gh/ioncakephper/repo-description) [![release](https://img.shields.io/github/v/release/ioncakephper/repo-description?style=for-the-badge)](https://github.com/ioncakephper/repo-description/releases) [![maintained](https://img.shields.io/github/commit-activity/y/ioncakephper/repo-description?style=for-the-badge)](https://github.com/ioncakephper/repo-description/graphs/commit-activity) [![stars](https://img.shields.io/github/stars/ioncakephper/repo-description?style=for-the-badge)](https://github.com/ioncakephper/repo-description/stargazers) [![forks](https://img.shields.io/github/forks/ioncakephper/repo-description?style=for-the-badge)](https://github.com/ioncakephper/repo-description/network/members) [![watchers](https://img.shields.io/github/watchers/ioncakephper/repo-description?style=for-the-badge)](https://github.com/ioncakephper/repo-description/watchers) [![last commit](https://img.shields.io/github/last-commit/ioncakephper/repo-description?style=for-the-badge)](https://github.com/ioncakephper/repo-description/commits) [![contributors](https://img.shields.io/github/contributors/ioncakephper/repo-description?style=for-the-badge)](https://github.com/ioncakephper/repo-description/graphs/contributors) [![issues](https://img.shields.io/github/issues/ioncakephper/repo-description?style=for-the-badge)](https://github.com/ioncakephper/repo-description/issues) [![pull requests](https://img.shields.io/github/issues-pr/ioncakephper/repo-description?style=for-the-badge)](https://github.com/ioncakephper/repo-description/pulls) [![repo size](https://img.shields.io/github/repo-size/ioncakephper/repo-description?style=for-the-badge)](https://github.com/ioncakephper/repo-description) [![top language](https://img.shields.io/github/languages/top/ioncakephper/repo-description?style=for-the-badge)](https://github.com/ioncakephper/repo-description) [![languages](https://img.shields.io/github/languages/count/ioncakephper/repo-description?style=for-the-badge)](https://github.com/ioncakephper/repo-description/search?l=)
<!-- end-doc-gen -->

## Features

- **AI-Powered Descriptions**: Generates concise, natural-language summaries for individual files using advanced AI models.
- **Flexible Output Formats**: Supports output in JSON or Markdown, allowing for easy integration into various workflows.
- **Repository Agnostic**: Works with both local directories and remote GitHub repositories (automatically clones them).
- **Customizable Ignoring**: Exclude specific files or directories (e.g., `node_modules`, `.git`) from the description process.
- **Markdown-Magic Integration**: Seamlessly updates `markdown-magic.config.js` files to embed descriptions directly into your documentation.
- **CLI & Module Usage**: Can be used as a standalone command-line tool or integrated as a JavaScript module within other projects.

## Getting Started

**Important:** Before running, create a `.env` file in your project root with your Groq API key. The key must be named `GROQ_API_KEY`. You can obtain an API key by creating an account and visiting [https://console.groq.com/keys](https://console.groq.com/keys).

### Installation

- Install _globally_, making `repo-describer` available as a CLI on any path on your system:

    <!-- doc-gen INSTALL global=true -->
  ```bash
  npm install -g repo-description
  ```

  ```bash
  yarn add -g repo-description
  ```
    <!-- end-doc-gen -->

- Install _locally_ in your repository, ready to use in your code.

    <!-- doc-gen INSTALL -->
  ```bash
  npm install repo-description
  ```

  ```bash
  yarn add repo-description
  ```
    <!-- end-doc-gen -->

### Usage

#### As a JavaScript Module

You can use `repo-description` directly in your JavaScript or Node.js projects:

```javascript
require('dotenv/config'); // Load environment variables

const { describeRepo, saveOutput } = require('repo-description');

async function runDescription() {
  const repoPath = './'; // Current repository or path to a local folder

  // Scenario 1: Generate JSON descriptions for the current repository
  const jsonOptions = {
    ignore: ['node_modules', '.git', 'tmp'],
    format: 'json',
    output: 'descriptions.json',
  };

  console.log('Generating JSON descriptions...');
  const jsonDescriptions = await describeRepo(repoPath, jsonOptions);
  saveOutput(jsonDescriptions, jsonOptions.output, jsonOptions.format);
  console.log(`JSON descriptions saved to ${jsonOptions.output}`);

  // Scenario 2: Generate Markdown descriptions with a summary and table format
  const markdownOptions = {
    format: 'markdown',
    output: 'descriptions.md',
    summary: true,
    table: true,
    ignore: ['node_modules', '.git'], // You can specify ignore patterns here too
  };

  console.log('Generating Markdown descriptions...');
  const markdownDescriptions = await describeRepo(repoPath, markdownOptions);
  saveOutput(
    markdownDescriptions,
    markdownOptions.output,
    markdownOptions.format,
    markdownOptions.summary
  );
  console.log(`Markdown descriptions saved to ${markdownOptions.output}`);

  // Scenario 3: Generate descriptions for a remote GitHub repository
  const remoteRepoPath = 'https://github.com/ioncakephper/repo-description';
  const remoteOptions = {
    cloneDir: './cloned_repos', // Directory to clone the remote repo into
    format: 'json',
    output: 'remote-repo-descriptions.json',
  };

  console.log(`Generating descriptions for ${remoteRepoPath}...`);
  const remoteDescriptions = await describeRepo(remoteRepoPath, remoteOptions);
  saveOutput(remoteDescriptions, remoteOptions.output, remoteOptions.format);
  console.log(
    `Remote repository descriptions saved to ${remoteOptions.output}`
  );
}

runDescription();
```

#### As a Command-Line Interface (CLI)

Use the `repo-describer` command directly in your terminal:

```bash
# Generate JSON descriptions for the current repository and output to descriptions.json
repo-describer . -o descriptions.json -f json

# Generate Markdown descriptions for a remote GitHub repository, clone it to a specific directory, and include a summary and table format
repo-describer https://github.com/ioncakephper/repo-description -c ./cloned_repos -o repo-descriptions.md -f markdown --summary --table

# Generate descriptions for the current repository, ignoring specific patterns, and update a markdown-magic config file
repo-describer . -i "dist" "build" --update-config ./md.config.js --transform-name myDescriptions

# Display help information
repo-describer --help
```

## Configuration

`repo-description` requires an API key from [Groq](https://groq.com) to function. Follow these steps to configure your API key:

1.  **Obtain an API Key**: Visit [https://console.groq.com/keys](https://console.groq.com/keys) and create a new API key.
2.  **Create `.env` file**: In the root directory of your project (or where you run `repo-describer`), create a file named `.env`.
3.  **Add API Key**: Add your Groq API key to the `.env` file in the format:
    ```
    GROQ_API_KEY=your_groq_api_key_here
    ```

Ensure your `.env` file is included in your `.gitignore` to prevent your API key from being committed to version control.

## CLI API

### Help Output

```
Usage: repo-describer [options] <repo>

Generate AI-based descriptions for repository files

Arguments:
  repo                  Path to local folder or remote GitHub repo URL

Options:
  -c, --clone-dir <dir>   Directory to clone remote repos into (default: "./tmp")
  -f, --format <type>   Output format: json or markdown (default: "json")
  -h, --help            display help for command
  -i, --ignore <patterns...>  Ignore patterns (default: ["node_modules",".git"])
  -o, --output <file>   Output file (e.g., descriptions.json or descriptions.md)
  -s, --summary         Include summary at top (markdown only) (default: false)
  --table               Use table format for markdown output (default: false)
  --transform-name <name> Transform name inside config (default: "descriptions")
  --update-config <path> Path to markdown-magic.config.js to update
  -V, --version         output the current version
```

### Arguments

| Name   | Type     | Description                                    | Default |
| :----- | :------- | :--------------------------------------------- | :------ |
| `repo` | `string` | Path to local folder or remote GitHub repo URL | N/A     |

### Options

| Name               | Type       | Description                                              | Default                    |
| :----------------- | :--------- | :------------------------------------------------------- | :------------------------- |
| `-c, --clone-dir`  | `string`   | Directory to clone remote repos into                     | `./tmp`                    |
| `-f, --format`     | `string`   | Output format: json or markdown                          | `json`                     |
| `-i, --ignore`     | `string[]` | Ignore patterns                                          | `['node_modules', '.git']` |
| `-o, --output`     | `string`   | Output file (e.g., descriptions.json or descriptions.md) | N/A                        |
| `-s, --summary`    | `boolean`  | Include summary at top (markdown only)                   | `false`                    |
| `--table`          | `boolean`  | Use table format for markdown output                     | `false`                    |
| `--transform-name` | `string`   | Transform name inside config                             | `descriptions`             |
| `--update-config`  | `string`   | Path to markdown-magic.config.js to update               | N/A                        |
| `-V, --version`    | `boolean`  | output the current version                               | `false`                    |

## Helpful Scripts

<!-- doc-gen COMMANDS format=list -->
- `describe` — Update repository descriptions in md.config.js transformDefaults for fileTreeExtended. (line [92](./package.json#L92))

  ```bash
  node src/cli.js . --update-config md.config.js --transform-name fileTreeExtended
  ```

- `describe:file` — Generates AI-powered descriptions for repository files and outputs them in various formats. (line [86](./package.json#L86))

  ```bash
  node src/cli.js . --output _descriptions.json
  ```

- `docs` — Generates documentation by processing Markdown files with markdown-magic. (line [91](./package.json#L91))

  ```bash
  npx markdown-magic@3.7.0 **/*.md -c md.config.js
  ```

- `format` — Formats the codebase using Prettier. (line [89](./package.json#L89))

  ```bash
  prettier --write .
  ```

- `lint` — Lints the codebase for potential errors and style violations. (line [87](./package.json#L87))

  ```bash
  eslint src/ **/*.js **/*.json
  ```

- `lint:fix` — Lints the codebase and automatically fixes fixable issues. (line [88](./package.json#L88))

  ```bash
  eslint --fix src/ **/*.js **/*.json
  ```

- `prep` — Prepares the codebase by generating documentation, linting, and formatting. (line [90](./package.json#L90))

  ```bash
  npm run describe:file && npm run docs && npm run lint:fix && npm run format
  ```

- `test` — Runs the test suite using Jest. (line [85](./package.json#L85))

  ```bash
  jest --passWithNoTests
  ```
  <!-- end-doc-gen -->

## Contributing

We welcome contributions to `repo-description`! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute, including reporting bugs, suggesting enhancements, and making code contributions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

<!-- doc-gen ACKNOWLEDGEMENTS -->
- [@babel/preset-env](https://www.npmjs.com/package/%40babel%2Fpreset-env) — A Babel preset for each environment.
- [@eslint/js](https://www.npmjs.com/package/%40eslint%2Fjs) — ESLint JavaScript language implementation
- [babel-jest](https://www.npmjs.com/package/babel-jest) — Jest plugin to use babel for transformation.
- [commander](https://www.npmjs.com/package/commander) — the complete solution for node.js command-line programs
- [dotenv](https://www.npmjs.com/package/dotenv) — Loads environment variables from .env file
- [eslint](https://www.npmjs.com/package/eslint) — An AST-based pattern checker for JavaScript.
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) — Turns off all rules that are unnecessary or might conflict with Prettier.
- [eslint-plugin-jsonc](https://www.npmjs.com/package/eslint-plugin-jsonc) — ESLint plugin for JSON, JSONC and JSON5 files.
- [eslint-plugin-yaml](https://www.npmjs.com/package/eslint-plugin-yaml) — Lint YAML files
- [globals](https://www.npmjs.com/package/globals) — Global identifiers from different JavaScript environments
- [groq-sdk](https://www.npmjs.com/package/groq-sdk) — The official TypeScript library for the Groq API
- [jest](https://www.npmjs.com/package/jest) — Delightful JavaScript Testing.
- [jsonc-eslint-parser](https://www.npmjs.com/package/jsonc-eslint-parser) — JSON, JSONC and JSON5 parser for use with ESLint plugins
- [markdown-magic-install-extended](https://www.npmjs.com/package/markdown-magic-install-extended) — Extended INSTALL transform for markdown-magic that generates install instructions from package.json with flexible options
- [markdown-magic-scripts](https://www.npmjs.com/package/markdown-magic-scripts) — Automatically generate a dynamic, customizable dashboard of your npm scripts in your README.md using this markdown-magic transform. Keep your project documentation in sync with your package.json.
- [markdown-magic-transform-acknowledgements](https://www.npmjs.com/package/markdown-magic-transform-acknowledgements) — A markdown-magic transform that auto-generates an Acknowledgements section for contributors, dependencies, and custom entries.
- [markdown-magic-transform-badges](https://www.npmjs.com/package/markdown-magic-transform-badges) — No description available
- [markdown-magic-transform-treefile-extended](https://www.npmjs.com/package/markdown-magic-transform-treefile-extended) — A markdown-magic transform to generate a dynamic file tree in your markdown files. This extended version provides additional options for customizing the output.
- [prettier](https://www.npmjs.com/package/prettier) — Prettier is an opinionated code formatter
- [prettier-plugin-packagejson](https://www.npmjs.com/package/prettier-plugin-packagejson) — Prettier package.json plugin to make the order of properties nice.
- [yaml-eslint-parser](https://www.npmjs.com/package/yaml-eslint-parser) — A YAML parser that produces output compatible with ESLint
<!-- end-doc-gen -->

## Project Structure

<!-- doc-gen fileTreeExtended showSize=true showDescriptions=true descriptionsFile=_descriptions.json -->
```
repo-description/
├── __tests__
│   └── .gitkeep (66 B)
├── .qodo
│   ├── agents
│   └── workflows
├── src
│   ├── cli.js (2.7 KB)             # Sets up the `repo-describer` CLI with Commander, parses arguments and options, and orchestrates repository description generation, output saving, and optional config updates.
│   ├── describe.js (8.3 KB)        # [Generate] AI‑powered descriptions of a Git repository’s files, persist those descriptions, and update markdown‑magic configuration accordingly.
│   ├── index.js (308 B)            # Export... the `describeRepo`, `saveOutput`, and `updateMarkdownMagicConfig` functions as the public API of the `repo-describer` library.
│   └── utils.js (0 B)              # I’m happy to help, but I need to see the actual contents of **src\utils.js** in order to craft an accurate one‑sentence “[action]…” description. Could you paste the file’s code (or at least the relevant portion) here?
├── _descriptions.json (2.9 KB)     # Map each repository file to a concise description of its purpose.
├── .env (69 B)                     # Sets the GROQ_API_KEY environment variable for API authentication.
├── .gitignore (2.1 KB)
├── .prettierrc.json (563 B)        # Configure Prettier to use single quotes, trailing commas (es5), an 80‑character line width, and enforce a specific ordering of fields in package.json via the prettier-plugin-packagejson.
├── babel.config.js (92 B)          # Configure Babel to use the `@babel/preset‑env` preset with the target set to the current Node version.
├── CHANGELOG.md (2.5 KB)           # [record] a chronological list of version releases with dates and the associated bug‑fix entries for each version.
├── CONTRIBUTING.md (2.9 KB)        # [Guide] contributors on reporting bugs, suggesting enhancements, and submitting code changes via pull requests.
├── eslint.config.js (1.1 KB)       # Configure ESLint with base and Prettier settings, and add specialized parsers and recommended rules for JavaScript, JSON/JSONC, and YAML files.
├── LICENSE (1.0 KB)                # Granting permission to use, copy, modify, merge, publish, distribute, sublicense, and sell the software under the terms of the MIT License.
├── md.config.js (438 B)            # Exports a configuration object that sets default badge styling and registers multiple markdown‑magic transform plugins for file trees, badges, installation, acknowledgements, and command scripts.
├── package-lock.json (289.8 KB)    # [Locks] exact versions of the project’s direct and transitive npm dependencies to ensure reproducible, deterministic installations.
├── package.json (3.0 KB)           # Specify the package metadata, entry points, scripts, and distribution settings for the AI‑powered “repo‑describer” CLI tool.
├── README.md (17.7 KB)             # Introduces the AI‑powered CLI tool `repo‑description`, its purpose and usage overview, and displays project status badges.
└── RULES_OF_CONDUCT.md (4.9 KB)    # [Establish] a comprehensive, harassment‑free code of conduct that pledges inclusive, respectful behavior and outlines acceptable and unacceptable actions for contributors.
```
<!-- end-doc-gen -->
