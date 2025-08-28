import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { name: 'Pet Listings', path: '/pets', desc: 'Buy, sell, or adopt pets.', icon: '🐾' },
  { name: 'Adoption', path: '/adoption', desc: 'Adopt a pet for free.', icon: '❤️' },
  { name: 'Store', path: '/store', desc: 'Shop pet accessories.', icon: '🛒' },
  { name: 'Services', path: '/services', desc: 'Book pet care services.', icon: '🧑‍🦰' },
  { name: 'Vets', path: '/vets', desc: 'Find and book a vet.', icon: '👩‍⚕️' },
  { name: 'Chatbot', path: '/chatbot', desc: 'Ask pet health questions.', icon: '🤖' },
  { name: 'Lost & Found', path: '/lostfound', desc: 'Report or find lost pets.', icon: '🔍' },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-900 tracking-tight">Dashboard</h1>
          <div className="hidden sm:flex items-center gap-2 text-yellow-900 font-semibold">
            <span>🐾</span>
            <span>PetConnect</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Link
              key={f.name}
              to={f.path}
              className="group rounded-xl border border-yellow-200 bg-white p-5 hover:bg-yellow-50 transition-colors"
            >
              <div className="text-3xl">{f.icon}</div>
              <h2 className="mt-3 text-lg font-bold text-yellow-900 group-hover:underline underline-offset-4">
                {f.name}
              </h2>
              <p className="mt-1 text-sm text-yellow-800/90">{f.desc}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-yellow-900 group-hover:translate-x-0.5 transition-transform">
                Explore →
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <div className="rounded-2xl border border-yellow-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xl md:text-2xl font-extrabold text-yellow-900">Quick actions</div>
              <div className="text-yellow-800/90 text-sm mt-1">Jump to common tasks from your dashboard.</div>
            </div>
            <div className="flex gap-3">
              <Link to="/my-appointments" className="animal-btn px-5 py-2.5 rounded-lg font-semibold shadow">My appointments</Link>
              <Link to="/vets" className="px-5 py-2.5 rounded-lg border border-yellow-300 bg-white text-yellow-900 font-semibold hover:bg-yellow-50">Find a vet</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
