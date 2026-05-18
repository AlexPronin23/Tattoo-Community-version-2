const TattooMastersController = require('../controllers/tattoomasterController')
const express = require('express')
const router = express.Router()

router.get('/tattooMasters', TattooMastersController.getTattooMasters)

// Test
router.get('/status', TattooMastersController.getStatus)

router.post('/create', TattooMastersController.create)

module.exports = router
