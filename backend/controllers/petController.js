const Pet = require('../models/Pet');

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate('listedBy', 'name role');
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('listedBy', 'name role');
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createPet = async (req, res) => {
  try {
    // Ensure price is a number if present
    const payload = { ...req.body };
    if (payload.price !== undefined && payload.price !== null && payload.price !== '') {
      payload.price = Number(payload.price);
      if (isNaN(payload.price)) delete payload.price;
    }
    // Optionally, ensure age is a string
    if (payload.age !== undefined && payload.age !== null) {
      payload.age = String(payload.age);
    }
    const pet = new Pet({
      ...payload,
      listedBy: req.user.id,
    });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id, listedBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!pet) return res.status(404).json({ message: 'Pet not found or not authorized' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findOneAndDelete({ _id: req.params.id, listedBy: req.user.id });
    if (!pet) return res.status(404).json({ message: 'Pet not found or not authorized' });
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 