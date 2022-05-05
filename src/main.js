import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';
import web3Core from './utils/web3-core';
import './assets/css/icon.css';
import 'element-plus/dist/index.css';
import i18n from './i18n';

const app = createApp(App).use(i18n);
installElementPlus(app);
app
  .use(store)
  .use(router)
  .use(web3Core)
  .mount('#app');
