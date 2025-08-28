import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineMedicalServices, MdCalendarMonth, MdPets, MdStore, MdCampaign, MdChat, MdCheckCircle, MdDashboard, MdPerson, MdShoppingCart, MdSearch
} from 'react-icons/md';

const CheckIcon = () => (
  <MdCheckCircle className="w-5 h-5 text-green-700" />
);

const Landing = () => {
  const features = [
    { title: 'Find Trusted Vets', desc: 'Browse a verified directory of veterinarians, view ratings and profiles.', icon: <MdOutlineMedicalServices className="text-3xl text-yellow-700" />, to: '/vets' },
    { title: 'Easy Appointments', desc: 'Book and manage appointments directly from your dashboard.', icon: <MdCalendarMonth className="text-3xl text-yellow-700" />, to: '/my-appointments' },
    { title: 'Adoption & Care', desc: 'Discover pets for adoption and access essential care services.', icon: <MdPets className="text-3xl text-yellow-700" />, to: '/adoption' },
    { title: 'Pet Store', desc: 'Shop for food, toys, and supplies tailored for your pet.', icon: <MdStore className="text-3xl text-yellow-700" />, to: '/store' },
    { title: 'Lost & Found', desc: 'Help reunite lost pets with their families in your community.', icon: <MdCampaign className="text-3xl text-yellow-700" />, to: '/lostfound' },
    { title: '24/7 Chatbot', desc: 'Get quick answers and guidance any time with our chatbot.', icon: <MdChat className="text-3xl text-yellow-700" />, to: '/chatbot' },
  ];

  const steps = [
    { title: 'Create your account', desc: 'Sign up and choose your role: Owner/Buyer, Seller, or Veterinarian.', badge: 'Step 1' },
    { title: 'Explore & connect', desc: 'Search vets, browse services, or list pets/products to sell.', badge: 'Step 2' },
    { title: 'Book & manage', desc: 'Schedule appointments, manage consultations and requests.', badge: 'Step 3' },
    { title: 'Care & grow', desc: 'Track reviews, build your profile, and care for your pets with ease.', badge: 'Step 4' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-white text-yellow-900">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-yellow-200/60 rounded-full blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-amber-100/60 rounded-full blur-2xl" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-24 md:pb-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                <MdPets className="text-lg text-yellow-700" /> PetConnect
              </span>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
                Your all-in-one platform for pet care and connections
              </h1>
              <p className="mt-4 text-lg text-yellow-800/90">
                Discover vets, book appointments, adopt pets, and shop essentials—all in one place.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link to="/login" className="animal-btn px-6 py-3 rounded-lg text-yellow-900 font-semibold text-center shadow">
                  Get Started
                </Link>
                <a href="#how" className="px-6 py-3 rounded-lg border border-yellow-300 bg-white text-yellow-900 font-semibold text-center shadow hover:bg-yellow-50">
                  See how it works
                </a>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-yellow-800/90">
                <span className="inline-flex items-center gap-2"><CheckIcon /> Trusted vets</span>
                <span className="inline-flex items-center gap-2"><CheckIcon /> Secure bookings</span>
                <span className="inline-flex items-center gap-2"><CheckIcon /> Community driven</span>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-tr from-yellow-100 to-amber-200 p-1 shadow-xl">
                <div className="rounded-2xl bg-white p-6 md:p-8">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-xl bg-yellow-50 shadow"><MdOutlineMedicalServices className="text-3xl text-yellow-700 mx-auto" /><div className="mt-2 font-semibold">1. Find Vet</div></div>
                    <div className="p-4 rounded-xl bg-yellow-50 shadow"><MdCalendarMonth className="text-3xl text-yellow-700 mx-auto" /><div className="mt-2 font-semibold">2. Book</div></div>
                    <div className="p-4 rounded-xl bg-yellow-50 shadow"><MdChat className="text-3xl text-yellow-700 mx-auto" /><div className="mt-2 font-semibold">3. Consult</div></div>
                    <div className="p-4 rounded-xl bg-yellow-50 shadow"><MdPets className="text-3xl text-yellow-700 mx-auto" /><div className="mt-2 font-semibold">Adopt</div></div>
                    <div className="p-4 rounded-xl bg-yellow-50 shadow"><MdShoppingCart className="text-3xl text-yellow-700 mx-auto" /><div className="mt-2 font-semibold">Shop</div></div>
                    <div className="p-4 rounded-xl bg-yellow-50 shadow"><MdChat className="text-3xl text-yellow-700 mx-auto" /><div className="mt-2 font-semibold">Chatbot</div></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-md px-4 py-3 border border-yellow-200 text-sm">
                ⭐ 4.9 average vet rating
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* How it works */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold">How PetConnect works</h2>
          <p className="mt-3 text-yellow-800/90">We bring everything your pet needs into a single, friendly workflow.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.title} className="rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-bold text-yellow-700 bg-yellow-100 inline-block px-2 py-1 rounded-full">{s.badge}</div>
              <div className="mt-3 text-xl font-bold">{s.title}</div>
              <div className="mt-2 text-yellow-800/90">{s.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/register" className="animal-btn px-6 py-3 rounded-lg text-yellow-900 font-semibold inline-block shadow">
            Create your free account
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-yellow-50/60 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold">Everything in one place</h2>
            <p className="mt-3 text-yellow-800/90">From finding vets to shopping for your pet—navigate with ease.</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Link to={f.to} key={f.title} className="group rounded-2xl bg-white border border-yellow-200 p-6 shadow-sm hover:shadow-md transition">
                <div className="text-3xl">{f.icon}</div>
                <div className="mt-3 text-xl font-bold group-hover:underline">{f.title}</div>
                <div className="mt-2 text-yellow-800/90">{f.desc}</div>
                <div className="mt-4 inline-block text-sm font-semibold text-yellow-900 group-hover:translate-x-1 transition">Explore →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-tr from-yellow-100 to-amber-200 p-1 shadow-xl">
          <div className="rounded-2xl bg-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-2xl md:text-3xl font-extrabold">Ready to get started?</div>
              <div className="mt-2 text-yellow-800/90">Join PetConnect today and experience smarter pet care.</div>
            </div>
            <div className="flex gap-3">
              <Link to="/login" className="animal-btn px-6 py-3 rounded-lg text-yellow-900 font-semibold shadow">Login</Link>
              <Link to="/register" className="px-6 py-3 rounded-lg border border-yellow-300 bg-white text-yellow-900 font-semibold shadow hover:bg-yellow-50">Register</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-yellow-200/80">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-yellow-900 font-bold">
            <MdPets className="text-lg text-yellow-700" /> PetConnect
          </div>
          <div className="text-sm text-yellow-800/90">© {new Date().getFullYear()} PetConnect. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
