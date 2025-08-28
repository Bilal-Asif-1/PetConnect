const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  location: String,
  availableSlots: [Date],
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema); 