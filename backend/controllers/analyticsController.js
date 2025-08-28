const Order = require('../models/Order');
const Appointment = require('../models/Appointment');
const Product = require('../models/Product');

exports.getBuyerAnalytics = async (req, res) => {
  try {
    const userId = req.params.userId;

    const appointments = await Appointment.find({ user: userId });
    const orders = await Order.find({ buyer: userId });

    const totals = {
      appointments: appointments.length,
      savedPets: 0,
      orders: orders.length,
      messages: 0,
    };

    res.json({ totals });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getSellerAnalytics = async (req, res) => {
  try {
    const sellerId = req.params.userId;

    const products = await Product.find({ seller: sellerId });
    const orders = await (await Order.find({ 'items.seller': sellerId })).filter(o => o.items.some(i => i.seller.toString() === sellerId));

    const sales = orders.reduce((count, o) => count + o.items.filter(i => i.seller.toString() === sellerId).reduce((c, i) => c + i.quantity, 0), 0);
    const revenue = orders.reduce((sum, o) => sum + o.items.filter(i => i.seller.toString() === sellerId).reduce((s, i) => s + i.price * i.quantity, 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'paid').length;

    const totals = {
      sales,
      revenue,
      listings: products.length,
      pendingOrders,
    };

    res.json({ totals });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getVetAnalytics = async (req, res) => {
  try {
    const vetId = req.params.vetId;
    const appointments = await Appointment.find({ vet: vetId });
    const totals = {
      appointments: appointments.length,
      clients: new Set(appointments.map(a => String(a.user))).size,
      pending: appointments.filter(a => a.status === 'pending').length,
    };
    res.json({ totals });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
