const TattooMastersController = require('../controllers/tattoomasterController')
const express = require('express')
const router = express.Router()

router.get('/tattooMasters', TattooMastersController.getTattooMasters)
router.post('/create', TattooMastersController.create)

module.exports = router
