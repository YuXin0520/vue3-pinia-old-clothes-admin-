import './assets/main.css'
import { createApp } from 'vue'
import pinia from './stores'
import { ElMessage, ElMessageBox } from 'element-plus'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
app.config.warnHandler = () => null
