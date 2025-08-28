const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  species: { type: String },
  breed: { type: String },
  age: { type: String }, // e.g. '2 years', '6 months'
  gender: { type: String, enum: ['Male', 'Female', ''] },
  color: { type: String },

  // Identification
  microchip: { type: String },
  vaccinationStatus: { type: String },
  vaccinationDate: { type: String },
  medicalHistory: { type: String },

  // Lifestyle / Behavior
  temperament: { type: String },
  trainedFor: { type: String },
  specialNeeds: { type: String },

  // Media
  images: [String],
  description: { type: String },

  // Owner/Contact
  ownerName: { type: String },
  contact: { type: String },
  location: { type: String },

  // Sale/Adoption
  type: { type: String, enum: ['sale', 'adoption'], required: true },
  price: { type: Number },

  listedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['available', 'sold', 'adopted'], default: 'available' },
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema); 