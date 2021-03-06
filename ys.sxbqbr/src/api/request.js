import axios from 'axios'
import store from '../store'
import {Message} from 'element-ui'

// 弹出错误提示
function showErrMsg(errorMsg) {
  Message({
    showClose: true,
    message: errorMsg,
    type: 'error',
    offset:"250"
  });
}
// 打印错误提示
function errorLog(data, config) {
  let errorObj = {
    url: config.url,
    code: data.code,
    msg: data.message,
  };
  config.params && (errorObj.params = config.params);
  config.data && (errorObj.data = JSON.parse(config.data));
}


const reLogin = ['GW1004'];
// const baseURL = '';
const baseURL = '/';


// 创建axios实例
const ajax = axios.create({
  baseURL,
  timeout: 20000,
});

let flag = true;


// 请求 拦截器
ajax.interceptors.request.use(config => {
  let token = store.state.user.token;
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
}, error => {
  console.log('请求拦截器', error)
});

// 响应 拦截器
ajax.interceptors.response.use(response => {
  const { data } = response;
  if(data.code || data.status){
    return response.data;
  } else {
    let errorMsg = data.message;
    if(errorMsg === "无凭据非法访问"|| errorMsg === "未获取到token，请重新登录"){
      //token为空或者token过期，则直接跳转登录界面
      window.location.href = this.$store.state.user.loginUrl+ this.$store.state.user.systemUrl;
    }else {
      showErrMsg(errorMsg)
    }
    errorLog(data, response.config)
  }

}, error => {
  let errorMsg = error.message;
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    console.log(error.response.data);
  } else {
    // 服务器没有响应
    console.log('server', errorMsg);
  }
  showErrMsg(errorMsg);
  return Promise.reject(errorMsg)
});
export default ajax;

