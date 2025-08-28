const express = require('express');
const router = express.Router();
const { auth, role } = require('../middleware/auth');
const productController = require('../controllers/productController');

// Seller-only specific endpoints first to avoid conflict with dynamic ':id'
router.get('/mine', auth, role(['seller']), productController.getMyProducts);

// Public
router.get('/categories', productController.getCategories);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Seller only
router.post('/', auth, role(['seller']), productController.createProduct);
router.put('/:id', auth, role(['seller']), productController.updateProduct);
router.delete('/:id', auth, role(['seller']), productController.deleteProduct);

module.exports = router;
