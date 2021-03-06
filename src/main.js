import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from '../node_modules/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

createApp(App).use(store).use(router).use(BootstrapVue).mount('#app')
