const fs = require( 'fs' );
const path = require( 'path' );

module.exports = folderPath => {
  if ( !fs.statSync( folderPath ).isDirectory() )
    throw 'Given path must be directory';

  const files = fs.readdirSync( folderPath );
  for ( const file of files ) {
    fs.unlinkSync( path.join( folderPath, file ) );
  }
  fs.rmdirSync( folderPath );
};
