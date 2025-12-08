// Write a function named getDoubleN that takes a number n and returns a new function that takes no arguments.
//
// Every time this second function is invoked, it should return the double of the previous invocation.
// The first invocation should return the double on n.
//
// const test1 = getDoubleN(3);
// console.log(test1()); // 6
// console.log(test1()); // 12
// console.log(test1()); // 24

function getDoubleN(n){
    let p_n = n
    return function(){
        p_n *=2
        return p_n
    }
}


const test2 = getDoubleN(5);
console.log(test2());
console.log(test2());
console.log(test2());
