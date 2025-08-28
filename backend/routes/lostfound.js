const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const lostFoundController = require('../controllers/lostFoundController');

// All roles can view and post
router.get('/', lostFoundController.getAllLostFound);
router.post('/', auth, lostFoundController.createLostFound);

module.exports = router;
