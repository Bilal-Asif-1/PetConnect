import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

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

export default function SellerDashboard() {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '', description: '', images: '' });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const defaultCategories = ['Food', 'Toys', 'Grooming', 'Habitats', 'Health Supplies'];

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        // Load categories for selector
        try {
          const catRes = await fetch('/api/products/categories');
          if (catRes.ok) {
            const catData = await catRes.json();
            setCategories(Array.isArray(catData?.categories) ? catData.categories : []);
          }
        } catch (_) {}

        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (!user || user.role !== 'seller') {
          setLoading(false);
          return;
        }
        setSeller({ id: user.id, name: user.name, email: user.email });
        const headers = { Authorization: `Bearer ${token}` };
        const [prodRes, ordRes] = await Promise.all([
          fetch('/api/products/mine', { headers }),
          fetch('/api/orders/seller/mine', { headers }),
        ]);
        if (!prodRes.ok) throw new Error('Failed to load products');
        if (!ordRes.ok) throw new Error('Failed to load orders');
        const prodData = await prodRes.json();
        const ordData = await ordRes.json();
        setProducts(Array.isArray(prodData) ? prodData : []);
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

  const monthlySales = useMemo(() => {
    const counts = Object.fromEntries(last6Months.map(m => [m.key, 0]));
    for (const o of orders) {
      const d = new Date(o.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (key in counts) {
        // count items that belong to this seller
        const user = JSON.parse(localStorage.getItem('user'));
        const items = (o.items || []).filter(i => i.seller === user.id || i.seller?._id === user.id || i.seller === user.id);
        counts[key] += items.reduce((sum, i) => sum + i.quantity, 0);
      }
    }
    return last6Months.map(m => ({ label: m.label, value: counts[m.key] }));
  }, [orders, last6Months]);

  const monthlyRevenue = useMemo(() => {
    const sums = Object.fromEntries(last6Months.map(m => [m.key, 0]));
    for (const o of orders) {
      const d = new Date(o.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (key in sums) {
        const user = JSON.parse(localStorage.getItem('user'));
        const items = (o.items || []).filter(i => i.seller === user.id || i.seller?._id === user.id || i.seller === user.id);
        sums[key] += items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      }
    }
    return last6Months.map(m => ({ label: m.label, value: Math.round(sums[m.key]) }));
  }, [orders, last6Months]);

  const totals = useMemo(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const myItems = orders.flatMap(o => (o.items || []).filter(i => i.seller === user.id || i.seller?._id === user.id || i.seller === user.id));
    return {
      sales: myItems.reduce((sum, i) => sum + i.quantity, 0),
      revenue: myItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      listings: products.length,
      pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'paid').length,
    };
  }, [orders, products]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      let imageUrls = form.images ? form.images.split(',').map(s => s.trim()) : [];
      // If a file is selected, upload it first
      if (imageFile) {
        const data = new FormData();
        data.append('image', imageFile);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        });
        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadData = await uploadRes.json();
        if (uploadData.imageUrl) imageUrls = [uploadData.imageUrl, ...imageUrls];
      }
      const payload = {
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        stock: parseInt(form.stock || '0', 10),
        description: form.description,
        images: imageUrls,
      };
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create product');
      const created = await res.json();
      setProducts([created, ...products]);
      setForm({ name: '', category: '', price: '', stock: '', description: '', images: '' });
      setImageFile(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Delete failed');
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading your dashboard...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="rounded-2xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-white p-6 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-yellow-700">Welcome back</div>
          <div className="text-2xl md:text-3xl font-extrabold text-yellow-900 mt-1">{seller?.name}</div>
          <div className="text-yellow-700/80 mt-2">Accurate sales and inventory below.</div>
        </div>
        <div className="hidden md:block text-6xl">🛍️</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🧾" label="Sales" value={totals.sales} />
        <StatCard icon="💰" label="Revenue" value={`$${totals.revenue.toFixed(2)}`} />
        <StatCard icon="📦" label="Listings" value={totals.listings} />
        <StatCard icon="⏳" label="Pending Orders" value={totals.pendingOrders} />
      </div>

      <div className="flex justify-end mb-4">
  <Link to="/seller/products" className="px-4 py-2 rounded" style={{ background: '#FFFDD0', color: '#111', fontWeight: 600, fontSize: '0.875rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>Manage My Products</Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-yellow-700 uppercase tracking-wide">Sales</div>
              <div className="text-xl font-extrabold text-yellow-900">Last 6 months</div>
            </div>
            <div className="text-2xl">📈</div>
          </div>
          <div className="mt-4">
            <MiniBar data={monthlySales} />
          </div>
        </div>
        <div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-yellow-700 uppercase tracking-wide">Revenue</div>
              <div className="text-xl font-extrabold text-yellow-900">Last 6 months</div>
            </div>
            <div className="text-2xl">💹</div>
          </div>
          <div className="mt-4">
            <MiniBar data={monthlyRevenue} />
          </div>
        </div>
      </div>

      {/* Product management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            {/* Removed 'Your Listings' heading as requested */}
          </div>
          <div className="space-y-3">
            {products.map(p => (
              <div key={p._id} className="flex items-center justify-between rounded-lg border border-yellow-200 p-3">
                <div>
                  <div className="font-semibold text-yellow-900">{p.name}</div>
                  <div className="text-xs text-yellow-700">Stock: {p.stock} • {p.category}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-yellow-900 font-semibold">${p.price}</div>
                  <button className="px-3 py-1 rounded-lg border border-red-300 bg-red-50 text-red-700 font-semibold" onClick={() => handleDeleteProduct(p._id)}>Delete</button>
                  {/* Removed listings table/section as requested */}
                </div>
              </div>
            ))}
            {products.length === 0 && <div className="text-yellow-700">No products yet.</div>}
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-extrabold text-yellow-900">Recent Orders</div>
        </div>
        <div className="space-y-3">
          {orders.slice(0, 8).map(o => (
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
    </div>
  );
}
