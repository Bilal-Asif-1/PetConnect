const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Book appointment (already exists)
router.post('/', async (req, res) => {
  try {
    const { vetId, userId, petName, date, contact, notes } = req.body;
    const appointment = new Appointment({ vet: vetId, user: userId, petName, date, contact, notes });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all appointments for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.params.userId }).populate('vet');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all appointments for a vet
router.get('/vet/:vetId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ vet: req.params.vetId }).populate('user');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 