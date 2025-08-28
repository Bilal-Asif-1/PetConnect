import React, { useEffect, useState } from 'react';

const VetHealthRequests = ({ vet }) => {
  const [healthRequests, setHealthRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({ pet: '', problem: '', type: '', user: '', contact: '', time: new Date().toISOString() });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchHealthRequests() {
      setLoading(true);
      setError('');
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.vetProfileId) return;
        const res = await fetch(`/api/healthrequests?vetId=${user.vetProfileId}`);
        if (!res.ok) throw new Error('Failed to load health requests');
        const data = await res.json();
        setHealthRequests(data);
      } catch (err) {
        setError('Failed to load health requests.');
      } finally {
        setLoading(false);
      }
    }
    fetchHealthRequests();
  }, [vet]);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewRequest(f => ({ ...f, [name]: value }));
  };

  const handleAddRequest = async e => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch('/api/healthrequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newRequest, vetId: user.vetProfileId }),
      });
      if (!res.ok) throw new Error('Failed to add health request');
      setNewRequest({ pet: '', problem: '', type: '', user: '', contact: '', time: new Date().toISOString() });
      // Refresh health requests
      const updatedRes = await fetch(`/api/healthrequests?vetId=${user.vetProfileId}`);
      const updatedData = await updatedRes.json();
      setHealthRequests(updatedData);
    } catch (err) {
      setError('Failed to add health request.');
    }
  };

  if (loading) return <div>Loading health requests...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-bold text-lg mb-2">Client Health Requests</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th>Pet</th><th>Problem</th><th>Type</th><th>Posted By</th><th>Contact</th><th>Time</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {healthRequests.length === 0 ? (
            <tr><td colSpan="7">No health requests found.</td></tr>
          ) : (
            healthRequests.map((r, i) => (
              <tr key={i} className="border-t">
                <td>{r.pet}</td>
                <td>{r.problem}</td>
                <td>{r.type}</td>
                <td>{r.user}</td>
                <td>{r.contact}</td>
                <td>{r.time}</td>
                <td>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 mr-2">Mark as Interested</button>
                  <button className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">Suggest Appointment</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <form onSubmit={handleAddRequest} className="mt-4 flex flex-col gap-2">
        <input name="pet" value={newRequest.pet} onChange={handleChange} placeholder="Pet" className="p-2 border rounded" required />
        <input name="problem" value={newRequest.problem} onChange={handleChange} placeholder="Problem" className="p-2 border rounded" required />
        <input name="type" value={newRequest.type} onChange={handleChange} placeholder="Type" className="p-2 border rounded" required />
        <input name="user" value={newRequest.user} onChange={handleChange} placeholder="Posted By" className="p-2 border rounded" required />
        <input name="contact" value={newRequest.contact} onChange={handleChange} placeholder="Contact" className="p-2 border rounded" required />
        <input type="datetime-local" name="time" value={newRequest.time} onChange={handleChange} className="p-2 border rounded" required />
        <button type="submit" className="animal-btn px-4">Add Health Request</button>
      </form>
    </div>
  );
};

export default VetHealthRequests;
