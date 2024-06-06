import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/styles.css';
import axios from "axios"; // Подключение общего файла стилей

createApp(App).use(router).mount('#app');
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
