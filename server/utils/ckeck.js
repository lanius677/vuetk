const joi = require('joi')

const userName = joi.string().pattern(/^[A-Za-z0-9]{1,10}$/).required()
const passWord = joi.string().pattern(/^[A-Za-z0-9]{1,20}$/).required()

exports.userCkeck = {
  body: {
    userName,
    passWord
  }
}
