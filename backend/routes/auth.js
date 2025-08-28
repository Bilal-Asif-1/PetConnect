const express = require('express');
const router = express.Router();
const { register, login, selectRole } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/select-role', selectRole);

module.exports = router; 