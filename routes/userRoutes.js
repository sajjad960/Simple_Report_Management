const express = require('express');

// controller
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/refresh-token', authController.refreshToken);

module.exports = router;
