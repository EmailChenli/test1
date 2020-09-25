import axios from "axios"

// 资产管理
export function requestAsset(config){
  // 创建axios实例
  const instance = axios.create({
    //baseURL:"http://eastcom.ripple.asset:8002",
    baseURL:"http://localhost:8002",
    timeout:5000
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
