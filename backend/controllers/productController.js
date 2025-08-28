const Product = require('../models/Product');

// Helpers to parse and sanitize payloads
const toArray = (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') return v.split(',').map(s => s.trim()).filter(Boolean);
  return [];
};
const toNum = (v) => (v === '' || v === null || v === undefined ? undefined : Number(v));
const toInt = (v) => (v === '' || v === null || v === undefined ? undefined : parseInt(v, 10));
const toBool = (v) => (v === true || v === 'true');

function cleanUndefined(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  Object.keys(obj).forEach(k => {
    if (obj[k] && typeof obj[k] === 'object' && !Array.isArray(obj[k])) cleanUndefined(obj[k]);
    if (obj[k] === undefined) delete obj[k];
  });
  return obj;
}

function parseProductPayload(body) {
  const data = {
    // Basic
    name: body.name,
    category: body.category,
    subcategory: body.subcategory,
    brand: body.brand,
    description: body.description,
    images: Array.isArray(body.images) ? body.images : toArray(body.images),

    // Classification
    petType: body.petType,
    targetAge: body.targetAge,
    material: body.material,
    tags: Array.isArray(body.tags) ? body.tags : toArray(body.tags),

    // Pricing
    price: toNum(body.price),
    salePrice: toNum(body.salePrice),
    currency: body.currency || 'USD',

  // Inventory
  stock: toInt(body.stock ?? 0),
  expiry: body.expiry,
  sku: body.sku,
  barcode: body.barcode,

    // Dimensions/Weight
    weightKg: toNum(body.weightKg),
    dimensionsCm: {
      length: toNum(body.dimensionsCm?.length ?? body.length),
      width: toNum(body.dimensionsCm?.width ?? body.width),
      height: toNum(body.dimensionsCm?.height ?? body.height),
    },

    // Merchandising
    badge: body.badge,
    featured: toBool(body.featured),
    status: body.status,

    // SEO
    seo: {
      title: body.seo?.title ?? body.seoTitle,
      description: body.seo?.description ?? body.seoDescription,
      keywords: Array.isArray(body.seo?.keywords) ? body.seo.keywords : toArray(body.seoKeywords ?? body.seo?.keywords),
    },
  };
  return cleanUndefined(data);
}

// Get all products (public). By default return only active (or legacy without status).
// To include drafts/archived (e.g., for admin), pass ?include=all
exports.getAllProducts = async (req, res) => {
  try {
    let query = {};
    if (req.query.include !== 'all') {
      query = { $or: [{ status: 'active' }, { status: { $exists: false } }] };
    }
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
  };
  
  // Get categories (union of defaults and existing categories)
  exports.getCategories = async (req, res) => {
  try {
  const defaults = ['Food', 'Toys', 'Grooming', 'Habitats', 'Health Supplies'];
  const existing = await Product.distinct('category');
  const set = new Set([...defaults, ...existing.filter(Boolean)]);
  const categories = Array.from(set).sort((a, b) => a.localeCompare(b));
  res.json({ categories });
  } catch (err) {
  res.status(500).json({ message: 'Server error', error: err.message });
  }
  };
  
  // Get current seller's products
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create a new product (seller only)
exports.createProduct = async (req, res) => {
  try {
    const payload = parseProductPayload(req.body);
    console.log('CREATE PRODUCT PAYLOAD:', payload);
    if (!payload.name || !payload.category || payload.price === undefined || Number.isNaN(payload.price)) {
      return res.status(400).json({ message: 'Name, category and valid price are required' });
    }
    if (payload.stock !== undefined && Number.isNaN(payload.stock)) {
      return res.status(400).json({ message: 'Stock must be a number' });
    }
    const product = new Product({
      ...payload,
      seller: req.user.id,
    });
    console.log('PRODUCT TO SAVE:', product);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('CREATE PRODUCT ERROR:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a product (seller only)
exports.updateProduct = async (req, res) => {
  try {
    const payload = parseProductPayload(req.body);
    console.log('UPDATE PRODUCT PAYLOAD:', payload);
    if (payload.price !== undefined && Number.isNaN(payload.price)) {
      return res.status(400).json({ message: 'Price must be a number' });
    }
    if (payload.stock !== undefined && Number.isNaN(payload.stock)) {
      return res.status(400).json({ message: 'Stock must be a number' });
    }
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.id },
      { $set: payload },
      { new: true }
    );
    console.log('UPDATED PRODUCT:', product);
    if (!product) return res.status(404).json({ message: 'Product not found or not authorized' });
    res.json(product);
  } catch (err) {
    console.error('UPDATE PRODUCT ERROR:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a product (seller only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, seller: req.user.id });
    if (!product) return res.status(404).json({ message: 'Product not found or not authorized' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
