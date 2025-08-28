const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  vet: { type: mongoose.Schema.Types.ObjectId, ref: 'Vet', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  petName: String,
  date: Date,
  status: { type: String, default: 'pending' },
  contact: String,
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema); 