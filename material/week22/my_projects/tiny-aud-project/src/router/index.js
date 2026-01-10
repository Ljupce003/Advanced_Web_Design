import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from "@/components/Dashboard.vue";
import Tasks from "@/components/Tasks.vue";
import Login from "@/components/Login.vue";
import Task from "@/components/Task.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: "dashboard",
            path: "/",
            component: Dashboard,
            meta: {reqAuth: true}
        },
        {
            name: "tasks",
            path: "/tasks",
            component: Tasks,
            meta: {reqAuth: true}
        },
        {
            name: "login",
            path: "/login",
            component: Login
        },
        {
            name: "task",
            path: "/task/:id",
            component: Task,
            meta: {reqAuth: true}
        }
    ],
})


export default router
