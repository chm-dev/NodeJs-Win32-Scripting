const fs = require( 'fs' );
const path = require( 'path' );

module.exports = ( source, destination ) => {
  if ( !fs.statSync( source ).isDirectory() ) throw 'Source path must be directory';
  if ( !fs.statSync( destination ).isDirectory() )
    throw 'Destination path must be directory';

  const files = fs.readdirSync( source );
  for ( var index in files ) {
    fs.copyFileSync(
      path.join( source, files[index] ),
      path.join( destination, files[index] )
    );
  }
};
