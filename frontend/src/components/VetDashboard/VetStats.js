import React, { useEffect, useState } from 'react';

const API_BASE = '/api';

const VetStats = () => {
  const [stats, setStats] = useState({
    appointments: 0,
    healthRequests: 0,
    avgRating: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError('');
      try {
        // Get vet user from localStorage (assumes user object is stored there)
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'vet') {
          setStats({ appointments: 0, healthRequests: 0, avgRating: 0 });
          setLoading(false);
          return;
        }
        // Fetch appointments count
        const apptRes = await fetch(`${API_BASE}/appointments?veterinarian=${user.vetProfileId}`);
        const appointments = apptRes.ok ? (await apptRes.json()).length : 0;
        // Fetch health requests count (assuming endpoint exists)
        const healthRes = await fetch(`${API_BASE}/healthrequests?veterinarian=${user.vetProfileId}`);
        const healthRequests = healthRes.ok ? (await healthRes.json()).length : 0;
        // Fetch reviews/ratings (assuming endpoint exists)
        const reviewsRes = await fetch(`${API_BASE}/vets/${user.vetProfileId}/reviews`);
        let avgRating = 0;
        if (reviewsRes.ok) {
          const reviews = await reviewsRes.json();
          if (reviews.length > 0) {
            avgRating = (
              reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
            ).toFixed(1);
          }
        }
        setStats({ appointments, healthRequests, avgRating });
      } catch (err) {
        setError('Failed to load stats.');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Appointments', value: stats.appointments, color: 'bg-blue-100', icon: '📅' },
    { label: 'Health Requests', value: stats.healthRequests, color: 'bg-green-100', icon: '💬' },
    { label: 'Avg Rating', value: stats.avgRating || '0.0', color: 'bg-yellow-100', icon: '⭐' },
  ];

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {statCards.map((s) => (
        <div key={s.label} className={`rounded-lg shadow flex items-center gap-4 p-4 ${s.color}`}>
          <span className="text-3xl">{s.icon}</span>
          <div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-gray-600">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VetStats;
