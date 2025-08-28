import React, { useEffect, useState } from 'react';

const API_URL = '/api/lostfound';

const initialForm = {
  type: 'lost',
  petName: '',
  petType: '',
  breed: '',
  lastSeenLocation: '',
  lastSeenDate: '',
  images: [''],
  contact: '',
  note: '',
  adoptableOrForSale: 'none',
};

const typeIcons = {
  Dog: '🐶',
  Cat: '🐱',
  Bird: '🐦',
  Fish: '🐟',
  Hamster: '🐹',
  Reptile: '🦎',
  Other: '🐾',
};

function LostFound() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setEntries)
      .catch(() => setError('Failed to load lost & found entries.'));
  }, [success]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleImageChange = e => {
    setForm(f => ({ ...f, images: [e.target.value] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit entry');
      setForm(initialForm);
      setSuccess('Entry submitted!');
    } catch (err) {
      setError('Failed to submit entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-yellow-800 mb-6 text-center">Lost & Found Pets</h1>
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-bold mb-1">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="w-full mb-3 p-2 rounded border">
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          <label className="block font-bold mb-1">Pet Name</label>
          <input name="petName" value={form.petName} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Pet Type</label>
          <select name="petType" value={form.petType} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required>
            <option value="">Select</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
            <option value="Hamster">Hamster</option>
            <option value="Reptile">Reptile</option>
            <option value="Other">Other</option>
          </select>
          <label className="block font-bold mb-1">Breed</label>
          <input name="breed" value={form.breed} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Last Seen Location</label>
          <input name="lastSeenLocation" value={form.lastSeenLocation} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
        </div>
        <div>
          <label className="block font-bold mb-1">Last Seen Date</label>
          <input type="date" name="lastSeenDate" value={form.lastSeenDate} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Photo (URL)</label>
          <input name="image" value={form.images[0]} onChange={handleImageChange} className="w-full mb-3 p-2 rounded border" placeholder="https://..." required />
          <label className="block font-bold mb-1">Contact Info</label>
          <input name="contact" value={form.contact} onChange={handleChange} className="w-full mb-3 p-2 rounded border" required />
          <label className="block font-bold mb-1">Note</label>
          <textarea name="note" value={form.note} onChange={handleChange} className="w-full mb-3 p-2 rounded border" />
          <label className="block font-bold mb-1">Adoptable or For Sale?</label>
          <select name="adoptableOrForSale" value={form.adoptableOrForSale} onChange={handleChange} className="w-full mb-3 p-2 rounded border">
            <option value="none">No</option>
            <option value="adoption">Available for Adoption</option>
            <option value="sale">Can be Purchased</option>
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col md:flex-row gap-4 items-center">
          <button type="submit" className="animal-btn px-8 py-2" disabled={loading}>{loading ? 'Submitting...' : 'Submit Entry'}</button>
          {error && <span className="text-red-600 font-bold">{error}</span>}
          {success && <span className="text-green-700 font-bold">{success}</span>}
        </div>
      </form>
      {/* Lost & Found Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {entries.map(entry => (
          <div key={entry._id} className="bg-yellow-50 rounded-2xl shadow-lg p-5 border-l-4 border-yellow-300 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{typeIcons[entry.petType] || '🐾'}</span>
              <span className="font-bold text-lg text-yellow-900">{entry.petName}</span>
              <span className={`ml-auto px-3 py-1 rounded text-xs font-bold ${entry.type === 'lost' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>{entry.type.toUpperCase()}</span>
            </div>
            <img src={entry.images && entry.images[0]} alt={entry.petName} className="w-full h-40 object-cover rounded mb-2 border border-yellow-200" />
            <div className="mb-1"><span className="font-semibold">Breed:</span> {entry.breed}</div>
            <div className="mb-1"><span className="font-semibold">Type:</span> {entry.petType}</div>
            <div className="mb-1"><span className="font-semibold">Last Seen:</span> {entry.lastSeenLocation} on {entry.lastSeenDate && new Date(entry.lastSeenDate).toLocaleDateString()}</div>
            <div className="mb-1"><span className="font-semibold">Contact:</span> {entry.contact}</div>
            {entry.note && <div className="mb-1"><span className="font-semibold">Note:</span> {entry.note}</div>}
            {entry.adoptableOrForSale !== 'none' && (
              <div className={`mt-2 px-3 py-1 rounded text-xs font-bold ${entry.adoptableOrForSale === 'adoption' ? 'bg-blue-200 text-blue-800' : 'bg-orange-200 text-orange-800'}`}>
                {entry.adoptableOrForSale === 'adoption' ? 'Available for Adoption' : 'Can be Purchased'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LostFound;
