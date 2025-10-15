
/**
when we inject javascript scripts into html code, we should also put type="module"
so that the script will be loaded asynchronously, not synchronously
 */

/**
/////////////////////////////////////////////////////////////////////////////////
We can check the type of value by typing typeof
 */
let var1 = 10;
console.log(typeof var1);

let arr = [1,2,3] // Array
console.log(arr); // object

let set = new Set();
console.log(typeof set) //object

let map = new Map();
console.log(typeof map) //object

let func = function (){ return 1}
console.log(typeof func); // function


/**
/////////////////////////////////////////////////////////////////////////////////
Now for the types
Primitive types are: Number, String, Boolean
Emptiness are: null and undefined
Falsy values are: false, "", 0 NaN, null, undefined
All else is truthy

We can force Conversion with Boolean(value) or !!value
 */
console.log(Boolean(null))      // false
console.log(Boolean(undefined)) // false
console.log(Boolean(""))        // false
console.log(Boolean(NaN))             // false
console.log(Boolean(false))     // false

console.log("0", Boolean("0"),!!"0")    // 0, true, true
console.log([], Boolean([]),!![])       // 0, true, true

console.log(NaN, Boolean(NaN), !!NaN) // NaN, false, false



/**
/////////////////////////////////////////////////////////////////////////////////
Now for the console.
We can use special commands or variables in the console:
 - $('CSS_SELECTOR') - the first DOM element that has that selector
 - $$('CSS_SELECTOR') - array of DOM elements that has that selector
 - $0 - $4 - last 5 elements selected in the elements panel
 - $_ last evaluated expression
 */

// We can dynamically reassign or change variable types based on need
let a = 10
console.log(a)
a = "ten"
console.log(a)




/**
/////////////////////////////////////////////////////////////////////////////////
For scope of variables we have these types:
- var - global, can also be used outside where its defined, CAN BE REDECLARED in the current scope
- let - can be used only locally, best to use, CANNOT BE REDECLARED in the current scope
- const - can be used only locally, also CANNOT BE CHANGED later,
 BUTT, when used on objects, its attribute values can be changed,
 only the reference cannot be changed.
 */
if (1){
    let fa = 10
    var fv = 15
    const fc = 20

    console.log("fa inside =: ",fa)
    console.log("fv inside =: ",fv)
    console.log("fc inside =: ",fc)
    var fv = 45
}
console.log("fv outside =: ",fv)
// console.log("fc outside =: ",fc) // fc is not defined ERROR
// console.log("fa outside =: ",fa) // fa is not defined ERROR

const v1 = 5;
//v1 = 35; // Assignment to constant variable ERROR
console.log(v1)

const c_arr = [1,2,3]
// c_arr = [1,2,3] // This will be an ERROR
c_arr[2] = 15; // THis is NO ERROR
console.log(c_arr) // [ 1, 2, 15 ]

/**
/////////////////////////////////////////////////////////////////////////////////
We cannot use variables/objects that were never mentioned before, but
mentioned and without assigned value is possible, those are 'undefined'.
    Also, non-existent or deleted objects CAN BE READ, and will also return 'undefined'
    We can put the value of attributes to 'undefined' and that will not delete the attribute.
 */
// console.log(vvvv) // This way we get VAR is not defined ERROR
let vvx;
console.log(vvx) // This will be 'undefined', it is there but without value, but NO ERROR

/**
/////////////////////////////////////////////////////////////////////////////////
Now for JS Objects.
We can define then as a dictionary of key-pair values. We can add them in the definition or later during runtime, also
we can delete attributes at runtime.
 */

let user = {
    Name: "Peter",
}
user.Surname = "Peterson" // We can add attributes later
user["Age"] = 20 // We can add attributes later
user.grades = [5,5,3,4,5]

console.log(user)

delete user.grades // We can Delete attributes with 'delete'
console.log(user)
console.log(user.grades) // THis will not throw an error , just will be 'undefined'

// Also arrays are objects, and we can add attributes to then whenever we like
let array = [1,2,3]
array.user = "Ljupce";
console.log(array.length, array, array.user, array["1"]) // 3,  [ 1, 2, 3, user: 'Ljupce' ],  Ljupce, 2


