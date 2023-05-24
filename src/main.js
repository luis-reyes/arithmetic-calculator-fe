//import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap';

import { createApp } from 'vue';
import App from './App.vue';
import VueCookies from 'vue-cookies';
import router from './router'
import store from './store';


const app = createApp(App);
app.use(VueCookies);
app.use(router)
app.use(store);
app.mount('#app');
