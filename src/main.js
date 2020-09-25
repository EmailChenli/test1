import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import JsonExcel from 'vue-json-excel'
import './assets/css/global.css'// 导入全局样式表
import axios from 'axios'

Vue.component('downloadExcel', JsonExcel)



//配置请求路径
//axios.defaults.baseURL = 'http://localhost:8003'
//设置拦截器
axios.interceptors.request.use(config =>{
    console.log("进入拦截。。");
    console.log(config)
    let token = localStorage.getItem('token');
    console.log("打印token："+token);
    if(token != null){
      config.headers['token'] =localStorage.getItem('token');
    }else{
      console.log("token不存在");
    }
  //config.headers.Authorization = window.sessionStorage.getItem('token')
  //最后必须return config
  return config
},function(error){
  console.log("失败。。。")
  return Promise.reject(error);
}
);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


