const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchangeController');

// router.patch('/', exchangeController.updateSettings);

router.get('/balance', exchangeController.getBalance);

module.exports = router;