import axios from 'axios' //引入 axios
//import baseUrl from '../api/baseUrl' //使用环境变量 + 模式的方式定义基础URL
 
// 创建 axios 实例
const service = axios.create({
//  baseURL: baseUrl, // api 的 base_url
  timeout: 15000, // 请求超时时间
})

service.interceptors.request.use(config => {
  console.log("进入拦截。。。");
  console.log(config);
  config.headers['token'] = localStorage.getItem("token");
  return config;
},function (error) {
  return Promise.reject(error);
});

// let loadingInstance; //创建Loading 的实例
//axios.defaults.baseURL = appConfig.xhr.baseURL; // 配置axios请求的地址
// service.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
// service.defaults.crossDomain = true;
// service.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// service.defaults.headers.common['token'] = localStorage.getItem("token"); // 设置请求头为 Authorization

export default service