<script setup>


import {useTasksStore} from "@/stores/tasks.js";
import {TaskStatus} from "@/constants/taskStatus.js";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

const tasksStore = useTasksStore()

const router = useRouter()

const editModalState = ref({})
const editModalOpen = ref(false)

function getNextStatusToDisplay(curr) {
  if (curr === TaskStatus.TODO) return "Set Pending"
  if (curr === TaskStatus.PENDING) return "Complete"
  else return "Completed"
}

function getNextStatus(curr) {
  if (curr === TaskStatus.TODO) return TaskStatus.PENDING
  if (curr === TaskStatus.PENDING) return TaskStatus.COMPLETED
  return TaskStatus.COMPLETED
}

function updateStatus(task) {
  task.status = getNextStatus(task.status)

  tasksStore.updateTask(task, task.id)
}

function updateTask() {
  if (editModalState.value === null || Object.keys(editModalState.value).length === 0) {
    alert("Edit Object is missing")
    return
  }

  for (const key of Object.keys(editModalState.value)) {
    if (!editModalState.value[key]) {
      alert("Edit Object attribute is blank")
      return
    }
  }

  const _task = {...editModalState.value}
  console.log(_task)
  if (!!tasksStore.updateTask(_task, _task.id) === false) {
    alert("Error updating the task")
    return;
  }

  editModalState.value = {}
  editModalOpen.value = false


}

function deleteTask(task_id) {
  tasksStore.removeTask(task_id)
}

function openEditModal(task) {
  editModalOpen.value = true
  editModalState.value = {...task}
}

function closeEditModal() {
  editModalOpen.value = false
  editModalState.value = {}
}

</script>

<template>
  <div class="tasks">
    <h2 class="section-title">Tasks</h2>

    <div class="task-list">
      <!-- Example TaskCard placeholder -->
      <!--      <div class="task-card">-->
      <!--        <span class="task-text">Sample Task</span>-->
      <!--        <div class="task-actions">-->
      <!--          <button class="btn-complete">Complete</button>-->
      <!--          <button class="btn-edit">Edit</button>-->
      <!--          <button class="btn-delete">Delete</button>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="task-card" v-for="task of tasksStore.tasks">
        <span class="task-text">{{ task.text }}</span>
        <span class="task-text">{{ task.status.toString().toUpperCase() }}</span>
        <div class="task-actions">
          <button class="" :class="task.status === TaskStatus.COMPLETED ? 'btn-disable' : 'btn-complete' "
                  @click="updateStatus(task)">
            {{ getNextStatusToDisplay(task.status) }}
          </button>
          <button class="btn-edit" v-show="task.status !== TaskStatus.COMPLETED" @click="openEditModal(task)">Edit
          </button>
          <button class="btn-show" @click="router.push('/task/'+task.id)">Show</button>
          <button class="btn-delete" @click="deleteTask(task.id)">Delete</button>
        </div>
      </div>
      <!-- Add more TaskCards dynamically later -->
    </div>
  </div>

  <div class="modal-overlay" v-if="editModalOpen">
    <div class="modal">
      <header class="modal-header">
        <h3 class="modal-title">Edit Task</h3>
        <button class="modal-close" @click="closeEditModal">×</button>
      </header>

      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Task content</label>
          <input
              type="text"
              class="form-input"
              placeholder="Edit task text"
              v-model="editModalState.text"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Status</label>
          <select class="form-select" v-model="editModalState.status">
            <option value="">Set Status</option>
            <option
                v-for="st in Object.values(TaskStatus)"
                :key="st"
                :value="st"
            >
              {{ st.charAt(0).toUpperCase() + st.slice(1).toLowerCase() }}
            </option>
          </select>
        </div>
      </div>

      <footer class="modal-footer">
        <button class="btn btn-secondary" @click="closeEditModal">Cancel</button>
        <button class="btn btn-primary" @click="updateTask">Save</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 12px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.task-text {
  font-size: 1rem;
  flex: 1;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.task-actions button {
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-complete {
  background-color: #4caf50;
  color: white;
}

.btn-disable {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed !important;
}


.btn-complete:hover {
  background-color: #388e3c;
}

.btn-edit {
  background-color: #ffb300;
  color: white;
}

.btn-edit:hover {
  background-color: #c68400;
}

.btn-show {
  background-color: #5d72ff;
  color: white;
}

.btn-show:hover {
  background-color: #4455c2;
}

.btn-delete {
  background-color: #e53935;
  color: white;
}

.btn-delete:hover {
  background-color: #ab000d;
}


/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Modal container */
.modal {
  background: #ffffff;
  width: 420px;
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  animation: modalFadeIn 0.2s ease-out;
}

/* Header */
.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  line-height: 1;
  color: #6b7280;
}

.modal-close:hover {
  color: #111827;
}

/* Body */
.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #374151;
}

.form-input,
.form-select {
  width: 90%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.form-input:focus,
.form-select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

/* Footer */
.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Buttons */
.btn {
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  background: #e5e7eb;
  color: #111827;
}

.btn-secondary:hover {
  background: #d1d5db;
}

/* Animation */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>