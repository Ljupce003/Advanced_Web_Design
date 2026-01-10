<script setup>


import {useRouter} from "vue-router";
import {computed, reactive, ref, watch} from "vue";
import {useTasksStore} from "@/stores/tasks.js";

const router = useRouter()

const taskStore = useTasksStore()

const id = computed(() => router.currentRoute.value.params.id)
const task = reactive(taskStore.fetchTask(id.value) ?? {})

watch(id, (newId) => {
  task.value = taskStore.fetchTask(newId) ?? {}
})

</script>

<template>
  <div class="task-details-page">
    <div class="task-details-card">
      <header class="task-details-header">
        <h2 class="task-title">
          Task #<span class="task-id">{{ task.id }}</span>
        </h2>
        <span :class="['task-status', 'status-' + task.status]">
          {{ task.status ? task.status.charAt(0).toUpperCase() + task.status.slice(1).toLowerCase() : ""}}
        </span>
      </header>

      <section class="task-details-body">
        <div class="detail-row">
          <span class="detail-label">Task</span>
          <p class="detail-value">{{ task.text }}</p>
        </div>

        <div class="detail-row">
          <span class="detail-label">Status</span>
          <p class="detail-value">{{ task.status ? task.status.charAt(0).toUpperCase() + task.status.slice(1).toLowerCase() : "" }}</p>
        </div>
      </section>

      <footer class="task-details-footer">
        <button class="btn btn-secondary" @click="router.back()">Back</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.task-details-page {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f4f8; /* lighter white-blue background */
  padding: 2rem;
}

.task-details-card {
  width: 100%;
  max-width: 500px;
  background: #ffffff; /* card white */
  border-radius: 12px;
  padding: 2rem;
  color: #1e293b; /* dark blue text */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease-in-out;
}

.task-details-card:hover {
  transform: translateY(-2px);
}

.task-details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.task-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.task-id {
  color: #3b82f6; /* blue accent for ID */
}

.task-status {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.status-todo {
  background: #3b82f6; /* blue */
}

.status-pending {
  background: #f59e0b; /* amber/orange */
}

.status-completed {
  background: #10b981; /* green */
}

.task-details-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #64748b; /* grayish text */
}

.detail-value {
  font-size: 0.95rem;
  line-height: 1.4;
  color: #1e293b; /* dark text */
}

.task-details-footer {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background 0.2s ease-in-out;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #e2e8f0;
  color: #1e293b;
}

.btn-secondary:hover {
  background: #cbd5e1;
}
</style>
