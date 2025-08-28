import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      axios.get(`/api/appointments/user/${user.id || user._id}`)
        .then(res => setAppointments(res.data));
    }
  }, [user]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-4 text-yellow-900">My Appointments</h1>
      {appointments.length === 0 ? (
        <div className="text-yellow-800/90">No appointments found.</div>
      ) : (
        <div className="overflow-x-auto theme-card rounded-2xl shadow">
          <table className="w-full text-left rounded-2xl overflow-hidden">
            <thead>
              <tr className="text-yellow-700 text-sm">
                <th className="p-3">Vet</th><th className="p-3">Pet</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3">Contact</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, i) => (
                <tr key={i} className="border-t border-yellow-100">
                  <td className="p-3">{a.vet?.user?.name || 'Vet'}</td>
                  <td className="p-3">{a.petName}</td>
                  <td className="p-3">{new Date(a.date).toLocaleString()}</td>
                  <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${a.status === 'confirmed' ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{a.status}</span></td>
                  <td className="p-3">{a.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAppointments; 