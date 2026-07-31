const express = require('express')
const router = express.Router()
const TattooMasterRouter = require('./tattoomasterRoute')


router.use('/tattooMasters',TattooMasterRouter)

module.exports = router