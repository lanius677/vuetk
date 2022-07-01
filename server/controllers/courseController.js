const e = require('express')
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
          list: resPage,
          total: resTotal
        }
      })
    })
  })
}

/** 
 * 课程修改接口逻辑
*/

exports.updateVideoById = (req, res) => {
  let { title, price, id } = req.query

  let sql = 'UPDATE video SET '
  let arr = []
  //同时修改标题和价格
  if (title && price) {
    sql = sql + 'title=?,price=? WHERE id=?'
    arr = [title, Number(price), Number(id)]
  } else if (title) {
    //只修改标题
    sql = sql + 'title=? WHERE id=?'
    arr = [title, Number(id)]
  } else if (price) {
    //只独修改价格
    sql = sql + 'price=? WHERE id=?'
    arr = [Number(price), Number(id)]
  }

  db.query(sql, arr, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err.message })
    }
    return res.send({ code: 0, message: '修改成功' })
  })
  // res.send('修改成功')
}

/**
 * 课程删除接口逻辑
 */
exports.deleteVideoById = (req, res) => {
  let {id} = req.query

  let deleteSql="UPDATE video SET del=1 WHERE id=? "

  db.query(deleteSql,Number(id),(err,results)=>{
    if (err) {
      return res.send({ code: 1, message: err.message })
    }
    return res.send({code:0,message:'删除成功'})
  })

  // return res.send('删除成功')
}