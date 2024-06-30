export function toUpperCase(str) {
    return ( ` Was: ${str} => Now: ${ str.toUpperCase() }  ` );
};

export function showReverse( str ) {
    return ( ` Was: ${str} => Now: ${ str.split( "" ).reverse().join("") }   ` );
};