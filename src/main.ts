import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElAlert } from 'element3'
import toast from './utils/toast'
import './base.less'
import 'element3/lib/theme-chalk/alert.css'

createApp(App)
  .use(store)
  .use(router)
  .use(ElAlert)
  .use(toast)
  .mount('#app')
