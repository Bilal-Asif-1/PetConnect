import React, { useState } from 'react';

const VetAvailability = ({ vet }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    workingDays: vet?.workingDays?.join(', ') || '',
    workingHours: vet?.workingHours || '',
    emergencyBooking: vet?.emergencyBooking || false,
    maxBookingsPerDay: vet?.maxBookingsPerDay || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
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
          workingDays: form.workingDays.split(',').map(d => d.trim()),
          workingHours: form.workingHours,
          emergencyBooking: form.emergencyBooking,
          maxBookingsPerDay: form.maxBookingsPerDay,
        })
      });
      if (!res.ok) throw new Error('Update failed');
      setSuccess('Availability updated!');
      setEditing(false);
      window.location.reload();
    } catch (err) {
      setError('Could not update availability.');
    } finally {
      setLoading(false);
    }
  };

  if (!vet) return null;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-bold text-lg mb-2">Availability Settings</h3>
      {editing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label>Working Days<input name="workingDays" value={form.workingDays} onChange={handleChange} className="w-full p-1 border rounded" placeholder="Comma separated" required /></label>
          <label>Working Hours<input name="workingHours" value={form.workingHours} onChange={handleChange} className="w-full p-1 border rounded" required /></label>
          <label>Emergency Booking Enabled<input type="checkbox" name="emergencyBooking" checked={form.emergencyBooking} onChange={handleChange} /></label>
          <label>Max Bookings/Day<input name="maxBookingsPerDay" value={form.maxBookingsPerDay} onChange={handleChange} className="w-full p-1 border rounded" required /></label>
          <div className="flex gap-2 mt-2">
            <button type="submit" className="animal-btn px-4" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            <button type="button" className="animal-btn px-4 bg-gray-200 text-gray-800" onClick={() => setEditing(false)}>Cancel</button>
          </div>
          {error && <div className="text-red-600 font-bold">{error}</div>}
          {success && <div className="text-green-700 font-bold">{success}</div>}
        </form>
      ) : (
        <div className="flex flex-col gap-2">
          <div><span className="font-semibold">Working Days:</span> {vet.workingDays?.join(', ') || 'N/A'}</div>
          <div><span className="font-semibold">Hours:</span> {vet.workingHours || 'N/A'}</div>
          <div><span className="font-semibold">Emergency Bookings:</span> <span className={vet.emergencyBooking ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{vet.emergencyBooking ? 'Enabled' : 'Disabled'}</span></div>
          <div><span className="font-semibold">Max Bookings/Day:</span> {vet.maxBookingsPerDay || 'N/A'}</div>
          <button className="mt-2 animal-btn px-4" onClick={() => setEditing(true)}>Edit Availability</button>
        </div>
      )}
    </div>
  );
};

export default VetAvailability;
