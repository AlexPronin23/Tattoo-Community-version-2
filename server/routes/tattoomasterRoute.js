const TattooMastersController = require('../controllers/tattoomasterController')
const express = require('express')
const tattooMasterRouter = express.Router()


tattooMasterRouter.get('/', TattooMastersController.getTattooMasters)

// Test
tattooMasterRouter.get('/status', TattooMastersController.getStatus)

tattooMasterRouter.post('/create', TattooMastersController.create)

module.exports = tattooMasterRouter
