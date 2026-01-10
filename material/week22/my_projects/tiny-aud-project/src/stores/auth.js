import {defineStore} from "pinia";
import {ref} from "vue";

export const useAuthStore = defineStore("auth",() => {

    const user = ref(null)
    const isAuthenticated = ref(false)

    function login(username,password) {

        if(username && password){
            const _user = {username,password}

            console.log(_user)

            localStorage.setItem("auth",JSON.stringify(_user))

            isAuthenticated.value = true
            user.value = username
            return true
        }
        return false
    }

    function logout(){

        user.value = null
        isAuthenticated.value = false

        localStorage.removeItem("auth")
    }

    function loadAuth() {
        const saved = localStorage.getItem("auth");
        if (saved) {
            isAuthenticated.value = true;
            user.value = JSON.parse(saved);
        }
    }

    return {user,isAuthenticated,login,logout,loadAuth}

})