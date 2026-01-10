import {defineStore} from "pinia";
import {ref} from "vue";

export const useTasksStore = defineStore("tasks",() => {

    const tasks = ref([])

    const sequenceN = ref(0)
    const acquireNewId = () => {
        sequenceN.value += 1
        return sequenceN.value
    }

    const addTask = (task) => {
        tasks.value.push(task)
        return task
    }

    const removeTask = (id) => {

        const index = tasks.value.findIndex(t => t.id === id)

        if (index !== -1) {
            return tasks.value.splice(index, 1)
        }
        return null
    }

    const updateTask = (task,id) => {

        const index = tasks.value.findIndex(t => t.id === id)

        if (index !== -1) {
            return tasks.value.splice(index,1,task)
        }
        return null
    }

    const fetchTask = (id) => {
        const numericId = Number(id);
        const index = tasks.value.findIndex(t => t.id === numericId)

        if (index !== -1) {
            return tasks.value[index]
        }
        return null
    }

    return {tasks,addTask,removeTask,updateTask,acquireNewId,fetchTask}
})