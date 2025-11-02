# Contributing to repo-description

We welcome contributions to `repo-description`! Whether it's bug reports, feature requests, or code contributions, your help is greatly appreciated.

Please note that this project is released with a [Code of Conduct](RULES_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please open an issue on our [GitHub Issues page](https://github.com/IonGireada/repo-description/issues). When reporting a bug, please include:

- A clear and concise description of the bug.
- Steps to reproduce the behavior.
- Expected behavior.
- Screenshots or error messages if applicable.
- Your operating system and Node.js version.

### Suggesting Enhancements

Have an idea for a new feature or an improvement to an existing one? We'd love to hear it! Please open an issue on our [GitHub Issues page](https://github.com/IonGireada/repo-description/issues) and describe your suggestion.

### Code Contributions

We welcome pull requests! To contribute code:

1.  **Fork the repository** on GitHub.
2.  **Clone your forked repository** to your local machine.
    ```bash
    git clone https://github.com/YOUR_USERNAME/repo-description.git
    cd repo-description
    ```
3.  **Create a new branch** for your feature or bug fix.
    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b bugfix/issue-description
    ```
4.  **Set up your development environment:**
    ```bash
    npm install
    ```
5.  **Make your changes.** Ensure your code adheres to the project's coding style (run `npm run format` and `npm run lint:fix`).
6.  **Write tests** for your changes.
7.  **Run tests** to ensure everything is working correctly.
    ```bash
    npm test
    ```
8.  **Commit your changes** with a clear and descriptive commit message.
    ```bash
    git commit -m "feat: Add new feature"
    # or
    git commit -m "fix: Fix bug in X"
    ```
9.  **Push your branch** to your forked repository.
    ```bash
    git push origin feature/your-feature-name
    ```
10. **Open a Pull Request** to the `main` branch of the original repository. Provide a clear description of your changes and reference any related issues.

## Development Setup

To get started with development, you'll need Node.js installed.

1.  Clone the repository: `git clone https://github.com/IonGireada/repo-description.git`
2.  Navigate to the project directory: `cd repo-description`
3.  Install dependencies: `npm install`

You can then use the scripts defined in `package.json` for linting, formatting, testing, and running the CLI locally.

## Code Style

This project uses ESLint and Prettier to enforce code style. Please ensure your code is formatted and linted correctly before submitting a pull request.

- Format your code: `npm run format`
- Lint your code: `npm run lint`
- Fix linting issues: `npm run lint:fix`

Thank you for contributing!
