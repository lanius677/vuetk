const joi = require('joi')

const userName = joi.string().pattern(/^[A-Za-z0-9]{1,10}$/).required()
const passWord = joi.string().pattern(/^[A-Za-z0-9]{1,20}$/).required()

exports.userCkeck = {
  body: {
    userName,
    passWord
  }
}

//课程查询参数检验规则
const category = joi.string().required()
const page = joi.number().integer().required()
const size = joi.number().integer().required()

exports.findCourseCheck = {
  query: {
    category,
    page,
    size
  }
}

//课程修改参数检验规则
const title = joi.string()
const price = joi.number()
const id = joi.number().integer().required()

exports.updateCourseCheck = {
  query: {
    title,
    price,
    id
  }
}