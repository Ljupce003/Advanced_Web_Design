import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'
import {useAuthStore} from "@/stores/auth.js";

const app = createApp(App)

app.use(createPinia())

const auth = useAuthStore();
auth.loadAuth()

app.use(router)

router.beforeEach((to) => {


    // console.log(to.fullPath)
    // console.log(!!to.meta.reqAuth)
    // console.log(!auth.isAuthenticated)
    if(!!to.meta.reqAuth && !auth.isAuthenticated){
        return { name: "login" }
    }
})

app.mount('#app')
