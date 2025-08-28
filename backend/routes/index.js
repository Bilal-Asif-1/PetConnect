const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const petRoutes = require('./pet');
const vetRoutes = require('./vet');
const appointmentRoutes = require('./appointment');
const productRoutes = require('./product');
const lostFoundRoutes = require('./lostfound');
const analyticsRoutes = require('./analytics');
const orderRoutes = require('./order');
// Add other route imports here as you build features

router.use('/auth', authRoutes);
router.use('/pets', petRoutes);
router.use('/vets', vetRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/products', productRoutes);
router.use('/lostfound', lostFoundRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/orders', orderRoutes);
// Add other route uses here

module.exports = router; 