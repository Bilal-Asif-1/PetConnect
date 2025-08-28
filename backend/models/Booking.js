const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceType: { type: String, required: true }, // grooming, vet, etc.
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema); 