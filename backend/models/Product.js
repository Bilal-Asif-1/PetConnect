const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Basic
  name: { type: String, required: true },
  category: { type: String, required: true }, // food, toys, grooming, etc.
  subcategory: { type: String },
  brand: { type: String },
  description: { type: String },
  images: [String],

  // Classification
  petType: { type: String, enum: ['Dogs', 'Cats', 'Birds', 'Fish', 'Small Pets', 'Reptiles', 'Other'], default: 'Other' },
  targetAge: { type: String }, // e.g., Puppy, Adult, Senior
  material: { type: String },
  tags: [String],

  // Pricing
  price: { type: Number, required: true },
  salePrice: { type: Number },
  currency: { type: String, default: 'USD' },

  // Inventory
  stock: { type: Number, default: 0 },
  expiry: { type: String }, // ISO date string
  sku: { type: String },
  barcode: { type: String },

  // Dimensions/Weight (for shipping/info)
  weightKg: { type: Number },
  dimensionsCm: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },

  // Merchandising
  badge: { type: String }, // e.g., "Bestseller", "New", "Limited"
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'draft', 'archived'], default: 'active' },

  // SEO
  seo: {
    title: { type: String },
    description: { type: String },
    keywords: [String],
  },

  // Ownership
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema); 