const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const analytics = require('../controllers/analyticsController');

// Must be authenticated; server will validate correctness by user/role in future
router.get('/buyer/:userId', auth, analytics.getBuyerAnalytics);
router.get('/seller/:userId', auth, analytics.getSellerAnalytics);
router.get('/vet/:vetId', auth, analytics.getVetAnalytics);

module.exports = router;
