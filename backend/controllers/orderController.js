const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, quantity }]
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items provided' });
    }

    const fullItems = [];
    let total = 0;

    for (const it of items) {
      const product = await Product.findById(it.productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      if (product.stock < it.quantity) return res.status(400).json({ message: 'Insufficient stock' });
      const price = product.price;
      fullItems.push({ product: product._id, quantity: it.quantity, price, seller: product.seller });
      total += price * it.quantity;
      // Adjust stock
      product.stock -= it.quantity;
      await product.save();
    }

    const order = new Order({ buyer: req.user.id, items: fullItems, total, status: 'paid' });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const orders = await Order.find({ 'items.seller': sellerId }).populate('items.product buyer');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
