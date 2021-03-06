const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController');

const expressJoi = require('@escook/express-joi')
const { userCkeck } = require('../utils/ckeck')


/**
 * 用户注册接口
 */
router.post('/register', expressJoi(userCkeck), userController.registerController)

/**
 * 用户登录接口
 */
 router.post('/login', expressJoi(userCkeck), userController.loginController)

 /**
 * 用户信息查询接口
 */
  router.get('/userInfo',userController.userInfoController)



module.exports = router