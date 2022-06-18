const db = require('../config/db')

/**
 * 注册接口逻辑

 */
exports.registerController = (req, res) => {

  const sql = "INSERT INTO user (name,pwd,head_img) VALUE ('lqq','123','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg')"

  
  db.query(sql, (err, results) => {
    if (err) {
      return res.send({ code: 400, message: err.message })
    }
    return res.send({
      code: 200,
      data: '注册成功'
    })
  })

}