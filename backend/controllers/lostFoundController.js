const LostFound = require('../models/LostFound');

// Get all lost/found entries
exports.getAllLostFound = async (req, res) => {
  try {
    const entries = await LostFound.find().populate('createdBy', 'name role');
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create a new lost/found entry (all roles)
exports.createLostFound = async (req, res) => {
  try {
    const {
      type,
      petName,
      petType,
      breed,
      lastSeenLocation,
      lastSeenDate,
      images,
      contact,
      note,
      adoptableOrForSale
    } = req.body;
    const entry = new LostFound({
      type,
      petName,
      petType,
      breed,
      lastSeenLocation,
      lastSeenDate,
      images,
      contact,
      note,
      adoptableOrForSale,
      createdBy: req.user.id,
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
