const path = require('path');
const fs = require('fs');
const execFile = require('util').promisify(require('child_process').execFile);

const dialog = require('dialog');
const slash = require('slash');
const copyAll = require('recursive-copy');
const del = require('del');

const { debug: debugCfg, nodeSandbox: nodeSandboxCfg } = require('config'); //=
const isRepl = require('./jsutils/isRepl'); //dev helper for usage with js repl in vscode

const scriptPath = isRepl
  ? debugCfg.workPath
  : slash(path.normalize(__dirname)); //=

//TODO: template path should be in repo

const {
  templatePath: sourcePath,
  temporaryPath: destFolder,
  savedPath,
  vsCodePath
} = nodeSandboxCfg;

const globalNode = process.argv.includes('global-node');
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
    fs.mkdirSync(destPath, { recursive: true });
  } catch (e) {
    if (e.code.toString() !== 'EEXIST') throw e;
  }
  if (!globalNode)
    await copyAll(sourcePath, destPath, {
      overwrite: true,
      dot: true
    });

  await execFile(vsCodePath, [destPath, path.join(destPath, 'index.js'), '-w']);
  const dialog = require('dialog');

  // example, without setting title
  dialog.show(
    'confirm',
    'Delete this workspace?\n\nNo will move it to saved folder. Yes deletes all fil' +
      'es.',
    async function(exitCode) {
      switch (exitCode) {
        case 6:
          fs.renameSync(destPath, path.join(savedPath, folderName), {
            recursive: true
          });
          break;
        case 5:
          await del[`${destPath}/**`];
          break;
        default:
          console.error('Unknown response for confirm type.');
      }
    }
  );
})();
