const process = require('process');
const path = require('path');
const fs = require('fs');
const execFile = require('util').promisify(require('child_process').execFile);
const exec = require('child_process').spawn;

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
  vsCodePath,
  vsCodeProfileParams
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
    fs.mkdirSync(destPath, { recursive: true });
  } catch (e) {
    if (e.code.toString() !== 'EEXIST') throw e;
  }
  //if (!globalNode)
  await copyAll(sourcePath, destPath, {
    overwrite: true,
    dot: true
  });
  let args = vsCodeProfileParams.concat([
    destPath,
    path.join(destPath, 'index.js'),
    '-w',
    '-n'
  ]); //
  // console.log(args);

  const autoinstall = exec('cmd.exe', ['/c', `npx`, 'auto-install'], {
    cwd: destPath,
    windowsHide: false,
    detached: false
  });
  console.log('auto-install');
  console.log(autoinstall);
  await execFile(vsCodePath, args);
  const dialog = require('dialog');

  // example, without setting title
  dialog.show(
    'confirm',
    'Delete this workspace?\n\nNo will move it to saved folder. Yes deletes all fil' +
      'es.',
    async function(exitCode) {
      switch (exitCode) {
        case 6:
          fs.renameSync(destPth, path.join(savedPath, folderName), {
            recursive: true
          });
          break;
        case 5:
          await del[`${destPath}/**`];
          dialog.show('info', `${destPath}/** deleted`);
          break;
        default:
          console.error('Unknown response for confirm type.');
          dialog.show('info', 'Unknown response for confirm type.');
      }
      /*  autoinstall.kill();
       if (autoinstall.killed) dialog('info', 'auto-install killed');
       else autoinstall.kill(); */
      console.log('exiting');
      process.exit();
    }
  );
})();
