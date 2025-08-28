import React, { useEffect, useState } from 'react';

const API_BASE = '/api';

const VetReviews = ({ vet }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: '', rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const vetId = vet?._id || vet?.id || currentUser?.vetProfileId;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        if (!vetId) {
          setReviews([]);
          return;
        }
        const res = await fetch(`${API_BASE}/vets/${vetId}/reviews`);
        if (!res.ok) throw new Error('Failed to load reviews');
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [vet]);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewReview(f => ({ ...f, [name]: name === 'rating' ? parseInt(value) : value }));
  };

  const handleAddReview = async e => {
    e.preventDefault();
    setError('');
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const vetId = vet?._id || vet?.id || currentUser?.vetProfileId;
      if (!vetId) throw new Error('Vet ID not found');
      const payload = { ...newReview, time: new Date().toISOString() };
      const res = await fetch(`${API_BASE}/vets/${vetId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to add review');
      setNewReview({ user: '', rating: 5, comment: '' });
      // Refresh reviews
      const updatedRes = await fetch(`${API_BASE}/vets/${vetId}/reviews`);
      const updatedData = await updatedRes.json();
      setReviews(Array.isArray(updatedData) ? updatedData : []);
    } catch (err) {
      setError('Failed to add review.');
    }
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1) : '0.0';

  const sortedReviews = [...reviews].sort((a, b) => new Date(b.time || b.createdAt || 0) - new Date(a.time || a.createdAt || 0));

  const formatTime = (t) => {
    if (!t) return '';
    const d = new Date(t);
    return isNaN(d) ? t : d.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-bold text-lg mb-2">Reviews & Ratings</h3>
      <ul className="space-y-2">
        {reviews.length === 0 ? (
          <li>No reviews yet.</li>
        ) : (
          sortedReviews.map((r, i) => (
            <li key={i} className="border-b pb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold">{r.user}</span>
                <span className="text-yellow-500">{'★'.repeat(r.rating || 0)}{'☆'.repeat(5 - (r.rating || 0))}</span>
                <span className="text-xs text-gray-400">{formatTime(r.time || r.createdAt)}</span>
              </div>
              <div className="text-gray-700">{r.comment}</div>
            </li>
          ))
        )}
      </ul>
      <div className="mt-2 text-gray-500 text-sm">Average Rating: <span className="font-bold text-yellow-600">{avgRating}</span></div>
      <form onSubmit={handleAddReview} className="mt-4 flex flex-col gap-2">
        <input name="user" value={newReview.user} onChange={handleChange} placeholder="User" className="p-2 border rounded" required />
        <select name="rating" value={newReview.rating} onChange={handleChange} className="p-2 border rounded" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <textarea name="comment" value={newReview.comment} onChange={handleChange} placeholder="Comment" className="p-2 border rounded" required />
        <button type="submit" className="animal-btn px-4" disabled={!newReview.user || !newReview.comment}>Add Review</button>
      </form>
    </div>
  );
};

export default VetReviews;
