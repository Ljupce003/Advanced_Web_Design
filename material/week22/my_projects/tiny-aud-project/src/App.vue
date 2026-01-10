<script setup>

import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";
import { useRoute } from "vue-router"
import {computed, watch} from "vue";
const useAuth = useAuthStore()

const router = useRouter()

function logout(){
  useAuth.logout()
  router.push("/login")
}




const isLoginPage = computed(() => router.currentRoute.value.fullPath === "/login")

// watch(isLoginPage,() => {
//
//   console.log(isLoginPage.value)
//
//   if(isLoginPage.value)
//     document.body.style.background ="#0f172a"
//   else
//     document.body.removeAttribute("background")
// })

</script>

<template>
  <div class="app" :class="['app', { 'auth-layout': isLoginPage }]">
    <div class="app-wrap">
      <header class="app-header" v-if="!isLoginPage">
        <h1 class="app-title">Mini Task Tracker</h1>
        <nav class="nav-links">
          <router-link to="/" class="nav-link" active-class="active">Dashboard</router-link>
          <router-link to="/tasks" class="nav-link" active-class="active">Tasks</router-link>
          <button  @click="logout" v-if="useAuth.isAuthenticated" class="nav-button" >Logout</button>
        </nav>
      </header>

      <main class="app-main">
        <router-view />
      </main>
    </div>

  </div>
</template>


<style>
body {
  margin: 0;
}
</style>

<style scoped>

html, body, #app {
  height: 100%;
}

.auth-layout {
  background: #0f172a;
  min-height: 100vh;
}


.app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
}

.app-wrap{
  max-width: 900px;
  margin: 0 auto;
}


.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.app-title {
  font-size: 1.8rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 15px;
  align-items: center;
}



.nav-button {
  padding: 6px 10px;
  background-color: #d21919;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.nav-button:hover {
  background-color: #af1212;
}

.nav-link {
  text-decoration: none;
  color: #555;
  font-weight: 500;
}

.nav-link.active {
  color: #1976d2;
  font-weight: 700;
}

.app-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
