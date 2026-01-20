export function objectsDiff(oldObj, newObj) {
    const newKeys = Object.keys(newObj);
    const oldKeys = Object.keys(oldObj);

    const added = []
    const updated = []

    newKeys.forEach((newK) => {
        // Keys in the new object that are not present in the old object
        if (!(newK in oldObj)) {
            added.push(newK)
        }
        // Keys in both objects that are present but have different values
        if (newK in oldObj && oldObj[newK] !== newObj[newK]) {
            updated.push(newK)
        }
    })

    return {
        added: added,
        // Keys in the old object that were present, but they aren't now in the new object
        removed: oldKeys.filter((key) => !(key in newObj)),
        updated: updated
    }
}

export function hasOwnProperty(obj,prop){
    return Object.prototype.hasOwnProperty.call(obj,prop)
}