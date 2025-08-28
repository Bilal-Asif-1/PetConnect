const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Vet = require('../models/Vet');

// Get all vets with profile info
router.get('/', async (req, res) => {
  try {
    // Find all users with role 'vet' and join with Vet profile
    const vets = await Vet.find().populate('user', 'name email contact');
    res.json(vets);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get a specific vet by ID
router.get('/:id', async (req, res) => {
  try {
    const vet = await Vet.findById(req.params.id).populate('user', 'name email');
    if (!vet) return res.status(404).json({ message: 'Vet not found' });
    res.json(vet);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 