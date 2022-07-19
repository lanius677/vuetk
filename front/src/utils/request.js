import axios from 'axios';
import router from '../router/index.ts';
/**
 * 创建axios实例
 */
const service=axios.create({
  baseURL:'http://127.0.0.1:3001',
  timeout:'5000'
})

/**
 * 请求拦截
 */

service.interceptors.request.use((config)=>{
  if(config.url.indexOf('register')<0 && config.url.indexOf('login')<0){
    config.headers.authorization=localStorage.getItem('token')
  }
  return config
})

/**
 * 响应拦截
 */
service.interceptors.response.use((res)=>{
  const categoryData=res.config.data
  const {code,message,token,data}=res.data
  if(code===0){
    return {message:message,token:token,data:data,categoryData:categoryData}
  }else{
    ElMessage({
      message:message,
      type:'error',
    })
  }
  if(message==='身份认证失败'){
    router.push('/login')
  }
})

/**
 * 封装请求函数
 */
const requset=(options)=>{
  if(options.method==='GET'){
    options.params=options.data
  }
  return service(options)
}

export default requset