import React, { useEffect, useState } from 'react';

export default function VetDirectory() {
  const [vets, setVets] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/vets');
        if (!res.ok) throw new Error('Failed to load vets');
        const data = await res.json();
        setVets(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to fetch vets', e);
        setVets([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const term = search.toLowerCase();
  const filtered = (Array.isArray(vets) ? vets : []).filter(vet => {
    const name = (vet.fullName || (vet.user && vet.user.name) || '').toLowerCase();
    const specs = Array.isArray(vet.specialization)
      ? vet.specialization.join(',').toLowerCase()
      : (vet.specialty || '').toLowerCase();
    const address = (vet.clinicAddress || vet.location || '').toLowerCase();
    return name.includes(term) || specs.includes(term) || address.includes(term);
  });

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-yellow-800 mb-6 text-center">Find a Vet</h1>
      <input
        className="w-full mb-6 p-2 rounded border"
        placeholder="Search by name, specialization, or address..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(vet => (
            <div key={vet._id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 border-l-4 border-yellow-200">
              <div className="flex items-center gap-4 mb-2">
                <img src={vet.profilePhoto || 'https://placehold.co/80x80'} alt={(vet.fullName || (vet.user && vet.user.name) || 'Vet')} className="w-16 h-16 rounded-full border" />
                <div>
                  <div className="font-bold text-lg text-yellow-900">{vet.fullName || (vet.user && vet.user.name) || 'Unknown'}</div>
                  <div className="text-sm text-gray-600">{Array.isArray(vet.specialization) ? vet.specialization.join(', ') : (vet.specialty || '')}</div>
                </div>
              </div>
              <div><span className="font-semibold">Clinic:</span> {vet.clinicName}</div>
              <div><span className="font-semibold">Address:</span> {vet.clinicAddress || vet.location}</div>
              <div><span className="font-semibold">Fee:</span> {vet.consultationFee ? `${vet.consultationFee}` : 'N/A'}</div>
              <div><span className="font-semibold">Rating:</span> {vet.avgRating || 'N/A'} ⭐</div>
              <div className="flex gap-2 mt-2">
                <a href={`/vet/${vet._id}`} className="animal-btn px-4 py-1">View Profile</a>
                {vet.clinicContact && <a href={`tel:${vet.clinicContact}`} className="animal-btn px-4 py-1 bg-green-200 text-green-900">Contact</a>}
                {vet.clinicMapLink && <a href={vet.clinicMapLink} target="_blank" rel="noopener noreferrer" className="animal-btn px-4 py-1 bg-blue-200 text-blue-900">Map</a>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
