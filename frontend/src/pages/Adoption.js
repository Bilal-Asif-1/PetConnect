import React from 'react';

const Adoption = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-4 text-yellow-900">Adoption</h1>
      <p className="mb-6 text-yellow-800/90">Browse pets available for free adoption.</p>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="theme-card rounded-2xl p-6 shadow">
          <h2 className="font-bold text-xl text-yellow-900">Bella (Dog)</h2>
          <div className="text-yellow-800/90">Breed: Labrador</div>
          <div className="text-yellow-800/90">Age: 2 years</div>
          <div className="text-yellow-800/90">Location: New York</div>
          <button className="mt-3 animal-btn px-4">Apply for Adoption</button>
        </div>
        <div className="theme-card rounded-2xl p-6 shadow">
          <h2 className="font-bold text-xl text-yellow-900">Milo (Cat)</h2>
          <div className="text-yellow-800/90">Breed: Persian</div>
          <div className="text-yellow-800/90">Age: 1 year</div>
          <div className="text-yellow-800/90">Location: Los Angeles</div>
          <button className="mt-3 animal-btn px-4">Apply for Adoption</button>
        </div>
      </div>
    </div>
  );
};

export default Adoption; 