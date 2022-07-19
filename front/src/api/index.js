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

/**
 * 课程列表查询接口
 */
export const getCourse=(data)=>{
  return requset({method:'GET',url:'/api/v1/course/find',data})
}

/**
 * 课程列表修改接口
 */
export const changeCourse=(data)=>{
  return requset({method:'GET',url:'/api/v1/course/update',data})
}

/**
 * 课程列表删除接口
 */
export const deleteCourse=(data)=>{
  return requset({method:'GET',url:'/api/v1/course/delete',data})
}