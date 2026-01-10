export const ARRAY_DIFF_OP = {
    ADD: 'add',
    REMOVE: 'remove',
    MOVE: 'move',
    NOOP: 'noop',
}

export function withoutNulls(arr) {
    return arr.filter((item) => item != null)
}

export function arraysDiff(oldArray, newArray) {
    return {
        // Items in the new array that are not in the old array were added
        added: newArray.filter((newItem) => !oldArray.includes(newItem)),

        // Items in the old array that are not in the new array were removed
        removed: oldArray.filter((oldItem) => !newArray.includes(oldItem))
    }
}


// We use a wrapper class for the old array so that we can keep track of its original indexes inside
class ArrayWithOriginalIndices {
    #array = []
    #originalIndices = []
    #equalsFn

    constructor(array, equalsFn) {
        this.#array = [...array]  // The internal array is a copy of the original.
        this.#originalIndices = array.map((_, i) => i) // Keeps track of the original indices
        this.#equalsFn = equalsFn // Saves the function used to compare items in the array
    }

    get length() {
        return this.#array.length // The current length of the array
    }

    // Checks if the object needs to be removed
    isRemoval(index, newArray) {

        // If the index is out of bounds, there's nothing to remove.
        if (index >= this.length) {
            return false
        }

        // Gets the item in the old array at the given index
        const item = this.#array[index]

        // Tries to find the same item in the new array, returning its i
        const indexInNewArray = newArray.findIndex((newItem) =>
            // Uses the #equalsFn to compare the items
            this.#equalsFn(item, newItem)
        )

        // If the index is -1, the item was removed.
        return indexInNewArray === -1
    }

    //Removes the item with the provided id
    removeItem(index) {
        // Creates the operation for the removal
        const operation = {
            op: ARRAY_DIFF_OP.REMOVE,
            index,
            // The current index of the item in the old array (not the original index)
            item: this.#array[index],
        }

        // Removes the item from the array
        this.#array.splice(index, 1)

        // Removes the original index of the item
        this.#originalIndices.splice(index, 1)

        // Returns the operation
        return operation
    }

    // Checks if the item doesn't need operation
    isNoop(index, newArray) {
        // If the index is out of bounds, there can't be a noop.
        if (index >= this.length) {
            return false
        }
        // The item in the old array
        const item = this.#array[index]

        // The item in the new array
        const newItem = newArray[index]

        // Checks whether the items are equal
        return this.#equalsFn(item, newItem)
    }


    originalIndexAt(index) {
        // Returns the original index of the item in the old array
        return this.#originalIndices[index]
    }

    noopItem(index) {

        // Creates the noop operation
        return {
            op: ARRAY_DIFF_OP.NOOP,

            // Adds the original index to the operation
            originalIndex: this.originalIndexAt(index),
            index,

            // Includes the item in the operation
            item: this.#array[index],
        }
    }

    findIndexFrom(item, fromIndex) {

        // Starts looking from the given index\\
        for (let i = fromIndex; i < this.length; i++) {
            // If the item at the index i equals the given one, returns i
            if (this.#equalsFn(item, this.#array[i])) {
                return i
            }
        }
        // Returns -1 if the item wasn't found\\
        return -1
    }

    // Checks whether the item exists starting at the given index\\
    isAddition(item, fromIdx) {
        return this.findIndexFrom(item, fromIdx) === -1
    }

    addItem(item, index) {
        // Creates the add operation
        const operation = {
            op: ARRAY_DIFF_OP.ADD,
            index,
            item,
        }

        // Adds the new item to the old array at the given index
        this.#array.splice(index, 0, item)

        // Adds a -1 index to the #originalIndices array at the given in
        this.#originalIndices.splice(index, 0, -1)

        // Returns the add operation
        return operation
    }

    moveItem(item, toIndex) {

        // Looks for the item in the old array, starting from the target
        const fromIndex = this.findIndexFrom(item, toIndex)

        // Creates the move operation
        const operation = {
            op: ARRAY_DIFF_OP.MOVE,

            // Includes the original index in the operation
            originalIndex: this.originalIndexAt(fromIndex),
            from: fromIndex,
            index: toIndex,
            item: this.#array[fromIndex],
        }
        // Extracts the item from the old array
        const [_item] = this.#array.splice(fromIndex, 1)

        // Inserts the item into the new position
        this.#array.splice(toIndex, 0, _item)

        // Extracts the original index from the #originalIndices array
        const [originalIndex] =this.#originalIndices.splice(fromIndex, 1)

        // Inserts the original index into the new position
        this.#originalIndices.splice(toIndex, 0, originalIndex)

        // Returns the move operation
        return operation
    }


    removeItemsAfter(index) {
        const operations = []

        // Keeps removing items while the old array is longer than the i
        while (this.length > index) {

            // Adds the removal operation to the array\\
            operations.push(this.removeItem(index))
        }
        // Returns the removal operations\\
        return operations
    }

}

// The equalsFn is used to compare items in the array
export function arraysDiffSequence(oldArray, newArray, equalsFn = (a, b) => a === b) {
    const sequence = []
    const array = new ArrayWithOriginalIndices(oldArray, equalsFn) // Wraps the old array in an ArrayWithOriginalIndices

    for (let index = 0; index < newArray.length; index++) {  // Iterates the indices of the new array

        // Checks whether the item in the old array at the current index was removed
        if (array.isRemoval(index, newArray)) {
            // Removes the item and pushes the operation to the sequence
            sequence.push(array.removeItem(index))
            // Decrements the index to stay at the same index in the next iteration
            index--
            continue
        }

        // Checks whether the operation is a noop
        if (array.isNoop(index, newArray)) {
            // Pushes the noop operation to the sequence\\
            sequence.push(array.noopItem(index))
            continue
        }

        // Gets the item in the new array at the current index
        const item = newArray[index]

        // Checks whether the case is an addition
        if (array.isAddition(item, index)) {

            // Appends the add operation to the sequence
            sequence.push(array.addItem(item, index))

            // Continues with the loop
            continue
        }

        sequence.push(array.moveItem(item, index))
    }

    sequence.push(...array.removeItemsAfter(newArray.length))

    return sequence // Returns the sequence of operations
}