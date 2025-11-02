# repo-description

> AI‑powered CLI that automatically generates clear, natural‑language descriptions of every file in a repository.

<!-- doc-gen BADGES -->

[![npm version](https://img.shields.io/npm/v/repo-description.svg?style=for-the-badge)](https://www.npmjs.com/package/repo-description) [![npm downloads](https://img.shields.io/npm/dw/repo-description.svg?style=for-the-badge)](https://www.npmjs.com/package/repo-description) [![license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://www.npmjs.com/package/repo-description) [![actions status](https://img.shields.io/github/actions/workflow/status/IonGireada/repo-description/ci.yml?branch=main&style=for-the-badge)](https://github.com/IonGireada/repo-description/actions) [![codecov](https://img.shields.io/codecov/c/github/IonGireada/repo-description?branch=main&style=for-the-badge)](https://codecov.io/gh/IonGireada/repo-description) [![release](https://img.shields.io/github/v/release/IonGireada/repo-description?style=for-the-badge)](https://github.com/IonGireada/repo-description/releases) [![maintained](https://img.shields.io/github/commit-activity/y/IonGireada/repo-description?style=for-the-badge)](https://github.com/IonGireada/repo-description/graphs/commit-activity) [![stars](https://img.shields.io/github/stars/IonGireada/repo-description?style=for-the-badge)](https://github.com/IonGireada/repo-description/stargazers) [![forks](https://img.shields.io/github/forks/IonGireada/repo-description?style=for-the-badge)](https://github.com/IonGireada/repo-description/network/members) [![watchers](https://img.shields.io/github/watchers/IonGireada/repo-description?style=for-the-badge)](https://github.com/IonGireada/repo-description/watchers) [![last commit](https://img.shields.io/github/last-commit/IonGireada/repo-description?style=for-the-badge)](https://github.com/IonGireada/repo-description/commits) [![contributors](https://img.shields.io/github/contributors/IonGireada/repo-description?style=for-the-badge)](https://github.com/IonGireada/repo-description/graphs/contributors) [![issues](https://img.shields.io/github/issues/IonGireada/repo-description?style=for-the-badge)](https://github.com/IonGireada/repo-description/issues) [![pull requests](https://img.shields.io/github/issues-pr/IonGireada/repo-description?style=for-the-badge)](https://github.com/IonGireada/repo-description/pulls) [![repo size](https://img.shields.io/github/repo-size/IonGireada/repo-description?style=for-the-badge)](https://github.com/IonGireada/repo-description) [![top language](https://img.shields.io/github/languages/top/IonGireada/repo-description?style=for-the-badge)](https://github.com/IonGireada/repo-description) [![languages](https://img.shields.io/github/languages/count/IonGireada/repo-description?style=for-the-badge)](https://github.com/IonGireada/repo-description/search?l=)

<!-- end-doc-gen -->

## Installation

<!-- doc-gen INSTALL global=true -->

```bash
npm install -g repo-description
```

```bash
yarn add -g repo-description
```

<!-- end-doc-gen -->

## Usage

:::note
**Important:** Before running, create a `.env` file in your project root with your Groq API key. The key name should be `GROQ_API_KEY`. You can obtain an API key by creating an account and visiting [https://console.groq.com/keys](https://console.groq.com/keys).
:::

### As a JavaScript Module

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
  const remoteRepoPath = 'https://github.com/IonGireada/repo-description.git';
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

### As a Command-Line Interface (CLI)

Use the `repo-describer` command directly in your terminal:

```bash
# Generate JSON descriptions for the current repository and output to descriptions.json
repo-describer . -o descriptions.json -f json

# Generate Markdown descriptions for a remote GitHub repository, clone it to a specific directory, and include a summary and table format
repo-describer https://github.com/IonGireada/repo-description.git -c ./cloned_repos -o repo-descriptions.md -f markdown --summary --table

# Generate descriptions for the current repository, ignoring specific patterns, and update a markdown-magic config file
repo-describer . -i "dist" "build" --update-config ./md.config.js --transform-name myDescriptions

# Display help information
repo-describer --help
```

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

- `describe` — Generates AI-powered descriptions for repository files and outputs them in various formats. (line [89](./package.json#L89))

  ```bash
  node src/cli.js . descriptions.json && node src/cli.js . descriptions.md --format markdown && node src/cli.js . descriptions-table.md --format markdown --table && node src/cli.js . descriptions-summary.md --format markdown --summary && node src/cli.js . descriptions-table-summary.md --format markdown --table --summary
  ```

- `docs` — Generates documentation by processing Markdown files with markdown-magic. (line [94](./package.json#L94))

  ```bash
  npx markdown-magic@3.7.0 **/*.md -c md.config.js
  ```

- `format` — Formats the codebase using Prettier. (line [92](./package.json#L92))

  ```bash
  prettier --write .
  ```

- `lint` — Lints the codebase for potential errors and style violations. (line [90](./package.json#L90))

  ```bash
  eslint src/ **/*.js **/*.json
  ```

- `lint:fix` — Lints the codebase and automatically fixes fixable issues. (line [91](./package.json#L91))

  ```bash
  eslint --fix src/ **/*.js **/*.json
  ```

- `prep` — Prepares the codebase by generating documentation, linting, and formatting. (line [93](./package.json#L93))

  ```bash
  npm run docs && npm run lint:fix && npm run format
  ```

- `test` — Runs the test suite using Jest. (line [88](./package.json#L88))

  ```bash
  jest --passWithNoTests
  ```

  <!-- end-doc-gen -->

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

<!-- doc-gen fileTreeExtended showSize=false showDescriptions=true descriptionsFile=descriptions.json -->

```
repo-description/
├── .qodo
│   ├── agents
│   └── workflows
├── src
│   ├── cli.js
│   ├── describe.js
│   ├── index.js
│   ├── refactor-package.js
│   └── utils.js
├── .env
├── .gitignore
├── .prettierrc.json
├── babel.config.js
├── eslint.config.js
├── md.config.js
├── package-lock.json
├── package.json
└── README.md
```

<!-- end-doc-gen -->
