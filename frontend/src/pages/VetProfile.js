import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function VetProfile() {
  const { id } = useParams();
  const [vet, setVet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/vets/${id}`)
      .then(res => res.json())
      .then(data => setVet(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!vet) return <div className="text-center py-10 text-red-600">Vet not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="theme-card rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        <img src={vet.profilePhoto || 'https://placehold.co/120x120'} alt={vet.fullName} className="w-32 h-32 rounded-full border border-yellow-300 self-center" />
        <div className="flex-1">
          <div className="text-2xl font-bold text-yellow-900 mb-1">{vet.fullName}</div>
          <div className="text-yellow-800/90 mb-2">{vet.specialization && vet.specialization.join(', ')}</div>
          <div className="mb-2"><span className="font-semibold">Clinic:</span> {vet.clinicName}</div>
          <div className="mb-2"><span className="font-semibold">Address:</span> {vet.clinicAddress}</div>
          <div className="mb-2"><span className="font-semibold">Contact:</span> {vet.clinicContact}</div>
          <div className="mb-2"><span className="font-semibold">Consultation Fee:</span> ${vet.consultationFee}</div>
          <div className="mb-2"><span className="font-semibold">Working Days:</span> {vet.workingDays && vet.workingDays.join(', ')}</div>
          <div className="mb-2"><span className="font-semibold">Working Hours:</span> {vet.workingHours}</div>
          <div className="mb-2"><span className="font-semibold">Max Bookings/Day:</span> {vet.maxBookingsPerDay}</div>
          <div className="mb-2"><span className="font-semibold">Emergency Booking:</span> {vet.emergencyBooking ? 'Yes' : 'No'}</div>
          <div className="mb-2"><span className="font-semibold">Consultation Types:</span> {vet.consultationTypes && vet.consultationTypes.join(', ')}</div>
          <div className="mb-2"><span className="font-semibold">Services:</span> {vet.services && vet.services.join(', ')}</div>
          <div className="mb-2"><span className="font-semibold">Degree:</span> {vet.degree} ({vet.graduationYear})</div>
          <div className="mb-2"><span className="font-semibold">University:</span> {vet.university}</div>
          <div className="mb-2"><span className="font-semibold">Experience:</span> {vet.experienceYears} years</div>
          <div className="mb-2"><span className="font-semibold">License Number:</span> {vet.licenseNumber}</div>
          {vet.clinicMapLink && <div className="mb-2"><a href={vet.clinicMapLink} target="_blank" rel="noopener noreferrer" className="animal-btn px-4 py-1 bg-blue-200 text-blue-900">View on Map</a></div>}
        </div>
      </div>
      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3 text-yellow-900">Reviews & Ratings</h2>
        {vet.reviews && vet.reviews.length > 0 ? (
          <div className="space-y-3">
            {vet.reviews.map((r, i) => (
              <div key={i} className="bg-yellow-50 rounded-lg p-4">
                <div className="font-bold text-yellow-900">{r.user?.name || 'Anonymous'}</div>
                <div className="text-yellow-700">Rating: {r.rating} ⭐</div>
                <div>{r.comment}</div>
                <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        ) : <div>No reviews yet.</div>}
      </div>
      {/* Booking Button */}
      <div className="mt-8 flex justify-center">
        <a href={`/book-appointment/${vet._id}`} className="animal-btn px-8 py-2">Book Appointment</a>
      </div>
    </div>
  );
}
