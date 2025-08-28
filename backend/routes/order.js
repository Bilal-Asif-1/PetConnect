const express = require('express');
const router = express.Router();
const { auth, role } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

// Buyer actions
router.post('/', auth, role(['buyer']), orderController.createOrder);
router.get('/mine', auth, role(['buyer']), orderController.getMyOrders);

// Seller views
router.get('/seller/mine', auth, role(['seller']), orderController.getSellerOrders);

module.exports = router;
