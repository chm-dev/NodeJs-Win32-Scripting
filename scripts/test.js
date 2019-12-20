var dialog = require( 'dialog' );

// example, without setting title
dialog.show(
  'prompt',
  'This computer will autoterminate itself in 5 seconds.',
  function( exitCode ) {
    if ( exitCode == 6 ) console.log( 'No' );
    if ( exitCode == 5 ) console.log( 'Yes' );
  }
);
