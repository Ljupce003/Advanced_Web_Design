

let myArr= [1,2,3,4,5]

console.log(myArr)

console.log("\nSlice with start:0")
console.log(myArr.slice(0))

console.log("\nSlice with start:1")
console.log(myArr.slice(1))

console.log("\nSlice with start:1 and end: arr.length")
console.log(myArr.slice(1,myArr.length))

console.log("\nSlice with start:-1 and end: arr.length")
console.log(myArr.slice(-1,myArr.length))

console.log("\nSlice with start:0 and end: arr.length-1")
console.log(myArr.slice(0,myArr.length-1))


console.log("\nSlice with start: arr.length")
console.log(myArr.slice(myArr.length))

// myArr.shift()


let myArr1 = myArr.slice();

myArr1.shift()

console.log(myArr)
console.log(myArr1.push(6))


class P{
    constructor(name) {
        this.name = name
    }
}

let p = new P("Peter");

let p1 = p;

console.log(p.name)

console.log(p1.name)

p1.name = "John"

console.log(p.name)
console.log(p1.name)

let name = "Peter"

let arr = [
    {name: "Peter", age: 15},
    {name: "Amanda", age: 10},
    {name: "John", age: 5},
    {name: "Zaturn", age: 42},
    {name: "Bob", age: 6},
]

let sorted = arr.sort((p1,p2) => p1.name.localeCompare(p2.name))

console.log(sorted)

console.log("Hello World".split("").toSpliced(5,1).join(","))


let d= new Date();

console.log(d)
// console.log(d.toDateString())
// console.log(d.toString())
// console.log(d.toISOString())
// console.log(d.toUTCString())
console.log(d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear())


