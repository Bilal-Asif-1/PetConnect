import React, { useState } from 'react';

export default function PetInfoCard({ pet, onView, onBuy, onContact }) {
  const mainImage = pet.images && pet.images.length > 0 ? pet.images[0] : 'https://placehold.co/300x200?text=Pet';
  const name = pet.name || 'Unnamed Pet';
  const speciesOrType = pet.species || pet.type || 'Pet';
  const breed = pet.breed || '';
  const age = pet.age || '';
  const gender = pet.gender || '';
  const price = pet.price || null;
  const location = pet.location || '';
  const vaccination = pet.vaccinationStatus === 'Yes' || pet.vaccinationStatus === true ? 'Vaccinated ✅' : pet.vaccinationStatus ? 'Not Vaccinated ❌' : '';
  const weight = pet.weight || pet.size || '';
  const saleType = pet.type === 'adoption' ? 'Adoption' : (pet.type === 'sale' ? 'For Sale' : null);

  const [isFavorited, setIsFavorited] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleBuy = () => {
    if (onBuy) onBuy(pet);
    setShowToast(true);
    window.clearTimeout((handleBuy)._t);
    (handleBuy)._t = window.setTimeout(() => setShowToast(false), 1600);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-yellow-100 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {saleType && (
        <div className={`absolute top-3 left-3 z-10 text-xs font-bold px-2 py-1 rounded-full ${saleType === 'Adoption' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
          {saleType}
        </div>
      )}
      <button
        type="button"
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        onClick={(e) => { e.stopPropagation(); setIsFavorited(v => !v); }}
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all ${isFavorited ? 'bg-red-500 text-white' : 'bg-white text-red-500 hover:bg-red-50'} `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M11.645 20.91l-.007-.003-.022-.01a15.247 15.247 0 01-.383-.18 25.18 25.18 0 01-4.244-2.62C4.688 16.107 2.25 13.432 2.25 9.944 2.25 7.387 4.204 5.25 6.75 5.25c1.384 0 2.59.56 3.5 1.456.91-.896 2.116-1.456 3.5-1.456 2.546 0 4.5 2.137 4.5 4.694 0 3.487-2.438 6.162-4.739 7.154a25.175 25.175 0 01-4.244 2.62 15.247 15.247 0 01-.383.18l-.022.01-.007.003-.003.001a.75.75 0 01-.614 0l-.003-.001z"/>
        </svg>
      </button>
      <div className="w-full h-44 bg-gray-50 overflow-hidden flex items-center justify-center">
        <img src={mainImage} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-lg font-extrabold text-yellow-900 tracking-tight">{name}</div>
        <div className="text-sm text-yellow-800/90 mb-1">
          {speciesOrType}{breed ? ` - ${breed}` : ''}
        </div>
        <div className="text-sm text-yellow-800/90">Age: {age}{gender ? ` • Gender: ${gender}` : ''}</div>
        {price && (
          <div className="mt-1 font-bold text-yellow-900">Price: ${price}</div>
        )}
        {location && (
          <div className="text-sm text-yellow-800/90">Location: {location}</div>
        )}
        {vaccination && (
          <div className="text-sm text-yellow-800/90">Health: {vaccination}</div>
        )}
        {weight && (
          <div className="text-sm text-yellow-800/90">Weight/Size: {weight}</div>
        )}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <button className="px-2 py-2 text-xs rounded-xl bg-yellow-400 text-black font-semibold shadow-sm hover:shadow-md hover:bg-yellow-300 transition-all" onClick={() => onView && onView(pet)}>View Details</button>
          <button className="relative px-2 py-2 text-xs rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold shadow-sm hover:shadow-md hover:from-yellow-300 hover:to-amber-400 transition-all" onClick={handleBuy}>{price ? 'Buy Now' : 'Adopt'}</button>
          <button className="px-2 py-2 text-xs rounded-xl border border-yellow-300 text-yellow-900 font-semibold bg-white hover:bg-yellow-50 transition-colors" onClick={() => onContact && onContact(pet)}>Contact Seller</button>
        </div>
      </div>
      {showToast && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-semibold px-3 py-2 rounded-full shadow-md animate-pulse">
          Added to cart
        </div>
      )}
    </div>
  );
}


