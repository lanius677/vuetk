import requset from '../utils/request';

/**
 * 注册接口
 */
export const getRegister=(data)=>{
  return requset({methods:'POST',url:'api/v1/user/register',data:data})
}

/**
 * 登录接口
 */