const fs = require('fs');
const path = require('path');
require('dotenv/config');
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

async function queryGroq(prompt) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL,
    });

    return chatCompletion.choices[0]?.message?.content.trim() || null;
  } catch (e) {
    console.error('Failed to query Groq API:', e);
    return null; // Return null on error to indicate failure
  }
}

async function updateReadmeFile(packageName, packageDescription) {
  const readmePath = path.join(__dirname, '..', 'README.md');
  let readmeContent = '';
  if (fs.existsSync(readmePath)) {
    readmeContent = fs.readFileSync(readmePath, 'utf8');
  }

  let newReadmeContent = `# ${packageName}\n\n`;
  newReadmeContent += `${packageDescription}\n`;

  // If there's existing content after the first heading, preserve it,
  // but replace any old description.
  const lines = readmeContent.split('\n');
  let foundFirstHeading = false;
  let descriptionReplaced = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('# ') && !foundFirstHeading) {
      foundFirstHeading = true;
      // Skip the original heading and potentially old description
      // The new heading and description are already added to newReadmeContent
      continue;
    }
    if (foundFirstHeading && !descriptionReplaced && lines[i].trim() !== '') {
      // This is where an old description might be.
      // We've already added the new description, so we skip until we find a new section.
      // A simple heuristic: if it's not a blank line and not a heading, it's part of the description.
      // For now, we'll just replace everything after the first heading with the new description.
      // If there are other sections, they will be appended after the new description.
      if (lines[i].startsWith('##')) {
        // Found a level 2 heading, append from here
        newReadmeContent += '\n' + lines.slice(i).join('\n');
        break;
      }
    } else if (foundFirstHeading && descriptionReplaced) {
      newReadmeContent += '\n' + lines[i];
    }
  }

  fs.writeFileSync(readmePath, newReadmeContent.trim() + '\n');
  console.log('README.md updated successfully!');
}

async function refactorPackageJson() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const currentPackageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, 'utf8')
  );

  console.log('Refactoring package.json...');

  // Generate description
  const descriptionPrompt = `Given the following project structure and purpose (a tool to describe repositories), suggest a concise and engaging description for a package.json file.\n  Project purpose: A command-line interface (CLI) tool that uses AI to describe files within a given repository.\n  Current files: ${JSON.stringify(Object.keys(currentPackageJson.scripts || {}))}\n  `;
  const newDescription = await queryGroq(descriptionPrompt);
  if (newDescription) {
    currentPackageJson.description = newDescription;
    console.log(`Generated new description: ${newDescription}`);
  }

  // Generate keywords
  const keywordsPrompt =
    'Given the project purpose: "A command-line interface (CLI) tool that uses AI to describe files within a given repository.", suggest 5-10 relevant keywords for a package.json file, comma-separated.';
  const newKeywords = await queryGroq(keywordsPrompt);
  if (newKeywords) {
    currentPackageJson.keywords = newKeywords
      .split(',')
      .map((keyword) => keyword.trim());
    console.log(`Generated new keywords: ${newKeywords}`);
  }

  // Determine 'files' array
  currentPackageJson.files = [
    'src/',
    'src/cli.js',
    'src/describe.js',
    'src/utils.js',
  ];
  console.log(`Set 'files': ${JSON.stringify(currentPackageJson.files)}`);

  // Update scriptMeta
  currentPackageJson.scriptMeta = {
    test: 'Runs the test suite using Jest.',
    describe:
      'Generates AI-powered descriptions for repository files and outputs them in various formats.',
  };
  console.log(
    `Set 'scriptMeta': ${JSON.stringify(currentPackageJson.scriptMeta)}`
  );

  // Write the updated package.json back to file
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(currentPackageJson, null, 2) + '\n'
  );
  console.log('package.json refactored successfully!');

  // Update README.md
  await updateReadmeFile(
    currentPackageJson.name,
    currentPackageJson.description
  );
}

refactorPackageJson().catch(console.error);
