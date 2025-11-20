
function historize(obj){
    let private_obj = obj;
    let changes = []

    return {
        value: private_obj,
        change: (n) => changes.push(n),
        apply (i)  {
            let toApply = (i !== undefined) ? changes.slice(0,i) : changes

            toApply.forEach(ch => {
                // private_obj = {...private_obj,...ch}
                Object.assign(private_obj,ch)

            })


            this.value = private_obj;

            changes = i ? changes.slice(i,changes.length) : []
        },
        rollback: (i) => {
            for(let j = 1; j<= i;j++){
                changes[changes.length - j] = undefined
            }
        },
        get: (i) => changes[i-1],
    }
}