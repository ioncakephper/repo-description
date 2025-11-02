#!/usr/bin/env node
/**
 * @file cli.js
 * @description This is the main entry point for the `repo-describer` command-line interface.
 * It sets up the Commander.js program, defines global options, and handles the description generation process.
 * @author Ion Gireada
 */

require('dotenv/config');

const { program } = require('commander');
const {
  describeRepo,
  saveOutput,
  updateMarkdownMagicConfig,
} = require('./index.js');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

program
  .name('repo-describer')
  .version('1.0.0', '-V, --version', 'output the current version')
  .description('Generate AI-based descriptions for repository files')
  .argument('<repo>', 'Path to local folder or remote GitHub repo URL')
  .option(
    '-o, --output <file>',
    'Output file (e.g., descriptions.json or descriptions.md)'
  )
  .option('-i, --ignore <patterns...>', 'Ignore patterns', [
    'node_modules',
    '.git',
  ])
  .option(
    '-c, --clone-dir <dir>',
    'Directory to clone remote repos into',
    './tmp'
  )
  .option('--table', 'Use table format for markdown output', false)
  .option('-f, --format <type>', 'Output format: json or markdown', 'json')
  .option('-s, --summary', 'Include summary at top (markdown only)', false)
  .option(
    '--update-config <path>',
    'Path to markdown-magic.config.js to update'
  )
  .option(
    '--transform-name <name>',
    'Transform name inside config',
    'descriptions'
  )
  .action(async (repo, options) => {
    let repoPath = repo;

    // If it's a GitHub URL, clone it
    if (repo.startsWith('http')) {
      const repoName = repo
        .split('/')
        .filter(Boolean)
        .pop()
        .replace('.git', '');
      repoPath = path.join(options.cloneDir, repoName);
      if (!fs.existsSync(repoPath)) {
        console.log(`Cloning ${repo} into ${repoPath}...`);
        execSync(`git clone ${repo} ${repoPath}`, { stdio: 'inherit' });
      }
    }

    console.log('Generating descriptions...');
    const descriptions = await describeRepo(repoPath, options);

    if (options.output) {
      saveOutput(descriptions, options.output, options.format, options.summary);
      console.log(`Descriptions saved to ${options.output}`);
    } else {
      console.log(JSON.stringify(descriptions, null, 2));
    }

    if (options.updateConfig) {
      await updateMarkdownMagicConfig(
        options.updateConfig,
        options.transformName,
        descriptions
      );
    }
  });

program.configureHelp({
  sortSubcommands: true,
  sortOptions: true,
});

if (require.main === module) {
  if (process.argv.length <= 2) {
    program.help();
  } else {
    program.parse();
  }
}

module.exports = { program };
