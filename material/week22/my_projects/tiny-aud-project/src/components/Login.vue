<script setup>


import {ref} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";

const authStore = useAuthStore()

const username = ref("")
const password = ref("")

const error = ref(null)

const router = useRouter()

function login() {

  if (!!username.value === false) {
    error.value = "Username is missing"
    return
  }
  if (!!password.value === false) {
    error.value = "Password is missing"
    return
  }

  if(authStore.login(username.value, password.value)){
    console.log("Successful login")
    router.push("/")
  }
}

const usernameInput = ref(null);
const passwordInput = ref(null);

function switchToPass(event) {
  if (event.key === "Enter") {
    passwordInput.value.focus();
  }
}

function submitLogin(event) {
  if (event.key === "Enter") {
    login();
  }
}

</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Login</h2>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <input
          ref="usernameInput"
          id="login_u"
          type="text"
          placeholder="Username"
          autofocus
          @keydown="switchToPass"
          v-model="username"
      />

      <input
          ref="passwordInput"
          id="login_p"
          type="password"
          placeholder="Password"
          v-model="password"
          @keydown="submitLogin"
      />

      <button @click="login">Login</button>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f172a;
}

.login-card {
  width: 320px;
  padding: 24px;
  background: #020617;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .4);
  display: flex;
  flex-direction: column;
  gap: 12px;
}


h2 {
  text-align: center;
  color: #e5e7eb;
}

input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #1e293b;
  background: #020617;
  color: #e5e7eb;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
}

button {
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #2563eb;
}

.error {
  color: #f87171;
  font-size: 0.9rem;
  text-align: center;
}
</style>