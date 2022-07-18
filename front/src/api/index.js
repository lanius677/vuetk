import requset from '../utils/request';

/**
 * 注册接口
 */
export const getRegister=(data)=>{
  return requset({method:'POST',url:'/api/v1/user/register',data})
}

/**
 * 登录接口
 */

 export const getLogin=(data)=>{
  return requset({method:'POST',url:'/api/v1/user/login',data})
  
}

/**
 * 获取用户信息接口
 */
export const getUserInfo=()=>{
  return requset({method:'GET',url:'/api/v1/user/userInfo'})
}