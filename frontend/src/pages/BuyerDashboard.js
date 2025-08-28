import React, { useEffect, useMemo, useState } from 'react';

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-yellow-100 text-xl">{icon}</div>
        <div>
          <div className="text-sm text-yellow-700 font-semibold">{label}</div>
          <div className="text-2xl font-extrabold text-yellow-900 leading-tight">{value}</div>
        </div>
      </div>
    </div>
  );
}

function MiniBar({ data }) {
  const maxVal = useMemo(() => Math.max(...data.map(d => d.value), 1), [data]);
  return (
    <div className="flex items-end gap-2 h-24">
      {data.map((d, i) => (
        <div key={i} className="flex-1">
          <div className="w-full bg-yellow-200/60 rounded-t-md" style={{ height: `${(d.value / maxVal) * 100}%` }} />
          <div className="text-[10px] text-yellow-700 text-center mt-1">{d.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function BuyerDashboard() {
  const [buyer, setBuyer] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (!user || user.role !== 'buyer') {
          setLoading(false);
          return;
        }
        setBuyer({ id: user.id, name: user.name, email: user.email });
        const headers = { Authorization: `Bearer ${token}` };
        // Load raw data we can compute from
        const apRes = await fetch(`/api/appointments/user/${user.id}`, { headers });
        if (!apRes.ok) throw new Error('Failed to load appointments');
        const apData = await apRes.json();
        setAppointments(Array.isArray(apData) ? apData : []);

        const ordRes = await fetch(`/api/orders/mine`, { headers });
        if (!ordRes.ok) {
          if (ordRes.status === 401) throw new Error('Not authenticated. Please log in again.');
          if (ordRes.status === 403) throw new Error('Access denied. This endpoint requires a buyer account.');
          if (ordRes.status === 404) throw new Error('Orders endpoint not found. Restart the backend server.');
          const msg = await ordRes.text();
          throw new Error(msg || 'Failed to load orders');
        }
        const ordData = await ordRes.json();
        setOrders(Array.isArray(ordData) ? ordData : []);
      } catch (err) {
        setError(err.message || 'Could not load your dashboard.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const last6Months = useMemo(() => {
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleString('default', { month: 'short' }) });
    }
    return months;
  }, []);

  const monthlyAppointments = useMemo(() => {
    const counts = Object.fromEntries(last6Months.map(m => [m.key, 0]));
    for (const a of appointments) {
      const d = new Date(a.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (key in counts) counts[key] += 1;
    }
    return last6Months.map(m => ({ label: m.label, value: counts[m.key] }));
  }, [appointments, last6Months]);

  const monthlyOrders = useMemo(() => {
    const counts = Object.fromEntries(last6Months.map(m => [m.key, 0]));
    for (const o of orders) {
      const d = new Date(o.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (key in counts) counts[key] += 1;
    }
    return last6Months.map(m => ({ label: m.label, value: counts[m.key] }));
  }, [orders, last6Months]);

  const upcoming = useMemo(() => {
    const now = new Date();
    return appointments.filter(a => a.date && new Date(a.date) > now).slice(0, 5).map(a => ({
      id: a._id,
      title: a.petName || 'Vet appointment',
      with: a.vet?.user?.name || a.vet?.specialty || 'Vet',
      date: new Date(a.date).toLocaleString(),
    }));
  }, [appointments]);

  if (loading) return <div className="p-10 text-center">Loading your dashboard...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-white p-6 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-yellow-700">Welcome back</div>
          <div className="text-2xl md:text-3xl font-extrabold text-yellow-900 mt-1">{buyer?.name}</div>
          <div className="text-yellow-700/80 mt-2">Your activity and orders are up-to-date below.</div>
        </div>
        <div className="hidden md:block text-6xl">🐾</div>
      </div>

      {/* Stats (only accurate metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard icon="📅" label="Total Appointments" value={appointments.length} />
        <StatCard icon="🛒" label="Total Orders" value={orders.length} />
      </div>

      {/* Analytics from raw data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-yellow-700 uppercase tracking-wide">Activity</div>
              <div className="text-xl font-extrabold text-yellow-900">Appointments (last 6 months)</div>
            </div>
            <div className="text-2xl">📈</div>
          </div>
          <div className="mt-4">
            <MiniBar data={monthlyAppointments} />
          </div>
        </div>
        <div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-yellow-700 uppercase tracking-wide">Shopping</div>
              <div className="text-xl font-extrabold text-yellow-900">Orders (last 6 months)</div>
            </div>
            <div className="text-2xl">📊</div>
          </div>
          <div className="mt-4">
            <MiniBar data={monthlyOrders} />
          </div>
        </div>
      </div>

      {/* Orders list */}
      <div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-extrabold text-yellow-900">Recent Orders</div>
          <a href="/store" className="text-sm font-semibold text-yellow-900 underline">Shop</a>
        </div>
        <div className="space-y-3">
          {orders.slice(0, 5).map(o => (
            <div key={o._id} className="flex items-center justify-between rounded-lg border border-yellow-200 p-3">
              <div>
                <div className="font-semibold text-yellow-900">Order #{o._id.slice(-6)}</div>
                <div className="text-xs text-yellow-700">{o.items?.length || 0} items • {o.status}</div>
              </div>
              <div className="text-sm text-yellow-900 font-semibold">${o.total?.toFixed?.(2) ?? o.total}</div>
            </div>
          ))}
          {orders.length === 0 && <div className="text-yellow-700">No orders yet.</div>}
        </div>
      </div>

      {/* Upcoming appointments */}
      <div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
        <div className="text-lg font-extrabold text-yellow-900">Upcoming</div>
        <div className="mt-3 space-y-3">
          {upcoming.map(u => (
            <div key={u.id} className="flex items-center justify-between rounded-lg border border-yellow-200 p-3">
              <div>
                <div className="font-semibold text-yellow-900">{u.title}</div>
                <div className="text-xs text-yellow-700">With {u.with}</div>
              </div>
              <div className="text-sm text-yellow-900 font-semibold">{u.date}</div>
            </div>
          ))}
          {upcoming.length === 0 && <div className="text-yellow-700">No upcoming items.</div>}
        </div>
      </div>
    </div>
  );
}
