
/*
Classic C-style for
Low level, trades readability for power
for (let i=0; i<mondayLectures.length; i++) {
	const lecture = mondayLectures[i];
	lecture.textContent = "I hate Mondays 😫";
}
for...in
Iterate over object properties
for (const i in mondayLectures) {
	const lecture = mondayLectures[i];
	lecture.textContent = "I hate Mondays 😫";
}
for...of
Iterate over items of iterable objects
for (const lecture of mondayLectures) {
	lecture.textContent = "I hate Mondays 😫";
}
* */


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

/**
Now for functions as a variable, they can be passed as a regular object/variable, and we can call/invoke it with using .call(object_arg),
but then the 'this' pointer inside the passed function will be pointing to the 'object_arg' object.
 */

/**
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
// Auditory exercise function name is dropUntil, but I changed it to a better name
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


// 1.Create a script that filters out products that are out of
// stock and uses array functions to:
// • list the names of the available items
// • calculate the total quantity of all available items
let items = [
    { id: 1, name: "Keyboard", price: 30, qty: 2, inStock: true },
    { id: 2, name: "Mouse", price: 15, qty: 1, inStock: false },
    { id: 3, name: "Monitor", price: 120, qty: 1, inStock: true },
    { id: 4, name: "Headphones", price: 45, qty: 3, inStock: true },
    { id: 5, name: "USB Cable", price: 8, qty: 5, inStock: false }]


let available_items = items.filter(el => el.inStock)
available_items.forEach(el => console.log(el.name))
let total_qty = available_items.map(el => el.qty).reduce((previousValue, currentValue) => previousValue+=currentValue,0)
console.log(total_qty)



// 3. For the given an array of user objects, write a function that
// removes duplicate users while keeping only the first
// occurrence of each email. After cleaning the array, extract only
// the users’ names, sort them alphabetically, and print the result
// as a single comma-separated string.

let user_objs = [
    { id: 1, name: "Ana", email: "ana@example.com" },
    { id: 2, name: "Marko", email: "marko@example.com" },
    { id: 3, name: "Ana", email: "ana1@example.com" },
    { id: 4, name: "Mila", email: "mila@example.com" },
    { id: 5, name: "John", email: "john@example.com" },
    { id: 6, name: "Jane", email: "jane@example.com" }
]

let unique_user_names = []

let unique_users = user_objs.filter((el) => {
    let notInUniqueArrBool = !unique_user_names.includes(el.name)
    if(notInUniqueArrBool){
        unique_user_names.push(el.name)
    }
    return notInUniqueArrBool
})
let fullString = unique_users.map(el => el.name).sort().join(",")
console.log(fullString)


//4 Compute total grade sum for students above 10 by
// composing map, filter and reduce:
const students = [
    { name: "Nick", grade: 10 },
    { name: "John", grade: 15 },
    { name: "Julia", grade: 19 },
    { name: "Nathalie", grade: 9 },
];
let sumGrades = students.filter(st => st.grade>10).map(st => st.grade).reduce((prevSum,curr) => prevSum+=curr, 0)
console.log(sumGrades)


// We can destructure arrays this way
let [stNick,stJohn,stJulia,stNathalie] = students

console.log(stNick)
console.log(stJohn)
console.log(stJulia)
console.log(stNathalie)

// Or we can destructure objects this way
let {name:stName,grade:stGrade} =  stNick
let {name,grade} =  stNick
console.log(stName)
console.log(name)

console.log(stGrade)
console.log(grade)


/**
 * ///////////////////////////////////////////////////////////////////////////////////////////////////
 * Now for Promises, they are objects that represent the result of an async operation - a value that you will get in
 * the future, once the task is completed
 *
 * This is used for asynchronous operations like API calls, file reading, timers, etc..
 *
 * The result is handled with .then() , .catch(), .finally()
 *
 */

/*
fetch("https://jsonplaceholder.typicode.com/posts/")
    .then(response => {
        console.log(response)
        console.log("-------------------------------------------------------")
        response.json()
            .then(responseData => console.log(responseData))
            .catch(responseDataErr => console.log(responseDataErr))

    })
    .catch(err => console.log(err))
*/

async function loadUsers(){
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")

        const responseData = await response.json()

        console.log("Fetched users:\n",responseData)
    } catch (err) {
        console.log("Error fetching data",err)
    } finally {
        console.log("Request Completed")
    }
}

// await loadUsers()


// 5. Fetch data for products from https://dummyjson.com/products
// (GET request) and perform useful data transformations: extract all
// existing categories and print them alphabetically. Print out the three
// products with the highest average review rating and the three with
// the lowest. If a product has no reviews, treat its average as 0. Build
// a summary per category containing the number of products, the
// total inventory value (price * stock summed). Print all products that
// are low stock (stock < 10) sorted by stock ascending. Print the top 5
// discounted products by discount percentage (descending) showing
// Title - Price - Discount%. Finally, produce a quick availability report
// counting products by availability status, print everything in a
// readable format and handle missing/empty arrays appropriately.

async function ex5fetch(){

    try{
        const response = await fetch("https://dummyjson.com/products")

        const responseData = await response.json()

        let allCategories = []
        responseData.products.forEach(prod => {
            if(!allCategories.includes(prod.category)){
                allCategories.push(prod.category)
            }

            if(prod.reviews !== undefined && prod.reviews.length > 0){
                prod["avg_review_rating"] = prod.reviews.map(rev => rev.rating).reduce((prev,curr) =>prev+=curr,0 ) / prod.reviews.length
            }
            else prod["avg_review_rating"] = 0
        })
        //Print all Categories alphabetically
        console.log("Print all Categories alphabetically")
        console.log(allCategories.sort())

        console.log("print 3 products with the lowest review rating")
        console.log(responseData.products.sort((prod,prod1) => prod1["avg_review_rating"]-prod["avg_review_rating"]).slice(0,3))

        console.log("-------------------------------------------------------")
        console.log("print 3 products with the lowest review rating")
        console.log(responseData.products.sort((prod,prod1) => prod["avg_review_rating"]-prod1["avg_review_rating"]).slice(0,3))

        // console.log("-------------------------------------------------------")
        // console.log(responseData.products.sort((prod,prod1) => prod1["avg_review_rating"]-prod["avg_review_rating"]).map(prod => prod.avg_review_rating))


        // Summary of num of products in each category
        let categoriesSummary = []
        allCategories.forEach(cat => {
            categoriesSummary.push({
                category: cat,
                numProducts: responseData.products.filter(prod => prod.category === cat).length,
                total_inv_val: responseData.products.filter(prod => prod.category === cat).reduce((prev,currProd)=> prev+= currProd.stock * currProd.price,0)
            })
        })
        console.log("Summary of num of products in each category")
        console.log(categoriesSummary)


        console.log("Printing products that are low stock")
        console.log(responseData.products.filter(prod => prod.stock < 5).sort((prod,prod1) => prod1.stock-prod.stock))


        console.log("Printing top 5 discounted products descending")
        responseData.products
            .sort((prod,prod1) => prod1.discountPercentage-prod.discountPercentage).slice(0,5)
            .forEach(prod => console.log(prod.title,"-",prod.price,"-",`${prod.discountPercentage}%`))

        console.log("Print quick availability report counting products by availability status")
        let statuses = []
        responseData.products.forEach(prod => {
            if(!statuses.includes(prod.availabilityStatus))
                statuses.push(prod.availabilityStatus)
        })

        let statusesMap = new Map()
        statuses.forEach(stat => {
            statusesMap.set(stat,responseData.products.filter(prod => prod.availabilityStatus === stat).length)
        })

        // console.log(statuses)
        statusesMap.entries().forEach(entry => console.log(entry))

        // console.log(statusesMap)







    } catch (err) {
        console.log("Error while fetching and processing data")
    } finally {
        console.log("Request fetching and processing complete")
    }



}

//await ex5fetch()