import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

// 272p Code Challenge: 모드별(.env.staging/.env.production) 환경변수 로딩 확인
console.log('🌐 [환경변수] VITE_API_URL:', import.meta.env.VITE_API_URL)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
