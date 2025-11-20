function historize(obj){
    let private_obj = obj
    let changes = []
    return {
        value: private_obj,
        change: (n) => changes.push(n),
        apply(i) {
            let toApply = (i === undefined) ? changes : changes.slice(0, i);

            toApply.forEach(ch => {
                private_obj = {...private_obj,...ch}
            })

            this.value = private_obj

            if (i === undefined) {
                changes = [];
            } else {
                changes.splice(0, i);
            }
        },
        rollback: (x) => {
            if(x === undefined){
                changes[changes.length-1] = undefined
            }else {
                for (let i = 1; i <= x ; i++) {
                    changes[changes.length-i] = undefined
                }
            }
        },
        get: (i) => changes[i-1]
    }
}

