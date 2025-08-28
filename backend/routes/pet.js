const express = require('express');
const router = express.Router();
const { auth, role } = require('../middleware/auth');
const petController = require('../controllers/petController');

// Public
router.get('/', petController.getAllPets);
router.get('/:id', petController.getPetById);

// Seller only
router.post('/', auth, role(['seller']), petController.createPet);
router.put('/:id', auth, role(['seller']), petController.updatePet);
router.delete('/:id', auth, role(['seller']), petController.deletePet);

module.exports = router; 