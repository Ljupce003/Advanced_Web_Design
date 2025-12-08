/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var merge = function (arr1, arr2) {
    let mergedArr = []

    mergedArr.push(...arr1)

    for (const el of arr2) {
        let existingId = mergedArr.findIndex((m) => m.id === el.id)

        if (existingId !== -1) {
            Object.assign(mergedArr[existingId],el)
        } else {
            mergedArr.push(el)
        }
    }

    // mergedArr.sort((e1, e2) => e1.id - e2.id)

    for (let i = 0; i < mergedArr.length; i++) {
        for (let j = 0; j < i; j++) {
            let a = mergedArr[i]
            let b = mergedArr[j]
            if(mergedArr[i].id > mergedArr[j].id){
                let tmp = mergedArr[i]
                mergedArr[i] = mergedArr[j]
                mergedArr[j] = tmp
            }
        }
    }

    return mergedArr
};
