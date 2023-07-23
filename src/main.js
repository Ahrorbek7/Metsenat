import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style.css'
import Toast from 'vue-toastification';
import VueApexCharts from "vue3-apexcharts";



import "vue-toastification/dist/index.css"


const app = createApp(App)
    
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
});


app.use(router).use(store).use(VueApexCharts).mount('#app')
