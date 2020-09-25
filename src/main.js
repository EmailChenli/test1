import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import JsonExcel from 'vue-json-excel'
import './assets/css/global.css'
import axios from 'axios'
// 导入全局样式表
Vue.component('downloadExcel', JsonExcel)

Vue.config.productionTip = false;

axios.interceptors.request.use(config => {
  console.log("进入拦截。。。");
  console.log(config);
  config.headers['token'] = localStorage.getItem("token");
  return config;
},function (error) {
  return Promise.reject(error);
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
