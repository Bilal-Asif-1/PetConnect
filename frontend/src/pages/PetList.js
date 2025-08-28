import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PetCard from '../components/PetCard';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [lostFound, setLostFound] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    ageUnit: 'years',
    gender: '',
    vaccinationStatus: '',
    images: '',
    imageFile: null,
    description: '',
    type: 'sale',
    price: ''
  });
  const [addError, setAddError] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPetsAndLostFound = async () => {
      try {
        const [petsRes, lostFoundRes] = await Promise.all([
          axios.get('/api/pets'),
          axios.get('/api/lostfound')
        ]);
        setPets(petsRes.data);
        setLostFound(lostFoundRes.data);
      } catch (err) {
        setError('Failed to load pets or lost & found entries');
      } finally {
        setLoading(false);
      }
    };
    fetchPetsAndLostFound();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageFile = (e) => {
    setForm({ ...form, imageFile: e.target.files[0] });
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');
    try {
      let imageUrls = form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : [];
      if (form.imageFile) {
        const data = new FormData();
        data.append('image', form.imageFile);
        const uploadRes = await axios.post('/api/upload', data, { headers: { Authorization: `Bearer ${token}` } });
        if (uploadRes.data.imageUrl) imageUrls = [uploadRes.data.imageUrl, ...imageUrls];
      }
      const payload = {
        name: form.name,
        species: form.species,
        breed: form.breed,
        age: form.age + ' ' + form.ageUnit,
        gender: form.gender,
    vaccinationStatus: form.vaccinationStatus,
    images: imageUrls,
        description: form.description,
        type: form.type,
        price: form.price
      };
      await axios.post('/api/pets', payload, { headers: { Authorization: `Bearer ${token}` } });
      setShowForm(false);
      setForm({
        name: '',
        species: '',
        breed: '',
        age: '',
        ageUnit: 'years',
        gender: '',
        vaccinationStatus: '',
        images: '',
        imageFile: null,
        description: '',
        type: 'sale',
        price: ''
      });
      // Refresh pet list
      const res = await axios.get('/api/pets');
      setPets(res.data);
    } catch (err) {
      setAddError(err.response?.data?.message || 'Failed to add pet');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-yellow-900">Pet Listings</h1>
      {user?.role === 'seller' && (
        <div className="mb-6">
          <button className="animal-btn px-4 py-2" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Pet'}
          </button>
          {showForm && (
            <form className="mt-4 theme-card p-4 rounded-2xl shadow grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAddPet}>
              {addError && <div className="mb-2 text-red-600 font-semibold col-span-2">{addError}</div>}
              <div className="col-span-2 text-lg font-bold text-yellow-900 mb-1">🐾 Pet Details</div>
              <input className="w-full mb-2 p-2 border rounded" name="name" placeholder="Pet Name" value={form.name} onChange={handleChange} required />
                <select className="w-full mb-2 p-2 border rounded" name="species" value={form.species} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Fish">Fish</option>
                  <option value="Reptile">Reptile</option>
                  <option value="Other">Other</option>
                </select>
              <input className="w-full mb-2 p-2 border rounded" name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} required />
              <div className="flex gap-2 mb-2">
                <input className="w-full p-2 border rounded" name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
                <select className="p-2 border rounded" name="ageUnit" value={form.ageUnit} onChange={handleChange}><option value="years">Years</option><option value="months">Months</option></select>
              </div>
              <select className="w-full mb-2 p-2 border rounded" name="gender" value={form.gender} onChange={handleChange} required><option value="">Gender</option><option value="Male">Male</option><option value="Female">Female</option></select>
                <select className="w-full mb-2 p-2 border rounded" name="vaccinationStatus" value={form.vaccinationStatus} onChange={handleChange} required>
                  <option value="">Vaccination Status</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              <input className="w-full mb-2 p-2 border rounded" name="images" placeholder="Image URLs (comma separated, optional)" value={form.images} onChange={handleChange} />
              <input className="w-full mb-2 p-2 border rounded" type="file" accept="image/*" onChange={handleImageFile} />
              <textarea className="w-full mb-2 p-2 border rounded col-span-2" name="description" placeholder="Short Description / Story about the pet (optional)" value={form.description} onChange={handleChange} />
              <select className="w-full mb-2 p-2 border rounded" name="type" value={form.type} onChange={handleChange} required>
                <option value="sale">For Sale</option>
                <option value="adoption">For Adoption</option>
              </select>
              <input className="w-full mb-2 p-2 border rounded" name="price" type="number" placeholder="Price (if for sale, optional)" value={form.price} onChange={handleChange} />
              <button className="animal-btn px-4 py-2 col-span-2" disabled={addLoading}>
                {addLoading ? 'Adding...' : 'Add Pet'}
              </button>
            </form>
          )}
        </div>
      )}
      {loading ? (
        <div>Loading pets...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <>
          {/* Regular Pets Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">Available Pets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          </div>
          {/* Lost & Found Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">Lost & Found Pets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {lostFound.map((entry) => (
                <div key={entry._id} className="bg-yellow-50 border border-yellow-100 rounded-xl shadow-sm flex flex-col items-center p-3 min-h-[260px] max-w-xs mx-auto">
                  {entry.images && entry.images.length > 0 && (
                    <img src={entry.images[0]} alt={entry.petName} className="h-28 w-28 object-cover rounded mb-2 border border-yellow-100" />
                  )}
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${entry.type === 'lost' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>{entry.type.toUpperCase()}</span>
                    <h2 className="text-lg font-semibold text-yellow-900 text-center">{entry.petName}</h2>
                  </div>
                  <div className="text-xs text-yellow-800/90 mb-1">{entry.breed} • {entry.petType}</div>
                  <div className="text-xs text-yellow-800/90 mb-1">Last Seen: {entry.lastSeenLocation} {entry.lastSeenDate && (<>on {new Date(entry.lastSeenDate).toLocaleDateString()}</>)}</div>
                  <div className="text-xs text-yellow-800/90 mb-1">Contact: {entry.contact}</div>
                  {entry.note && <div className="text-xs text-yellow-700 mt-1 text-center line-clamp-2">{entry.note}</div>}
                  {entry.adoptableOrForSale !== 'none' && (
                    <div className={`mt-2 px-3 py-1 rounded text-xs font-bold ${entry.adoptableOrForSale === 'adoption' ? 'bg-blue-200 text-blue-800' : 'bg-orange-200 text-orange-800'}`}>
                      {entry.adoptableOrForSale === 'adoption' ? 'Available for Adoption' : 'Can be Purchased'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PetList; 