import React, { useEffect, useState } from 'react';

export default function SellerProductAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '', description: '', images: '', expiry: '' });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', category: '', price: '', stock: '', description: '', images: '', expiry: '' });
  const defaultCategories = ['Food', 'Toys', 'Grooming', 'Habitats', 'Health Supplies'];
  // Edit logic
  const handleEdit = (p) => {
    setEditId(p._id);
    setEditForm({
      name: p.name || '',
      category: p.category || '',
      price: p.price || '',
      stock: p.stock || '',
      description: p.description || '',
      images: Array.isArray(p.images) ? p.images.join(',') : (p.images || ''),
      expiry: p.expiry ? p.expiry.slice(0, 10) : '',
    });
  };

  const handleSaveEdit = async (id) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...editForm,
          images: editForm.images.split(',').map(s => s.trim()).filter(Boolean),
          expiry: editForm.expiry,
        }),
      });
      if (!res.ok) throw new Error('Failed to update product');
      const updated = await res.json();
      setProducts(products => products.map(p => p._id === id ? updated : p));
      setEditId(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    async function loadCategories() {
      try {
        const catRes = await fetch('/api/products/categories');
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(Array.isArray(catData?.categories) ? catData.categories : []);
        }
      } catch (_) {}
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/products/mine', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
        expiry: form.expiry,
      };
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create product');
      const created = await res.json();
      setProducts([created, ...products]);
  setForm({ name: '', category: '', price: '', stock: '', description: '', images: '', expiry: '' });
      setImageFile(null);
      setShowAdd(false); // Go back to product list
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/products/mine', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setDeleting(id);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage My Products</h1>

      {/* Product List */}
      {!showAdd && <>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="overflow-x-auto rounded-lg border border-yellow-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-yellow-100">
            <thead className="bg-yellow-50">
              <tr>
                <th className="px-4 py-2 text-left text-yellow-900 font-bold">Name</th>
                <th className="px-4 py-2 text-left text-yellow-900 font-bold">Category</th>
                <th className="px-4 py-2 text-left text-yellow-900 font-bold">Price</th>
                <th className="px-4 py-2 text-left text-yellow-900 font-bold">Stock</th>
                <th className="px-4 py-2 text-left text-yellow-900 font-bold">Expiry</th>
                <th className="px-4 py-2 text-center text-yellow-900 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-100">
              {products.map((prod) => (
                editId === prod._id ? (
                  <tr key={prod._id} className="bg-yellow-50">
                    <td className="px-4 py-2 text-yellow-900">
                      <input className="border border-yellow-200 rounded-lg p-1 w-full" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                    </td>
                    <td className="px-4 py-2 text-yellow-900">
                      <input className="border border-yellow-200 rounded-lg p-1 w-full" value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} />
                    </td>
                    <td className="px-4 py-2 text-yellow-900">
                      <input className="border border-yellow-200 rounded-lg p-1 w-full" type="number" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} />
                    </td>
                    <td className="px-4 py-2 text-yellow-900">
                      <input className="border border-yellow-200 rounded-lg p-1 w-full" type="number" value={editForm.stock} onChange={e => setEditForm({ ...editForm, stock: e.target.value })} />
                    </td>
                    <td className="px-4 py-2 text-yellow-900">
                      <input className="border border-yellow-200 rounded-lg p-1 w-full" type="date" value={editForm.expiry} onChange={e => setEditForm({ ...editForm, expiry: e.target.value })} />
                    </td>
                    <td className="px-4 py-2 text-center flex gap-1 justify-center">
                      <button className="px-2 py-1 rounded bg-green-600 text-white text-xs font-semibold mr-1" disabled={saving} onClick={() => handleSaveEdit(prod._id)}>{saving ? 'Saving...' : 'Save'}</button>
                      <button className="px-2 py-1 rounded bg-gray-400 text-white text-xs font-semibold" onClick={() => setEditId(null)}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={prod._id} className="hover:bg-yellow-50">
                    <td className="px-4 py-2 text-yellow-900">{prod.name}</td>
                    <td className="px-4 py-2 text-yellow-900">{prod.category}</td>
                    <td className="px-4 py-2 text-yellow-900">${prod.price}</td>
                    <td className="px-4 py-2 text-yellow-900">{prod.stock}</td>
                    <td className="px-4 py-2 text-yellow-900">{prod.expiry ? (typeof prod.expiry === 'string' && prod.expiry.length === 10 ? prod.expiry : new Date(prod.expiry).toLocaleDateString()) : ''}</td>
                    <td className="px-4 py-2 text-center">
                      <button className="px-2 py-1 rounded bg-blue-500 text-white text-xs font-semibold mr-1" onClick={() => handleEdit(prod)}>Edit</button>
                      <button className="px-3 py-1 rounded bg-red-500 text-white text-xs font-semibold hover:bg-red-600 disabled:opacity-50" onClick={() => handleDelete(prod._id)} disabled={deleting === prod._id}>{deleting === prod._id ? 'Deleting...' : 'Delete'}</button>
                    </td>
                  </tr>
                )
              ))}
              {products.length === 0 && !loading && (
                <tr><td colSpan={6} className="p-4 text-center text-gray-500">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <button
          className="mt-6 px-5 py-2 rounded bg-yellow-700 text-white font-semibold text-sm shadow hover:bg-yellow-800 transition"
          onClick={() => setShowAdd(true)}
        >
          Add Product
        </button>
        <div className="mt-6 text-gray-600 text-xs">
          <p>You can also manage products directly in MongoDB Compass by connecting to your database and editing the <b>products</b> collection.</p>
        </div>
      </>}

      {/* Add Product Form */}
      {showAdd && (
        <div className="mb-8 rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
          <div className="text-lg font-extrabold text-yellow-900 mb-3">Add Product</div>
          <form className="grid grid-cols-1 gap-3" onSubmit={handleCreateProduct}>
            <input className="border border-yellow-200 rounded-lg p-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <select className="border border-yellow-200 rounded-lg p-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required>
              <option value="" disabled>Select category</option>
              {(categories.length ? categories : defaultCategories).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="grid grid-cols-3 gap-3">
              <input className="border border-yellow-200 rounded-lg p-2" placeholder="Price" type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
              <input className="border border-yellow-200 rounded-lg p-2" placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} required />
              <div className="flex flex-col">
                <label className="text-xs text-yellow-700 font-semibold mb-1" htmlFor="expiry-date">Expiry Date</label>
                <input id="expiry-date" className="border border-yellow-200 rounded-lg p-2" placeholder="Expiry Date" type="date" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} />
              </div>
            </div>
            <textarea className="border border-yellow-200 rounded-lg p-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <input className="border border-yellow-200 rounded-lg p-2" placeholder="Image URLs (comma-separated)" value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} />
            <div className="flex flex-col gap-1">
              <label className="text-xs text-yellow-700 font-semibold">Or upload image from device:</label>
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="border border-yellow-200 rounded-lg p-2" />
              {imageFile && <span className="text-xs text-green-700">Selected: {imageFile.name}</span>}
            </div>
            <div className="flex gap-3">
              <button className="animal-btn" disabled={saving}>{saving ? 'Saving...' : 'Create Product'}</button>
              <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-semibold text-sm" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
