// helps with buggy JS REPL __dirname and __foldername values

module.exports = process.argv.some( itm =>
  itm.includes( 'vscode-javascript-repl' )
);
