import React, { useState } from 'react';

const VetProfile = ({ vet }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: vet?.fullName || '',
    degree: vet?.degree || '',
    experienceYears: vet?.experienceYears || '',
    specialization: vet?.specialization?.join(', ') || '',
    clinicLocation: vet?.clinicLocation || '',
    consultationFee: vet?.consultationFee || '',
    contactNumber: vet?.contactNumber || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch(`/api/vets/${user.vetProfileId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          degree: form.degree,
          experienceYears: form.experienceYears,
          specialization: form.specialization.split(',').map(s => s.trim()),
          clinicLocation: form.clinicLocation,
          consultationFee: form.consultationFee,
          contactNumber: form.contactNumber,
        })
      });
      if (!res.ok) throw new Error('Update failed');
      setSuccess('Profile updated!');
      setEditing(false);
      window.location.reload();
    } catch (err) {
      setError('Could not update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (!vet) return null;

  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">
      <h3 className="font-bold text-lg mb-2">My Profile</h3>
      {editing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label>Full Name<input name="fullName" value={form.fullName} onChange={handleChange} className="w-full p-1 border rounded" required /></label>
          <label>Degree<input name="degree" value={form.degree} onChange={handleChange} className="w-full p-1 border rounded" required /></label>
          <label>Experience (years)<input name="experienceYears" value={form.experienceYears} onChange={handleChange} className="w-full p-1 border rounded" required /></label>
          <label>Specialization<input name="specialization" value={form.specialization} onChange={handleChange} className="w-full p-1 border rounded" placeholder="Comma separated" required /></label>
          <label>Clinic Location<input name="clinicLocation" value={form.clinicLocation} onChange={handleChange} className="w-full p-1 border rounded" required /></label>
          <label>Fee<input name="consultationFee" value={form.consultationFee} onChange={handleChange} className="w-full p-1 border rounded" required /></label>
          <label>Contact<input name="contactNumber" value={form.contactNumber} onChange={handleChange} className="w-full p-1 border rounded" required /></label>
          <div className="flex gap-2 mt-2">
            <button type="submit" className="animal-btn px-4" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            <button type="button" className="animal-btn px-4 bg-gray-200 text-gray-800" onClick={() => setEditing(false)}>Cancel</button>
          </div>
          {error && <div className="text-red-600 font-bold">{error}</div>}
          {success && <div className="text-green-700 font-bold">{success}</div>}
        </form>
      ) : (
        <div className="flex flex-col gap-2">
          <div><span className="font-semibold">Name:</span> {vet.fullName}</div>
          <div><span className="font-semibold">Degree:</span> {vet.degree}</div>
          <div><span className="font-semibold">Experience:</span> {vet.experienceYears} years</div>
          <div><span className="font-semibold">Specialization:</span> {vet.specialization?.join(', ')}</div>
          <div><span className="font-semibold">Clinic Location:</span> {vet.clinicLocation}</div>
          <div><span className="font-semibold">Fee:</span> ${vet.consultationFee}</div>
          <div><span className="font-semibold">Contact:</span> {vet.contactNumber}</div>
          <button className="mt-2 animal-btn px-4" onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default VetProfile;
