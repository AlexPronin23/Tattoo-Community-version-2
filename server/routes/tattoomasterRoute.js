const TattooMastersController = require('../controllers/tattoomasterController')
const express = require('express')
const router = express.Router()

router.get('/', TattooMastersController.getTattooMasters)

module.exports = router
