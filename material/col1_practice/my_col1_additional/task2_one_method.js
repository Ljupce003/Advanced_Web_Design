// A number in an array is balanced if the sum of numbers before it equals the sum of numbers after it.
// For the first element, consider the sum before it as 0.
// For the last element, consider the sum after it as 0.
//
// Write a JavaScript function countBalancedNumbers that counts how many balanced numbers exist in the array.
//
// Note:
// If the task is solved iteratively, a maximum of 50% of the available points will be awarded.
// If the task is solved using the methods of the array class (e.g. map, filter, reduce, etc.), without using cycles,
// then a maximum of 90% of the points will be awarded.If a task is solved using only one method from the array class
// (e.g. only filter, only reduce, etc.) and without using loops, you can get a maximum of 100% of the points.
//
// console.log(countBalancedNumbers([1, 2, 3, 3])); // 1

function countBalancedNumbers(in_arr){
    return in_arr.reduce((prev,item,id,arr) => {

        let prev_sum = id === 0 ? 0 : arr.slice(0,id).reduce((prev_sum,curr) => prev_sum+=curr,0)
        let successor_sum = id === (arr.length - 1) ? 0 : arr.slice(id+1).reduce((prev_sum,curr) => prev_sum+= curr,0)

        if (prev_sum === successor_sum){
            prev+=1
        }

        return prev

    },0)
}


console.log(countBalancedNumbers([1, 2, 3, 3]));