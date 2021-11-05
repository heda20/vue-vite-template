/*
 * @Description:
 * @version: 0.0.1
 * @Company: Puredo
 * @Author: dada
 * @Date: 2021-11-05 10:41:18
 * @LastEditors: dada
 * @LastEditTime: 2021-11-05 11:17:43
 */
import { createApp } from 'vue'
import 'lib-flexible'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router)
app.mount('#app')
