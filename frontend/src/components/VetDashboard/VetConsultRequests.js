import React, { useEffect, useState } from 'react';

const VetConsultRequests = ({ vet }) => {
  const [consultRequests, setConsultRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({ user: '', type: '', status: 'Pending', time: new Date().toISOString() });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchConsultRequests() {
      setLoading(true);
      setError('');
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.vetProfileId) return;
        const res = await fetch(`/api/consultrequests?vetId=${user.vetProfileId}`);
        if (!res.ok) throw new Error('Failed to load consult requests');
        const data = await res.json();
        setConsultRequests(data);
      } catch (err) {
        setError('Failed to load consult requests.');
      } finally {
        setLoading(false);
      }
    }
    fetchConsultRequests();
  }, [vet]);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewRequest(f => ({ ...f, [name]: value }));
  };

  const handleAddRequest = async e => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch('/api/consultrequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newRequest, vetId: user.vetProfileId }),
      });
      if (!res.ok) throw new Error('Failed to add consult request');
      setNewRequest({ user: '', type: '', status: 'Pending', time: new Date().toISOString() });
      // Refresh consult requests
      const updatedRes = await fetch(`/api/consultrequests?vetId=${user.vetProfileId}`);
      const updatedData = await updatedRes.json();
      setConsultRequests(updatedData);
    } catch (err) {
      setError('Failed to add consult request.');
    }
  };

  if (loading) return <div>Loading consult requests...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-bold text-lg mb-2">Online Consult Requests</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th>User</th><th>Type</th><th>Status</th><th>Time</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {consultRequests.length === 0 ? (
            <tr><td colSpan="5">No consult requests found.</td></tr>
          ) : (
            consultRequests.map((c, i) => (
              <tr key={i} className="border-t">
                <td>{c.user}</td>
                <td>{c.type}</td>
                <td><span className={`px-2 py-1 rounded text-xs ${c.status === 'Accepted' ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{c.status}</span></td>
                <td>{c.time}</td>
                <td>
                  <button className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 mr-2">Accept</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Reject</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <form onSubmit={handleAddRequest} className="mt-4 flex flex-col gap-2">
        <input name="user" value={newRequest.user} onChange={handleChange} placeholder="User" className="p-2 border rounded" required />
        <input name="type" value={newRequest.type} onChange={handleChange} placeholder="Type" className="p-2 border rounded" required />
        <input name="status" value={newRequest.status} onChange={handleChange} placeholder="Status" className="p-2 border rounded" required />
        <input type="datetime-local" name="time" value={newRequest.time} onChange={handleChange} className="p-2 border rounded" required />
        <button type="submit" className="animal-btn px-4">Add Consult Request</button>
      </form>
    </div>
  );
};

export default VetConsultRequests;
