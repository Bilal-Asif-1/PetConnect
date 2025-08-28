import React, { useEffect, useState } from 'react';
import VetWelcomeCard from '../components/VetDashboard/VetWelcomeCard';
import VetStats from '../components/VetDashboard/VetStats';
import VetNotifications from '../components/VetDashboard/VetNotifications';
import VetAppointments from '../components/VetDashboard/VetAppointments';
import VetHealthRequests from '../components/VetDashboard/VetHealthRequests';
import VetAvailability from '../components/VetDashboard/VetAvailability';
import VetConsultRequests from '../components/VetDashboard/VetConsultRequests';
import VetClients from '../components/VetDashboard/VetClients';
import VetReviews from '../components/VetDashboard/VetReviews';
import VetProfile from '../components/VetDashboard/VetProfile';

export default function VetDashboard() {
  const [vet, setVet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchVet() {
      setLoading(true);
      setError('');
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'vet' || !user.vetProfileId) {
          setVet(null);
          setLoading(false);
          return;
        }
        const res = await fetch(`/api/vets/${user.vetProfileId}`);
        if (!res.ok) throw new Error('Vet profile not found');
        const data = await res.json();
        setVet(data);
      } catch (err) {
        setError('Could not load vet profile.');
      } finally {
        setLoading(false);
      }
    }
    fetchVet();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading your dashboard...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      <VetWelcomeCard vet={vet} />
      <VetStats vet={vet} />
      <VetNotifications vet={vet} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VetAppointments vet={vet} />
        <VetHealthRequests vet={vet} />
      </div>
      <VetAvailability vet={vet} />
      <VetConsultRequests vet={vet} />
      <VetClients vet={vet} />
      <VetReviews vet={vet} />
      <VetProfile vet={vet} />
    </div>
  );
}
