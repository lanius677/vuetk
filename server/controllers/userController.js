const db = require('../config/db')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {jwtSecretKey}=require('../config/jwtSecretKey')

/**
 * 注册接口逻辑

 */
exports.registerController = (req, res) => {
  //判断用户或密码是否为空
  let { userName, passWord } = req.body;
  if (!userName || !passWord) {
    return res.send({ code: 1, message: '用户名或密码不能为空' })
  }

  //用户名查重的逻辑
  const userSelectSql = "SELECT * FROM user WHERE NAME=?"
  db.query(userSelectSql, [userName], (err, result) => {
    if (err) {
      return res.send({ code: 1, message: err.message })
    }
    // 判断用户是否在数据库中存在

    if (result.length > 0) {
      console.log(result);
      return res.send({ code: 1, message: '用户名已经存在' })
    }
  })

  //用户密码加密
  const bcrypt = require('bcryptjs')
  const passwrodB = bcrypt.hashSync(passWord, 10)


  //随机生成用户的头像
  const imgList = [
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/1.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/2.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/3.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/4.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/5.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/6.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/7.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/8.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/9.jpeg']

  const num = Math.floor(Math.random() * 10 + 1)

  /**
   * 用户注册的逻辑
   */
  const userInsertSql = 'INSERT INTO user (name,pwd,head_img) VALUE (?,?,?)'
  db.query(userInsertSql, [userName, passwrodB, imgList[num]], (err, result) => {
    console.log(userName);
    console.log(passwrodB);
    if (err) {
      return res.send({ code: 1, message: err.message })
    }

    return res.send({ code: 0, message: '注册成功' })
  })



}

/**
 * 登录接口逻辑
 */
exports.loginController = (req, res) => {
  let { userName, passWord } = req.body
  const userSelectSql = 'SELECT * FROM user WHERE name=?'
  db.query(userSelectSql,userName,(err,results)=>{
    //错误返回
    if(err){
    return  res.send({code:1,message:err.message})
    }

    //账号不存在
    if(results.length===0){
      return res.send({code:1,message:'账号不存在,请先注册。'})
    }

    //判断密码是否正确
    const compareState=bcrypt.compareSync(passWord,results[0].pwd)
    if(!compareState){
    return  res.send({code:1,message:'密码错误'})
    }

    const user={...results[0],pwd:''}
    const token=jwt.sign(user,jwtSecretKey,{expiresIn:'5s'})

    
    return res.send({code:0,message:'登录成功',token:'bearer '+token})

  })

}

/**
 * 用户信息查询逻辑
 */
exports.userInfoController=(req,res)=>{

}

