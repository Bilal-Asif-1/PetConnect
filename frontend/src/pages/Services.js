import React from 'react';

const Services = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-4 text-yellow-900">Pet Care Services</h1>
      <p className="mb-6 text-yellow-800/90">Book pet sitting, walking, or grooming.</p>
      <div className="theme-card rounded-2xl p-6 shadow mb-4">
        <h2 className="font-bold text-xl text-yellow-900">Dog Walking</h2>
        <div className="text-yellow-800/90">Provider: John Doe</div>
        <div className="text-yellow-800/90">Location: Chicago</div>
        <div className="text-yellow-800/90">Price: $15/hr</div>
        <button className="mt-3 animal-btn px-4">Book Now</button>
      </div>
      <div className="theme-card rounded-2xl p-6 shadow mb-4">
        <h2 className="font-bold text-xl text-yellow-900">Pet Grooming</h2>
        <div className="text-yellow-800/90">Provider: Jane Smith</div>
        <div className="text-yellow-800/90">Location: Miami</div>
        <div className="text-yellow-800/90">Price: $30</div>
        <button className="mt-3 animal-btn px-4">Book Now</button>
      </div>
    </div>
  );
};

export default Services; 