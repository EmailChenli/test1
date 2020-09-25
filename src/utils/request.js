import axios from "axios"

// 资产管理
export function requestAsset(config){
  // 创建axios实例
  const instance = axios.create({
    //baseURL:"http://eastcom.ripple.asset:8002",
    baseURL:"http://localhost:8002",
    timeout:5000
  });

  // request拦截器
  instance.interceptors.request.use(
    config => {
      // config.headers.Authorization = window.sessionStorage.getItem('token')
      //debugger
      //console.log(config);
      console.log("进入拦截....");
      // if (cookie.get('token')) {
      //   console.log("请求头携带token..");
      //   config.headers['token'] = cookie.get('token');
      // }else{
      //   console.log("token不存在！")
      // }
      config.headers['token'] = localStorage.getItem("token");
      return config
    },
    err => {
      return Promise.reject(err);
    });
  // 发送真正的网络请求
  return instance(config)
}

export function request2(config){
  // 创建axios实例
  const instance = axios.create({
    baseURL:"http://httpbin.org/get",
    timeout:5000
  });
  // 发送真正的网络请求
  return instance(config)
}
