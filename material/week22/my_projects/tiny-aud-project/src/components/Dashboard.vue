<script setup>

import {computed, ref, watch} from "vue";
import {useTasksStore} from "@/stores/tasks.js";
import {TaskStatus} from "@/constants/taskStatus.js";

const tasksStore = useTasksStore()

const newTask = ref("")

// const newTask1 = ref("")

function updateTask(event) {
  newTask.value = event.target.value
}


watch(
    tasksStore.tasks, // how is it different from () => tasksStore.tasks.value
    () => {
      console.log("Change to the tasks occurred")
    }
)


const totalTasks = computed(() => tasksStore.tasks.length)
const todoTasks = computed(() => tasksStore.tasks.filter(t => t.status === TaskStatus.TODO).length)
const pendingTasks = computed(() => tasksStore.tasks.filter(t => t.status === TaskStatus.PENDING).length)
const completedTasks = computed(() => tasksStore.tasks.filter(t => t.status === TaskStatus.COMPLETED).length)

function addTask() {
  let id = tasksStore.acquireNewId()

  let newTaskObj = {
    id,
    text: newTask.value,
    status: TaskStatus.TODO
  }

  tasksStore.addTask(newTaskObj)

  newTask.value = ""
}

const user_name = ref("Ljupce")

</script>

<template>
  <div class="dashboard">
    <h2 v-once class="section-title">{{user_name}} Dashboard</h2>

    <div class="stats-container">
      <div class="stats-card">Total Tasks: {{ totalTasks }}</div>
      <div class="stats-card">To Do: {{ todoTasks }}</div>
      <div class="stats-card">Pending: {{ pendingTasks }}</div>
      <div class="stats-card">Completed: {{ completedTasks }}</div>
    </div>

    <div class="quick-add">
      <!--      <input type="text" placeholder="Add a new task..." class="input-task" v-model="newTask" />  I wanted to try two way binding manually with v-bind and an event -->
      <input type="text" placeholder="Add a new task..." class="input-task" :value="newTask" @input="updateTask" @keydown="(e) => {console.log(e.key); if(e.key === 'Enter'){addTask()}}" autofocus/>
      <button class="btn-add" @click="addTask">Add Task</button>
    </div>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.stats-container {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.stats-card {
  flex: 1;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.quick-add {
  display: flex;
  gap: 10px;
}

.input-task {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-add {
  padding: 8px 15px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-add:hover {
  background-color: #115293;
}
</style>