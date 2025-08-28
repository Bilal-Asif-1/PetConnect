const mongoose = require('mongoose');

const chatbotQuerySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  question: { type: String, required: true },
  answer: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('ChatbotQuery', chatbotQuerySchema); 