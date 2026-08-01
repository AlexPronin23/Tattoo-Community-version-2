const express = require('express')
const router = express.Router()
const TattooMasterRouter = require('./tattoomasterRoute')
const UserRouter = require('./userRoute')


router.use('/tattooMasters',TattooMasterRouter)
router.use('/user', UserRouter)

module.exports = router