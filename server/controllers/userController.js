const db = require('../config/db')

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
  const userSelectSql = 'SELECT * FROM user WHERE NAME=?'
  db.query(userSelectSql, userName, (err, result) => {
    if (err) {
      return res.send({ code: 1, message: err.message })
    }
   // 判断用户是否在数据库中存在
   if(result.length>0){
    console.log(result);
   return res.send({code:1,message:'用户名已经存在'})
   }
  })
}