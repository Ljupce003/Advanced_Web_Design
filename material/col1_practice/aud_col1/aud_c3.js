

// 50% when using for cycles and iterative

function iterative_sum(arr){

    let sum = 0
    for (let i = 0; i < arr.length; i++) {

        if(i === 0){
            if (arr[i] > arr[i+1]){
                sum += arr[i];
            }
        }
        else if(i === arr.length - 1){
            if(arr[i] > arr[i-1]){
                sum += arr[i]
            }
        }
        else {
            if(arr[i] > arr[i-1] && arr[i] > arr[i+1]){
                sum += arr[i]
            }
        }
    }
    return sum
}


// Using multiple array functions for 90%

function array_funcs_sum(arr){
    let peaks = arr.filter((value,id) => {
        if(id === arr.length - 1 && arr[id] > arr[id-1]){
            return true
        }
        else if(id === 0 && arr[id] > arr[id+1]){
            return true
        }
        else if(id !== 0 && id !== arr.length - 1 && arr[id] > arr[id+1] && arr[id] > arr[id-1]){
            return true
        }
        return false
    })

    return peaks.reduce((prev,val) => prev += val,0);
}


// Using one function 100%

function one_method_sum(arr){
    return arr.reduce((prev,curr,id,arr) => {


        if(id === arr.length - 1){
            if(arr[id-1] < curr){
                prev += curr;
            }
        }else if(id === 0){
            if(arr[id+1] < curr){
                prev += curr;
            }
        }
        else if(curr > arr[id-1] && curr > arr[id+1]){
            prev+= curr;
        }
        return prev
    },0)
}


let x = [1, 2, 1, 5, 3, 1, 4, 1, 0, 1, 1, 1, 0, 0, 0, 0];



console.log(iterative_sum(x))
console.log(array_funcs_sum(x))
console.log(one_method_sum(x))