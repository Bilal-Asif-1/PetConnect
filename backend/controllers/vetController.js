const Vet = require('../models/Vet');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerVet = async (req, res) => {
  try {
    const {
      fullName, gender, dob, contactNumber, email, password, nationalId,
      degree, university, graduationYear, experienceYears, specialization,
      consultationFee, clinicLocation, clinicName, clinicAddress, clinicContact, clinicMapLink,
      workingDays, workingHours, maxBookingsPerDay, emergencyBooking, consultationTypes,
      services, licenseNumber
    } = req.body;

    // Handle file uploads
    const profilePhoto = req.files?.profilePhoto?.[0]?.path;
    const degreeCertificate = req.files?.degreeCertificate?.[0]?.path;
    const registrationCertificate = req.files?.registrationCertificate?.[0]?.path;
    const nationalIdDoc = req.files?.nationalIdDoc?.[0]?.path;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Vet profile
    const vet = new Vet({
      fullName, gender, dob, contactNumber, email, password: hashedPassword, nationalId,
      degree, university, graduationYear, experienceYears, specialization: JSON.parse(specialization),
      consultationFee, clinicLocation, clinicName, clinicAddress, clinicContact, clinicMapLink,
      workingDays: JSON.parse(workingDays), workingHours, maxBookingsPerDay, emergencyBooking,
      consultationTypes: JSON.parse(consultationTypes), services: JSON.parse(services), licenseNumber,
      profilePhoto, degreeCertificate, registrationCertificate, nationalIdDoc
    });
    await vet.save();

    // Create User account linked to Vet profile
    const user = new User({
      name: fullName,
      email,
      password: hashedPassword,
      role: 'vet',
      vetProfileId: vet._id
    });
    await user.save();

    res.status(201).json({ message: 'Vet registered successfully', vetId: vet._id, userId: user._id });
  } catch (err) {
    res.status(400).json({ message: 'Vet registration failed', error: err.message });
  }
};

exports.getPublicVets = async (req, res) => {
  try {
    const vets = await Vet.find({}, 'fullName specialization clinicAddress consultationFee avgRating reviews profilePhoto clinicName clinicContact clinicMapLink workingDays workingHours services');
    res.json(vets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vets', error: err.message });
  }
};

exports.getVetProfile = async (req, res) => {
  try {
    const vet = await Vet.findById(req.params.id);
    if (!vet) return res.status(404).json({ message: 'Vet not found' });
    res.json(vet);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vet profile', error: err.message });
  }
};
