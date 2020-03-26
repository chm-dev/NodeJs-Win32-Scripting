const path = require('path');
const slash = require('slash');

const values = require('../config.json'); //=
path.delimiter = '/';
let validValues = {}; // validated and parsed values will be here

//make a complete path to .template and temp
const ndSndbx = values.nodeSandbox;

['template', 'temporary', 'saved'].forEach(prfx => {
  values.nodeSandbox[prfx + 'Path'] = path.join(
    ndSndbx.sandboxPath,
    ndSndbx[prfx + 'Folder']
  );
});

// normalize all paths
Object.keys(values).forEach(k1 => {
  if (typeof values[k1] !== 'object') validValues[k1] = values[k1];
  else {
    const segment = values[k1];
    validValues[k1] = {};
    Object.keys(segment).forEach(k2 => {
      console.log(k2.toLowerCase().includes('path'));

      validValues[k1][k2] = k2.toLowerCase().includes('path')
        ? slash(path.normalize(segment[k2]))
        : segment[k2];
    });
  }
});
// console.log(validValues);
// console.log(values);

module.exports = validValues;
