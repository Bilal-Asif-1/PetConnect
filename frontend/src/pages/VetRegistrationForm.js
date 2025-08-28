import React, { useState } from 'react';

const initialForm = {
  // Step 1: Personal
  fullName: '', gender: '', dob: '', profilePhoto: null, contactNumber: '', email: '', password: '', nationalId: '',
  // Step 2: Professional
  degree: '', university: '', graduationYear: '', experienceYears: '', specialization: [], consultationFee: '', clinicLocation: '',
  // Step 3: Clinic
  clinicName: '', clinicAddress: '', clinicContact: '', clinicMapLink: '',
  // Step 4: Availability
  workingDays: [], workingHours: '', maxBookingsPerDay: '', emergencyBooking: false, consultationTypes: [],
  // Step 5: Services
  services: [],
  // Step 6: Documents
  degreeCertificate: null, licenseNumber: '', registrationCertificate: null, nationalIdDoc: null,
};

const specializationOptions = ['Small Animals', 'Reptiles', 'Birds', 'Large Animals', 'Exotics'];
const serviceOptions = ['Vaccinations', 'Surgeries', 'General Checkups', 'Nutrition Advice', 'Pet Grooming', 'Behavioral Training'];
const workingDaysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const consultationTypeOptions = ['in-clinic', 'video', 'text'];

export default function VetRegistrationForm() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }));
    } else if (type === 'file') {
      setForm(f => ({ ...f, [name]: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleMultiSelect = (name, value) => {
    setForm(f => {
      const arr = f[name] || [];
      return arr.includes(value)
        ? { ...f, [name]: arr.filter(v => v !== value) }
        : { ...f, [name]: [...arr, value] };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (Array.isArray(v)) data.append(k, JSON.stringify(v));
        else if (v instanceof File) data.append(k, v);
        else data.append(k, v);
      });
      const res = await fetch('/api/vets/register', {
        method: 'POST',
        body: data,
      });
      if (!res.ok) throw new Error('Registration failed');
      setSuccess('Registration successful!');
      setForm(initialForm);
      setStep(1);
    } catch (err) {
      setError('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-yellow-800 mb-6 text-center">Vet Registration</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
        {/* Stepper */}
        <div className="flex justify-between mb-6">
          {[1,2,3,4,5,6].map(n => (
            <div key={n} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === n ? 'bg-yellow-400 text-white' : 'bg-yellow-100 text-yellow-800'}`}>{n}</div>
          ))}
        </div>
        {/* Step 1: Personal */}
        {step === 1 && <>
          <label className="block font-bold mb-1">Full Name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label className="block font-bold mb-1">Date of Birth</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Profile Photo</label>
          <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} className="w-full mb-3" />
          <label className="block font-bold mb-1">Contact Number</label>
          <input name="contactNumber" value={form.contactNumber} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">National ID/CNIC</label>
          <input name="nationalId" value={form.nationalId} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
        </>}
        {/* Step 2: Professional */}
        {step === 2 && <>
          <label className="block font-bold mb-1">Degree</label>
          <input name="degree" value={form.degree} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">University Name</label>
          <input name="university" value={form.university} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Graduation Year</label>
          <input name="graduationYear" value={form.graduationYear} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Years of Experience</label>
          <input name="experienceYears" value={form.experienceYears} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Area of Specialization</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {specializationOptions.map(opt => (
              <label key={opt} className="flex items-center gap-1">
                <input type="checkbox" checked={form.specialization.includes(opt)} onChange={() => handleMultiSelect('specialization', opt)} /> {opt}
              </label>
            ))}
          </div>
          <label className="block font-bold mb-1">Consultation Fee</label>
          <input name="consultationFee" value={form.consultationFee} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Clinic Location</label>
          <input name="clinicLocation" value={form.clinicLocation} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
        </>}
        {/* Step 3: Clinic */}
        {step === 3 && <>
          <label className="block font-bold mb-1">Clinic Name</label>
          <input name="clinicName" value={form.clinicName} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Clinic Address</label>
          <input name="clinicAddress" value={form.clinicAddress} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Clinic Contact Number</label>
          <input name="clinicContact" value={form.clinicContact} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Google Maps Link (optional)</label>
          <input name="clinicMapLink" value={form.clinicMapLink} onChange={handleChange} className="w-full mb-3 p-2 rounded border" />
        </>}
        {/* Step 4: Availability */}
        {step === 4 && <>
          <label className="block font-bold mb-1">Working Days</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {workingDaysOptions.map(opt => (
              <label key={opt} className="flex items-center gap-1">
                <input type="checkbox" checked={form.workingDays.includes(opt)} onChange={() => handleMultiSelect('workingDays', opt)} /> {opt}
              </label>
            ))}
          </div>
          <label className="block font-bold mb-1">Working Hours</label>
          <input name="workingHours" value={form.workingHours} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Max Bookings Per Day</label>
          <input name="maxBookingsPerDay" value={form.maxBookingsPerDay} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Emergency Booking Enabled</label>
          <input type="checkbox" name="emergencyBooking" checked={form.emergencyBooking} onChange={handleChange} className="mb-3" />
          <label className="block font-bold mb-1">Consultation Types</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {consultationTypeOptions.map(opt => (
              <label key={opt} className="flex items-center gap-1">
                <input type="checkbox" checked={form.consultationTypes.includes(opt)} onChange={() => handleMultiSelect('consultationTypes', opt)} /> {opt}
              </label>
            ))}
          </div>
        </>}
        {/* Step 5: Services */}
        {step === 5 && <>
          <label className="block font-bold mb-1">Services Offered</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {serviceOptions.map(opt => (
              <label key={opt} className="flex items-center gap-1">
                <input type="checkbox" checked={form.services.includes(opt)} onChange={() => handleMultiSelect('services', opt)} /> {opt}
              </label>
            ))}
          </div>
        </>}
        {/* Step 6: Documents */}
        {step === 6 && <>
          <label className="block font-bold mb-1">Degree Certificate</label>
          <input type="file" name="degreeCertificate" accept="application/pdf,image/*" onChange={handleChange} className="w-full mb-3" required />
          <label className="block font-bold mb-1">License Number</label>
          <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Registration Certificate</label>
          <input type="file" name="registrationCertificate" accept="application/pdf,image/*" onChange={handleChange} className="w-full mb-3" required />
          <label className="block font-bold mb-1">National ID (optional)</label>
          <input type="file" name="nationalIdDoc" accept="application/pdf,image/*" onChange={handleChange} className="w-full mb-3" />
        </>}
        {/* Navigation */}
        <div className="flex gap-4 mt-4">
          {step > 1 && <button type="button" className="animal-btn px-6" onClick={() => setStep(s => s - 1)}>Back</button>}
          {step < 6 && <button type="button" className="animal-btn px-6" onClick={() => setStep(s => s + 1)}>Next</button>}
          {step === 6 && <button type="submit" className="animal-btn px-8" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>}
        </div>
        {error && <div className="text-red-600 font-bold mt-2">{error}</div>}
        {success && <div className="text-green-700 font-bold mt-2">{success}</div>}
      </form>
    </div>
  );
}
