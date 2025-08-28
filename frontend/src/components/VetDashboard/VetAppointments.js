import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VetAppointments = ({ vet }) => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ petName: '', owner: '', date: '', status: 'pending', contact: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      setError('');
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.vetProfileId) return;
        const res = await axios.get(`/api/appointments/vet/${user.vetProfileId}`);
        setAppointments(res.data);
      } catch (err) {
        setError('Failed to load appointments.');
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [vet]);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewAppointment(f => ({ ...f, [name]: value }));
  };

  const handleAddAppointment = async e => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post('/api/appointments', { ...newAppointment, veterinarian: user.vetProfileId });
      setNewAppointment({ petName: '', owner: '', date: '', status: 'pending', contact: '' });
      // Refresh appointments
      const updatedRes = await axios.get(`/api/appointments/vet/${user.vetProfileId}`);
      setAppointments(updatedRes.data);
    } catch (err) {
      setError('Failed to add appointment.');
    }
  };

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-bold text-lg mb-2">My Appointments</h3>
      {appointments.length === 0 ? (
        <div>No appointments found.</div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th>Pet</th><th>Owner</th><th>Date & Time</th><th>Status</th><th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={i} className="border-t">
                <td>{a.petName}</td>
                <td>{a.user?.name}</td>
                <td>{new Date(a.date).toLocaleString()}</td>
                <td><span className={`px-2 py-1 rounded text-xs ${a.status === 'confirmed' ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{a.status}</span></td>
                <td>{a.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <form onSubmit={handleAddAppointment} className="mt-4 flex flex-col gap-2">
        <input name="petName" value={newAppointment.petName} onChange={handleChange} placeholder="Pet Name" className="p-2 border rounded" required />
        <input name="owner" value={newAppointment.owner} onChange={handleChange} placeholder="Owner" className="p-2 border rounded" required />
        <input type="datetime-local" name="date" value={newAppointment.date} onChange={handleChange} className="p-2 border rounded" required />
        <input name="contact" value={newAppointment.contact} onChange={handleChange} placeholder="Contact" className="p-2 border rounded" required />
        <button type="submit" className="animal-btn px-4">Add Appointment</button>
      </form>
    </div>
  );
};

export default VetAppointments;
