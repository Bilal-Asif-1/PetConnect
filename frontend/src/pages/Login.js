import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
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
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      const role = res.data.user.role;
      if (role === 'vet') navigate('/vet-dashboard');
      else if (role === 'buyer') navigate('/buyer-dashboard');
      else if (role === 'seller') navigate('/seller-dashboard');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
              <span>🐾</span> Welcome to PetConnect
            </div>
            <h1 className="text-3xl font-extrabold text-yellow-900 leading-snug">
              Log in to manage your pet care in one place
            </h1>
            <ul className="text-yellow-900/90 space-y-2">
              <li>• Find and book trusted veterinarians</li>
              <li>• Track appointments and requests</li>
              <li>• Shop and explore adoption options</li>
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
                Secure Login
              </div>
              <h2 className="text-2xl font-extrabold mt-3 text-yellow-900">Sign in to your account</h2>
              <p className="text-yellow-800/90 mt-1">Access your dashboard and continue caring for your pets.</p>
            </div>

            {error && <div className="mb-4 text-red-600 font-semibold bg-red-50 border border-red-200 px-3 py-2 rounded">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-yellow-900 mb-1">Email</label>
                <input className="w-full p-3 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-yellow-900 mb-1">Password</label>
                <input className="w-full p-3 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white" type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
              </div>
              <button className="animal-btn w-full py-3 rounded-lg text-yellow-900 font-semibold shadow disabled:opacity-60" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center text-yellow-900">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold underline hover:text-yellow-700">Register</Link>
            </div>

            <div className="mt-8">
              <div className="text-xs uppercase tracking-wide text-yellow-700 font-bold">Quick tips</div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">Vet? Access your dedicated tools and reviews.</div>
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">Buyer/Owner? Book appointments fast.</div>
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">Seller? Manage listings and orders.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
