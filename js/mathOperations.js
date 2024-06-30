function plus ( numOne, numTwo ) {
    return ( `Result: ${numOne} + ${numTwo} = ${ numOne + numTwo }` );
};


function minus ( numOne, numTwo ) {
    return ( ` Result: ${numOne} - ${numTwo} = ${numOne - numTwo} ` );
};

function multi ( numOne, numTwo ) {
    return ( ` Result: ${numOne} * ${numTwo} = ${numOne * numTwo} ` );
};

function divide ( numOne, numTwo ) {
    return ( ` Result: ${numOne} / ${numTwo} = ${Math.floor( numOne / numTwo )} ` );
};

export { plus, minus, multi, divide };