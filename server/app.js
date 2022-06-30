const express = require('express')
const app = express()

/**
 * 注册第三方中间件
 * 解析post请求的body数据
 */
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * 跨域请求配置
 */
const cors = require('cors')
app.use(cors())

/**
 * 解析中间件校验是否正确，哪些接口需要token校验
 */
const { expressjwt: jwt } = require('express-jwt')
const { jwtSecretKey } = require('./config/jwtSecretKey')

app.use(jwt({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({ path: ['/api/v1/user/login', '/api/v1/user/register'] }))

/**
 * 用户相关接口
 */
const userRouter = require('./router/user');
app.use('/api/v1/user', userRouter)

/**
 * 课程相关接口
 */
 const courseRouter = require('./router/course');
 app.use('/api/v1/course',courseRouter)

/**
 * 错误中间件
 */
const joi = require('joi')
app.use((err, req, res, next) => {
  //表单的用户信息校验失败
  if (err instanceof joi.ValidationError) {
    return res.send({ code: 1, message: err.message })
  }

  if (err.name === 'UnauthorizedError') {
    return res.send({ code: 1, message: '身份认证失败' })
  }

  // 其他的错误
  return res.send({ code: 1, message: err.message })
})


app.listen(3000, () => {
  console.log('server run in http://127.0.0.1:3000');
})