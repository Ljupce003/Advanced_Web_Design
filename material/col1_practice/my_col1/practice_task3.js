// A peak in an array is an element whose left and right neighbors (if present) are smaller than the element. If an
// element has only 1 neighbor, it is a peak only if it is larger than its neighbor.
//
// For a given array in JavaScript, write a function that will find the sum of all peaks present in the array.
//
// Note:
//
//     If the task is solved iteratively, a maximum of 50% of the available points will be awarded.
//     If the task is solved using the methods of the array class (e.g. map, filter, reduce, etc.), without using cycles, then a
//     maximum of 90% of the points will be awarded.
//     If a task is solved using only one method from the array class (e.g. only filter, only reduce, etc.) and
//     without using loops, you can get a maximum of 100% of the points.


function sum_peaks(x) {
     return x.reduce((prev_sum,item,id) => {
         if(id === 0 || id === x.length-1) return prev_sum

         if (x[id-1] < item && item > x[id+1] )return prev_sum+item

         return prev_sum

     },0);
}
let x = [1, 2, 1, 5, 3, 1, 4, 1, 0, 1, 1, 1, 0, 0, 0, 0];



 console.log(sum_peaks(x))