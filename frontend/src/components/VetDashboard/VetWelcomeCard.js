import React from 'react';

const VetWelcomeCard = ({ vet }) => {
  return (
    <div className="flex items-center bg-white border border-yellow-200 rounded-2xl shadow-sm p-6 md:p-8 gap-6">
      <img
        src={vet?.profilePhoto || 'https://placehold.co/96x96'}
        alt="profile"
        className="h-20 w-20 md:h-24 md:w-24 rounded-full border border-yellow-200 object-cover"
      />
      <div className="min-w-0">
        <h2 className="text-2xl md:text-3xl font-extrabold text-yellow-900 truncate">Welcome, {vet?.fullName || 'Doctor'}</h2>
        <div className="mt-1 text-yellow-800/90">Specialization: {vet?.specialization?.join(', ') || 'N/A'}</div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-yellow-200 p-3 text-center">
            <div className="text-xl font-bold text-yellow-900">{vet?.appointmentsCount ?? 0}</div>
            <div className="text-xs text-yellow-800/90">Appointments</div>
          </div>
          <div className="rounded-xl border border-yellow-200 p-3 text-center">
            <div className="text-xl font-bold text-yellow-900">{vet?.healthRequestsCount ?? 0}</div>
            <div className="text-xs text-yellow-800/90">Health Requests</div>
          </div>
          <div className="rounded-xl border border-yellow-200 p-3 text-center">
            <div className="text-xl font-bold text-yellow-900">{vet?.avgRating ?? '0.0'}</div>
            <div className="text-xs text-yellow-800/90">Avg Rating ⭐</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetWelcomeCard; 
