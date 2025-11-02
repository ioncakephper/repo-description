/**
 * @file describe.js
 * @description This module provides functions for describing a Git repository's files using AI,
 *              saving the descriptions, and updating markdown-magic configurations.
 * @author Ion Gireada
 */

const fs = require('fs');
const path = require('path');
const Groq = require('groq-sdk');

// const MODEL = 'llama-3.1-8b-instant';
const MODEL = 'groq/compound-mini';
const API_KEY = process.env.GROQ_API_KEY;

if (!API_KEY) {
  throw new Error(
    'GROQ_API_KEY is not set. Please set it in your .env file or as an environment variable.'
  );
}

const groq = new Groq({ apiKey: API_KEY });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Queries the Groq API with a given prompt with retry logic.
 *
 * @param {string} prompt - The prompt to send to the Groq API.
 * @param {number} retries - The number of retries.
 * @param {number} delay - The initial delay between retries in ms.
 */
async function queryGroq(prompt, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: MODEL,
      });

      return (
        chatCompletion.choices[0]?.message?.content.trim() ||
        'Description unavailable.'
      );
    } catch (e) {
      console.error(
        `Failed to query Groq API (attempt ${i + 1}/${retries}):`,
        e.message
      );
      if (e.cause) {
        console.error('Underlying cause:', e.cause);
      }
      if (i < retries - 1) {
        await sleep(delay * (i + 1));
      }
    }
  }
  return 'Description unavailable.';
}

/**
 * Recursively gets all file paths within a directory, respecting ignore patterns.
 *
 * @param {string} dir - The directory to start searching from.
 * @param {string[]} [ignore=[]] - An array of patterns to ignore.
 * @returns {string[]} An array of absolute file paths.
 */
function getAllFiles(dir, ignore = []) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    if (ignore.some((i) => filePath.includes(i))) return;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, ignore));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

/**
 * Describes a given repository by generating AI-powered descriptions for each file.
 *
 * @param {string} repoPath - The path to the repository.
 * @param {object} [options={}] - Options for describing the repository.
 */
async function describeRepo(repoPath, options = {}) {
  const files = getAllFiles(repoPath, options.ignore || ['node_modules']);
  const descriptions = {};

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8').slice(0, 1500);
    //     const prompt = `Describe the following file in one sentence, following the pattern "This [file type] [action]...":

    // File path: ${file}
    // Content (truncated):
    // ${content}`;

    const prompt = `Describe the following file in one sentence, following the pattern "[action]...":

File path: ${file}
Content (truncated):
${content}`;

    descriptions[path.relative(repoPath, file)] = await queryGroq(prompt);
  }

  return descriptions;
}

/**
 * Updates a markdown-magic configuration file with new descriptions.
 *
 * @param {string} configPath - The path to the markdown-magic.config.js file.
 * @param {string} transformName - The name of the transform to update within the config.
 * @param {object} descriptions - An object containing file descriptions to be added to the config.
 * @returns {Promise<void>}
 *
 * Update markdown-magic.config.js with descriptions
 */
async function updateMarkdownMagicConfig(
  configPath,
  transformName,
  descriptions
) {
  const absPath = path.resolve(configPath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`Config file not found: ${absPath}`);
  }

  const config = require(absPath);

  if (!config.transformDefaults) {
    config.transformDefaults = {};
  }
  if (!config.transformDefaults[transformName]) {
    config.transformDefaults[transformName] = {};
  }

  config.transformDefaults[transformName].descriptions = descriptions;

  // Write back to file
  const newConfig = `module.exports = ${JSON.stringify(config, null, 2)};\n`;
  fs.writeFileSync(absPath, newConfig);
  console.log(`Updated ${transformName}.descriptions in ${configPath}`);
}

/**
 * Saves the generated descriptions to an output file in the specified format.
 *
 * @param {object} inputDescriptions - An object containing file paths as keys and their descriptions as values.
 * @param {string} outputFile - The path to the output file.
 * @param {string} [format='json'] - The desired output format ('json' or 'markdown').
 * @param {boolean} [summary=false] - Whether to include a summary at the top of markdown output.
 * @param {boolean} [table=false] - Whether to use a table format for markdown output.
 */
function saveOutput(
  inputDescriptions,
  outputFile,
  format = 'json',
  summary = false,
  table = false
) {
  const transformDescriptions = (inputDescriptions) => {
    const outputDescriptions = {};
    for (const key in inputDescriptions) {
      if (Object.prototype.hasOwnProperty.call(inputDescriptions, key)) {
        const newKey = key.replace(/\\/g, '/');
        outputDescriptions[newKey] = inputDescriptions[key];
      }
    }
    return outputDescriptions;
  };

  const descriptions = transformDescriptions(inputDescriptions);

  if (format === 'json') {
    fs.writeFileSync(outputFile, JSON.stringify(descriptions, null, 2));
  } else if (format === 'markdown') {
    let md = '# 📄 Repository File Descriptions\n\n';
    if (summary) {
      md += `This repository contains **${
        Object.keys(descriptions).length
      } files**. Below are AI-generated descriptions:\n\n`;
    }

    if (table) {
      md += '| File | Description |\n';
      md += '|------|-------------|\n';
      for (const [file, desc] of Object.entries(descriptions)) {
        md += `| ${file} | ${desc} |\n`;
      }
    } else {
      for (const [file, desc] of Object.entries(descriptions)) {
        md += `- **${file}** → ${desc}\n`;
      }
    }

    fs.writeFileSync(outputFile, md);
  }
}

module.exports = {
  describeRepo,
  updateMarkdownMagicConfig,
  saveOutput,
  getAllFiles,
  queryGroq,
  sleep,
};
