const mongoose = require('mongoose');

const vetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialty: { type: String, required: true },
  location: { type: String, required: true },
  timings: { type: String, required: true },
  profile: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('Vet', vetSchema); 