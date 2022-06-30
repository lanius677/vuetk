const db = require('../config/db')
/**
 * 课程查询接口逻辑
 */

exports.listVideo = (req, res) => {
  //获取前端的参数
  let { category, page, size } = req.query
  page = (page - 1) * size

  //查询课程列表
  const pageSql = 'SELECT * FROM video WHERE del=0 AND category=? ORDER BY id LIMIT ?,?'

  //查询课程总数
  const totalSql = 'SELECT count(*) as totle FROM video WHERE del=0 and category=?'

  db.query(pageSql, [category, Number(page), Number(size)], (err, resPage) => {
    if (err) {
      return res.send({ code: 1, message: err.message })
    }

    db.query(totalSql, category, (err, resTotal) => {
      if (err) {
        return res.send({ code: 1, message: err.message })
      }
      res.send({
        code: 0, data: {
          list:resPage,
          total:resTotal
        } 
      })
    })
  })
}

exports.updateVideoById=(req,res)=>{
  // res.send('修改成功')
}