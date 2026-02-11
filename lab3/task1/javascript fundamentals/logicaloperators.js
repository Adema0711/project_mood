alert( null || 2 || undefined ); //answer is 2

alert( alert(1) || 2 || alert(3) ); //fisrt 1 then 2

alert( 1 && null && 2 ); //answer is null

alert( alert(1) && alert(2) );// the answer 1, then undefined

alert( null || 2 && 3 || 4 );// answer 3

if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );//the first and the third will execute
// Runs.
// The result of -1 || 0 = -1, truthy
if (-1 || 0) alert( 'first' );

// Doesn't run
// -1 && 0 = 0, falsy
if (-1 && 0) alert( 'second' );

// Executes
// Operator && has a higher precedence than ||
// so -1 && 1 executes first, giving us the chain:
// null || -1 && 1  ->  null || 1  ->  1
if (null || -1 && 1) alert( 'third' );