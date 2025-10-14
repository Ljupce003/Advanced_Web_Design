
// Classical for loop
for(let i = 0; i < 5; i++){
    console.log(i)
}

// THe modern for loop
for(let i of [0,1,2,3,4]){
    console.log(i);
}

let user = {
    Name: "Peter",
    Surname: "PeterSon",
    MiddleName: "PeterBum"
}
// for loop that iterates over properties of an object, because of using 'in'
for(let e in user){
    console.log(e)
}

// console.table([1,2,3,4,5])

/*
Hoisting is getting a function/class that is called before the actual definition, because of the 2 phases of
the JS engine, where the phases are:
- creation phase(defining context and function creation);
- execution phase(global execution context);

Also when we use 'var' variables, and getting then from outside the local scope from where they were created is
called 'var hoisting'.

 */


function greet() {
    console.log('Hello user')
}

greet()

/*
/////////////////////////////////////////////////////////////////////////////////
Now for passing values by reference or value.
Normally all primitive type variables are passed by value.
so this will not work
*/
let x = 1
function increment(arg_x){
    arg_x += 1
    }
increment(x)
/*
Because the value is passed to the function, and the argument variable 'arg_x' will be created as a separate variable in
a different memory address that will have the same value as 'x'

But now for objects, functions. They are passed as a reference. meaning that we get access to the same object that we
passed in. So this will work:
 */
let arr_obj = [1,2,3]
function append(arr_arg){
    arr_arg.push(5)
}

console.log(arr_obj) // [ 1, 2, 3 ]
append(arr_obj)
console.log(arr_obj) // [ 1, 2, 3, 5 ]

/**
 * ///////////////////////////////////////////////////////////////////////////////////////////////////
    We can define functions in three ways
 */

// Classical Definition, "Function Statement", Global usage and definition
function AC(one,two){
    console.log(one+two)
}

// Function as a variable "Function Expression", local definition and can be used only after its defined, used in objects/classes
let AV = function (one,two){
    console.log(one+two)
}

// Lambda Definition: local definition, can be used only after it's defined.
// Arrow functions do not have their own 'this'.
// Instead, they inherit 'this' from the lexical (parent) scope where they were declared.
// So using `this` inside a lambda will actually refer to the parent's `this`,
// not the lambda itself.
let AL = (one, two) => console.log(one + two);

/*
Now for functions as a variable, they can be passed as a regular object/variable, and we can call/invoke it with using .call(object_arg),
but then the 'this' pointer inside the passed function will be pointing to the 'object_arg' object.
 */

/*
///////////////////////////////////////////////////////////////////////////////////////////////////
Now for spread and deconstruct operator
if we want to extract the values from a collection or object we can use the spread operator '...'
 */

let arr1 = [1,2,3]
let arr2 = [4,5,6]

let directly_merger_arr = [arr1 , arr2] // will just put both arrays as elements instead of taking their elements to form a bigger array
let merger_arr_w_spread_opp = [...arr1 , ...arr2] // will extract the elements from both arrays to form the merged array

console.log(directly_merger_arr)
console.log(merger_arr_w_spread_opp)

let [e1,e2] = arr1 // deconstructs the array and extracts and also assigns values to the nw variables
/*
the upper line is same as:
let e1 = arr1[0]
let e2 = arr1[1]
 */
console.log(e1)
console.log(e2)

let {Name,Surname:s_name} = user // deconstructs an object and extracts its attributes
console.log(Name) //
console.log(s_name)
/*
the upper line is same as:
let Name = user.Name
let s_name = user.Surname

 */


/**
 * ///////////////////////////////////////////////////////////////////////////////////////////////////
 Closures - when a function remembers variables form the place it was created, nad inner functions can still access outer
 variables, even after outer function is finished.

 function FactoryFunction(color){
    let numCreated = 0
    return function () {
        let newEl = document.createElement("div")
        newEL.style.background = color;
        newEL.InnerHTML = `${color} Div ${numCreated} '
        numCreated++;
        document.body.appendChild(newEl);
        return newEl
    }
 }

 let blueDivFunc = FactoryFunction("blue")
 let blueD1 = blueDivFunc()
 let blueD2 = blueDivFunc()

 */

// Closure
// function FactoryFunction(color){
//     let numCreated = 0
//     return function () {
//         let newEl = document.createElement("button")
//         newEl.style.background = color;
//         newEl.innerHTML = `${color} Div ${numCreated} `
//         numCreated++;
//         document.body.appendChild(newEl);
//         return newEl
//     }
// }
//
// let blueDivFunc = FactoryFunction("blue")
// let blueD1 = blueDivFunc()
// let blueD2 = blueDivFunc();
//
// console.log(blueD1)
// console.log(blueD2)


// TODO: Check .map .join .sort .slice .reduce .filter

let users = [
    { "user": "barney", "active": false },
    { "user": "fred", "active": false },
    { "user": "pebbles", "active": true } ]

//1. Write a function dropUntil that takes 2 arguments:
// • array: an array of elements
// • predicate: a function to be executed on each element
// The function should drop elements from an array until the predicate is true.
// Auditory exercise function name is dropUntil but i changed it to a better name
function filterElements(arr,predicate){
    return arr.filter(el => predicate(el));
}
//Without array function Implementation
function filterElementsManually(arr,predicate){
    let returnArr = []
    for(let el of arr){
        if(predicate(el)) returnArr.push(el)
    }
    return returnArr
}

function predicateFunc(element){
    return element.active;
}

console.log(filterElements(users,predicateFunc))
console.log(filterElementsManually(users,predicateFunc))



let items = [
    { id: 1, name: "Keyboard", price: 30, qty: 2, inStock: true },
    { id: 2, name: "Mouse", price: 15, qty: 1, inStock: false },
    { id: 3, name: "Monitor", price: 120, qty: 1, inStock: true },
    { id: 4, name: "Headphones", price: 45, qty: 3, inStock: true },
    { id: 5, name: "USB Cable", price: 8, qty: 5, inStock: false }]
