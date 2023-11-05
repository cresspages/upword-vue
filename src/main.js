import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import upwordVue from '../packages/index.ts'

createApp(App).use(upwordVue).mount('#app')
