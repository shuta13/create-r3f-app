'use strict';

const path = require('path');
const fs = require('fs');
const execa = require('execa');

module.exports = function processExit(projectPath, projectName, appType) {
  if (appType === 'native') {
    return;
  }

  const readme = `# ${projectName}\n\nThis project was bootstrapped with [\`create-r3f-app\`](https://github.com/utsuboco/create-r3f-app)`;

  try {
    fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
  } catch (e) {
    /* Noop */
  }
  try {
    execa.sync('git', ['add', '.'], { stdio: 'ignore' });
  } catch (e) {
    /* Noop */
  }
  try {
    execa.sync('git', ['commit', '--amend', '--no-edit'], { stdio: 'ignore' });
  } catch (e) {
    /* Noop */
  }
};
