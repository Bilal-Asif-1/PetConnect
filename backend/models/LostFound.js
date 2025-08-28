const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  type: { type: String, enum: ['lost', 'found'], required: true },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  breed: { type: String, required: true },
  lastSeenLocation: { type: String, required: true },
  lastSeenDate: { type: Date, required: true },
  images: [String],
  contact: { type: String, required: true },
  note: { type: String },
  adoptableOrForSale: { type: String, enum: ['none', 'adoption', 'sale'], default: 'none' },
  status: { type: String, enum: ['open', 'resolved'], default: 'open' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('LostFound', lostFoundSchema);
