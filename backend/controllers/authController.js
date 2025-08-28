const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, profile } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role, profile });
    await user.save();
    // Create Vet profile if role is vet
    if (role === 'vet') {
      const Vet = require('../models/Vet');
      const { specialty, location, timings } = req.body;
      if (!specialty || !location || !timings) {
        return res.status(400).json({ message: 'Specialty, location, and timings are required for vets' });
      }
      const vet = new Vet({
        user: user._id,
        specialty,
        location,
        timings,
      });
      await vet.save();
    }
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const Vet = require('../models/Vet');
    let vetProfile = null;
    if (user.role === 'vet' && user.vetProfileId) {
      vetProfile = await Vet.findById(user.vetProfileId);
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        vetProfileId: user.vetProfileId || null
      },
      vetProfile
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.selectRole = async (req, res) => {
  try {
    const { userId, role, profile } = req.body;
    if (!userId || !role) {
      return res.status(400).json({ message: 'User ID and role are required' });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { role, profile },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Role updated', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 