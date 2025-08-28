import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer', specialty: '', location: '', timings: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur border border-yellow-200 rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left: Intro */}
          <div className="hidden md:flex flex-col justify-center gap-6 p-10 bg-gradient-to-tr from-yellow-100 to-amber-200">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold shadow-sm w-max">
              <span>🐕</span> Join PetConnect
            </div>
            <h1 className="text-3xl font-extrabold text-yellow-900 leading-snug">
              Create your account and choose your role
            </h1>
            <ul className="text-yellow-900/90 space-y-2">
              <li>• Owners/Buyers: book vets, manage appointments</li>
              <li>• Sellers: list products and manage orders</li>
              <li>• Veterinarians: build your profile and get reviews</li>
            </ul>
            <div>
              <Link to="/" className="px-4 py-2 rounded-lg border border-yellow-300 bg-white text-yellow-900 font-semibold shadow hover:bg-yellow-50 inline-block">
                Back to landing
              </Link>
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-8 md:p-10">
            <div className="mb-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">
                Create Account
              </div>
              <h2 className="text-2xl font-extrabold mt-3 text-yellow-900">Register</h2>
              <p className="text-yellow-800/90 mt-1">It only takes a minute to get started.</p>
            </div>

            {error && <div className="mb-4 text-red-600 font-semibold bg-red-50 border border-red-200 px-3 py-2 rounded">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-yellow-900 mb-1">Full Name</label>
                  <input className="w-full p-3 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white" type="text" name="name" placeholder="Alex Doe" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-yellow-900 mb-1">Role</label>
                  <select className="w-full p-3 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white" name="role" value={form.role} onChange={handleChange} required>
                    <option value="buyer">Buyer/Owner</option>
                    <option value="seller">Seller</option>
                    <option value="vet">Veterinarian</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-yellow-900 mb-1">Email</label>
                <input className="w-full p-3 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-yellow-900 mb-1">Password</label>
                <input className="w-full p-3 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white" type="password" name="password" placeholder="Create a strong password" value={form.password} onChange={handleChange} required />
              </div>

              {form.role === 'vet' && (
                <div className="rounded-xl border border-yellow-200 bg-yellow-50/60 p-4">
                  <div className="text-sm font-bold text-yellow-800 uppercase">Veterinarian details</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                    <div>
                      <label className="block text-sm font-semibold text-yellow-900 mb-1">Specialty</label>
                      <input className="w-full p-3 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white" type="text" name="specialty" placeholder="e.g., Surgery" value={form.specialty} onChange={handleChange} required={form.role === 'vet'} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-yellow-900 mb-1">Location</label>
                      <input className="w-full p-3 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white" type="text" name="location" placeholder="Clinic location" value={form.location} onChange={handleChange} required={form.role === 'vet'} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-yellow-900 mb-1">Timings</label>
                      <input className="w-full p-3 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white" type="text" name="timings" placeholder="e.g., 9am-5pm" value={form.timings} onChange={handleChange} required={form.role === 'vet'} />
                    </div>
                  </div>
                </div>
              )}

              <button className="animal-btn w-full py-3 rounded-lg text-yellow-900 font-semibold shadow disabled:opacity-60" disabled={loading}>
                {loading ? 'Registering...' : 'Create account'}
              </button>
            </form>

            <div className="mt-6 text-center text-yellow-900">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold underline hover:text-yellow-700">Login</Link>
            </div>

            <div className="mt-8">
              <div className="text-xs uppercase tracking-wide text-yellow-700 font-bold">Why join?</div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">Book trusted vets anytime.</div>
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">Grow your seller profile.</div>
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">Build your vet reputation.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
