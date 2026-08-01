const express = require('express')
const userRouter = express.Router()
const UserController = require('../controllers/userController')



userRouter.post('/registration',UserController.registration)



module.exports = userRouter