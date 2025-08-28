import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VetCard from '../components/VetCard';

const Vets = () => {
  const [vets, setVets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const [form, setForm] = useState({ petName: '', date: '', contact: '', notes: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('/api/vets').then(res => setVets(res.data));
  }, []);

  const openModal = (vet) => {
    setSelectedVet(vet);
    setShowModal(true);
    setForm({ petName: '', date: '', contact: user?.contact || '', notes: '' });
    setSuccess('');
    setError('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await axios.post('/api/appointments', {
        vetId: selectedVet._id,
        userId: user?.id || user?._id,
        ...form,
      });
      setSuccess('Appointment booked successfully!');
      setShowModal(false);
    } catch (err) {
      setError('Failed to book appointment.');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-2 text-yellow-900">Find a Vet Doctor</h1>
      <p className="mb-6 text-lg text-yellow-800/90">Browse and book appointments with our registered veterinary professionals.</p>
      {success && <div className="mb-4 text-green-700 font-semibold bg-green-50 border border-green-200 px-3 py-2 rounded">{success}</div>}
      {error && <div className="mb-4 text-red-700 font-semibold bg-red-50 border border-red-200 px-3 py-2 rounded">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vets.map(vet => (
          <VetCard key={vet._id} vet={vet} onBook={openModal} />
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-fade-in">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Book Appointment with {selectedVet.user?.name}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input className="w-full p-3 border-2 border-blue-200 rounded focus:outline-none focus:border-blue-400" name="petName" placeholder="Your Pet's Name" value={form.petName} onChange={handleChange} required />
              <input className="w-full p-3 border-2 border-blue-200 rounded focus:outline-none focus:border-blue-400" name="date" type="datetime-local" value={form.date} onChange={handleChange} required />
              <input className="w-full p-3 border-2 border-blue-200 rounded focus:outline-none focus:border-blue-400" name="contact" placeholder="Your Contact" value={form.contact} onChange={handleChange} required />
              <textarea className="w-full p-3 border-2 border-blue-200 rounded focus:outline-none focus:border-blue-400" name="notes" placeholder="Notes (optional)" value={form.notes} onChange={handleChange} />
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">Book</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vets; 