import React, { useEffect, useState } from 'react';

const VetNotifications = ({ vet }) => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      setError('');
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.vetProfileId) return;
        const res = await fetch(`/api/notifications?vetId=${user.vetProfileId}`);
        if (!res.ok) throw new Error('Failed to load notifications');
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    }
    fetchNotifications();
  }, [vet]);

  const handleAddNotification = async e => {
    e.preventDefault();
    if (!newNotification) return;
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newNotification, vetId: user.vetProfileId }),
      });
      if (!res.ok) throw new Error('Failed to add notification');
      setNewNotification('');
      // Refresh notifications
      const updatedRes = await fetch(`/api/notifications?vetId=${user.vetProfileId}`);
      const updatedData = await updatedRes.json();
      setNotifications(updatedData);
    } catch (err) {
      setError('Failed to add notification.');
    }
  };

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h3 className="font-bold text-lg mb-2">Notifications</h3>
      <ul className="space-y-1">
        {notifications.length > 0 ? (
          notifications.map((n, i) => (
            <li key={i} className="flex justify-between items-center text-gray-700">
              <span>{n.text}</span>
              <span className="text-xs text-gray-400">{n.time}</span>
            </li>
          ))
        ) : (
          <li>No notifications yet.</li>
        )}
      </ul>
      <form onSubmit={handleAddNotification} className="mt-4 flex gap-2">
        <input
          value={newNotification}
          onChange={e => setNewNotification(e.target.value)}
          placeholder="Add new notification..."
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="animal-btn px-4">Add</button>
      </form>
    </div>
  );
};

export default VetNotifications;
