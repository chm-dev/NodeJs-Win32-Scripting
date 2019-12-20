const path = require('path');
const fs = require('fs');
const execFile = require('util').promisify(require('child_process').execFile);

const dialog = require('dialog');
const slash = require('slash');

const { debug: debugCfg, nodeSandbox: nodeSandboxCfg } = require('config'); //=

const isRepl = require('./jsutils/isRepl'); //dev helper for usage with js repl in vscode

const scriptPath = isRepl
  ? debugCfg.workPath
  : slash(path.normalize(__dirname)); //=

const copyAll = require(path.join(scriptPath, 'jsutils', 'copyAll'));
const removeAll = require(path.join(scriptPath, 'jsutils', 'removeAll'));

const {
  templatePath: sourcePath,
  temporaryPath: destFolder,
  savedPath,
  vsCodePath
} = nodeSandboxCfg;

const time = new Date();

(async _ => {
  let folderName =
    time.getDate() +
    '-' +
    time.getMonth() +
    '-' +
    time
      .getFullYear()
      .toString()
      .replace(/^\d{2}/, '') +
    '_' +
    time.getHours() +
    '' +
    time.getMinutes();

  const destPath = path.join(destFolder, folderName);
  try {
    fs.mkdirSync(destPath, {
      recursive: true
    });
  } catch (e) {
    if (e.code.toString() !== 'EEXIST') throw e;
  }
  copyAll(sourcePath, destPath);

  await execFile(vsCodePath, [destPath, path.join(destPath, 'index.js'), '-w']);
  const dialog = require('dialog');

  // example, without setting title
  dialog.show(
    'confirm',
    'Delete this workspace?\n\nNo will move it to saved folder. Yes deletes all fil' +
      'es.',
    function(exitCode) {
      switch (exitCode) {
        case 6:
          fs.renameSync(destPath, path.join(savedPath, folderName), {
            recursive: true
          });
          break;
        case 5:
          removeAll(destPath);
          break;
        default:
          console.error('Unknown response for confirm type.');
      }
    }
  );
})();
