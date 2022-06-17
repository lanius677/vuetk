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
const cors=require('cors')
app.use(cors())


app.listen(3000, () => {
  console.log('server run in http://127.0.0.1:3000');
})