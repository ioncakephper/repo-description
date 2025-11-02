/**
 * @file index.js
 * @description This is the main entry point for the `repo-describer` library.
 * @author Ion Gireada
 */

const {
  describeRepo,
  saveOutput,
  updateMarkdownMagicConfig,
} = require('./describe.js');

module.exports = {
  describeRepo,
  saveOutput,
  updateMarkdownMagicConfig,
};
