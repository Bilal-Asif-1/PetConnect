import React, { useEffect, useState } from 'react';

const VetClients = ({ vet }) => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: '', pet: '', contact: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchClients() {
      setLoading(true);
      setError('');
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.vetProfileId) return;
        const res = await fetch(`/api/clients?vetId=${user.vetProfileId}`);
        if (!res.ok) throw new Error('Failed to load clients');
        const data = await res.json();
        setClients(data);
      } catch (err) {
        setError('Failed to load clients.');
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, [vet]);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewClient(f => ({ ...f, [name]: value }));
  };

  const handleAddClient = async e => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newClient, vetId: user.vetProfileId }),
      });
      if (!res.ok) throw new Error('Failed to add client');
      setNewClient({ name: '', pet: '', contact: '' });
      // Refresh clients
      const updatedRes = await fetch(`/api/clients?vetId=${user.vetProfileId}`);
      const updatedData = await updatedRes.json();
      setClients(updatedData);
    } catch (err) {
      setError('Failed to add client.');
    }
  };

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-bold text-lg mb-2">Client List</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th>Name</th><th>Pet</th><th>Contact</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr><td colSpan="4">No clients found.</td></tr>
          ) : (
            clients.map((c, i) => (
              <tr key={i} className="border-t">
                <td>{c.name}</td>
                <td>{c.pet}</td>
                <td>{c.contact}</td>
                <td>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 mr-2">Message</button>
                  <button className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">Call</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <form onSubmit={handleAddClient} className="mt-4 flex flex-col gap-2">
        <input name="name" value={newClient.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" required />
        <input name="pet" value={newClient.pet} onChange={handleChange} placeholder="Pet" className="p-2 border rounded" required />
        <input name="contact" value={newClient.contact} onChange={handleChange} placeholder="Contact" className="p-2 border rounded" required />
        <button type="submit" className="animal-btn px-4">Add Client</button>
      </form>
    </div>
  );
};

export default VetClients;
